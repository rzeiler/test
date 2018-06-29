import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService, AuthInfo } from '../user-auth.service';
import { CashService } from '../cash.service';
import { Cash } from "../cash";

@Component({
  selector: 'app-cash-list',
  templateUrl: './cash-list.component.html',
  styleUrls: ['./cash-list.component.css']
})
export class CashListComponent {

  ad: any;
  cashItems: Cash[];
  ai: AuthInfo;

  constructor(
    public userAuthService: UserAuthService,
    public cashService: CashService,
    public route: ActivatedRoute,
    public router: Router) {

    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.ai = user;
        route.params.subscribe(params => {
          this.ad = this.cashService.listAd(params.id, user.uid);
          this.ad.snapshotChanges().subscribe(x => {
            const data = x.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            //  this.cashItems = data;

            this.cashItems = data.sort((a, b) => b.createdate - a.createdate)

            //console.log();
          });
        });
      }
    });
  }
}
