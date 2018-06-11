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
    Password: string;
    Birthday: Date;

    constructor(fullname: string, email: string, password: string, birthday: Date) {
        this.FullName = fullname;
        this.Email = email;
        this.Password = password;
        this.Birthday = birthday;
    }
}