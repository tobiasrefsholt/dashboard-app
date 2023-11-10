"use strict";

function getClockHTML() {

    return /* html */ ` 
        <h1 onclick="showClockOptionsPopup()" style="cursor:pointer" id="clock" class="widget-header">${getTime()}</h1>
        <h3 onclick="showClockOptionsPopup()" style="cursor:pointer" class="widget-header">${model.timeZones[model.inputs.popUps.clock.timeZone * (-1)].short}</h3>
    `;
}

function getTime() {
    const clock = model.inputs.popUps.clock;
    let options = {
        timeZone: model.timeZones[clock.timeZone * (-1)].long,
        hour: '2-digit',
        minute: '2-digit',
        hour12: clock.in12hFormat,
    };

    if (clock.showSeconds) options.second = '2-digit';

    const formatter = new Intl.DateTimeFormat([], options);

    return formatter.format(new Date());
}

function getAlarmHTML() {
    const nextAlarm = getNextActiveAlarm();
    const muteSVG = (model.inputs.mainPage.alarm.isMuted)
        ? `<svg style="background-color: #027CB7; padding:.5rem;border-radius:50%;" onclick="toggleMuteAlarm()" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="800px" height="800px" viewBox="0 0 512 512"><path d="M448,464a15.92,15.92,0,0,1-11.31-4.69l-384-384A16,16,0,0,1,75.31,52.69l384,384A16,16,0,0,1,448,464Z"/><path d="M440.08,341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118,0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3,3,0,0,1-.82-.67C306.6,51.49,282.82,32,256,32s-50.59,19.49-59.28,48.56a3.13,3.13,0,0,1-.81.65,157.88,157.88,0,0,0-21.88,11,8,8,0,0,0-1.49,12.49L434.32,366.44a8,8,0,0,0,13.6-6.63A35.39,35.39,0,0,0,440.08,341.31Z"/><path d="M112.14,217.35c0,75.36-13.29,91.42-35.31,118-1.6,1.93-3.23,3.89-4.89,5.93a35.16,35.16,0,0,0-4.65,37.62c6.17,13,19.32,21.07,34.33,21.07H312.8a8,8,0,0,0,5.66-13.66l-192-192a8,8,0,0,0-13.62,5Q112.14,208,112.14,217.35Z"/><path d="M256,480a80.06,80.06,0,0,0,70.44-42.13A4,4,0,0,0,322.9,432H189.12a4,4,0,0,0-3.55,5.87A80.06,80.06,0,0,0,256,480Z"/></svg>`
        : `<svg style="background-color: #027CB7; padding:.5rem;border-radius:50%;" onclick="toggleMuteAlarm()" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="800px" height="800px" viewBox="0 0 512 512"><path d="M440.08,341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118,0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3,3,0,0,1-.82-.67C306.6,51.49,282.82,32,256,32s-50.59,19.49-59.28,48.56a3.13,3.13,0,0,1-.81.65c-56.38,23.21-83.78,67.74-83.78,136.14,0,75.36-13.29,91.42-35.31,118-1.6,1.93-3.23,3.89-4.89,5.93a35.16,35.16,0,0,0-4.65,37.62c6.17,13,19.32,21.07,34.33,21.07H410.5c14.94,0,28-8.06,34.19-21A35.17,35.17,0,0,0,440.08,341.31Z"/><path d="M256,480a80.06,80.06,0,0,0,70.44-42.13,4,4,0,0,0-3.54-5.87H189.12a4,4,0,0,0-3.55,5.87A80.06,80.06,0,0,0,256,480Z"/></svg>`
    ;
    return /* html */ `
        <h2 class="widget-header" style="margin-bottom: 1rem">Neste alarm i dag:</h2>
        ${nextAlarm !== null ? getAlarmRowHTML(nextAlarm) : ''}
        <div style="display: flex; justify-content: space-between;">
            <button onclick="showAlarmListPopup()">Håndter alarmer</button>
            ${muteSVG}
        </div>
    `;
}

