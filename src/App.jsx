import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components.js/footer";
function App() {

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [bgColor, setBgColor] = useState('#242424')
  const [isRunning, setIsRunning] = useState(false); // To control the countdown

  useEffect(() => {
    let countdownInterval;
    document.body.style.backgroundColor = bgColor
    if (isRunning && (minutes > 0 || seconds > 0)) {
      countdownInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes > 0) {
            setMinutes((prevMin) => prevMin - 1);
            setSeconds(59);
          } else {
            clearInterval(countdownInterval);
            setIsRunning(false);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    if (seconds === 0 && minutes === 0) {
      clearInterval(countdownInterval);
      setIsRunning(false);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [isRunning, seconds, minutes]);

  const startCountdown = () => {
    setIsRunning(true);
  };

  const stopCountdown = () => {
    setIsRunning(false);
  };

  const setMinutesTime = (time) =>{
    setIsRunning(false);
    setMinutes(0)
    setSeconds(0)
    setMinutes(time)
    
    
  }

  return (
    <>
      <div>
      <h1 className="title">POMOFOCUS</h1>
      <div className="card">
        <div className="timerDisplay">
          <span>{minutes}</span>:<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
        <div className="timerAction">
        <button onClick={startCountdown}>START</button>
        <button onClick={stopCountdown} >STOP</button>
        </div>
        <div className="timerDuration">
        <button onClick={()=>{setMinutesTime(45),setBgColor('#242424')}} >45 min</button>
        <button onClick={()=>{setMinutesTime(30),setBgColor('#242424')}} >30 min</button>
        <button onClick={()=>{setMinutesTime(25),setBgColor('#242424')}} >25 min</button>
        </div>
        <div className="breakDuration">
        <button onClick={()=>{setMinutesTime(5), setBgColor('#f88895')}} >Short Break</button>
        <button onClick={()=>{setMinutesTime(15), setBgColor('#9292f3')}} >Long Break</button>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  );
}

export default App;
