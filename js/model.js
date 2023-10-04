"use strict";

const model = {
    app: {
        currentPopUp: null,
    },
    inputs: {
        mainPage: {
            stopwatch: {
                fullTimer: null,
                currentTime: null,
            },
            calendar: {
                showWeekNr: null,
            },
            weather: {
                location: null,
                tempType: 'celcius',
            }
        },
        popUps: {
            taskDetails: {
                taskId: null,
            },
            editTask: {
                taskId: null,
                title: null,
                desc: null,
                time: null,
                duration: null,
                repeat: null,
            },
            addTask: {
                taskId: null,
                title: null,
                desc: null,
                time: null,
                duration: null,
                repeat: null,
            },
            editAlarm: {
                alarmId: null,
                title: null,
                time: null,
                repeat: false,
                notif: null,
            },
            addAlarm: {
                alarmId: null,
                title: null,
                time: null,
                repeat: false,
                notif: null,
            },
            clock: {
                showSeconds: false,
                in12hFormat: false,
                timeZone: null,
            },
        }
    },
    calendar: [
        {
            taskId: 1,
            title: null,
            desc: null,
            time: null,
            repeat: null,
        },
    ],
    weather: [
        {
            text: null,
            symbol: "",
            wind: {
                speed: "",
                direction: "",
            },
            temp: 0,
        },
        {
            text: "1 time",
            symbol: "",
            wind: {
                speed: "",
                direction: "",
            },
            temp: 0,
        },
        {
            text: "3 timer",
            symbol: "",
            wind: {
                speed: "",
                direction: "",
            },
            temp: 0,
        },
        {
            text: "6 timer",
            symbol: "",
            wind: {
                speed: "",
                direction: "",
            },
            temp: 0,
        },
        {
            text: "12 timer",
            symbol: "",
            wind: {
                speed: "",
                direction: "",
            },
            temp: 0,
        },
    ],
    alarms: [
        {
            alarmId: 1,
            title: 'Lorem',
            time: null,
            duration: null,
            repeat: false,
            notif: null,
        },/* ... */
    ],
}