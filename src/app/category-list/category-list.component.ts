import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  checkedCount: number = 0;
  orders = [
    { id: 1, name: 'Tank', checked: false },
    { id: 2, name: 'Haus', checked: false },
    { id: 3, name: 'Versicherung', checked: false },
    { id: 4, name: 'Freizeit', checked: false },
    { id: 5, name: 'Auto', checked: false }
  ];

  constructor(public db: AngularFireDatabase, public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        //alert(user.uid );
        //this.itemsRef = db.list(user.uid + '/items');
      }
    });
  }

  ngOnInit() {
  }

  onChange(event, item) {

    item.checked = !item.checked;

    this.checkedCount =
      this.orders.filter(function(item) {
        return item.checked === true;
      }).length;

  }

  onVoted(agreed: boolean) {
    alert("agreed" + agreed);
  }



}
