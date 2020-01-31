export let vars = {
    ip: ko.observable(),
    country: ko.observableArray([]),
    location: ko.observable(),
    isFound: ko.observable(false),
    weather: ko.observableArray([]),
    weatherList: ko.pureComputed(() => vars.weather())
};
