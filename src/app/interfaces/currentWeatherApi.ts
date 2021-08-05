export interface currentWeatherApi {

    LocalObservationDateTime: string,
    EpochTime: number,
    WeatherText: string,
    WeatherIcon: number,
    HasPrecipitation: boolean,
    PrecipitationType: null,
    IsDayTime: boolean,
    "Temperature": temperatureCurrentWeather

    MobileLink: string,
    Link: string

}
export interface temperatureCurrentWeather {
    Metric: metric
    Imperial: imperial
}
export interface metric {
    Value: number,
    Unit: string,
    UnitType: number
}
export interface imperial {
    Value: number,
    Unit: string,
    UnitType: number
}