import React, { useState,useEffect } from "react";

const SkillsList = ({ skills, isModifiable, onSkillsChange, type }) => {

  const [initialSkills, setInitialSkills] = useState(skills);


  useEffect(() => {
    setInitialSkills(skills);
  }, [skills]);


  const handleSkillChange = (e, index) => {
    const newSkills = [...initialSkills];
    newSkills[index] = e.target.value;
    setInitialSkills(newSkills);
    onSkillsChange(newSkills, type);
  };

  const handleAddSkill = () => {
    setInitialSkills((prevSkills) => [...prevSkills, ""]);
  };

  function handleDeleteSkill(index) {
    const updatedSkills = [...initialSkills];
    console.log("before", updatedSkills);
    updatedSkills.splice(index, 1);
    console.log("after", updatedSkills);
    setInitialSkills(updatedSkills);
    onSkillsChange(updatedSkills, type);
  }



  return (
    <div>
      {initialSkills.map((skill, index) => (
              <div className="row" key={index}>
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(e, index)}
                required
                className="col"
                readOnly={!isModifiable}
              />
              {isModifiable && (
                <button
                  type="button"
                  className="col-1 button clear text-error icon-only"
                  onClick={() => handleDeleteSkill(index)}
                >
                  <i className="material-icons">delete</i>
                </button>
              )}
            </div>
      ))}
      {isModifiable && (
        <div className="is-center">
          <button
            type="button"
            className="button clear primary"
            onClick={handleAddSkill}
          >
            + more ...
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
