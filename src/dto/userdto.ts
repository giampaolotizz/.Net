/**
 * Classe che rappresenta il DTO di un utente dell'applicazione
 * 
 * @author Francesco, Gianni, Marco
 *
 */
export class UserDTO {

   id: number;

   login: string;

   password: string;

   email: string;

   authorities: string[] = [];

}

