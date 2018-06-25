import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  itemExist: boolean = false;
  category: Category = new Category();

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      titel: [this.category.titel, Validators.minLength(3)],
      rate: this.category.rate,
      timestamp: { value: this.category.timestamp, disabled: true }
    });

    this.route.params.subscribe(params => {
      if (params.id !== undefined)
        this.itemExist = true;
    });

  }

  cutItem() {

  }

  saveItem() {
    if (this.form.valid) {
      console.log('form submitted');
      alert("Thanks for submitting! Data: " + JSON.stringify(this.form.value));
    }
  }

  deleteItem() {

  }
}
