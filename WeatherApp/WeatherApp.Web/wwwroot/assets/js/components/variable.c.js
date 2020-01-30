export let vars = {
    ip: ko.observable(),
    location: ko.observable(),
    weather: ko.observableArray(),
    weatherList: ko.pureComputed(() => vars.weather())
};
