export class UserDocument {
    PersonalDocument: string;
    Email: string;

    constructor(personalDocument: string, email: string) {
        this.PersonalDocument = personalDocument;
        this.Email = email;
    }
}