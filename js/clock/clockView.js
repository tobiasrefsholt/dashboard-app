"use strict";

function getClockHTML() {

    return /* html */ ` 
        <h1 onclick="showClockPopup()" style="cursor:pointer" id="clock" class="widget-header">${getTime()}</h1>
        <h3 onclick="showClockPopup()" style="cursor:pointer">${model.timeZones[model.inputs.popUps.clock.timeZone * (-1)].short}</h3>
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

setInterval(function () {
    document.getElementById("clock").innerText = getTime();
}, 100);

function getAlarmHTML(){
    return /* html */ `
        <h2 class="widget-header">Neste alarm om:</h2>
    `;
}

function getTimerHTML(){
    const timerModel = model.inputs.mainPage.timer;
    const PlayOrPauseSVG = (timerInterval == null)
        ? `<svg onclick="toggleTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 408.221 408.221" xml:space="preserve"><g><circle cx="204.1105" cy="204.1105" r="150" fill="white" /><g><path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11    C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012    c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"/></g></g></svg>`
        : `<svg onclick="toggleTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" style="enable-background:new 0 0 100 100;" xml:space="preserve" viewBox="11 11 78 78"><circle cx="50" cy="50" r="35" fill="white" /><g><path d="M50,11c-21.5,0-39,17.5-39,39s17.5,39,39,39s39-17.5,39-39S71.5,11,50,11z M45,63c0,1.7-1.3,3-3,3   s-3-1.3-3-3V37c0-1.7,1.3-3,3-3s3,1.3,3,3V63z M61,63c0,1.7-1.3,3-3,3s-3-1.3-3-3V37c0-1.7,1.3-3,3-3s3,1.3,3,3V63z"></path></g></svg>`
    ;
    return /* html */ `
        <div class="timerNumbers">
            <input type="number" id="hours" placeholder="00" 
                value="${timerModel.fullTimer.hours || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.hours = this.value"
            />
            <span>:</span>
            <input type="number" id="minutes" placeholder="00"
                value="${timerModel.fullTimer.minutes || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.minutes = this.value"
            />
            <span>:</span>
            <input type="number" id="seconds" placeholder="00"
                value="${timerModel.fullTimer.seconds || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.seconds = this.value"
            />
        </div>
        <div class="buttons">
            ${PlayOrPauseSVG}
            <svg onclick="clearTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" style="enable-background:new 0 0 512 512;" xml:space="preserve" viewBox="22 22 468 468"><g><circle cx="256" cy="256" r="230" fill="white"></circle><path d="M421.463,90.537C377.266,46.34,318.503,22,256,22C128.462,22,22,128.462,22,256c0,127.538,106.462,234,234,234   s234-106.462,234-234C490,193.496,465.66,134.734,421.463,90.537z M360.133,330.434l-27.374-56.394l25.132-12.199l13.481,27.774   l0.652-2.696c2.456-10.151,3.702-20.554,3.702-30.919c0-71.271-57.152-129.255-127.401-129.255S120.924,184.729,120.924,256   c0,70.936,56.61,128.709,126.405,129.251v27.936C162.136,412.639,92.989,342.337,92.989,256   c0-86.675,69.684-157.191,155.337-157.191S403.662,169.325,403.662,256c0,11.46-1.254,22.974-3.727,34.223l-0.489,2.226   l23.22-13.622l14.136,24.095l-57.035,33.46C371.25,343.5,360.75,335.75,360.133,330.434z"></path></g></svg>
        </div>
    `;
}

function updateTimerView() {
    const fields = model.inputs.mainPage.timer.fullTimer;
    document.getElementById("hours").value = fields.hours || '';
    document.getElementById("minutes").value = fields.minutes || '';
    document.getElementById("seconds").value = fields.seconds || '';
}

function getPopupEditAlarmHTML() {

}

function getPopupAddAlarmHTML() {

}

function getPopupClockOptionsHTML() {
    const clock = model.inputs.popUps.clock;
    return /* html */ `
        <h1>Klokkeinnstillinger</h1>
        <div class="popup-grid">
            <h2>12-timers klokke</h2>
            <div>
                <input
                    type="checkbox" name="" id=""
                    ${clock.in12hFormat ? `checked="true"` : ''}
                    onchange="model.inputs.popUps.clock.in12hFormat = !model.inputs.popUps.clock.in12hFormat"
                >
            </div>
            <h2>Vis sekunder</h2>
            <div>
                <input type="checkbox" name="" id=""
                    ${clock.showSeconds ? `checked="true"` : ''}
                    onchange="model.inputs.popUps.clock.showSeconds = !model.inputs.popUps.clock.showSeconds"
                >
            </div>
            <h2>Tidssone</h2>
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
