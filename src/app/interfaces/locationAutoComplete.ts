export interface locationAutocomplete {
    Version: number,
    Key: string,
    Type: string,
    Rank: number,
    LocalizedName: string,
    ountry: Country
    AdministrativeArea: AdministrativeArea


}
export interface Country {
    ID: string,
    LocalizedName: string

}
export interface AdministrativeArea {
    ID: string,
    LocalizedName: string

}