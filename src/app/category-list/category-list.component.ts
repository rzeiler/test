import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

/* for dialog */
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { Category } from "../category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  categoryItemsRef: AngularFireList<any>;
  categoryItems: Observable<Category[]>;

  constructor(public db: AngularFireDatabase, public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.categoryItemsRef = db.list('/' + user.uid + '/category/');
        this.categoryItems = this.categoryItemsRef.snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
        );
      }
    });
  }





}
