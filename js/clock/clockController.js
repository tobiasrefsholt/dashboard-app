"use strict";

function toggleTimer() {
    const mainPageTimer = model.inputs.mainPage.timer;
    if (mainPageTimer.timerInterval == null) {
        setCountdownDate();
        mainPageTimer.timerInterval = setInterval(timer, 100);
    } else {
        clearInterval(mainPageTimer.timerInterval);
        mainPageTimer.timerInterval = null;
    }
    saveModelToLocalStorage();
    updateView();
}

function setCountdownDate() {
    const modelTimer = model.inputs.mainPage.timer;
    const dateNow = new Date().getTime();
    const seconds = 
        modelTimer.fullTimer.hours * 3600
        + modelTimer.fullTimer.minutes * 60 + modelTimer.fullTimer.seconds;
    modelTimer.countDownDate = new Date(dateNow + seconds * 1000).getTime();
    saveModelToLocalStorage();
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
    if (distance < 100) {
        clearInterval(model.inputs.mainPage.timer.timerInterval);
        playAlarm(null);
        clearTimer();
    }
    localStorage.setItem("timer", JSON.stringify(model.inputs.mainPage.timer));
    updateTimerView();
}

function clearTimer() {
    const fullTimer = model.inputs.mainPage.timer.fullTimer
    fullTimer.hours = null;
    fullTimer.minutes = null;
    fullTimer.seconds = null;
    document.getElementById("hours").value = null;
    document.getElementById("minutes").value = null;
    document.getElementById("seconds").value = null;
    clearInterval(model.inputs.mainPage.timer.timerInterval);
    model.inputs.mainPage.timer.timerInterval = null;
    saveModelToLocalStorage();
    updateView();
}

function addAlarm() {
    const fields = model.inputs.popUps.addAlarm;
    if (!fields.time) {
        fields.errorMessage = "Tidspunkt ikke valgt.";
        updateView();
        return false;
    }
    fields.alarmId= generateAlarmId();
    fields.isActive = true;
    model.alarms.push(JSON.parse(JSON.stringify(fields)));
    resetAlarmFields(fields);
    model.app.currentPopUp = "alarmList";
    saveModelToLocalStorage();
    updateView();
}

function generateAlarmId() {
    const ids = [];
    for (let alarm of model.alarms) {
        ids.push(alarm.alarmId);
    }
    return Math.max(...ids) + 1;
}

function resetAlarmFields(fields) {
    fields.alarmId = null
    fields.title = null;
    fields.time = null;
    fields.isActive = null;
    fields.errorMessage = null;
    for (let index in fields.repeat) {
        fields.repeat[index] = false;
    }
}

function toggleWeekdayInAlarm(index) {
    model.inputs.popUps.addAlarm.repeat[index] = !model.inputs.popUps.addAlarm.repeat[index];
    updateView();
}

function showClockOptionsPopup() {
    model.app.currentPopUp = "clockOptions";
    updateView();
}

function showAlarmListPopup() {
    model.app.currentPopUp = "alarmList";
    updateView();
}

function showAddAlarmPopup() {
    model.app.currentPopUp = "addAlarm";
    updateView();
}

function getAlarmDate(time) {
    return new Date([new Date().toISOString().substring(0,10), time]).getTime();
}

const alarmInterval = setInterval(function () {
    const timeNow = new Date();
    let currentDay = timeNow.getDay();
    if (currentDay == 0) {
        currentDay = 6;
    } else {
        currentDay -= 1;
    }
    for (let alarm of model.alarms) {
        const repeating = isRepeating(alarm);
        
        // Skip alarm if skipAlarm() returns true
        if (skipAlarm(alarm, repeating, timeNow)) continue;

        if (alarm.repeat[currentDay]) {
            playAlarm(alarm.alarmId);
            alarm.lastRing = timeNow.toISOString().substring(0,10);
        } else if (!repeating) {
            playAlarm(alarm.alarmId);
            alarm.isActive = false;
        }
    }
}, 5000)

function isRepeating(alarm) {
    for (let day of alarm.repeat) {
        if (day) {
            return true;
        }
    }
    return false;
}

function skipAlarm(alarm, repeating, timeNow) {
    // Check if alarm is active
    if (!alarm.isActive) return true;

    // Check if alarm time has passed
    if (getAlarmDate(alarm.time) >= timeNow.getTime()) return true;

    // Check if alarm was triggered today
    if (new Date(alarm.lastRing).getDate() == timeNow.getDate()) return true;

    const milliSecondsToAlarm = getAlarmDate(alarm.time) - timeNow.getTime();
    
    // Check if alarm should have triggered within the last 10 minutes
    if (milliSecondsToAlarm < -10 * 60 * 1000) { // minutes * seconds * milliseconds
        return true;
    }

    return false;
}

function deleteAlarm(alarmId) {
    const index = model.alarms.findIndex(x => x.alarmId === alarmId);
    model.alarms.splice(index, 1);
    saveModelToLocalStorage();
    updateView();
}

function toggleAlarmActive(alarmId) {
    const alarm = model.alarms.find(x => x.alarmId === alarmId);
    alarm.isActive = !alarm.isActive;
    updateView();
}

function getNextActiveAlarm() {
    const nextAlarm = {
        alarmId: null,
        time: null,
    };
    for (let alarm of model.alarms) {
        const time = getAlarmDate(alarm.time) - new Date().getTime();
        if (time <= 0 || !alarm.isActive) continue;
        if (nextAlarm.alarmId === null || (nextAlarm.time > time)) {
            nextAlarm.alarmId = alarm.alarmId,
            nextAlarm.time = time;
        };
    }
    if (nextAlarm.alarmId === null) return null;
    return model.alarms.find(x => x.alarmId === nextAlarm.alarmId);
}

function playAlarm(alarmId) {
    model.inputs.popUps.activeAlarm.alarmId = (alarmId !== null) ? alarmId : null;
    model.app.currentPopUp = "activeAlarm";
    const randomIndex = Math.floor(Math.random() * model.alarm.files.length);
    model.alarm.audio = new Audio(model.alarm.files[randomIndex]);
    if (!model.inputs.mainPage.alarm.isMuted) {
        model.alarm.audio.play();
    }
    updateView();
}

function stopAlarm() {
    model.app.currentPopUp = null;
    model.inputs.popUps.activeAlarm.alarmId = null;
    model.alarm.audio.pause();
    updateView();
}

function toggleMuteAlarm() {
    model.inputs.mainPage.alarm.isMuted = !model.inputs.mainPage.alarm.isMuted;
    if (model.alarm.audio) model.alarm.audio.pause();
    updateView();
}