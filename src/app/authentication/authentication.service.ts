import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users = [
    {name: "sembi", password: "qwerty"}
  ];
  constructor() { }
  
  checkUserPresence(userDetails: any) {
    let isUserExist: boolean = false;
    let isUserDetailsMatch: boolean = false;
    this.users.forEach ((user) => {
      if(userDetails.name === user.name && userDetails.password === user.password) {
        isUserDetailsMatch = true;
      }
      if (userDetails.name === user.name) {
        isUserExist = true;
      }
    });
    if (isUserExist && !isUserDetailsMatch) {
      alert("Incorrect password");
    } else if (!isUserExist) {
      alert("User doesn't exist. Please sign up");
    }
    return isUserDetailsMatch;
  }

  addUser(userDetails: any) {
    this.users.push(userDetails);
  }

}
