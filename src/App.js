import './App.css';

function App() {

// what do we want to track in state?
// current time
// whether we're on break or session
// break length and session length

  return (
    <div className="card">
      <div id="start_stop">
        ▶ ⏸
      </div>

      <div id="reset">↺</div>
      
      <div id="middle">
        <div id="break-label" class="top-mid-label">Break Length</div>
        <div id="session-label" class="top-mid-label">Session Length</div>

        <div id="break-decrement" class="adj-btn">ᐯ</div>
        <div id="break-length">5</div>            
        <div id="break-increment" class="adj-btn">ᐱ</div>

        <div id="session-decrement" class="adj-btn">ᐯ</div>
        <div id="session-length">25</div>                  
        <div id="session-increment" class="adj-btn">ᐱ</div>
      </div>

      <div id="timer-label">Session</div>
      
      <div id="time-box">
        <div id="time-left">0:00</div>
      </div>


    </div>
  );
}

export default App;
