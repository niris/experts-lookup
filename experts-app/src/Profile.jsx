
import React, { useState, useEffect, useContext } from "react";
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
  console.log("is context ready 1", isContextReady);

  useEffect(() => {
    if (isContextReady) {
      console.log("is context ready 2", isContextReady);
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
      console.log("response ok", data);
      if (Object.keys(data.profile).length !== 0) {
        const retrievedProfile = data.profile;
        console.log("retriveProfile : ", retrievedProfile);
        setProfile(retrievedProfile[0]);
      }
    } catch (error) {
      console.error("Error checking profile existence:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleSkillsChange = (skills, type) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: {
        ...prevProfile.skills,
        [type]: skills,
      },
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
            title={profile.startDate.slice(0, 10)}
            type="date"
            value={profile.startDate.slice(0, 10)}
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
          onSkillsChange={handleSkillsChange}
        />
        <label>Concepts:</label>
        <SkillsList
          skills={profile.skills.concepts}
          type="concepts"
          isModifiable={isModifiable}
          onSkillsChange={handleSkillsChange}
        />
        <label>Tools:</label>
        <SkillsList
          skills={profile.skills.tools}
          type="tools"
          isModifiable={isModifiable}
          onSkillsChange={handleSkillsChange}
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
