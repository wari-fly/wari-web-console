import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './data/message.service';
import { CommentService } from './data/comment.service';
import { InfoStatusCardModule, EmptyStateModule, NavigationModule, ToastNotificationListModule, TableModule, NotificationService, CardModule } from 'patternfly-ng';

import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { BsDropdownModule } from 'ngx-bootstrap';


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
  ],
  declarations: [],
  providers: [MessageService, NotificationService, CommentService],
  exports: [McBreadcrumbsModule, NavigationModule, ToastNotificationListModule, EmptyStateModule, TableModule, InfoStatusCardModule, BsDropdownModule, CardModule]
})
export class CoreModule { }
