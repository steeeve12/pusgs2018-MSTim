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
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(oldPassword: string, newPassword: string, confirmPassword: string) {
        this.OldPassword = oldPassword;
        this.NewPassword = newPassword;
        this.ConfirmPassword = confirmPassword;
    }
}