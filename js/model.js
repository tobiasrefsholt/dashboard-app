"use strict";

const model = {
    app: {
        currentPopUp: null,
    },
    inputs: {
        mainPage: {
            timer: {
                fullTimer: {
                    hours: null,
                    minutes: null,
                    seconds: null
                },
                countDownDate: null,
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
                startTime: null,
                durationInMinutes: null,
                repeat: null,
            },
            addTask: {
                taskId: null,
                title: null,
                desc: null,
                startTime: null,
                durationInMinutes: null,
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
        /* Datoformat: 2000-10-31T01:30 */
        {
            taskId: 1,
            title: "Lufte hunden",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id magna quis tellus ultrices ultrices at nec sem. Phasellus sed pulvinar lectus. Donec sollicitudin libero erat, nec suscipit lacus porta sed. Phasellus purus tellus, fermentum sit amet aliquet at, feugiat id enim.",
            startTime: "2023-10-23T08:00",
            durationInMinutes: 60,
            repeat: {
                interval: 1,
                yearly: false,
                monthly: false,
                weekly: false,
                daily: true,
            },
        },
        {
            taskId: 2,
            title: "Lufte hunder",
            desc: "Jo flere hunder jo bedre",
            startTime: "2023-10-24T10:00",
            durationInMinutes: 90,
            repeat: {
                interval: 1,
                yearly: false,
                monthly: false,
                weekly: false,
                daily: true,
            },
        },
        {
            taskId: 3,
            title: "Lufte katter",
            desc: "Katten trenger en tur ut den og sjø",
            startTime: "2023-10-25T05:00",
            durationInMinutes: 90,
            repeat: {
                interval: 3,
                yearly: false,
                monthly: false,
                weekly: false,
                daily: true,
            },
        },
        {
            taskId: 4,
            title: "Vanne hunden",
            desc: "Våt bikkje = god lukt?",
            startTime: "2023-10-26T18:00",
            durationInMinutes: 60,
            repeat: {
                interval: 1,
                yearly: false,
                monthly: true,
                weekly: false,
                daily: false,
            },
        },
        {
            taskId: 5,
            title: "Mate unga",
            desc: "Må vel få no de også da",
            startTime: "2023-10-29T08:00",
            durationInMinutes: 15,
            repeat: {
                interval: 1,
                yearly: true,
                monthly: false,
                weekly: false,
                daily: false,
            },
        },
        {
            taskId: 6,
            title: "Mate unga 2 Electric boogaloo",
            desc: "Må vel få no de også da",
            startTime: "2023-11-27T08:00",
            durationInMinutes: 15,
            repeat: {
                interval: 1,
                yearly: true,
                monthly: false,
                weekly: false,
                daily: false,
            },
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