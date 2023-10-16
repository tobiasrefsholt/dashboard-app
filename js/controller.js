window.addEventListener("load", function () {
    model.inputs.popUps.clock.timeZone = new Date().getTimezoneOffset();
    updateView();
});