function getClockHTML() {
    return /* html */ `
        <h1 class="widget-header">Her kommer klokka</h1>
        <h4 class="widget-header">Tidssone: CEST</h4>
    `;
}

function getAlarmHTML(){
    return /* html */ `
        <h2 class="widget-header">Neste alarm om:</h2>
    `;
}

function getTimerHTML(){
    const timerModel = model.inputs.mainPage.timer;
    /* let svg = `<svg class="play" onclick="toggleTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 96 96" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><path class="st0" d="M48,6.11c11.567,0,22.04,4.689,29.621,12.27C85.201,25.96,89.89,36.433,89.89,48s-4.689,22.04-12.269,29.621  C70.04,85.201,59.567,89.89,48,89.89s-22.04-4.689-29.621-12.269C10.799,70.04,6.11,59.567,6.11,48  c0-11.567,4.689-22.04,12.27-29.621C25.96,10.799,36.433,6.11,48,6.11L48,6.11z M67.354,49.734c0.304-0.169,0.567-0.421,0.753-0.744  c0.547-0.951,0.219-2.165-0.732-2.712l-14.396-8.312l-14.23-8.216c-0.326-0.232-0.725-0.368-1.155-0.368  c-1.102,0-1.995,0.893-1.995,1.995V48v16.623h0.008c0,0.336,0.085,0.677,0.264,0.99c0.547,0.951,1.761,1.279,2.712,0.732  l14.396-8.312L67.354,49.734z"/></svg>`; */
    let svg = `<svg onclick="toggleTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 408.221 408.221" xml:space="preserve">
    <g>
        <circle cx="204.1105" cy="204.1105" r="150" fill="white" />
        <g>
            <path d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11    C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012    c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"/>
        </g>
    </g>
    </svg>`;
    if (timerInterval != null) {
        svg = `<svg onclick="toggleTimer()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" style="enable-background:new 0 0 100 100;" xml:space="preserve" viewBox="11 11 78 78">
        <circle cx="50" cy="50" r="35" fill="white" />
            <g>
                <path d="M50,11c-21.5,0-39,17.5-39,39s17.5,39,39,39s39-17.5,39-39S71.5,11,50,11z M45,63c0,1.7-1.3,3-3,3   s-3-1.3-3-3V37c0-1.7,1.3-3,3-3s3,1.3,3,3V63z M61,63c0,1.7-1.3,3-3,3s-3-1.3-3-3V37c0-1.7,1.3-3,3-3s3,1.3,3,3V63z">
                </path>
            </g>
            </svg>`;
    }
    return /* html */ `
        <div class="timerNumbers">
            <input type="number" id="hours" placeholder="00" 
                value="${timerModel.fullTimer.hours || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.hours = this.value"
            />:
            <input type="number" id="minutes" placeholder="00"
                value="${timerModel.fullTimer.minutes || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.minutes = this.value"
            />:
            <input type="number" id="seconds" placeholder="00"
                value="${timerModel.fullTimer.seconds || ''}"
                oninput="model.inputs.mainPage.timer.fullTimer.seconds = this.value"
            />
        </div>
        <div class="buttons">
            ${svg}
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

}