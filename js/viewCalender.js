function getCalendarHTML() {
    return /* html */`
        <h2 class="widget-header">Uke ${model.inputs.mainPage.calendar.showWeekNr}</h2>
        ${getCalendarHeaderHTML()}
        <div class="calender-grid">
            ${getCalendarTimeHTML()}
            ${getEventHtml()}
        </div>
    `;
}

function getCalendarHeaderHTML() {
    return /* html */ `
        <div class="calendar-header-row">
            <span class="calendar-header"></span>
            <h2 class="calendar-header">Mandag</h2>
            <h2 class="calendar-header">Tirsdag</h2>
            <h2 class="calendar-header">Onsdag</h2>
            <h2 class="calendar-header">Torsdag</h2>
            <h2 class="calendar-header">Fredag</h2>
            <h2 class="calendar-header">Lørdag</h2>
            <h2 class="calendar-header">Søndag</h2>
        </div>
    `;
}

function getCalendarTimeHTML() {
    $html = '';
    for (let i = 0; i < 24; i++) {
        let time = '';
        if (i<10) {
            time += '0';
        }
        time += i;
        $html += /* html */ `
            <span class="calendar-time">${time}:00</span>
        `;
    }
    return $html;
}

function getEventHtml() {
    let html = '';
    const eventsForWeek = getEventsForWeek();
    for (eventIndex in eventsForWeek) {
        const calendarEvent = model.calendar[eventIndex];
        const {gridColumn, gridRowStart, gridRowEnd} = getEventPosition(calendarEvent);
        html += /* html */`
            <div 
                onclick="showEventDetails(${calendarEvent.taskId})"
                class="calendar-event"
                style="grid-column: ${gridColumn}; grid-row: ${gridRowStart} / ${gridRowEnd};">
                ${calendarEvent.title}
            </div>
        `;
    }
    return html;
}

function getEventPosition(calendarEvent) {
    const startTime = new Date(calendarEvent.startTime);
    const dayIndex = startTime.getDay();
    const minutesFromMidnight = startTime.getHours() * 60 + startTime.getMinutes();
    let gridColumn;
    let gridRowStart = 1 + Math.floor(minutesFromMidnight / 15);
    let gridRowEnd = 1 + Math.ceil((minutesFromMidnight + calendarEvent.durationInMinutes) / 15);

    if (dayIndex == 0) {
        gridColumn = 8;
    } else {
        gridColumn = dayIndex + 1;
    }

    return {gridColumn, gridRowStart, gridRowEnd};
}

function getPopupTaskDetailsHTML() {
    const currentTask = getTaskByID(model.inputs.popUps.taskDetails.taskId);
    return /* html */`
        <!-- <h1>Hello World! <br> lets do the harlem shake :D</h1> -->
        <h1>${currentTask.title}</h1>
        <div class="popup-grid">
            <h2>Tid: </h2>
            <p>${new Date(currentTask.startTime).toLocaleString("nb-NO", {dateStyle: 'long',timeStyle: 'short'})}</p>
            <h2>Varighet:</h2>
            <p>${currentTask.durationInMinutes} minutter</p>
            <h2 style="margin-top:0">Beskrivelse: </h2>
            <p style="margin-top: 0.2rem;">${currentTask.desc}</p>
        </div>
        <button>Rediger</button>
    `;
}

function getPopupEditTaskHTML() {

}

function getPopupAddTaskHTML() {

}