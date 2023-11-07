"use strict";

 function updateView() {
    let popupHTML = getPopupHTML();
    document.getElementById("app").innerHTML = /*html*/`
        <div class="main-grid">
            <div class="clock">${getClockHTML() || ''}</div>
            <div class="grid-item calendar">${getCalendarHTML() || ''}</div>
            <div class="grid-item weather">${getWeatherHTML() || ''}</div>
            <div class="grid-item alarm">${getAlarmHTML() || ''}</div>
            <div class="grid-item timer">${getTimerHTML() || ''}</div>
            <div class="buttons">
                <button onclick="showPopupAddTask()">Legg til oppgave</button>
            </div>
        </div>
        ${popupHTML}
    `;
    initDatePicker();
}

function getPopupHTML() {

    const currentPopUp = model.app.currentPopUp;
    let popupHTML;

    if (currentPopUp == "taskDetails") {
        popupHTML = getPopupTaskDetailsHTML();
    }
    if (currentPopUp == "editTask") {
        popupHTML = getPopupEditTaskHTML();
    }
    if (currentPopUp == "addTask") {
        popupHTML = getPopupAddTaskHTML();
    }
    if (currentPopUp == "alarmList") {
        popupHTML = getPopupAlarmListHTML();
    }
    if (currentPopUp == "addAlarm") {
        popupHTML = getPopupAddAlarmHTML();
    }
    if (currentPopUp == "activeAlarm") {
        popupHTML = getActiveAlarmHTML();
    }
    if (currentPopUp == "clockOptions") {
        popupHTML = getPopupClockOptionsHTML();
    }
    if (currentPopUp == null) {
        return '';
    }

    return /* html */ `
        <div class="popup-background" onclick="clearPopup()"></div>
        <div class="popup">${popupHTML}</div>
    `;
}