"use strict";

function getCalendarHTML() {
    const showWeekNumber = model.inputs.mainPage.calendar.showWeekNr;
    const showWeekYear = model.inputs.mainPage.calendar.weekYear;
    return /* html */`
        <div class="week-header">
            <button onclick="changeWeek(-1)"><</button>
            <h2 class="widget-header">Uke ${showWeekNumber}, ${showWeekYear}</h2>
            <button onclick="changeWeek(1)">></button>
        </div>
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
            <span class="calendar-header" style="display:flex;align-items:center;justify-content:center;">
                <svg onclick="showPopupAddTask()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="800px" height="800px" viewBox="0 0 32 32" version="1.1"><circle cx="16" cy="16" r="8" fill="white"></circle><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-466.000000, -1089.000000)" fill="#027CB7"><path d="M488,1106 L483,1106 L483,1111 C483,1111.55 482.553,1112 482,1112 C481.447,1112 481,1111.55 481,1111 L481,1106 L476,1106 C475.447,1106 475,1105.55 475,1105 C475,1104.45 475.447,1104 476,1104 L481,1104 L481,1099 C481,1098.45 481.447,1098 482,1098 C482.553,1098 483,1098.45 483,1099 L483,1104 L488,1104 C488.553,1104 489,1104.45 489,1105 C489,1105.55 488.553,1106 488,1106 L488,1106 Z M482,1089 C473.163,1089 466,1096.16 466,1105 C466,1113.84 473.163,1121 482,1121 C490.837,1121 498,1113.84 498,1105 C498,1096.16 490.837,1089 482,1089 L482,1089 Z" id="plus-circle" sketch:type="MSShapeGroup"></path></g></g></svg>
            </span>
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
    let html = '';
    for (let i = 0; i < 24; i++) {
        let time = '';
        if (i<10) {
            time += '0';
        }
        time += i;
        html += /* html */ `
            <span class="calendar-time">${time}:00</span>
        `;
    }
    return html;
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
                <span>${calendarEvent.title}</span>
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
            <textarea name="" id="" rows="5" oninput="${path}.desc = this.value">${editTask.desc || ''}</textarea>
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
            <h2>Interval:</h2>
            <input type="number" value=1 min="1" oninput="${path}.repeat.interval = Math.abs(this.value)">
        </div>
        <p>${editTask.errorMessage || ''}</p>
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
            <textarea name="" id="" rows="5" oninput="${path}.desc = this.value">${addTask.desc || ''}</textarea>
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
            <h2>Interval:</h2>
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