export class Service {
    Id: number;
    Name: string;
    Logo: string;
    Email: string;
    Description: string;
    Approved: boolean;

    constructor(id: number, name: string, logo: string, email: string, description: string, approved: boolean) {
        this.Id = id;
        this.Name = name;
        this.Logo = logo;
        this.Email = email;
        this.Description = description;
        this.Approved = approved;
    }
}