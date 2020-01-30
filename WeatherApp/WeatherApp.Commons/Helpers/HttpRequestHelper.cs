using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using WeatherApp.Common.Enums;

namespace WeatherApp.Common.Helpers
{
    public static class HttpRequestHelper
    {
        public static async Task<string> Request(string baseUrl, string route, string key, HttpType type)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    HttpResponseMessage response = null;

                    switch (type)
                    {
                        case HttpType.GET_IP:
                            {
                                response = await client.GetAsync($"{baseUrl}{route}");
                                break;
                            }
                        case HttpType.GET_WEATHER:
                            {
                                response = await client.GetAsync($"{baseUrl}{route}{key}");
                                break;
                            }
                    }
                    return await response.Content.ReadAsStringAsync();
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}