function getTimerHTML() {
    const timerModel = model.inputs.mainPage.timer;
    const PlayOrPauseSVG = (timerModel.timerInterval == null)
        ? `<svg fill="#027CB7" onclick="toggleTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 408.221 408.221" xml:space="preserve"><g><circle cx="204.1105" cy="204.1105" r="150" fill="white" /><g><path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11    C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012    c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"/></g></g></svg>`
        : `<svg fill="#027CB7" onclick="toggleTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" style="enable-background:new 0 0 100 100;" xml:space="preserve" viewBox="11 11 78 78"><circle cx="50" cy="50" r="35" fill="white" /><g><path d="M50,11c-21.5,0-39,17.5-39,39s17.5,39,39,39s39-17.5,39-39S71.5,11,50,11z M45,63c0,1.7-1.3,3-3,3   s-3-1.3-3-3V37c0-1.7,1.3-3,3-3s3,1.3,3,3V63z M61,63c0,1.7-1.3,3-3,3s-3-1.3-3-3V37c0-1.7,1.3-3,3-3s3,1.3,3,3V63z"></path></g></svg>`
    ;
    return /* html */ `
        <div class="timerNumbers">
            <input type="number" id="hours" placeholder="00" 
                value="${timerModel.fullTimer.hours || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.hours = this.valueAsNumber"
            />
            <span>:</span>
            <input type="number" id="minutes" placeholder="00"
                value="${timerModel.fullTimer.minutes || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.minutes = this.valueAsNumber"
            />
            <span>:</span>
            <input type="number" id="seconds" placeholder="00"
                value="${timerModel.fullTimer.seconds || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.seconds = this.valueAsNumber"
            />
        </div>
        <div class="buttons">
            ${PlayOrPauseSVG}
            <svg fill="#027CB7" onclick="clearTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" style="enable-background:new 0 0 512 512;" xml:space="preserve" viewBox="22 22 468 468"><g><circle cx="256" cy="256" r="230" fill="white"></circle><path d="M421.463,90.537C377.266,46.34,318.503,22,256,22C128.462,22,22,128.462,22,256c0,127.538,106.462,234,234,234   s234-106.462,234-234C490,193.496,465.66,134.734,421.463,90.537z M360.133,330.434l-27.374-56.394l25.132-12.199l13.481,27.774   l0.652-2.696c2.456-10.151,3.702-20.554,3.702-30.919c0-71.271-57.152-129.255-127.401-129.255S120.924,184.729,120.924,256   c0,70.936,56.61,128.709,126.405,129.251v27.936C162.136,412.639,92.989,342.337,92.989,256   c0-86.675,69.684-157.191,155.337-157.191S403.662,169.325,403.662,256c0,11.46-1.254,22.974-3.727,34.223l-0.489,2.226   l23.22-13.622l14.136,24.095l-57.035,33.46C371.25,343.5,360.75,335.75,360.133,330.434z"></path></g></svg>
        </div>
    `;
}

function updateTimerView() {
    const fields = model.inputs.mainPage.timer.fullTimer;
    document.getElementById("hours").value = fields.hours || '';
    document.getElementById("minutes").value = fields.minutes || '';
    document.getElementById("seconds").value = fields.seconds || '';
}

function getPopupAlarmListHTML() {
    let html = '';
    for (let alarm of model.alarms) {
        html += getAlarmRowHTML(alarm);
    }
    return /* html */ `
        <h1>Aktive alarmer</h1>
        ${html}
        <button onclick="showAddAlarmPopup()">Ny alarm</button>
    `;
}

function getAlarmRowHTML(alarm) {
    return /* html */ `
        <div class="alarm-row" onclick="">
            <div class="toggle-button${alarm.isActive ? " checked" : ''}" onclick="toggleAlarmActive(${alarm.alarmId})"></div>
            <h1>${alarm.time}</h1>
            ${getRepeatDaysHTML(alarm.repeat)}
            <h2>${alarm.title || ''}</h2>
            <svg class="delete-button" onclick="deleteAlarm(${alarm.alarmId})" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="800px" height="800px" viewBox="0 0 32 32" version="1.1"><circle cx="16" cy="16" r="8" fill="white"></circle><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-570.000000, -1089.000000)" fill="#c60000"><path d="M591.657,1109.24 C592.048,1109.63 592.048,1110.27 591.657,1110.66 C591.267,1111.05 590.633,1111.05 590.242,1110.66 L586.006,1106.42 L581.74,1110.69 C581.346,1111.08 580.708,1111.08 580.314,1110.69 C579.921,1110.29 579.921,1109.65 580.314,1109.26 L584.58,1104.99 L580.344,1100.76 C579.953,1100.37 579.953,1099.73 580.344,1099.34 C580.733,1098.95 581.367,1098.95 581.758,1099.34 L585.994,1103.58 L590.292,1099.28 C590.686,1098.89 591.323,1098.89 591.717,1099.28 C592.11,1099.68 592.11,1100.31 591.717,1100.71 L587.42,1105.01 L591.657,1109.24 L591.657,1109.24 Z M586,1089 C577.163,1089 570,1096.16 570,1105 C570,1113.84 577.163,1121 586,1121 C594.837,1121 602,1113.84 602,1105 C602,1096.16 594.837,1089 586,1089 L586,1089 Z" id="cross-circle" sketch:type="MSShapeGroup"></path></g></g></svg>
        </div>
    `;
}

