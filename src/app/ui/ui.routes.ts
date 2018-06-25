import { Routes } from '@angular/router';
import { UiComponent } from './ui.component';
import { AuthGuard } from '../core/guard/auth.guard';

export const UIRoutes: Routes = [
    {
        path: '',
        component: UiComponent,
        data: { breadcrumbs: true, text: 'Home' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', canActivate: [AuthGuard], loadChildren: '../ui/dashboard/dashboard.module#DashboardModule', data: { breadcrumbs: true, text: 'Home' } },
            { path: 'maintenance', canActivate: [AuthGuard], loadChildren: '../ui/maintenance/maintenance.module#MaintenanceModule', data: { breadcrumbs: true, text: 'Maintenance' } },
            { path: 'tracking', canActivate: [AuthGuard], loadChildren: '../ui/tracking/tracking.module#TrackingModule', data: { breadcrumbs: true, text: 'Tracking' } },
            { path: 'user', loadChildren: '../ui/user/user.module#UserModule', data: { breadcrumbs: true, text: 'User' } }
        ]
    }
];
