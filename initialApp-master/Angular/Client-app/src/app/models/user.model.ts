export class LoginUser {
    Username: string;
    Password: string;

    constructor(username: string, password: string) {
        this.Username = username;
        this.Password = password;
    }
}

export class RegisterUser {
    FullName: string;
    Email: string;   
    Birthday: Date;
    Password: string;
    ConfirmPassword: string;
    PersonalDocument: string;

    constructor(fullname: string, email: string, birthday: Date, password: string, confirmPassword: string, personalDocument: string) {
        this.FullName = fullname;
        this.Email = email;       
        this.Birthday = birthday;
        this.Password = password;
        this.ConfirmPassword = confirmPassword;
        this.PersonalDocument = personalDocument;
    }
}

export class ChangePassword {
    Email: string;
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(email:string, oldPassword: string, newPassword: string, confirmPassword: string) {
        this.Email = email;
        this.OldPassword = oldPassword;
        this.NewPassword = newPassword;
        this.ConfirmPassword = confirmPassword;
    }
}

export class AppUser{
    FullName: string;
    Email: string;   
    Birthday: Date;
    PersonalDocument: string;
    Activated: boolean;
    RentAccountId: number;

    constructor(fullname: string, email: string, birthday: Date, personalDocument: string, activated: boolean, rentAccountId: number) {
        this.FullName = fullname;
        this.Email = email;       
        this.Birthday = birthday;
        this.PersonalDocument = personalDocument;
        this.Activated = activated;
        this.RentAccountId = rentAccountId;
    }
}

export class UserRent {
    Id: string;
    Email: string;

    constructor(id: string, email: string) {
        this.Id = id;
        this.Email = email;
    }
}

export class UserDocument {
    PersonalDocument: string;
    Email: string;

    constructor(personalDocument: string, email: string) {
        this.PersonalDocument = personalDocument;
        this.Email = email;
    }
}

export class UserActivated{
    Activated: boolean;
    Email: string;

    constructor(activated: boolean, email: string) {
        this.Activated = activated;
        this.Email = email;
    }
}