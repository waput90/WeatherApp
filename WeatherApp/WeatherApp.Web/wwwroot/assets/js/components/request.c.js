import { vars } from "./variable.c.js";
import helper from "./helpers.c.js";

const getIp = () => {
    return new Promise((resolve) => {
        $.get("https://api.ipify.org?format=json", (res) => {
            if (typeof (res) !== 'undefined' && res != null) {
                vars.ip(res.ip);
            }
        }).done(() => {
            resolve();
        });
    });
}

const getCapitalCities = () => {
    return new Promise((resolve) => {
        $.get("https://restcountries.eu/rest/v2/all", (res) => {
            if (typeof(res) !== 'undefined' && res != null) {
                let data = vars.country();
                res.forEach(d => {
                    data.push({
                        countryName: d.name,
                        capital: d.capital
                    });
                });

                vars.country.valueHasMutated();
            }
        }).done(() => {
            resolve();
        })
    });
}

const postLocation = () => {
    return new Promise((resolve) => {
        let form = $('#locationForm');
        let token = $('input[name="__RequestVerificationToken"]', form).val();
        $.ajax({
            url: "/request/send-ip",
            method: "post",
            dataType: "json",
            data: {
                ip: vars.ip(),
                __RequestVerificationToken: token
            },
            success: (response) => {
                vars.weather.removeAll();
                let data = vars.weather();
                data.push({
                    lat: response.weatherData.coord.lat,
                    lon: response.weatherData.coord.lon,
                    weathers: ko.observableArray(response.weatherData.weather),
                    base: response.weatherData.base,
                    visibility: response.weatherData.visibility,
                    windspeed: response.weatherData.wind.speed,
                    winddeg: response.weatherData.wind.deg,
                    clouds: response.weatherData.all,
                    dt: response.weatherData.dt,
                    id: response.weatherData.id,
                    name: response.weatherData.name,
                    country: response.weatherData.sys.country,
                    sunrise: response.weatherData.sys.sunrise,
                    sunset: response.weatherData.sys.sunset,
                    humidity: response.weatherData.main.humidity,
                    tempCel: response.weatherData.main.temp,
                    tempMin: response.weatherData.main.temp_min,
                    tempMax: response.weatherData.main.temp_min,
                    sunrise: moment.unix(response.weatherData.sys.sunrise).format("hh:mm A"),
                    sunset: moment.unix(response.weatherData.sys.sunset).format("hh:mm A"),
                });
                
                vars.weather.valueHasMutated();
                
                response.weatherData.weather.forEach(i => {
                    $(".forecast-wrapper").css({            
                        "background": `url(${helper.backgroundHelper(i.main)})`,
                        "background-size": "cover",
                        "background-repeat": "no-repeat",
                    });
                });
            }
        }).done(() => {
            resolve();
        });
    });
}

const getWeather = () => {
    return new Promise((resolve) => {
        let form = $('#locationForm');
        let token = $('input[name="__RequestVerificationToken"]', form).val();
        $.ajax({
            url: "/request/get-weather",
            method: "post",
            dataType: "json",
            data: {
                country: vars.location(),
                __RequestVerificationToken: token
            },
            success: (response) => {
                vars.weather.removeAll();

                if (response.weatherData.cod == 404) {
                    // weather coordinates not found
                    $(".forecast-wrapper").css({            
                        "background": `url(../assets/img/no-weather-found.jpg)`,
                        "background-size": "contain",
                        "background-repeat": "no-repeat",
                    });
                }
                else {
                    let data = vars.weather();
                    data.push({
                        lat: response.weatherData.coord.lat,
                        lon: response.weatherData.coord.lon,
                        weathers: ko.observableArray(response.weatherData.weather),
                        base: response.weatherData.base,
                        visibility: response.weatherData.visibility,
                        windspeed: response.weatherData.wind.speed,
                        winddeg: response.weatherData.wind.deg,
                        clouds: response.weatherData.all,
                        dt: response.weatherData.dt,
                        id: response.weatherData.id,
                        name: response.weatherData.name,
                        country: response.weatherData.sys.country,
                        sunrise: response.weatherData.sys.sunrise,
                        sunset: response.weatherData.sys.sunset,
                        humidity: response.weatherData.main.humidity,
                        tempCel: response.weatherData.main.temp,
                        tempMin: response.weatherData.main.temp_min,
                        tempMax: response.weatherData.main.temp_min,
                        sunrise: moment.unix(response.weatherData.sys.sunrise).format("hh:mm A"),
                        sunset: moment.unix(response.weatherData.sys.sunset).format("hh:mm A"),
                    });
                    
                    vars.weather.valueHasMutated();
                    response.weatherData.weather.forEach(i => {
                        $(".forecast-wrapper").css({            
                            "background": `url(${helper.backgroundHelper(i.main)})`,
                            "background-size": "cover",
                            "background-repeat": "no-repeat",
                        });
                    });
                }
            }
        }).done(() => {
            resolve();
        });
    });
}

const getCities = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://restcountries.eu/rest/v2/all",
            method: "get",
            dataType: "json",
            success: data => {
                resolve(data);
            },
            error: err => {
                reject(err);
            }
        })
    })
}

export default {
    getIp,
    postLocation,
    getWeather,
    getCapitalCities,
    getCities
}