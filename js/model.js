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
                date: null,
                date: null,
                timeStart: null,
                timeEnd: null,
                repeat: {
                    interval: 1,
                    yearly: false,
                    monthly: false,
                    weekly: false,
                    daily: false,
                },
                errorMessage: null,
            },
            addTask: {
                taskId: 1,
                title: null,
                desc: null,
                date: null,
                timeStart: null,
                timeEnd: null,
                repeat: {
                    interval: 1,
                    yearly: false,
                    monthly: false,
                    weekly: false,
                    daily: false,
                },
                errorMessage: null,
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
            date: "2023-10-23",
            timeStart: "09:00",
            timeEnd: "10:00",
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
            date: "2023-10-24",
            timeStart: "10:00",
            timeEnd: "11:30",
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
            date: "2023-10-25",
            timeStart: "05:00",
            timeEnd: "09:00",
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
            date: "2023-10-26",
            timeStart: "18:00",
            timeEnd: "19:00",
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
            date: "2023-10-29",
            timeStart: "08:00",
            timeEnd: "08:15",
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
            date: "2023-11-27",
            timeStart: "15:00",
            timeEnd: "17:00",
            repeat: {
                interval: 1,
                yearly: true,
                monthly: false,
                weekly: false,
                daily: false,
            },
        },
        {
            taskId: 7,
            title: "Mate unga 3 Electric beegalee",
            desc: "Må vel få no de også da",
            date: "2023-12-14",
            timeStart: "08:00",
            timeEnd: "10:00",
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