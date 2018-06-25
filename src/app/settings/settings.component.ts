import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  auth: AuthInfo;

  constructor(public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.auth = user;
      }
    });
  }

  login() {
    this.userAuthService.login();
  }

  logout() {
    this.userAuthService.logout();
    this.auth = null;
  }

  ngOnInit() {
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = function(e) {
      // you can perform an action with readed data here
      console.log(myReader.result);
    }

    myReader.readAsText(file);
  }

}
