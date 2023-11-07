"use strict";

window.addEventListener("load", async function () {
    model.inputs.popUps.clock.timeZone = new Date().getTimezoneOffset();
    model.inputs.mainPage.calendar.showWeekNr = new Date().getWeek();
    model.inputs.mainPage.calendar.weekYear = new Date().getWeekYear();
    setCurrentLocation();
    loadModelFromLocalStorage();
    updateView();
    initTimerFromLocalStorage();
    setInterval(function () {
        document.getElementById("clock").innerText = getTime();
    }, 100);
});

function saveModelToLocalStorage() {
    localStorage.setItem("calendarEvents", JSON.stringify(model.calendar));
    localStorage.setItem("alarms", JSON.stringify(model.alarms));
    localStorage.setItem("timer", JSON.stringify(model.inputs.mainPage.timer));
}

function loadModelFromLocalStorage() {
    const calendarJSON = localStorage.getItem("calendarEvents");
    if(calendarJSON) model.calendar = JSON.parse(calendarJSON);

    const alarmsJSON = localStorage.getItem("alarms");
    if(alarmsJSON) model.alarms = JSON.parse(alarmsJSON);

    const timerJSON = localStorage.getItem("timer");
    if(timerJSON) model.inputs.mainPage.timer = JSON.parse(timerJSON);
}

function initTimerFromLocalStorage() {
    const timerModel = model.inputs.mainPage.timer;
    console.log(timerModel.timerInterval);
    if (timerModel.countDownDate > new Date().getTime()) {
        if(timerModel.timerInterval) {
            timerModel.timerInterval = null;
            setCountdownDate();
            toggleTimer();
        }
    }
}