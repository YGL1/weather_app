export interface headLine {

    "EffectiveDate": string,
    "EffectiveEpochDate": number,
    "Severity": 5,
    "Text": string,
    "Category": string,
    "EndDate": string,
    "EndEpochDate": 1628074800,
    "MobileLink": string,
    "Link": string

}

export interface temperature {
    "Minimum": minimum
    "Maximum": maximum

}


export interface minimum {
    "Value": number,
    "Unit": string,
    "UnitType": number
}
export interface maximum {
    "Value": number
    "Unit": string,
    "UnitType": number
}
export interface day {

    "Icon": number,
    "IconPhrase": string,
    "HasPrecipitation": boolean,
    "PrecipitationType": string,
    "PrecipitationIntensity": string
}

export interface night {
    "Icon": number,
    "IconPhrase": string,
    "HasPrecipitation": boolean

}
