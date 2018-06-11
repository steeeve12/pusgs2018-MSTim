export class Branch {
    Id: number;
    Picture: string;
    Address: string;
    Latitude: number;
    Longitude: number;

    constructor(id: number, picture: string, address: string, latitude: number, longitude: number) {
        this.Id = id;
        this.Picture = picture;
        this.Address = address;
        this.Latitude = latitude;
        this.Longitude = longitude;
    }
}