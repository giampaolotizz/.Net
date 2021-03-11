import { Project } from "../model/project";
import { User } from "../model/user";

/**
 * Classe che rappresenta il DTO di un bug
 * 
 * @author Francesco, Gianni, Marco
 *
 */
export class BugDTO {

    id: Number;

    code: String;

    state: String;

    description: String;

    date: String;

    dependenceList: String;

    user: User;

    projectId: Number;

    constructor() {
        this.code = "";
        this.state = "";
        this.description = "";
        this.date = "";
        this.dependenceList = "";
        this.projectId = -1;
    }

}