"use strict";

const model = {
    app: {
        currentPopUp: "addAlarm",
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
                weekYear: null,
            },
            weather: {
                location: {
                    lat: null,
                    lon: null,
                },
                error: null,
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
                isActive: null,
                repeat: [
                    false, // Mandag
                    false, // Tirsdag
                    false, // Onsdag
                    false, // Torsdag
                    false, // Fredag
                    false, // Lørdag
                    false, // Søndag
                ],
            },
            addAlarm: {
                alarmId: null,
                title: null,
                time: null,
                isActive: null,
                repeat: [
                    false, // Mandag
                    false, // Tirsdag
                    false, // Onsdag
                    false, // Torsdag
                    false, // Fredag
                    false, // Lørdag
                    false, // Søndag
                ],
            },
            clock: {
                showSeconds: true,
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
            date: "2023-11-06",
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
            date: "2023-11-07",
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
            date: "2023-11-08",
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
            date: "2023-11-09",
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
            date: "2023-11-12",
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
            date: "2024-10-27",
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
    weather: {
        precipitationToday: 0,
        forecastPerHour: [
            /* {
            text: null,
            symbol: "",
            wind: {
                speed: "",
                direction: "",
            },
            temp: 0,
        }, */
        ],
    },
    alarms: [
        {
            alarmId: 1,
            title: 'Lorem',
            time: "18:00",
            repeat: [
                false, // Mandag
                true, // Tirsdag
                true, // Onsdag
                false, // Torsdag
                false, // Fredag
                true, // Lørdag
                true, // Søndag
            ],
            isActive: true,
        },
        {
            alarmId: 2,
            title: 'Ipsum',
            time: "18:00",
            repeat: [
                false, 
                false, 
                true, 
                false, 
                false, 
                false, 
                false,
            ],
            isActive: true,
        },
        {
            alarmId: 3,
            title: 'Dolor',
            time: "18:00",
            repeat: [
                false,
                false, 
                false, 
                false,
                false, 
                false,
                false, 
            ],
            isActive: false,
        },/* ... */
    ],
    weatherSymbolKeys: {
        clearsky_day: '01d',
        clearsky_night: '01n',
        clearsky_polartwilight: '01m',
        fair_day: '02d',
        fair_night: '02n',
        fair_polartwilight: '02m',
        partlycloudy_day: '03d',
        partlycloudy_night: '03n',
        partlycloudy_polartwilight: '03m',
        cloudy: '04',
        rainshowers_day: '05d',
        rainshowers_night: '05n',
        rainshowers_polartwilight: '05m',
        rainshowersandthunder_day: '06d',
        rainshowersandthunder_night: '06n',
        rainshowersandthunder_polartwilight: '06m',
        sleetshowers_day: '07d',
        sleetshowers_night: '07n',
        sleetshowers_polartwilight: '07m',
        snowshowers_day: '08d',
        snowshowers_night: '08n',
        snowshowers_polartwilight: '08m',
        rain: '09',
        heavyrain: '10',
        heavyrainandthunder: '11',
        sleet: '12',
        snow: '13',
        snowandthunder: '14',
        fog: '15',
        sleetshowersandthunder_day: '20d',
        sleetshowersandthunder_night: '20n',
        sleetshowersandthunder_polartwilight: '20m',
        snowshowersandthunder_day: '21d',
        snowshowersandthunder_night: '21n',
        snowshowersandthunder_polartwilight: '21m',
        rainandthunder: '22',
        sleetandthunder: '23',
        lightrainshowersandthunder_day: '24d',
        lightrainshowersandthunder_night: '24n',
        lightrainshowersandthunder_polartwilight: '24m',
        heavyrainshowersandthunder_day: '25d',
        heavyrainshowersandthunder_night: '25n',
        heavyrainshowersandthunder_polartwilight: '25m',
        lightssleetshowersandthunder_day: '26d',
        lightssleetshowersandthunder_night: '26n',
        lightssleetshowersandthunder_polartwilight: '26m',
        heavysleetshowersandthunder_day: '27d',
        heavysleetshowersandthunder_night: '27n',
        heavysleetshowersandthunder_polartwilight: '27m',
        lightssnowshowersandthunder_day: '28d',
        lightssnowshowersandthunder_night: '28n',
        lightssnowshowersandthunder_polartwilight: '28m',
        heavysnowshowersandthunder_day: '29d',
        heavysnowshowersandthunder_night: '29n',
        heavysnowshowersandthunder_polartwilight: '29m',
        lightrainandthunder: '30',
        lightsleetandthunder: '31',
        heavysleetandthunder: '32',
        lightsnowandthunder: '33',
        heavysnowandthunder: '34',
        lightrainshowers_day: '40d',
        lightrainshowers_night: '40n',
        lightrainshowers_polartwilight: '40m',
        heavyrainshowers_day: '41d',
        heavyrainshowers_night: '41n',
        heavyrainshowers_polartwilight: '41m',
        lightsleetshowers_day: '42d',
        lightsleetshowers_night: '42n',
        lightsleetshowers_polartwilight: '42m',
        heavysleetshowers_day: '43d',
        heavysleetshowers_night: '43n',
        heavysleetshowers_polartwilight: '43m',
        lightsnowshowers_day: '44d',
        lightsnowshowers_night: '44n',
        lightsnowshowers_polartwilight: '44m',
        heavysnowshowers_day: '45d',
        heavysnowshowers_night: '45n',
        heavysnowshowers_polartwilight: '45m',
        lightrain: '46',
        lightsleet: '47',
        heavysleet: '48',
        lightsnow: '49',
        heavysnow: '50',
    },
    timeZones: {
        "-720": {
          "short": "NZST",
          "long": "Antarctica/South_Pole"
        },
        "-660": {
          "short": "SST",
          "long": "Pacific/Pago_Pago"
        },
        "-600": {
          "short": "TAHT",
          "long": "Pacific/Honolulu"
        },
        "-540": {
          "short": "HST",
          "long": "America/Anchorage"
        },
        "-480": {
          "short": "PST",
          "long": "America/Los_Angeles"
        },
        "-420": {
          "short": "MST",
          "long": "America/Denver"
        },
        "-360": {
          "short": "CST",
          "long": "America/Mexico_City"
        },
        "-300": {
          "short": "EST",
          "long": "America/New_York"
        },
        "-240": {
          "short": "VET",
          "long": "America/Caracas"
        },
        "-180": {
          "short": "ART",
          "long": "America/Argentina/Buenos_Aires"
        },
        "-120": {
          "short": "GST",
          "long": "Atlantic/Stanley"
        },
        "-60": {
          "short": "CVT",
          "long": "Atlantic/Azores"
        },
        "0": {
          "short": "GMT",
          "long": "Europe/London"
        },
        "60": {
          "short": "CET",
          "long": "Europe/Berlin"
        },
        "120": {
          "short": "CEST",
          "long": "Europe/Athens"
        },
        "180": {
          "short": "MSK",
          "long": "Europe/Moscow"
        },
        "240": {
          "short": "GST",
          "long": "Asia/Dubai"
        },
        "300": {
          "short": "PKT",
          "long": "Asia/Karachi"
        },
        "360": {
          "short": "ALMT",
          "long": "Asia/Almaty"
        },
        "420": {
          "short": "ICT",
          "long": "Asia/Bangkok"
        },
        "480": {
          "short": "CST",
          "long": "Asia/Shanghai"
        },
        "540": {
          "short": "JST",
          "long": "Asia/Tokyo"
        },
        "600": {
          "short": "AEST",
          "long": "Australia/Sydney"
        },
        "660": {
          "short": "HST",
          "long": "Pacific/Honiara"
        },
        "720": {
            "short": "GMT+12",
            "long": "Pacific/Fiji"
          }
    },
    weekdays: ["man", "tirs", "ons", "tors", "fre", "lør", "søn"],
}
