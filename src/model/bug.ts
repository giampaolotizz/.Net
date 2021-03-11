import { Project } from "./project";
import { User } from "./user";

/**
 * Classe che rappresenta un bug
 * 
 * @author Francesco, Gianni, Marco
 *
 */
export class Bug {

    id: number;

    code: String;

    state: String;

    description: String;

    data: String;

    dependenceList: String;

    project: Project;
}