// @ts-nocheck
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [time, setTime] = useState("25:00");
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  let timeoutID;

  function toggleTimer(){
    if (isRunning) clearTimeout(timeoutID)
    setIsRunning(!isRunning);
  }

  useEffect(() => {
    document.title = (isBreak ? "Break" : "Session") + " - " + time;
    if (time === "00:00"){
      document.getElementById("beep").play();
      (isBreak ? numToTime(sessionLength) : numToTime(breakLength));
      setIsBreak(!isBreak);
      return;
    }
    if (isRunning){
      // eslint-disable-next-line
      timeoutID = setTimeout(tickDown, 1000);
    }
  }, [isRunning, time])

  useEffect(() => {
    if(isBreak) numToTime(breakLength)
    // eslint-disable-next-line
  }, [breakLength])

  useEffect(() => {
    if(!isBreak) numToTime(sessionLength)
    // eslint-disable-next-line
  }, [sessionLength])

  function tickDown(){
    if (!isRunning) return;
    
    let minutes = Number(time.slice(0, 2));
    let seconds = Number(time.slice(3));

    seconds--;

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }

    minutes = minutes.toString()
    seconds = seconds.toString();

    if (minutes.length === 1) minutes = "0" + minutes;
    if (seconds.length === 1) seconds = "0" + seconds;

    setTime(minutes + ":" + seconds);
  }

  function numToTime(newTime){
    let str = newTime.toString();
    if (str.length === 1) str = "0" + str;
    str += ":00";
    setTime(str);
  }

  function adjustSetting(isBreakArg, amount){
    if (isRunning && (isBreakArg === isBreak)) return;
    
    if (isBreakArg){
      setBreakLength(prev => {
        if ((amount > 0 && prev >= 60) || (amount < 0 && prev <= 1)) return prev;
        return prev + amount
      })
    } else {
      setSessionLength(prev => {
        if ((amount > 0 && prev >= 60) || (amount < 0 && prev <= 1)) return prev;
        return prev + amount;
      })
    }
  }

  return (
    <>
      <audio preload="auto" id="beep" src="https://cdn.pixabay.com/download/audio/2021/08/09/audio_7232134569.mp3?filename=success_bell-6776.mp3"></audio>
      <div className="card">
        <div onClick={toggleTimer} id="start_stop" class="btn">
          <i id="play-pause-icon" className={(isRunning ? "fa-solid fa-pause" : "fa-solid fa-play")}></i>
        </div>

        <div 
          onClick={
            () => {
              setIsRunning(false);
              clearTimeout(timeoutID);
              setTime("25:00");
              setBreakLength(5);
              setSessionLength(25);
              setIsBreak(false);
              document.getElementById("beep").pause();
              document.getElementById("beep").fastSeek(0);
            }
        } 
        id="reset" class="btn">↺</div>
        
        <div id="middle">
          <div id="break-label" class="top-mid-label">Break Length</div>
          <div id="session-label" class="top-mid-label">Session Length</div>

          <div onClick={() => {adjustSetting(true, -1)}} id="break-decrement" class="btn adj-btn">ᐯ</div>
          <div id="break-length">{breakLength}</div>            
          <div onClick={() => {adjustSetting(true, 1)}} id="break-increment" class="btn adj-btn">ᐱ</div>

          <div onClick={() => {adjustSetting(false, -1)}} id="session-decrement" class="btn adj-btn">ᐯ</div>
          <div id="session-length">{sessionLength}</div>                  
          <div onClick={() => {adjustSetting(false, 1)}} id="session-increment" class="btn adj-btn">ᐱ</div>
        </div>

        <div id="timer-label">{(isBreak ? "Break:" : "Session:")}</div>
        
        <div id="time-box">
          <div id="time-left">{time}</div>
        </div>


      </div>

      <div id="footer">
        <a className="footer" href="https://www.freecodecamp.org/learn/front-end-development-libraries/front-end-development-libraries-projects/build-a-25--5-clock" target="_blank" rel="noreferrer">Pomodoro Timer Project</a> <br /> by <a href="https://www.billybrowniii.com" target="_blank" rel="noreferrer">Billy Brown III</a>
      </div>
    </>
  );
}

export default App;
