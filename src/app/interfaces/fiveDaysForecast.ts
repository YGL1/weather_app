import { headLine, temperature, day, night } from './helpinterfaces'
export interface fiveDaysForecast {
    "Headline": headLine,
    "DailyForecasts": dailyForecasts[]
}

export interface dailyForecasts {
    "Date": string,
    "EpochDate": number,
    "Temperature": temperature
    "Day": day
    "Night": night,
    "Sources": string[]
    "MobileLink": string,
    "Link": string
}

