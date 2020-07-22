import request from './components/request.c.js';
import { vars } from './components/variable.c.js';

app.vm = (() => {
    "use strict";

    const init = async () => {
        // await request.getCapitalCities();
        await request.getIp();
        await request.postLocation();
        $(".loader-wrapper").css("display", "none");
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