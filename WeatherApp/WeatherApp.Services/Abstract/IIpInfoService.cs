using System.Threading.Tasks;

namespace WeatherApp.Services.Abstract
{
    public interface IIpInfoService
    {
        Task<string> GetCountry(string ip);
    }
}