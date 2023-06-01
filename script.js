const buttonList = ["pomodoroButton", "shortBreakButton", "longBreakButton", "startButton"];
const catList = ["catPic1", "catPic2", "catPic3", "catPic4"];
const clickSound = new Audio("button_click.mp3");
const chimeSound = new Audio("chime.mp3");
let numSessions = 0;
let totalSecs = 0;
var interval = null;
var countingDown = false;
var pomodoroMode = false;
var longBreakMode = false;


for (let i = 0; i < buttonList.length; i++) {
    document.getElementById(buttonList[i]).addEventListener("click", buttonPressHandler);
}

// if pomodoro button is pressed, set timer to 25:00 
function buttonPressHandler() {
    clickSound.play(); 
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

function changeBackgroundColor( color ) { 
    document.body.style.background = color; 
    // document.querySelector(".button:hover").style.backgroundColor = "blue"; 
}

function setPomodoro() {
    // changing html of timer
    document.getElementById("startButton").innerHTML = "start";
    pomodoroMode = true;
    let minutes = 25; 
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    document.getElementById("timerSeconds").innerHTML = "00";
    totalSecs = minutes * 60;
    changeBackgroundColor('darkolivegreen');
}

function setShortBreak() {
    document.getElementById("startButton").innerHTML = "start";
    
    pomodoroMode = false; longBreakMode = false;
    let minutes = 5;
    document.getElementById("timerMinutes").innerHTML = `${minutes}`;
    document.getElementById("timerSeconds").innerHTML = "00";
    totalSecs = minutes * 60;
    changeBackgroundColor("#5c310e");
}

function setLongBreak() {
    document.getElementById("startButton").innerHTML = "start";
    pomodoroMode = false; longBreakMode = true;
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
    if (pomodoroMode) {numSessions++;}
    if (totalSecs <= 0) {return;}

    interval = setInterval( function() {
        totalSecs--;
        let minutes = Math.floor(totalSecs / 60);
        let seconds = totalSecs % 60;
        document.getElementById("timerMinutes").innerHTML = String(minutes).padStart(2, "0");
        document.getElementById("timerSeconds").innerHTML = String(seconds).padStart(2, "0");
        let pomoText = "pomodoro", breakText = "break"; 
        if (pomodoroMode) {
            document.title = `${minutes}:${seconds} -- ${pomoText}`;
        }
        else{document.title = `${minutes}:${seconds} -- ${breakText}`;}
        document.title = `${minutes}:${seconds}`;
        
        // automatically go to next mode
        if (totalSecs <= 0) {
            chimeSound.play(); 
            clearInterval(interval); 
            if (pomodoroMode && numSessions === 4) {
                setLongBreak(); 
                document.getElementById("catPic" + String(numSessions)).style.visibility = "visible";
            }
            else if (pomodoroMode) {
                setShortBreak();
                document.getElementById("catPic" + String(numSessions)).style.visibility = "visible";
            }
            else if (longBreakMode) {
                setPomodoro();
                numSessions = 0;
                catList.forEach(element => {
                    document.getElementById(element).style.visibility = "hidden";
                });

            }
            else {
                setPomodoro();
                document.getElementById("catPic" + String(numSessions)).style.visibility = "visible";
            }
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

// document.addEventListener("DOMContentLoaded", () => {
//     if (!("Notification" in window)) {
//         alert("Browser doesn't support desktop notifications!");
//     }
//     else {
//         if (Notification.permission === "granted" && totalSecs <= 0) {
//         // const notification = new Notification("Time is up!");
//         alert("time is up");
//         }
//         else if (Notification.permission !== "denied") {
//             Notification.requestPermission().then(function (permission) {
//                 if (permission === "granted") {
//                     new Notification("You will be notified at the end of each session!");
//                 }
//             });
//         }
//     }
// });



