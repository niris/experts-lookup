import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";
import "./Profile.css";
import SkillsList from "./SkillsList";

const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [isModifiable, setIsModifiable] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    position: "",
    startDate: "",
    skills: { languages: [], concepts: [], tools: [] },
    projects: [],
  });
  const { username, isContextReady } = useContext(UserContext);
  const { userId } = useParams();
  const languagesRef = useRef();
  const conceptsRef = useRef();
  const toolsRef = useRef();

  useEffect(() => {
    if (isContextReady) {
      checkProfileExistence();
    } else {
      console.log("Global context not ready");
    }
  }, [isContextReady]);

  const checkProfileExistence = async () => {
    setIsModifiable(username === userId);
    try {
      const response = await fetch(`${apiUrl}/profile/${userId}`);
      const data = await response.json();
      if (Object.keys(data.profile).length !== 0) {
        const retrievedProfile = data.profile;
        setProfile(retrievedProfile[0]);
      }
    } catch (error) {
      console.error("Error checking profile existence:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    profile.skills.languages= languagesRef.current.getSkills();
    profile.skills.concepts= conceptsRef.current.getSkills();
    profile.skills.tools= toolsRef.current.getSkills();
    
    try {
      const response = await fetch(`${apiUrl}/updateprofile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, profile: profile }),
      });

      if (response.ok) {
        console.log("Profile updated successfully!");
      } else {
        console.error("Error updating profile:", response.status);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            readOnly={!isModifiable}
          />
        </div>
        <div>
          <label htmlFor="description">Position:</label>
          <input
            id="position"
            name="position"
            value={profile.position}
            onChange={handleChange}
            required
            readOnly={!isModifiable}
          />
        </div>
        <div>
          <label htmlFor="start_date">Start date:</label>
          <input
            id="startDate"
            name="startDate"
            title={profile.startDate?profile.startDate.slice(0, 10):""}
            type="date"
            value={profile.startDate?profile.startDate.slice(0, 10):""}
            onChange={handleChange}
            required
            readOnly={!isModifiable}
          />
        </div>
        <label>Languages:</label>
        <SkillsList
          skills={profile.skills.languages}
          type="languages"
          isModifiable={isModifiable}
          ref={languagesRef}
        />
        <label>Concepts:</label>
        <SkillsList
          skills={profile.skills.concepts}
          type="concepts"
          isModifiable={isModifiable}
          ref={conceptsRef}
        />
        <label>Tools:</label>
        <SkillsList
          skills={profile.skills.tools}
          type="tools"
          isModifiable={isModifiable}
          ref={toolsRef}
        />
        {isModifiable && (
          <div className="is-right">
            <button type="submit" className="button">
              Update profile
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default Profile;
