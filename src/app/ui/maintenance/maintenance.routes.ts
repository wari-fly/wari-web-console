import { Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance.component';

export const MaintenanceRoutes: Routes = [
    { path: '', component: MaintenanceComponent, data: { breadcrumbs: true, text: 'Maintenance' } }
];