function getRepeatDaysHTML(repeat) {
    let html = '';
    for (let index = 0; index < repeat.length; index++) {
        if (repeat[index]) {
            html += /* html */ `
                <span>${model.weekdays[index]}<span>
            `;
        }
    }
    return /* html */ `<div class="alarm-repeat">${html}</div>`
}

function getActiveAlarmHTML() {
    const alarmId = model.inputs.popUps.activeAlarm.alarmId;
    if (alarmId === null) {
        return /* html */ `
            <h1>Timeren er ferdig</h1>
            <button onclick="stopAlarm()">Slå av</button>
        `;
    }
    const alarm = model.alarms.find(x => (x.alarmId == alarmId))
    return /* html */ `
        <h1>${alarm.title || ''}</h1>
        <h2>${alarm.time}</h2>
        ${getRepeatDaysHTML(alarm.repeat)}
        <button onclick="stopAlarm()">Slå av</button>
    `
}

function getPopupAddAlarmHTML() {
    return /* html */ `
        <h1>Legg til alarm</h1>
        <div class="popup-grid">
            <h2>Navn:</h2>
            <div>
                <input type="text" oninput="model.inputs.popUps.addAlarm.title = this.value" value="${model.inputs.popUps.addAlarm.title || ''}">
            </div>
            <h2>*Tid:</h2>
            <div>
                <input class="timeField" type="text" oninput="model.inputs.popUps.addAlarm.time = this.value" value="${model.inputs.popUps.addAlarm.time || ''}">
            </div>
            <h2>Gjenta:</h2>
            <div class="alarm-repeat">
                ${getAlarmRepeatHTML()}
            </div>
        </div>
        <p>${model.inputs.popUps.addAlarm.errorMessage || ''}</p>
        <button onclick="addAlarm()">Legg til</button>
    `;
}

function getAlarmRepeatHTML() {
    let html = '';
    for (const index in model.weekdays) {
        const day = model.weekdays[index];
        const repeat = model.inputs.popUps.addAlarm.repeat[index];
        html += /* html*/ `
            <div class="toggle-button${repeat ? " checked": ''}" onclick="toggleWeekdayInAlarm(${index})">
                ${day}
            </div>
        `;
    }
    return html;
}

function getPopupClockOptionsHTML() {
    const clock = model.inputs.popUps.clock;
    return /* html */ `
        <h1>Klokkeinnstillinger</h1>
        <div class="popup-grid">
            <h2>12-timers klokke:</h2>
            <div>
                <input
                    type="checkbox" name="" id=""
                    ${clock.in12hFormat ? `checked="true"` : ''}
                    onchange="model.inputs.popUps.clock.in12hFormat = !model.inputs.popUps.clock.in12hFormat"
                >
            </div>
            <h2>Vis sekunder:</h2>
            <div>
                <input type="checkbox" name="" id=""
                    ${clock.showSeconds ? `checked="true"` : ''}
                    onchange="model.inputs.popUps.clock.showSeconds = !model.inputs.popUps.clock.showSeconds"
                >
            </div>
            <h2>Tidssone:</h2>
            <select onchange="model.inputs.popUps.clock.timeZone = this.value;updateView()">
                ${getTimesoneHTML()}
            </select>
        </div>
    `;
}

function getTimesoneHTML() {
    let html = ``;
    for (let key in model.timeZones) {
        const gmt = key/60 >= 0 ? "GMT+" + key/60 : "GMT" + key/60;
        html+= /* html */ `
            <option
                ${(key * (-1)) == model.inputs.popUps.clock.timeZone ? "selected" : ''}
                value="${key * (-1)}"
                >
                ${model.timeZones[key].long} (${gmt})
            </option>
        `;
    }
    return html;
}
