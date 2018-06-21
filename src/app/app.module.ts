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
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
/* db */
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

/* comp */
import { AppComponent } from './app.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

/* serv */
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

import { CashListComponent } from './cash-list/cash-list.component';
import { CashFormComponent } from './cash-form/cash-form.component';


const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'cashes/:id', component: CashListComponent },
  { path: 'category/form/:id', component: CategoryFormComponent },
  { path: 'category/form', component: CategoryFormComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    UserAuthComponent,
    ToolbarComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CashListComponent,
    CashFormComponent
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
    MatCheckboxModule,
    MatBadgeModule,
    MatTooltipModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
