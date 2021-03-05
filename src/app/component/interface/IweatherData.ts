interface ICloud{
    all: number;
}

interface IMain{
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
    temp_kf?: number;
}

interface ISys{
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

interface IWeahter{
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface IWind{
    speed: number;
    deg: number;
}

export interface IWeatherData{
    base: string;
    clouds: ICloud;
    cod: number | string;
    coord: ICord;
    dt: number;
    id: number;
    isSuccess: boolean;
    key: string;
    main: IMain;
    name: string;
    sys: ISys;
    timezone: number;
    visibility: number;
    weather: IWeahter[];
    wind: IWind;
}

interface ICord{
    lat: number;
    lon: number;
}

export interface ICity {
    id: number;
    name: string;
    coord: ICord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  }

export interface IForecastDtl{
    dt: number;
    main: IMain;
    weather: IWeahter[];
    clouds: ICloud;
    wind: IWind;
    visibility: number;
    pop: number;
    sys: any;
    dt_txt: string;
  }

export interface IWeatherForecast{
    city: ICity;
    cnt?: number;
    cod?: number | string;
    list: IForecastDtl[];
    message?: number;
}
