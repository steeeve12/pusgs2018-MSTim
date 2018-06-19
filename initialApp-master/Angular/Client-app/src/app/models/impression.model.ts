import { RegisterUser } from '../models/user.model'

export class Impression {
    Id: number;
    Comment: string;
    Grade: number;
    AppUser: RegisterUser

    constructor(id: number, comment: string, grade: number, appUser: RegisterUser) {
        this.Id = id;
        this.Comment = comment;
        this.Grade = grade;
        this.AppUser = appUser;
    }
}