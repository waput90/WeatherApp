import request from './components/request.c.js';
import { vars } from './components/variable.c.js';
import helper from './components/helpers.c.js';

app.vm = (() => {
    "use strict";

    const init = async () => {
        // await request.getCapitalCities();
        await request.getIp();
        await request.postLocation();
        request.getCities().then(response => {
            let cities = [];
            response.forEach(c => {
                cities.push(c.capital);
            });
            // helper.loadNewSource(".changeLocation", cities);
            $(".loader-wrapper").css("display", "none");
        })
        // $('#select-state').selectize();
    }
    
    $("#locationForm").on("submit", async function(e) {
        e.preventDefault();
        //console.log("CHANGED!");
        $(".loader-wrapper").css("display", "flex");
        await request.getWeather();
        $(".loader-wrapper").css("display", "none");
    });

    const vm = {
        init: init,
        vars: vars,
    };

    return vm;

})();

$(() => {
    "use strict";
    app.vm.init();
    ko.applyBindings(app.vm);

    $(".main-wrapper").removeClass("d-none");
});