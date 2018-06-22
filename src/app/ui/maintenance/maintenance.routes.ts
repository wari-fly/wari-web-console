import { Routes } from "@angular/router";
import { MaintenanceComponent } from "./maintenance.component";
import { MaintenanceCreateComponent } from "./maintenance-create/maintenance-create.component";

export const MaintenanceRoutes: Routes = [
  {
    path: "",
    component: MaintenanceComponent,
    data: { breadcrumbs: true, text: "Maintenance" }
  },
  {
    path: "create",
    component: MaintenanceCreateComponent,
    data: { breadcrumbs: true, text: "Create" }
  }
];
