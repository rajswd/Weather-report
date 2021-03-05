
  export const CITY_WEATHER_DATA = {
    coord: {lon: 2.159, lat: 41.3888},
    weather: [{id: 801, main: 'Clouds', description: 'few clouds', icon: '02n'}],
    base: 'stations',
    main: {temp: 284.19, feels_like: 282.52, temp_min: 282.59, temp_max: 285.93, pressure: 1025, humidity: 87},
    visibility: 10000,
    wind: {speed: 2.06, deg: 320},
    clouds: {all: 20},
    dt: 1614476078,
    sys: {type: 1, id: 6398, country: 'ES', sunrise: 1614493657, sunset: 1614534030},
    timezone: 3600,
    id: 3128760,
    name: 'Barcelona',
    cod: 200};

  export const CITY_DETAIL = {
                id: 3128760,
                name: 'Barcelona',
                coord: {
                  lat: 41.3888,
                  lon: 2.159
                },
                country: 'ES',
                population: 1621537,
                timezone: 3600,
                sunrise: 1614493657,
                sunset: 1614534030
              };

  export const WEATHER_FORECAST_DTL = [{
    dt: 1614492000,
    main: {
      temp: 52.05,
      feels_like: 49.37,
      temp_min: 52.05,
      temp_max: 53.47,
      pressure: 1024,
      sea_level: 1024,
      grnd_level: 1019,
      humidity: 81,
      temp_kf: -0.79
    },
    weather: [
      {
        id: 500,
        main: 'Rain',
        description: 'light rain',
        icon: '10n'
      }
    ],
    clouds: {
      all: 34
    },
    wind: {
      speed: 3.27,
      deg: 66
    },
    visibility: 10000,
    pop: 0.21,
    rain: {
      '3h': 0.32
    },
    sys: {
      pod: 'n'
    },
    dt_txt: '2021-02-28 06:00:00'
  }];
