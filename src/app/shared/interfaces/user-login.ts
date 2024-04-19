export class UserLogin {
    usernameOrEmail: string;
    password: string;
    timeZone: string;

    constructor(usernameOrEmail: string, password: string, timeZone: string) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        this.timeZone = timeZone;
    }
}