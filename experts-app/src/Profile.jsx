import React, { useState, useEffect, useContext } from "react";
const apiUrl = import.meta.env.VITE_API_URL;
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [isModifiable, setIsModifiable] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    position: "",
    startDate: "",
    skills: { languages: [""], concepts: [""], tools: [""] },
    projects: [],
  });
  const { username, isContextReady } = useContext(UserContext);
  const { userId } = useParams();
  console.log(isContextReady)

  useEffect(() => {
    
    if (isContextReady) {
      console.log(isContextReady);
      const checkProfileExistence = async () => {
        setIsModifiable(username == userId);
        try {
          const response = await fetch(`${apiUrl}/profile/${userId}`);
          const data = await response.json();
          console.log("response ok", data);
          if (Object.keys(data.profile).length !== 0) {
            const retrivedProfile = data.profile;
            setProfile(retrivedProfile[0]);
          }
        } catch (error) {
          console.error("Error checking profile existence:", error);
        }
      };
      checkProfileExistence();
    } else {
      console.log("Global context not ready");
    }
  }, [isContextReady]);

  async function handleSubmit(e) {
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
        console.log("Profile update successfully!");
      } else {
        console.error("Error adding profile:", response.status);
      }
    } catch (error) {
      console.error("Error adding profile:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  function handleChangeSkill(e, index) {
    const new_languages = [...profile.skills.languages];
    new_languages[index] = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: { languages: new_languages },
    }));
  }

  function handleClickAddskill(e) {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: { languages: [...profile.skills.languages, ""] },
    }));
    console.log(profile.skills);
  }

  function handleClickDeleteSkill(index) {
    const updated_languages = profile.skills.languages;
    updated_languages.splice(index, 1);
    console.log(updated_languages);
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: { languages: updated_languages },
    }));
  }

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
            type="date"
            value={profile.startDate}
            onChange={handleChange}
            required
            readOnly={!isModifiable}
          />
        </div>
        <label>Languages:</label>
        <div>
          {profile.skills.languages.map((lang, index) => (
            <div key={index} className="row">
              <input
                type="text"
                value={lang}
                onChange={(e) => handleChangeSkill(e, index)}
                required
                className="col"
                readOnly={!isModifiable}
              />
              {isModifiable && (
                <button
                  type="button"
                  className="col-1 button clear text-error icon-only"
                  onClick={() => handleClickDeleteSkill(index)}
                >
                  <i className="material-icons">delete</i>
                </button>
              )}
            </div>
          ))}
        </div>
        {isModifiable && (
          <>
            <div className="is-center">
              <button
                type="button"
                className="button clear primary"
                onClick={handleClickAddskill}
              >
                + more skills ...
              </button>
            </div>
            <div className="is-right">
              <button type="submit" className="button">
                Update profile
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
}

export default Profile;
