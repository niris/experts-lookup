import { useState, useEffect } from "react";
import "./SearchProfiles.css";

function SearchProfiles() {
  const [skillOptions, setskillOptions] = useState([]);
  const [skillValue, setskillValue] = useState("");
  const [skills, setskills] = useState([]);
  const [result, setResult] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (localStorage.skills) {
      setskillOptions(JSON.parse(localStorage.skills));
      return;
    }
    fetch(`${apiUrl}/profiles`)
      .then((response) => response.json())
      .then((data) => {
        let skillsList = [
          ...new Set(data.map((item) => item.skills.languages).flat()),
        ].sort((a, b) => a.localeCompare(b));
        setskillOptions(skillsList);
        localStorage.skills = JSON.stringify(skillsList);
      })
      .catch((error) => {
        console.error("Error fetching options from API:", error);
      });
  }, []);

  useEffect(() => {
    if (skills.length === 0) {
      setResult(null);
    }
  }, [skills]);

  function handleSubmit(event) {
    event.preventDefault();
    addskill(event);
  }

  function addskill(event) {
    event.preventDefault();
    if (skillValue.trim() === "") {
      return searchProfile();
    }
    setskills((prevskills) => [...prevskills, skillValue.trim()]);
    setskillValue("");
  }

  function removeskill(index) {
    setskills((prevskills) => prevskills.filter((_, i) => i !== index));
  }

  function searchProfile() {
    if (skills.length > 0) {
      const queryParams = new URLSearchParams({skills});
      fetch(`${apiUrl}/profiles?${queryParams}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          setResult(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="search"
            name="skills"
            list="skillList"
            value={skillValue}
            onChange={(e) => setskillValue(e.target.value)}
            placeholder="add skill"
            className="col"
          />
          <datalist id="skillList">
            {skillOptions.map((option, index) => (
              <option key={index} value={option} />
            ))}
          </datalist>
          <button
            type="submit"
            className="col-1 button primary outline icon-only"
          >
            +
          </button>
        </div>
        {skills.length > 0 && (
          <p>
            {skills.map((item, index) => (
              <span className="tag" key={index}>
                {item}{" "}
                <button
                  className="button icon-only"
                  onClick={() => removeskill(index)}
                >
                  &times;
                </button>
              </span>
            ))}
          </p>
        )}
        <div className="button-container">
          <button
            type="button"
            onClick={searchProfile}
            className="button primary"
            disabled={skills.length === 0}
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setskills([]);
            }}
          >
            Reset
          </button>
        </div>
      </form>
      {result && result.length > 0 && (
        <div className="result">
          <h4>Recommended Profile:</h4>
          {result.map((item, index) => (
            <div className="card" key={index}>
              <header>
                <h4>{item.name}</h4>
              </header>
              <p>{item.position}</p>
              {item.skills.languages.map((item, index) => (
                <span className="tag" key={index}>
                  {item}{" "}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchProfiles;
