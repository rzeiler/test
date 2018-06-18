import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Globals } from './global';

/* material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

/* db */
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

/* comp */
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ItemLearnComponent } from './item-learn/item-learn.component';

/* serv */
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CategoryDetailComponent } from './category-detail/category-detail.component';


const routes: Routes = [
  { path: 'all', component: ItemListComponent },
  { path: '', component: ItemLearnComponent },
  { path: 'list', component: ItemListComponent },
  { path: 'add', component: ItemDetailComponent },
  { path: 'category/:id', component: CategoryDetailComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemDetailComponent,
    UserAuthComponent,
    ItemLearnComponent,
    CategoryDetailComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
