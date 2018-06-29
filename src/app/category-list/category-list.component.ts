import { Component, OnInit } from '@angular/core';
import { UserAuthService, AuthInfo } from '../user-auth.service';
import { AdService } from '../ad.service';

import { Category } from "../category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  ad: any;
  categoryItems: Category[];

  constructor(public userAuthService: UserAuthService, private adService: AdService) {

    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {

        this.ad = this.adService.listAd(user.uid);
        this.ad.snapshotChanges().subscribe(x => {
          const data = x.map(c => ({ key: c.payload.key, ...c.payload.val() }));
          this.categoryItems = data;
        });
      }
    });
  }

}
