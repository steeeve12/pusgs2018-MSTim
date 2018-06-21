import { Impression } from "./impression.model";
import { RegisterUser } from "./user.model";

export class Service {
    Id: number;
    Name: string;
    Logo: string;
    Email: string;
    Description: string;
    Approved: boolean;
    Impressions: Impression[];
    Grade: number;
    Creator: RegisterUser;

    constructor(id: number, name: string, logo: string, email: string, description: string, approved: boolean, impressions: Impression[], creator: RegisterUser) {
        this.Id = id;
        this.Name = name;
        this.Logo = logo;
        this.Email = email;
        this.Description = description;
        this.Approved = approved;
        this.Impressions = impressions;
        this.Creator = creator;
    }
}