import { Routes } from "@angular/router";
import { MaintenanceCreateComponent } from "./maintenance-create/maintenance-create.component";
import { MaintenanceListComponent } from "./maintenance-list/maintenance-list.component";

export const MaintenanceRoutes: Routes = [
  {
    path: "",
    component: MaintenanceListComponent,
    data: { breadcrumbs: true, text: "Maintenance" }
  },
  {
    path: "create",
    component: MaintenanceCreateComponent,
    data: { breadcrumbs: true, text: "Create" }
  }
];
