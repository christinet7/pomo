const buttonList = ["pomodoroButton", "shortBreakButton", "longBreakButton", "startButton"];

let numShortBreaks = 0;
let timeRemainingMins = 0;
let timeRemainingSecs = 0;
let totalSecs = 0;

for (let i = 0; i < buttonList.length; i++) {
    document.getElementById(buttonList[i]).addEventListener("click", buttonPressHandler);
}


// if pomodoro button is pressed, set timer to 25:00 
function buttonPressHandler() {
    alert(this.id);
    let buttonPressed = this.id;
    updateTimer(buttonPressed);
}

function updateTimer( mode ) {
    switch(mode) {
        case "pomodoroButton":
            setPomodoro();
            break;
        case "shortBreakButton":
            setShortBreak();
            break;
        case "longBreakButton":
            setLongBreak();
            break;
        case "startButton":
            pause();
            startCountdown();
            break;
    }

}

function setPomodoro() {
    // changing html of timer
    let minutes = 25; 
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    totalSecs = minutes * 60;
    alert(totalSecs);

}

function setShortBreak() {
    let minutes = 5;
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    totalSecs = minutes * 60;
    alert(totalSecs);

}

function setLongBreak() {
    let minutes = 15;
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    totalSecs = minutes * 60;
    alert(totalSecs);

}

// padstart: https://www.w3schools.com/js/tryit.asp?filename=tryjs_string_padding1
// setInterval: https://www.w3schools.com/jsref/met_win_setinterval.asp 
function startCountdown() {
    if (totalSecs === 0) { return; }
    setInterval( function() {
        totalSecs--;
        let minutes = Math.floor(totalSecs / 60);
        let seconds = totalSecs % 60;
        document.getElementById("timerMinutes").innerHTML = String(minutes).padStart(2, "0");
        document.getElementById("timerSeconds").innerHTML = String(seconds).padStart(2, "0");
        if (totalSecs === 0) {
            clearInterval(); 
        }

    }
    ,1000);

}

function pause() {
    document.getElementById("startButton").innerHTML = "pause";
}



