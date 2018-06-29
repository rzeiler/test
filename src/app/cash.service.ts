import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Cash } from './cash';

@Injectable({
  providedIn: 'root'
})
export class CashService {

  constructor(private db: AngularFireDatabase) { }

  editAd(akey: string, bkey: string, uid: string): AngularFireObject<Cash> {
    const ob = this.db.object<Cash>('/' + uid + '/category/' + akey + '/cash/' + bkey + '');
    return ob;
  }

  createAd(key: string, uid: string, data: any) {
    return this.db.list('/' + uid + '/category' + key + '/cash/').push(data);
  }

  updateAd(ad: AngularFireObject<Cash>, data: any) {
    return ad.update(data)
  }

  listAd(key: string, uid: string): AngularFireList<Cash> {
    const ob = this.db.list<Cash>('/' + uid + '/category/' + key + '/cash/',
      ref => ref.orderByChild('isdeleted').equalTo(false)
    );

    return ob;
  }
}
