import { vars } from "./variable.c.js";


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
            success: (res) => {
                console.log(res);
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
                console.log(response);
            }
        }).done(() => {
            resolve();
        });
    });
}

export default {
    getIp,
    postLocation,
    getWeather,
    getCapitalCities
}