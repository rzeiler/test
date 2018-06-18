import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { map, catchError } from 'rxjs/operators';

import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

import { Globals } from '../global'

export class Item {
  key: string = "";
  size: string = "";
  text: string = "";
  timestamp: number;
  isRight: boolean = false;
}

@Component({
  selector: 'app-item-learn',
  templateUrl: './item-learn.component.html',
  styleUrls: ['./item-learn.component.css']
})
export class ItemLearnComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<Item[]>;
  item = new Item();
  private myitems: Item[];
  private step = 0;
  private user: AuthInfo;

  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor(private globals: Globals, public router: Router, public db: AngularFireDatabase, public userAuthService: UserAuthService) {

    globals.ToolbarTitle = "Kategorien";

    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.user = user;
        this.itemsRef = db.list(user.uid + '/items', ref => ref.orderByChild('timestamp').limitToLast(10));
        this.items = this.itemsRef.snapshotChanges().pipe(
          map(changes => {
            this.myitems = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            this.item = this.myitems[this.step];
            return this.myitems;
          })
        );
      } else {
        this.itemsRef = null;
        this.items = null;
      }
    });
  }

  open(s) {
    this.router.navigate(['/category', 2]);
  }

  ngOnDestroy() {
    this.itemsRef = null;
    this.items = null;
  }

  ngOnInit() { }

}
