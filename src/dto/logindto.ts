/**
 * Informazioni utili per effettuare il login
 * 
 * @author Francesco, Gianni, Marco
 *
 */
export class LoginDTO {

    username: string;

    password: string;

    rememberMe: boolean;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
