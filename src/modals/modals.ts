export interface currentWeatherData {
  feelslike_c: number;
  temp_c: number;
  wind_kph: number;
  condition: { icon: string; text: string };
}

export interface locationWeatherData {
  country: string;
  name: string;
}

export interface WeatherData {
  current: currentWeatherData;
  location: locationWeatherData;
}
