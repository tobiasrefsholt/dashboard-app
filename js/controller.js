// calendar controller

window.addEventListener("load", function () {
    model.inputs.popUps.clock.timeZone = new Date().getTimezoneOffset();
    model.inputs.mainPage.calendar.showWeekNr = new Date().getWeek();
    updateView();
});

function getEventsForWeek() {
    const returnEvents = [];

    for (let calendarEvent of model.calendar) {
        const eventWeek = new Date(calendarEvent.date).getWeek();
        const displayWeek = model.inputs.mainPage.calendar.showWeekNr;
        if (eventWeek == displayWeek) {
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

// clock controller

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

function clearTimer() {
    const fullTimer = model.inputs.mainPage.timer.fullTimer
    fullTimer.hours = null;
    fullTimer.minutes = null;
    fullTimer.seconds = null;
    document.getElementById("hours").value = null;
    document.getElementById("minutes").value = null;
    document.getElementById("seconds").value = null;
    clearInterval(timerInterval);
    timerInterval = null;
    updateView();
}

function clearPopup(){
    model.app.currentPopUp = null;
    updateView();
}

function showPopupEditTask(taskId) {
    model.app.currentPopUp = "editTask";
    model.inputs.popUps.editTask.taskId = taskId;
    updateView();
}

function showPopupAddTask() {
    model.app.currentPopUp = "addTask";
    updateView();
}

function addTask() {
    const generate = generateTaskId();
    let fields = model.inputs.popUps.addTask;
    // TODO: Regn ut durationInMinutes
    // TODO: Valider input-felter
    // TODO: Feilmeldingsfunksjon
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

function editTask(){
    let fields = model.inputs.popUps.addTask;
    // TODO: Regn ut durationInMinutes
    // TODO: Valider input-felter
    // TODO: Feilmeldingsfunksjon
    if(!validateFields(fields)) return;
    model.calendar.push({
        taskId: fields.taskId,
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
    updateView();
}

function deleteTask(taskId) {
    
}

function generateTaskId() {
    const ids = [];
    for (let calendarEvent of model.calendar) {
        ids.push(calendarEvent.taskId);
    }
    return Math.max(...ids) + 1;
}