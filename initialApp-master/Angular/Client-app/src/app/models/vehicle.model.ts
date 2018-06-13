import { VehicleType } from "./vehicle-type.model";

export class Vehicle {
    Id: number;
    Model: string;
    Manufactor: string;
    Year: number;
    Description: string;
    PricePerHour: number;
    Unavailable: boolean;
    Images: string[];
    VehicleTypeId: number;
    Type: string;

    constructor(id: number, model: string, manufactor: string, year: number, description: string, pricePerHour: number, unavailable: boolean, images: string[], vehicleType: number, type: string) {
        this.Id = id;
        this.Model = model;
        this.Manufactor = manufactor;
        this.Year = year;
        this.Description = description;
        this.PricePerHour = pricePerHour;
        this.Unavailable = unavailable;
        this.Images = images;
        this.VehicleTypeId = vehicleType;
        this.Type = type;
    }
}