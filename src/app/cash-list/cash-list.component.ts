import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-list',
  templateUrl: './cash-list.component.html',
  styleUrls: ['./cash-list.component.css']
})
export class CashListComponent implements OnInit {

  checkedCount: number = 0;
  orders = [
    { id: 1, name: 'Tank', checked: false },
    { id: 2, name: 'Haus', checked: false },
    { id: 3, name: 'Versicherung', checked: false },
    { id: 4, name: 'Freizeit', checked: false },
    { id: 5, name: 'Auto', checked: false }
  ];

  constructor() { }

  ngOnInit() {
  }

  cutItem() { }

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
