using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WeatherApp.Common.Enums;
using WeatherApp.Common.Helpers;
using WeatherApp.Common.ViewModels;
using WeatherApp.Services.Abstract;

namespace WeatherApp.Services.Concrete
{
    public class OpenWeatherMapService : IOpenWeatherMapService
    {
        private readonly ILogger<IpInfoService> _logger;
        private const string appId = "435c3df98cdd45e22d80b5b055040e33";
        private const string BaseUrl = "https://api.openweathermap.org";

        public OpenWeatherMapService(
            ILogger<IpInfoService> logger)
        {
            _logger = logger;
        }

        public async Task<OpenWeatherMapResponseModel> GetWeatherInfo(string city)
        {
            try
            {
                string request = await HttpRequestHelper.Request(BaseUrl, $"/data/2.5/weather?q={city}&appid=",appId, HttpType.GET_WEATHER);
                if (!string.IsNullOrWhiteSpace(request))
                {
                    var openWeather = JsonConvert.DeserializeObject<OpenWeatherMapResponseModel>(request);
                    if (openWeather != null)
                        return openWeather;
                }
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                _logger.LogTrace(e.StackTrace);
            }
            return null;
        }
    }
}