import React, { useRef } from "react";

function SkillsList({
  skills,
  type,
  isModifiable,
  handleChangeSkill,
  handleClickDeleteSkill,
  handleClickAddSkill,
}) {
  const inputRefs = useRef([]);

  const SkillItem = ({ skill, index }) => {
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
      handleChangeSkill(e, type, index);
    };

    // Set the initial focus on the input field when it is rendered
    React.useEffect(() => {
      if (inputRef.current && index === 0) {
        inputRef.current.focus();
      }
    }, [index]);

    return (
      <div className="row">
        <input
          type="text"
          value={skill}
          onChange={handleInputChange}
          required
          className="col"
          readOnly={!isModifiable}
          ref={(el) => (inputRefs.current[index] = el)}
          onFocus={() => {
            // Set the current input field reference when it receives focus
            inputRefs.current[index] = inputRef.current;
          }}
        />
        {isModifiable && (
          <button
            type="button"
            className="col-1 button clear text-error icon-only"
            onClick={() => handleClickDeleteSkill(type, index)}
          >
            <i className="material-icons">delete</i>
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      {skills.map((skill, index) => (
        <SkillItem key={index} skill={skill} index={index} />
      ))}
      {isModifiable && (
        <div className="is-center">
          <button
            type="button"
            className="button clear primary"
            onClick={() => handleClickAddSkill(type)}
          >
            + more {type}...
          </button>
        </div>
      )}
    </>
  );
}

export default SkillsList;
