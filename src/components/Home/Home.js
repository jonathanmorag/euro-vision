import React, { useState } from "react";
import euroLogo from "../../assets/euro_logo.svg";
import "./Home.css";
import { Popup } from "../Popup/Popup";
import teamData from "../../teams_data.json";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const [euroWinner, setEuroWinner] = useState("");
  const [stage, setStage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [winnerPopup, setWinnerPopup] = useState(false);
  const [vsPopup, setVsPopup] = useState(false);

  const history = useHistory();

  const handleOneVsOne = () => {
    var e = document.getElementById("team1");
    var team1 = e.options[e.selectedIndex].value;
    e = document.getElementById("team2");
    var team2 = e.options[e.selectedIndex].value;
    if (
      team1 === team2 ||
      team1 === "Choose a team..." ||
      team2 === "Choose a team..."
    )
      setVsPopup(!vsPopup);
    else {
      history.push(`/prediction?team1=${team1}&team2=${team2}`);
    }
  };

  const handlePredictStage = () => {
    var e = document.getElementById("team");
    var team = e.options[e.selectedIndex].value;
    if (team === "Choose a team...") {
      setStage("Please select national team");
      setShowPopup(!showPopup);
    } else {
      fetch(`http://localhost:5000/predict_stage?team=${team}`)
        .then((res) => res.json())
        .then((res) => setStage(res.stage))
        .then(() => setShowPopup(!showPopup));
    }
  };

  const handleEuroWinner = () => {
    fetch("http://localhost:5000/predict_winner")
      .then((res) => res.json())
      .then((res) => {
        setEuroWinner(res.eurowinner);
        console.log(euroWinner);
      })
      .then(() => setWinnerPopup(!winnerPopup));

    console.log("done");
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway&display=swap"
        rel="stylesheet"
      ></link>
      <div className="options-select">
        <div className="predict-option">
          <div className="title">1 vs 1</div>
          <div className="features">
            <form action="/">
              <ul>
                <li>First Team</li>
                <li>
                  <select name="team1" id="team1" required>
                    <option>Choose a team...</option>
                    {teamData.map((team, key) => {
                      return <option>{team.name}</option>;
                    })}
                  </select>
                </li>
                <li>Second Team</li>
                <li>
                  <select name="team2" id="team2" required>
                    <option>Choose a team...</option>
                    {teamData.map((team, key) => {
                      return (
                        <option key={key} name={team.name}>
                          {team.name}
                        </option>
                      );
                    })}
                  </select>
                </li>
              </ul>
              <br />
              <a onClick={handleOneVsOne} className="btn">
                Let's go!
              </a>
              {vsPopup ? (
                <Popup
                  text={"Please select two different teams"}
                  closePopup={() => {
                    setVsPopup(!vsPopup);
                  }}
                />
              ) : null}
            </form>
          </div>
        </div>

        <div className="predict-option">
          <div className="eurotitle">Euro 2020 scenario</div>
          <form action="/">
            <img src={euroLogo} alt="cur" className="center" />
            <a onClick={handleEuroWinner.bind(this)} className="btn">
              Let's go!
            </a>
            {winnerPopup ? (
              <Popup
                text={euroWinner}
                closePopup={() => {
                  setWinnerPopup(!winnerPopup);
                }}
              />
            ) : null}
          </form>
          <br />
          <h2 className="euroWinner">{euroWinner}</h2>
        </div>

        <div className="predict-option">
          <div className="title">Specific team scenario</div>
          <div className="features">
            <form action="/">
              <ul>
                <li>
                  <p>Check out your favourite team!</p>
                </li>
                <li>
                  <select name="team" id="team">
                    <option>Choose a team...</option>
                    {teamData.map((team, key) => {
                      return <option>{team.name}</option>;
                    })}
                  </select>
                </li>
              </ul>
              <br />
              <br />
              <br />
              <a
                onClick={handlePredictStage.bind(this)}
                className="btn"
                id="btn3"
              >
                Let's go!
              </a>
              {showPopup ? (
                <Popup
                  text={stage}
                  closePopup={() => {
                    setShowPopup(!showPopup);
                  }}
                />
              ) : null}
            </form>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </div>
  );
};
