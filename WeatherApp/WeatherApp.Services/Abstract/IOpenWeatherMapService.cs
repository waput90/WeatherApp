using System.Threading.Tasks;
using WeatherApp.Common.ViewModels;

namespace WeatherApp.Services.Abstract
{
    public interface IOpenWeatherMapService
    {
        Task<OpenWeatherMapResponseModel> GetWeatherInfo(string city);
    }
}