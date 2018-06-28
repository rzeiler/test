import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdService } from '../ad.service';
import { UserAuthService, AuthInfo } from '../user-auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  isFormReady: boolean = false;
  itemHasKey: boolean = false;
  ad: any;
  adForm: FormGroup;
 

  constructor(private adService: AdService, private fb: FormBuilder, public uaService: UserAuthService, private route: ActivatedRoute) {
    this.buildForm();
    uaService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        route.params.subscribe(params => {
          if (params.id !== undefined) {
            this.itemHasKey = true;
            this.ad = this.adService.editAd(params.id, user.uid);
            this.ad.valueChanges().subscribe(ad => {
              this.adForm.patchValue(ad);
            });
          } else {
            this.itemHasKey = false;
          }

        });
      }
    });
  }

  ngOnInit() {

  }

  saveAdChanges() {
    if (this.adForm.status != 'VALID') {
      console.log('form is not valid, cannot save to database')
      return
    }

    const data = this.adForm.value
    this.adService.updateAd(this.ad, data)
  }

  private buildForm() {
    this.adForm = this.fb.group({
      title: ['', Validators.required],
      rating: null,
      createdate: { value: 0, disabled: false },
      key: null
    });
    this.isFormReady = true;

  }

}
