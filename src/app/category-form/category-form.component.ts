import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../category';
import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

/* for dialog */
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Observable, Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {



  @Input() category: Category;

  form: FormGroup;
  itemExist: boolean = false;


  constructor(public db: AngularFireDatabase, public userAuthService: UserAuthService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {

        let df = db.object<Category>('/' + user.uid + '/category/' + id).valueChanges();
        df.subscribe(
          c => {


            this.form.reset({
              title: c.title,
              rate: 1,
              timestamp: { value: c.timestamp, disabled: false }
            });

            //  this.item.next({ key: c.key, title: c.title });
            console.log('set');
          }
        );
      }
    });

  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      title: ['', Validators.minLength(3)],
      rate: 0,
      timestamp: { value: 0, disabled: true }
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
