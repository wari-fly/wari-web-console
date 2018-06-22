import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { TrackingRoutes } from './tracking.routes';
import { TrackingListComponent } from './tracking-list/tracking-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(TrackingRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [TrackingListComponent, TrackingListComponent],
  exports: [TrackingListComponent]
})
export class TrackingModule { }
