"use strict";

function getWeatherHTML() {
    let html = ''
    for (let time of model.weather) {
        html += /* html */ `
            <li>
                <span>${time.text || ''}</span>
                <img src="${getIconPath(time.symbol)}.svg" alt="">
                <span>${time.wind.speed}</span>
                <span>${time.wind.direction}</span>
                <span>${time.temp}</span>
            </li>
        `;
    }
    return /* html */`
        <h2 class="widget-header"></h2>
        <ul>
            ${html}
        </ul>
    `;
}