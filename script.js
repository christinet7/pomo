const buttonList = ["pomodoroButton", "shortBreakButton", "longBreakButton", "startButton"];

let numSessions = 0;
let timeRemainingMins = 0;
let timeRemainingSecs = 0;
let totalSecs = 0;
var interval = null;
var countingDown = false;
var pomodoroMode = false;

for (let i = 0; i < buttonList.length; i++) {
    document.getElementById(buttonList[i]).addEventListener("click", buttonPressHandler);
}

// if pomodoro button is pressed, set timer to 25:00 
function buttonPressHandler() {
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
            startOrStop();
            break;
    }
}

function changeBackgroundColor( color ) { document.body.style.background = color; }

function setPomodoro() {
    // changing html of timer
    document.getElementById("startButton").innerHTML = "start";
    pomodoroMode = true;
    let minutes = .2; 
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    document.getElementById("timerSeconds").innerHTML = "00";
    totalSecs = minutes * 60;
    changeBackgroundColor('darkolivegreen');
}

function setShortBreak() {
    document.getElementById("startButton").innerHTML = "start";
    pomodoroMode = false;
    let minutes = .3;
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    document.getElementById("timerSeconds").innerHTML = "00";
    totalSecs = minutes * 60;
    changeBackgroundColor("#5c310e");
}

function setLongBreak() {
    document.getElementById("startButton").innerHTML = "start";
    pomodoroMode = false;
    let minutes = 15;
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    document.getElementById("timerSeconds").innerHTML = "00";
    totalSecs = minutes * 60;
    changeBackgroundColor("#1a5691");
}

// padstart: https://www.w3schools.com/js/tryit.asp?filename=tryjs_string_padding1
// setInterval: https://www.w3schools.com/jsref/met_win_setinterval.asp 
function startCountdown() {
    countingDown = true;
    if (pomodoroMode) {
        numSessions++;
        document.getElementById("catPic" + String(numSessions)).style.visibility = "visible";
    }
    if (totalSecs === 0) { return; }
    interval = setInterval( function() {
        totalSecs--;
        let minutes = Math.floor(totalSecs / 60);
        let seconds = totalSecs % 60;
        document.getElementById("timerMinutes").innerHTML = String(minutes).padStart(2, "0");
        document.getElementById("timerSeconds").innerHTML = String(seconds).padStart(2, "0");
        
        // automatically go to next mode
        if (totalSecs === 0) {
            clearInterval(interval); 
            if (pomodoroMode && numSessions === 4) { setLongBreak();}
            else if (pomodoroMode) {setShortBreak();}
            else {setPomodoro();}
        }
    }
    ,1000);
}

function startOrStop() {
    // want to pause timer 
    if (document.getElementById("startButton").innerHTML === "pause") {
        clearInterval(interval);
        document.getElementById("startButton").innerHTML = "start";
    }
    else {
        document.getElementById("startButton").innerHTML = "pause"
        startCountdown();
    }
}




