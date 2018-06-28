import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private db: AngularFireDatabase) { }

  /// Creates an Ad, then returns as an object
  createAd(): AngularFireObject<Category> {
    const adDefault = new Category()
    const adKey = this.db.list('/ads').push(adDefault).key
    return this.db.object('/ads/' + adKey)
  }

  editAd(key: string, uid: string): AngularFireObject<Category> {
    const ob = this.db.object<Category>('/' + uid + '/category/' + key + '/');
    return ob;
  }

  /// Updates an existing Ad
  updateAd(ad: AngularFireObject<Category>, data: any) {
    return ad.update(data)
  }
}
