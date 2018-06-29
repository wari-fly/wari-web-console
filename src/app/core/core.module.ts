import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  EmptyStateModule,
  NavigationModule,
  TableModule,
  CardModule,
  NotificationService,
  NotificationModule
} from "patternfly-ng";

import { McBreadcrumbsModule } from "ngx-breadcrumbs";
import { BsDropdownModule } from "ngx-bootstrap";

import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireFunctionsModule } from 'angularfire2/functions';
import { FirebaseService } from "./data/firebase.service";
import { PreviewService } from "./data/preview.service";
import { AuthService } from "./data/auth.service";
import { AuthGuard } from "./guard/auth.guard";
import { NotifyService } from "./data/notify.service";
import { firebaseConfig } from "./config/firebase.config";



@NgModule({
  imports: [
    CommonModule,
    McBreadcrumbsModule.forRoot(),
    NavigationModule,
    NotificationModule,
    EmptyStateModule,
    TableModule,
    CardModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule
  ],
  declarations: [],
  providers: [
    FirebaseService,
    PreviewService,
    NotificationService,
    AuthService,
    NotifyService,
    AuthGuard
  ],
  exports: [
    McBreadcrumbsModule,
    NavigationModule,
    NotificationModule,
    EmptyStateModule,
    TableModule,
    BsDropdownModule,
    CardModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule
  ]
})
export class CoreModule { }
