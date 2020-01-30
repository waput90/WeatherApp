export let vars = {
    ip: ko.observable(),
    country: ko.observableArray([]),
    selectedCity: ko.observable(),
    weather: ko.observableArray([]),
    weatherList: ko.pureComputed(() => vars.weather())
};
