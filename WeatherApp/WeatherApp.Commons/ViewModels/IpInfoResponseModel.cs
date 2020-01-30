using System;
using Newtonsoft.Json;

namespace WeatherApp.Common.ViewModels
{
    public class IpInfoResponseModel
    {
        [JsonProperty("ip")]
        public string Ip { get; set; }

        [JsonProperty("city")]
        public string City { get; set; }

        [JsonProperty("region")]
        public string Region { get; set; }

        [JsonProperty("country")]
        public string Country { get; set; }

        [JsonProperty("loc")]
        public string Loc { get; set; }

        [JsonProperty("postal")]
        public long Postal { get; set; }

        [JsonProperty("timezone")]
        public string Timezone { get; set; }

        [JsonProperty("readme")]
        public Uri Readme { get; set; }
    }
}