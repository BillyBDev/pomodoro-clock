import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {

  

  const [time, setTime] = useState("25:00");
  const defaultTimeSettings = {"session": 25, "break": 5};
  const [timeSettings, setTimeSettings] = useState(defaultTimeSettings);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

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
      (isBreak ? updateTime(timeSettings["session"]) : updateTime(timeSettings["break"]));
      setIsBreak(!isBreak);
      return;
    }

    minutes = minutes.toString()
    seconds = seconds.toString();

    if (minutes.length === 1) minutes = "0" + minutes;
    if (seconds.length === 1) seconds = "0" + seconds;

    setTime(minutes + ":" + seconds);
  }

  function updateTime(newTime){
    let str = newTime.toString();
    if (str.length === 1) str = "0" + str;
    str += ":00";
    setTime(str);
  }

  function adjustSetting(sessionType, amount){
    if (isRunning) return;

    let newSetting = {...timeSettings};
    newSetting[sessionType] += amount;
    
    if ( newSetting[sessionType] < 1 || newSetting[sessionType] > 60) return;

    if ((sessionType === "session" && isBreak === false) || (sessionType === "break" && isBreak === true)) {
      updateTime(newSetting[sessionType]);
    }

    setTimeSettings(newSetting);
  }

  return (
    <>
      <audio preload="auto" id="beep" src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_7232134569.mp3?filename=success_bell-6776.mp3"></audio>
      <div className="card">
        <div 
          onClick={
            toggleTimer
          }
        id="start_stop" class="btn">
          {isRunning ? "⏸" : "▶"}
        </div>

        <div 
          onClick={
            () => {
              clearTimeout(timeoutID);
              setTime("25:00");
              setTimeSettings(defaultTimeSettings);
              setIsRunning(false);
              setIsBreak(false);
              document.getElementById("beep").load();
            }
        } 
        id="reset" class="btn">↺</div>
        
        <div id="middle">
          <div id="break-label" class="top-mid-label">Break Length</div>
          <div id="session-label" class="top-mid-label">Session Length</div>

          <div onClick={() => {adjustSetting("break", -1)}} id="break-decrement" class="btn adj-btn">ᐯ</div>
          <div id="break-length">{timeSettings["break"]}</div>            
          <div onClick={() => {adjustSetting("break", 1)}} id="break-increment" class="btn adj-btn">ᐱ</div>

          <div onClick={() => {adjustSetting("session", -1)}} id="session-decrement" class="btn adj-btn">ᐯ</div>
          <div id="session-length">{timeSettings["session"]}</div>                  
          <div onClick={() => {adjustSetting("session", 1)}} id="session-increment" class="btn adj-btn">ᐱ</div>
        </div>

        <div id="timer-label">{(isBreak ? "Break:" : "Session:")}</div>
        
        <div id="time-box">
          <div id="time-left">{time}</div>
        </div>


      </div>
    </>
  );
}

export default App;
