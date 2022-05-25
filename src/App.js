import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {

  

  const [time, setTime] = useState("25:00");
  const defaultTimeSettings = {"session": 25, "break": 5};
  const [timeSettings, setTimeSettings] = useState(defaultTimeSettings);
  // const [breakLength, setBreakLength] = useState(5);
  // const [sessionLength, setSessionLength] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [runningType, setRunningType] = useState("session");

  let timeoutID;

  function toggleTimer(){
    if (isRunning) clearTimeout(timeoutID)
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    if (isRunning){
      timeoutID = setTimeout(tickDown, 1000);
    }
  })

  function tickDown(){
    let minutes = Number(time.slice(0, 2));
    let seconds = Number(time.slice(3));

    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    if (minutes < 0) {
      document.getElementById("beep").play();

      // alert("end!");
      // (runningType === "session" ? setRunningType("break") : setRunningType("session"));
    }

    minutes = minutes.toString()
    seconds = seconds.toString();

    if (minutes.length === 1) minutes = "0" + minutes;
    if (seconds.length === 1) seconds = "0" + seconds;

    setTime(minutes + ":" + seconds);
  }

  function adjustSetting(sessionType, amount){
    if (isRunning) return;

    let newSetting = {...timeSettings};
    newSetting[sessionType] += amount;
    
    if ( newSetting[sessionType] < 1 || newSetting[sessionType] > 60) return;

    if (sessionType === runningType) {
      // update current time based on new setting
      let newTime = newSetting[sessionType].toString();
      if (newTime.length === 1) newTime = "0" + newTime;
      newTime += ":00";
      setTime(newTime);
    }

    setTimeSettings(newSetting);
  }

  return (
    <>
      <audio preload="auto" id="beep" src="https://soundcamp.org/sounds/382/decreasing_beeping_z7s.mp3"></audio>
      <div className="card">
        <div 
          onClick={
            toggleTimer
          }
        id="start_stop">
          {isRunning ? "⏸" : "▶"}
        </div>

        <div 
          onClick={
            () => {
              clearTimeout(timeoutID);
              setTime("25:00");
              setTimeSettings(defaultTimeSettings);
              setIsRunning(false);
              setRunningType("session");
            }
        } 
        id="reset">↺</div>
        
        <div id="middle">
          <div id="break-label" class="top-mid-label">Break Length</div>
          <div id="session-label" class="top-mid-label">Session Length</div>

          <div onClick={() => {adjustSetting("break", -1)}} id="break-decrement" class="adj-btn">ᐯ</div>
          <div id="break-length">{timeSettings["break"]}</div>            
          <div onClick={() => {adjustSetting("break", 1)}} id="break-increment" class="adj-btn">ᐱ</div>

          <div onClick={() => {adjustSetting("session", -1)}} id="session-decrement" class="adj-btn">ᐯ</div>
          <div id="session-length">{timeSettings["session"]}</div>                  
          <div onClick={() => {adjustSetting("session", 1)}} id="session-increment" class="adj-btn">ᐱ</div>
        </div>

        <div id="timer-label">Session</div>
        
        <div id="time-box">
          <div id="time-left">{time}</div>
        </div>


      </div>
    </>
  );
}

export default App;
