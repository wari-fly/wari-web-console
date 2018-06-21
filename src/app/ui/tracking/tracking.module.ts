import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { TrackingComponent } from './tracking.component';
import { TrackingRoutes } from './tracking.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(TrackingRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [TrackingComponent],
  exports: [TrackingComponent]
})
export class TrackingModule { }
