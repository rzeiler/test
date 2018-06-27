import { Component, OnInit, Inject } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
/* for dialog */
import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
  selector: 'import.component',
  templateUrl: 'import.component.html',
})
export class ImportComponent {

  itemsRef: AngularFireList<any>;
  title: string = "Daten überschreiben?";
  Info: string = "...";
  progressBarValue: number = 0;
  public auth: AuthInfo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public db: AngularFireDatabase, public userAuthService: UserAuthService) {

    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.auth = user;
        this.itemsRef = db.list('/' + user.uid + '/category/')
      }
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var self = this;
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    this.title = "Daten überschreiben.";

    myReader.onloadend = function(e) {
      var jsonObject: any = JSON.parse(myReader.result);
      var maxLength = jsonObject.length;
      var step = 100 / maxLength;
      const promise = self.itemsRef.remove();
      promise.then(_ => {
        jsonObject.forEach(element => {
          /*
          title: "Freizeit", createdate: 1180303200000, isdeleted: 0, user: "rze", rating: 1
          */
          self.itemsRef.push({
            title: element.title,
            createdate: element.createdate,
            rating: element.rating,
            user: element.user,
            cash: [],
            checked: false
          }).then((item) => {
            /* set title */
            self.Info = element.title;
            /* var */
            let key = item.key, currentCashCount = 0;
            let cashLength = element.cash.length;
            /* loop */
            element.cash.forEach(cash => {
              /*
              "content":"Volbeat Konzert in der Waldbühne ","createdate":1503525600000,"isdeleted":0,"repeat":0,"total":20,"iscloned":0
              */
              self.db.list('/' + self.auth.uid + '/category/' + key + '/cash/').push({
                content: cash.content,
                createdate: cash.createdate,
                repeat: cash.repeat,
                total: cash.total,
                iscloned: cash.iscloned,
                checked: false
              }).then((item) => {
                currentCashCount++;
                if (cashLength == currentCashCount)
                  self.progressBarValue += step;
                let key = item.key;
                self.Info = cash.content;
              });
            });
          });
        });
      }).catch(err => {
        console.log(err, 'You dont have access!')
        self.title = "Fehler!";
      });
    }
    myReader.readAsText(file);
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public auth: AuthInfo;

  constructor(public userAuthService: UserAuthService, public dialog: MatDialog) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.auth = user;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ImportComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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



}
