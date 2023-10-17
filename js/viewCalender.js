function getCalendarHTML() {
    return /* html */`
        <h2 class="widget-header">Uke ${model.inputs.mainPage.calendar.showWeekNr || '53'}</h2>
        <div class="calender-grid">
            ${getCalendarTime()}
            <div class="calendar-event" style="grid-column: 2; grid-row: 33 / 37;">Test</div>
            <div class="calendar-event" style="grid-column: 3; grid-row: 41 / 47;">Test</div>
            <div class="calendar-event" style="grid-column: 4; grid-row: 21 / 27;">Test</div>
            <div class="calendar-event" style="grid-column: 5; grid-row: 73 / 77;">Test</div>
            <div class="calendar-event" style="grid-column: 7; grid-row: 33 / 37;">Test</div>
        </div>
    `;
}

function getCalendarTime() {
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

function getPopupTaskDetailsHTML() {

}

function getPopupEditTaskHTML() {

}

function getPopupAddTaskHTML() {

}