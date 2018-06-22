import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageService } from "./data/message.service";
import {
  InfoStatusCardModule,
  EmptyStateModule,
  NavigationModule,
  ToastNotificationListModule,
  TableModule,
  NotificationService,
  CardModule
} from "patternfly-ng";

import { McBreadcrumbsModule } from "ngx-breadcrumbs";
import { BsDropdownModule } from "ngx-bootstrap";

import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FirebaseService } from "./data/firebase.service";

@NgModule({
  imports: [
    CommonModule,
    McBreadcrumbsModule.forRoot(),
    NavigationModule,
    ToastNotificationListModule,
    EmptyStateModule,
    TableModule,
    InfoStatusCardModule,
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
    AngularFireDatabaseModule
  ],
  declarations: [],
  providers: [
    MessageService,
    NotificationService,
    FirebaseService
  ],
  exports: [
    McBreadcrumbsModule,
    NavigationModule,
    ToastNotificationListModule,
    EmptyStateModule,
    TableModule,
    InfoStatusCardModule,
    BsDropdownModule,
    CardModule,
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ]
})
export class CoreModule {}
