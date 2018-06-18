import { Component, OnInit } from '@angular/core';
import { Globals } from '../global'
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  constructor(public globals: Globals, public router: Router) {

    globals.ToolbarBackFunction = function() {
alert("sd");
      this.router.navigate(['/']);
    }
    globals.ToolbarTitle = "Kategorie Detail";

  }

  ngOnInit() {
  }

  goBack() {
    alert("back");
  }

}
