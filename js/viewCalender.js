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
    for (let calendarEvent of eventsForWeek) {
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
    const startTime = new Date(calendarEvent.date+"T"+calendarEvent.timeStart);
    const endTime = new Date(calendarEvent.date+"T"+calendarEvent.timeEnd);
    const dayIndex = startTime.getDay();
    const startTimeInMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endTimeInMinutes = endTime.getHours() * 60 + endTime.getMinutes();
    const durationInMinutes = endTimeInMinutes - startTimeInMinutes;
    let gridColumn;
    let gridRowStart = 1 + Math.floor(startTimeInMinutes / 15);
    let gridRowEnd = 1 + Math.ceil((startTimeInMinutes + durationInMinutes) / 15);

    if (dayIndex == 0) {
        gridColumn = 8;
    } else {
        gridColumn = dayIndex + 1;
    }

    return {gridColumn, gridRowStart, gridRowEnd};
}

function getPopupTaskDetailsHTML() {
    const currentTask = getTaskByID(model.inputs.popUps.taskDetails.taskId);
    console.log(currentTask);
    return /* html */`
        <!-- <h1>Hello World! <br> lets do the harlem shake :D</h1> -->
        <h1>${currentTask.title}</h1>
        <div class="popup-grid">
            <h2>Tid: </h2>
            <p>
                ${new Date(currentTask.date + "T" + currentTask.timeStart).toLocaleString("nb-NO", {dateStyle: 'long'})}
                <br />
                ${new Date(currentTask.date + "T" + currentTask.timeStart).toLocaleString("nb-NO", {timeStyle: 'short'})}
                -
                ${new Date(currentTask.date + "T" + currentTask.timeEnd).toLocaleString("nb-NO", {timeStyle: 'short'})}
            </p>
            <h2 style="margin-top:0">Beskrivelse: </h2>
            <p style="margin-top: 0.2rem;">${currentTask.desc}</p>
        </div>
        <div>
            <button onclick="showPopupEditTask(${currentTask.taskId})">Rediger</button>
            <button onclick="deleteTask(${currentTask.taskId})">Slett</button>
        </div>
    `;
}

function getPopupEditTaskHTML() {
    const editTask = model.inputs.popUps.editTask;
    const path = 'model.inputs.popUps.editTask';
    return /* html */ `
        <h1>Rediger oppgave</h1>
        <div class="popup-grid">
            <h2>*Tittel:</h2>
            <input type="text" oninput="${path}.title = this.value" value="${editTask.title || ''}">
            <h2>Beskrivelse:</h2>
            <textarea name="" id="" rows="5" oninput="${path}.desc = this.value" value="${editTask.desc || ''}"></textarea>
            <h2>*Dato:</h2>
            <input type="text" class="dateField" oninput="${path}.date = this.value" value="${editTask.date || new Date().toISOString().substring(0, 10)}">
            <h2>*Fra:</h2>
            <input type="text" class="timeField" oninput="${path}.timeStart = this.value" value="${editTask.timeStart || ''}">
            <h2>*Til:</h2>
            <input type="text" class="timeField" oninput="${path}.timeEnd = this.value" value="${editTask.timeEnd || ''}">
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
        <p>${addTask.errorMessage || ''}</p>
        <button onclick="editTask()">Endre</button>
    `;
}

function getPopupAddTaskHTML() {
    const addTask = model.inputs.popUps.addTask;
    const path = 'model.inputs.popUps.addTask';
    return /* html */ `
        <h1>Legg til oppgave</h1>
        <div class="popup-grid">
            <h2>*Tittel:</h2>
            <input type="text" oninput="${path}.title = this.value" value="${addTask.title || ''}">
            <h2>Beskrivelse:</h2>
            <textarea name="" id="" rows="5" oninput="${path}.desc = this.value" value="${addTask.desc || ''}"></textarea>
            <h2>*Dato:</h2>
            <input type="text" class="dateField" oninput="${path}.date = this.value" value="${addTask.date || new Date().toISOString().substring(0, 10)}">
            <h2>*Fra:</h2>
            <input type="text" class="timeField" oninput="${path}.timeStart = this.value" value="${addTask.timeStart || ''}">
            <h2>*Til:</h2>
            <input type="text" class="timeField" oninput="${path}.timeEnd = this.value" value="${addTask.timeEnd || ''}">
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
        <p>${addTask.errorMessage || ''}</p>
        <button onclick="addTask()">Legg til</button>
    `;
}

function initDatePicker() {
    flatpickr(".dateField", {});
    flatpickr(".timeField", {
        enableTime: true,
        noCalendar: true,
        time_24hr: true,
    });
}