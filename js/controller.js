"use strict";

window.addEventListener("load", function () {
    model.inputs.popUps.clock.timeZone = new Date().getTimezoneOffset();
    model.inputs.mainPage.calendar.showWeekNr = new Date().getWeek();
    updateView();
});