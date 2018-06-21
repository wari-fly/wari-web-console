import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenanceComponent } from './maintenance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceRoutes } from './maintenance.routes';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MaintenanceRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [MaintenanceComponent],
  exports: [MaintenanceComponent]
})
export class MaintenanceModule { }
