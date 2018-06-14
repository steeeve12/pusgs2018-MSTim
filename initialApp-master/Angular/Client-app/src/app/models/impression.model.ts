import { RegisterUser } from '../models/user.model'

export class Impression {
    Comment: string;
    Grade: number;
    AppUser: RegisterUser

    constructor(comment: string, grade: number, appUser: RegisterUser) {
        this.Comment = comment;
        this.Grade = grade;
        this.AppUser = appUser;
    }
}