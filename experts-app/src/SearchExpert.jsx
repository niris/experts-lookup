import { useState, useEffect } from "react";
import "./searchExperts.css";

function SearchExperts() {
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
    fetch(`${apiUrl}/Skills`)
      .then((response) => response.json())
      .then((data) => {
        let skillsList = [
          ...new Set(data.map((item) => item.skills).flat()),
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
      return searchExperts();
    }
    setskills((prevskills) => [...prevskills, skillValue.trim()]);
    setskillValue("");
  }

  function removeskill(index) {
    setskills((prevskills) => prevskills.filter((_, i) => i !== index));
  }

  function searchExperts() {
    if (skills.length > 0) {
      fetch(`${apiUrl}/Recommandations`, {
        method: "POST",
        body: JSON.stringify({
          skills,
        }),
      })
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
            onClick={searchExperts}
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
          <h4>Recommended Skills:</h4>
          {result.map((item, index) => (
            <div className="card" key={index}>
              <header>
                <h4>{item.Name}</h4>
              </header>
              {item.Description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchExperts;
