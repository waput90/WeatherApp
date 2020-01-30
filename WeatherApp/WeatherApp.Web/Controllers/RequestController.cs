using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WeatherApp.Services.Abstract;

namespace WeatherApp.Web.Controllers
{
    [Route("request")]
    public class RequestController: Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IIpInfoService _ipInfoService;
        private readonly IOpenWeatherMapService _openWeather;
        public RequestController(
            ILogger<HomeController> logger,
            IOpenWeatherMapService openWeather,
            IIpInfoService ipInfoService)
        {
            _openWeather = openWeather;
            _ipInfoService = ipInfoService;
            _logger = logger;
        }

        
        [ValidateAntiForgeryToken]
        [HttpPost, Route("send-ip")]
        public async Task<JsonResult> SendIp(string ip)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(ip))
                {
                    string country = await _ipInfoService.GetCountry(ip);
                    if (!string.IsNullOrWhiteSpace(country))
                    {
                        return Json(new
                        {
                            succeeded = true,
                            weatherData = await _openWeather.GetWeatherInfo(country)
                        });
                    }
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                _logger.LogTrace(e.StackTrace);
            }
            return Json(new { succeeded = false });
        }

        [ValidateAntiForgeryToken]
        [HttpPost, Route("get-weather")]
        public async Task<JsonResult> GetWeather(string country)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(country))
                {
                    return Json(new
                    {
                        succeeded = true,
                        weatherData = await _openWeather.GetWeatherInfo(country)
                    });
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                _logger.LogTrace(e.StackTrace);
            }
            return Json(new { succeeded = false });
        }
    }
}