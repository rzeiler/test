import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private db: AngularFireDatabase) { }

  /// Creates an Ad, then returns as an object
  creatssdeAd(): AngularFireObject<Category> {
    const adDefault = new Category()
    const adKey = this.db.list('/ads').push(adDefault).key
    return this.db.object('/ads/' + adKey)
  }

  editAd(key: string, uid: string): AngularFireObject<Category> {
    const ob = this.db.object<Category>('/' + uid + '/category/' + key + '/');
    return ob;
  }

  createAd(uid: string, data: any) {
    return   this.db.list('/' + uid + '/category').push(data);
  }

  updateAd(ad: AngularFireObject<Category>, data: any) {
    return ad.update(data)
  }

  listAd(uid: string): AngularFireList<Category> {
    const ob = this.db.list<Category>('/' + uid + '/category/',
      ref => ref.orderByChild('isdeleted').equalTo(false)
    );

    return ob;
  }

}
