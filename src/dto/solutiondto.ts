import { Bug } from "../model/bug";
import { User } from "../model/user";

/**
 * Classe che rappresenta il DTO di una soluzione ad un bug
 * 
 * @author Francesco, Gianni, Marco
 *
 */
export class SolutionDTO {

    id: number;

    solution: String;

    bugId: number;

    
  constructor(){
    this.solution = "";
  }
}