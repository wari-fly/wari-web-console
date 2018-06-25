import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  InfoStatusCardModule,
  EmptyStateModule,
  NavigationModule,
  ToastNotificationListModule,
  TableModule,
  CardModule,
  NotificationService,
  NotificationModule,
  WizardModule,
  PaginationModule,
  ActionModule,
  ListModule,
  ToolbarModule
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

@NgModule({
  imports: [
    CommonModule,
    McBreadcrumbsModule.forRoot(),
    NavigationModule,
    ToastNotificationListModule,
    NotificationModule,
    EmptyStateModule,
    TableModule,
    InfoStatusCardModule,
    WizardModule,
    PaginationModule,
    ActionModule,
    ListModule,
    ToolbarModule,

    CardModule,
    BsDropdownModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBNDdQ2o1W2uI_QhOBacOXCtsRAK4Ku4rk",
      authDomain: "proyecto-wari.firebaseapp.com",
      databaseURL: "https://proyecto-wari.firebaseio.com",
      projectId: "proyecto-wari",
      storageBucket: "proyecto-wari.appspot.com",
      messagingSenderId: "958166775358"
    }),
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
    AuthGuard
  ],
  exports: [
    McBreadcrumbsModule,
    NavigationModule,
    ToastNotificationListModule,
    NotificationModule,
    EmptyStateModule,
    TableModule,
    WizardModule,
    PaginationModule,
    ActionModule,
    ListModule,
    ToolbarModule,
    InfoStatusCardModule,
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
