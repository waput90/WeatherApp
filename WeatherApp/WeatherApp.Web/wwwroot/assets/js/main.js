import request from './components/request.c.js';
import events from './components/events.c.js';
import { vars } from './components/variable.c.js';

app.vm = (() => {
    "use strict";

    const init = async () => {
        console.log("Initialize");
        await request.getIp();
        await request.postLocation();   
    }

    const vm = {
        init: init,
        events: events,
        vars: vars,
    };

    return vm;

})();

$(() => {
    "use strict";
    app.vm.init();
    ko.applyBindings(app.vm);

    //$("#selectize").selectize();
});