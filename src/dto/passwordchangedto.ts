export class PasswordChangeDTO {

    currentPassword : String;
    newPassword : String;


    constructor(current : String, newP : String){
        this.currentPassword = current;
        this.newPassword = newP;
      }

}