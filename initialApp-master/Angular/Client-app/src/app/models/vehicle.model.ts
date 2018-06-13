export class Vehicle {
    Id: number;
    Model: string;
    Manufactor: string;
    Year: Date;
    Description: string;
    PricePerHour: number;
    Unavailable: boolean;
    Images: string[];
    VehicleTypeId: string;

    constructor(id: number, model: string, manufactor: string, year: Date, description: string, pricePerHour: number, unavailable: boolean, images: string[], vehicleTypeId: string) {
        this.Id = id;
        this.Model = model;
        this.Manufactor = manufactor;
        this.Year = year;
        this.Description = description;
        this.PricePerHour = pricePerHour;
        this.Unavailable = unavailable;
        this.Images = images;
        this.VehicleTypeId = vehicleTypeId;
    }
}