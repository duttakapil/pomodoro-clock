import React from 'react';
import './style.css';
import {hot} from 'react-hot-loader';

function Clock() {
  const [sessionBreak, setSessionBreak] = React.useState(5);
  const [session, setSession] = React.useState(25);
  
  const [clock, setClock] = React.useState("25:00");
  const [timer, setTimer] = React.useState(0);
  
  const [clockStatus, setClockStatus] = React.useState(false);
  const [sessionStatus, setSessionStatus] = React.useState(true);
  const [breakStatus, setBreakStatus] = React.useState(false);
  
  const getMin = () => {
    return Number(clock.split(':')[0]);
  }
  
  const getSec = () => {
    return Number(clock.split(':')[1]);
  }
  
  let min = getMin(), sec = getSec(), status = true;
  
  React.useEffect(() => {
    if(getMin() === 0 && getSec() === 0) document.getElementById('beep').play();
  });
  
  const updateClock = (min, sec) => {
    if(String(min).length < 2) min = '0' + min;
    if(sec === undefined) sec = 0;
    if(String(sec).length < 2) sec = '0' + sec;
    setClock(`${min}:${sec}`);
  }
  
  const runClock = () => {
    if(min === 0 && sec === 0 && status) {
      status = false;
      setSessionStatus(false);
      setBreakStatus(true);
      min = sessionBreak;
      updateClock(min);
    } 
    else if(min === 0 && sec === 0 && !status){
      status = true;
      setBreakStatus(false);
      setSessionStatus(true);
      min = session;
      updateClock(session);
    } 
    else if(min > 0 && sec <= 0) {
      min -= 1;
      sec = 59;      
    }
    else if(sec > 0) {
      sec -= 1;      
    }
    updateClock(min, sec);
  }
  
  const startClock = () => {
    setTimer(setInterval(runClock, 1000));
  }
  
  const stopClock = () => {
    return clearInterval(timer);
  }
 
  const resetClock = () => {
    setTimer(0);
    updateClock(25);
    setSession(25);
    setSessionBreak(5);
    setBreakStatus(false);
    setSessionStatus(true);
    setClockStatus(false);
    return clearInterval(timer); 
  }
  
  const handleClick = (event) => {
    const id = event.target.id;
    
    if(id === "start_stop") {
      if(!clockStatus) {
        startClock();
        setClockStatus(true);
      } else {
        stopClock();
        setClockStatus(false);
      }
    }
    else if(id === "reset") {
      resetClock();
      document.getElementById('beep').load();
      setClockStatus(false);
    }
    else if(id === "break-increment" && sessionBreak < 60 && !clockStatus) {
      setSessionBreak(sessionBreak + 1);
      if(breakStatus) updateClock(sessionBreak + 1);
    } 
    else if(id === "break-decrement" && sessionBreak > 1 && !clockStatus) { 
      setSessionBreak(sessionBreak - 1);
      if(breakStatus) updateClock(sessionBreak - 1);
    }
    else if(id === "session-increment" && session < 60 && !clockStatus) {
      setSession(session + 1);
      if(sessionStatus) updateClock(session + 1);
    }
    else if(id === "session-decrement" && session > 1 && !clockStatus) {
      setSession(session - 1);
      if(sessionStatus) updateClock(session - 1);
    }
  }
  
  return (
    <div id="clock">
      <div id="set-clock">
        <div id="break">
          <h4 id="break-label">Break Length</h4>
          <h1 id="break-length">{sessionBreak}</h1>
          <button id="break-decrement" onClick={handleClick}>Down</button>
          <button id="break-increment" onClick={handleClick}>Up</button>
        </div>
        <div id="session">
          <h4 id="session-label">Session Length</h4>
          <h1 id="session-length">{session}</h1>
          <button id="session-decrement" onClick={handleClick}>Down</button>
          <button id="session-increment" onClick={handleClick}>Up</button>
        </div>      
      </div>
      <div id="clock-display-div">
        <div id="clock-display" style={{backgroundColor : getMin() < 1 ? 'red' : 'yellow'}}>
        <p id="timer-label">{sessionStatus ? "Session" : "Break"}</p>
        <h1 id="time-left">{clock}</h1>
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        <div className="controls">
          <button id="start_stop" onClick={handleClick}>{clockStatus ? "Stop" : "Start"}</button>
          <button id="reset" onClick={handleClick}>Reset</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default hot(module)(Clock);