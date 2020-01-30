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
    public class IpInfoService: IIpInfoService
    {
        private readonly ILogger<IpInfoService> _logger;
        private const string BaseUrl = "https://ipinfo.io";
        public IpInfoService(
             ILogger<IpInfoService> logger)
        {
            _logger = logger;
        }

        public async Task<string> GetCountry(string ip)
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(ip))
                {
                    string request = await HttpRequestHelper.Request(BaseUrl, $"/{ip}/geo", string.Empty, HttpType.GET_IP);
                    if (!string.IsNullOrWhiteSpace(request))
                    {
                        var ipInfo = JsonConvert.DeserializeObject<IpInfoResponseModel>(request);
                        if (ipInfo != null)
                            return ipInfo.City;
                    }
                } 
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                _logger.LogTrace(e.StackTrace);
            }
            return string.Empty;
        }
    }
}