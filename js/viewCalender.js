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
    const addTask = model.inputs.popUps.addTask;
    const path = 'model.inputs.popUps.addTask';
    return /* html */ `
        <h1>Legg til oppgave</h1>
        <div class="popup-grid">
            <h2>Tittel:</h2>
            <input type="text" oninput="${path}.title = this.value" value="${addTask.title || ''}">
            <h2>Beskrivelse:</h2>
            <textarea name="" id="" rows="5" oninput="${path}.desc = this.value" value="${addTask.desc || ''}"></textarea>
            <h2>Dato:</h2>
            <input type="text" class="dateField" oninput="${path}.date = this.value" value="${addTask.date || ''}">
            <h2>Fra:</h2>
            <input type="text" class="timeField" oninput="${path}.startTime = this.value" value="${addTask.startTime || ''}">
            <h2>Til:</h2>
            <input type="text" class="timeField" oninput="${path}.endTime = this.value" value="${addTask.endTime || ''}">
            <h2>Gjenta:</h2>
            <div class="radio-buttons">
                <span>
                    <input type="radio" name="repeat" id="repeat-never" checked="true">
                    <label for="repeat-never">Nei!</label>
                </span>
                <span>
                    <input type="radio" name="repeat" id="repeat-daily"
                        onchange="${path}.repeat.daily = this.checked"
                    >
                    <label for="repeat-daily">Daglig</label>
                </span>
                <span>
                    <input type="radio" name="repeat" id="repeat-weekly"
                        onchange="${path}.repeat.weekly = this.checked"
                    >
                    <label for="repeat-weekly">Ukentlig</label>
                </span>
                <span>
                    <input type="radio" name="repeat" id="repeat-monthly"
                        onchange="${path}.repeat.monthly = this.checked"
                    >
                    <label for="repeat-monthly">Månedlig</label>
                </span>
                <span>
                    <input type="radio" name="repeat" id="repeat-yearly"
                        onchange="${path}.repeat.yearly = this.checked"
                    >
                    <label for="repeat-yearly">Årlig</label>
                </span>
            </div>
            <h2>Interval</h2>
            <input type="number" value=1 min="1" oninput="${path}.repeat.interval = Math.abs(this.value)">
        </div>
        <button onclick="">Legg til</button>
    `;
}