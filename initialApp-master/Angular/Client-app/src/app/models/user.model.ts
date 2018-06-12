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

    constructor(fullname: string, email: string, birthday: Date, password: string, confirmPassword: string) {
        this.FullName = fullname;
        this.Email = email;       
        this.Birthday = birthday;
        this.Password = password;
        this.ConfirmPassword = confirmPassword;
    }
}