

const backgroundHelper = (weatherName) => {
    switch (weatherName) {
        case "Clouds":
            return '../assets/img/cloudy.gif';
        case "Clear":
            return '../assets/img/clear.gif';
        case "Tornado":
            return '../assets/img/tornado.gif';
        case "Squall":
            return '../assets/img/squall.gif';
        case "Ash":
            return '../assets/img/ash.gif';
        case "Dust":
            return '../assets/img/dust-whirl.gif';
        case "Sand":
            return '../assets/img/sand.gif';
        case "Fog":
            return '../assets/img/fog.gif';
        case "Haze":
            return '../assets/img/haze.gif';
        case "Smoke":
            return '../assets/img/smoke.gif';
        case "Mist":
            return '../assets/img/fog.gif';
        case "Snow":
            return '../assets/img/snow.gif';
        case "Rain":
            return '../assets/img/rain.gif';
        case "Drizzle":
            return '../assets/img/drizzle.gif';
        case "Thunderstorm":
            return '../assets/img/thunder.gif';
    }
}

export default {
    backgroundHelper
}