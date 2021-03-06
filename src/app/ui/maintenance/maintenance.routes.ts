import { Routes } from "@angular/router";
import { MaintenanceCreateComponent } from "./maintenance-create/maintenance-create.component";
import { MaintenanceListComponent } from "./maintenance-list/maintenance-list.component";
import { MaintenanceViewComponent } from "./maintenance-view/maintenance-view.component";
import { MaintenanceEditComponent } from "./maintenance-edit/maintenance-edit.component";

export const MaintenanceRoutes: Routes = [
  {
    path: "",
    component: MaintenanceListComponent,
    data: { breadcrumbs: true, text: "Wari" }
  },
  {
    path: "create",
    component: MaintenanceCreateComponent,
    data: { breadcrumbs: true, text: "Nuevo Registro" }
  },
  {
    path: "view/:key",
    component: MaintenanceViewComponent,
    data: { breadcrumbs: true, text: "Vesualizacion Registro" }
  },
  {
    path: "edit/:key",
    component: MaintenanceEditComponent,
    data: { breadcrumbs: true, text: "Editar Registro" }
  }
];
