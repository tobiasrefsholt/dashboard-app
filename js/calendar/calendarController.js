"use strict";

function getEventsForWeek() {
    const returnEvents = [];

    for (let calendarEvent of model.calendar) {
        const eventWeek = new Date(calendarEvent.date).getWeek();
        const eventYear = new Date(calendarEvent.date).getWeekYear();
        const displayWeek = model.inputs.mainPage.calendar.showWeekNr;
        const displayYear = model.inputs.mainPage.calendar.weekYear;
        if (eventWeek == displayWeek && eventYear == displayYear) {
            returnEvents.push(calendarEvent);
        }
    }
    
    return returnEvents;
}

function showEventDetails(taskId){
    model.inputs.popUps.taskDetails.taskId = taskId;
    model.app.currentPopUp = "taskDetails";
    updateView();
}

function getTaskByID(taskId) {
    for (let task of model.calendar) {
        if (taskId == task.taskId) {
            return task;
        }
    }
}

// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
    var date = new Date(this.getTime());
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    return date.getFullYear();
}

function clearPopup(){
    model.app.currentPopUp = null;
    updateView();
}

function showPopupEditTask(taskId) {
    model.app.currentPopUp = "editTask";
    model.inputs.popUps.editTask = JSON.parse(JSON.stringify(getTaskByID(taskId)));
    updateView();
}

function showPopupAddTask() {
    model.app.currentPopUp = "addTask";
    updateView();
}

function addTask() {
    const generate = generateTaskId();
    let fields = model.inputs.popUps.addTask;
    if (fields.date === null) fields.date = new Date().toISOString().substring(0, 10);
    if (!validateFields(fields)) {
        fields.errorMessage = "Fyll ut alle påkrevde felter.";
        updateView();
        return;
    } else {
        fields.errorMessage = null;
    }
    model.calendar.push({
        taskId: generate,
        title: fields.title,
        desc: fields.desc,
        date: fields.date,
        timeStart: fields.timeStart,
        timeEnd: fields.timeEnd,
        repeat: {
            interval: fields.repeat.interval,
            yearly: fields.repeat.yearly,
            monthly: fields.repeat.monthly,
            weekly: fields.repeat.weekly,
            daily: fields.repeat.daily,
        }
    });
    resetCalenderEventFields(fields);
    model.app.currentPopUp = null;
    saveModelToLocalStorage();
    updateView();
}

function validateFields(fields) {
    if (!fields.title) return false;
    if (!fields.date) return false;
    if (!fields.timeStart) return false;
    if (!fields.timeEnd) return false;
    return true;   
}

function resetCalenderEventFields(fields) {
    fields.taskId = null;
    fields.title = null;
    fields.desc = null;
    fields.date= null;
    fields.timeStart = null;
    fields.timeEnd = null;
    fields.repeat.interval = null;
    fields.repeat.yearly = false;
    fields.repeat.monthly = false;
    fields.repeat.weekly = false;
    fields.repeat.daily = false;
}

function editTask() {
    let fields = model.inputs.popUps.editTask;
    let targetTask = getTaskByID(fields.taskId);

    if (fields.date === null) fields.date = new Date().toISOString().substring(0, 10);
    if (!validateFields(fields)) {
        fields.errorMessage = "Fyll ut alle påkrevde felter.";
        updateView();
        return;
    } else {
        fields.errorMessage = null;
    }

    targetTask.taskId = fields.taskId;
    targetTask.title = fields.title;
    targetTask.desc = fields.desc;
    targetTask.date = fields.date;
    targetTask.timeStart = fields.timeStart;
    targetTask.timeEnd = fields.timeEnd;
    targetTask.repeat.interval = fields.repeat.interval;
    targetTask.repeat.yearly = fields.repeat.yearly;
    targetTask.repeat.monthly = fields.repeat.monthly;
    targetTask.repeat.weekly = fields.repeat.weekly;
    targetTask.repeat.daily = fields.repeat.daily;
    resetCalenderEventFields(fields);
    model.app.currentPopUp = null;
    saveModelToLocalStorage();
    updateView();
}

function deleteTask(taskId) {
    const index = model.calendar.findIndex(x => x.taskId === taskId);
    resetCalenderEventFields(model.inputs.popUps.editTask);
    model.app.currentPopUp = null;
    model.calendar.splice(index, 1);
    saveModelToLocalStorage();
    updateView();
}

function generateTaskId() {
    const ids = [];
    for (let calendarEvent of model.calendar) {
        ids.push(calendarEvent.taskId);
    }
    return Math.max(...ids) + 1;
}

function changeWeek(offset) {
    const calendar = model.inputs.mainPage.calendar;
    let targetWeek = calendar.showWeekNr + offset;
    if (targetWeek > 52) {
        calendar.showWeekNr = 1;
        calendar.weekYear++;
    } else if (targetWeek <= 0) {
        calendar.showWeekNr = 52;
        calendar.weekYear--;
    } else {
        calendar.showWeekNr = targetWeek;
    }
    updateView();
}