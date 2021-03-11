import {Usertype} from "../dto/usertype"

/**
 * Classe che rappresenta un utente dell'applicazione
 * 
 * @author Francesco, Gianni, Marco
 *
 */
export class User {

    id: number;

    username: string;

    password: string;
 
    usertype: Usertype;
 
    mail: string;
}