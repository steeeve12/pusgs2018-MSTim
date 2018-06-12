import { Impression } from "./impression.model";

export class Service {
    Id: number;
    Name: string;
    Logo: string;
    Email: string;
    Description: string;
    Approved: boolean;
    Impressions: Impression[];
    Grade: number;

    constructor(id: number, name: string, logo: string, email: string, description: string, approved: boolean, impressions: Impression[]) {
        this.Id = id;
        this.Name = name;
        this.Logo = logo;
        this.Email = email;
        this.Description = description;
        this.Approved = approved;
        this.Impressions = impressions;
    }
}