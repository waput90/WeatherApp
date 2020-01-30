import request from './components/request.c.js';
import { vars } from './components/variable.c.js';

app.vm = (() => {
    "use strict";

    const init = async () => {
        console.log("Initialize");
        await request.getIp();
        //await request.postLocation();
        await request.getCapitalCities();
        $('#select-state').selectize();
    }
    
    $("#locationForm").on("submit", async function(e) {
        e.preventDefault();
        //await request.postLocation();
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
});