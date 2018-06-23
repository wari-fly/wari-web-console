import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaintenanceRoutes } from "./maintenance.routes";
import { SharedModule } from "../../shared/shared.module";
import { CoreModule } from "../../core/core.module";
import { RouterModule } from "@angular/router";
import { MaintenanceCreateComponent } from "./maintenance-create/maintenance-create.component";
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceViewComponent } from './maintenance-view/maintenance-view.component';
import { MaintenanceEditComponent } from './maintenance-edit/maintenance-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MaintenanceRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [MaintenanceListComponent, MaintenanceCreateComponent, MaintenanceViewComponent, MaintenanceEditComponent],
  exports: [MaintenanceListComponent, MaintenanceCreateComponent, MaintenanceViewComponent, MaintenanceEditComponent]
})
export class MaintenanceModule { }
