

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

const loadNewSource = (selector, src) => {
    new autoComplete({
        selector: selector,
        minChars: 1,
        source: function (term, suggest) {
            term = term.toLowerCase();
            var choices = src;
            var matches = [];
            for (let i = 0; i < choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        },
        onSelect: function (e, term, item) {
            // do something
        }
    });
}

export default {
    backgroundHelper,
    loadNewSource
}