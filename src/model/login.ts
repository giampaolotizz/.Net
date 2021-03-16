export class Login {
    
    id: number;

    username: string;

    password: string;

    rememberMe: boolean;

    constructor(username: string, password: string) {
        this.id = -1;
        this.username = username;
        this.password = password;
    }
}