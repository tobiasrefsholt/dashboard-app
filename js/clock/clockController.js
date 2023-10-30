"use strict";

let timerInterval = null;

function toggleTimer() {
    if (timerInterval == null) {
        setCountdownDate();
        timerInterval = setInterval(timer, 100);
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    updateView();
}

function setCountdownDate() {
    const modelTimer = model.inputs.mainPage.timer;
    const dateNow = new Date().getTime();
    const seconds = 
        modelTimer.fullTimer.hours * 3600
        + modelTimer.fullTimer.minutes * 60 + modelTimer.fullTimer.seconds;
    modelTimer.countDownDate = new Date(dateNow + seconds * 1000).getTime();
}

// Update the count down every 1 second
function timer() {

    const countDownDate = model.inputs.mainPage.timer.countDownDate;

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds

    const fields = model.inputs.mainPage.timer.fullTimer;

    fields.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    fields.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    fields.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // If the count down is finished, write some text
    if (distance < 1000) {
        clearInterval(timerInterval);
        alert("Timer ferdig!");
        clearTimer();
    }
    updateTimerView();
}

function showClockPopup() {
    model.app.currentPopUp = "clockOptions";
    updateView();
}