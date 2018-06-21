import { Routes } from '@angular/router';
import { UiComponent } from './ui.component';


export const UIRoutes: Routes = [
    {
        path: '',
        component: UiComponent,
        data: { breadcrumbs: true, text: 'Home' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: '../ui/dashboard/dashboard.module#DashboardModule', data: { breadcrumbs: true, text: 'Home' } },
            { path: 'maintenance', loadChildren: '../ui/maintenance/maintenance.module#MaintenanceModule', data: { breadcrumbs: true, text: 'Maintenance' } },
            { path: 'tracking', loadChildren: '../ui/tracking/tracking.module#TrackingModule', data: { breadcrumbs: true, text: 'Tracking' } }
        ]
    }
];
