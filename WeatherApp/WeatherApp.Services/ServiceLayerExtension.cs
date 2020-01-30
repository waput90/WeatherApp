using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using WeatherApp.Services.Abstract;
using WeatherApp.Services.Concrete;

namespace WeatherApp.Services
{
    public static class ServiceLayerExtension
    {
        public static IServiceCollection RegisterService(this IServiceCollection service)
        {
            service.TryAddTransient<IIpInfoService, IpInfoService>();
            service.TryAddTransient<IOpenWeatherMapService, OpenWeatherMapService>();
            return service;
        }
    }
}
