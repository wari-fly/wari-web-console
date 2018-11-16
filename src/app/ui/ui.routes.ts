import { Routes } from '@angular/router';
import { UiComponent } from './ui.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { UserLoginComponent } from './user/user-login/user-login.component';

export const UIRoutes: Routes = [
    {
        path: '',
        component: UiComponent,
        canActivate: [AuthGuard],
        data: { breadcrumbs: true, text: 'Inicio' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: '../ui/dashboard/dashboard.module#DashboardModule', data: { breadcrumbs: true, text: 'Inicio' } },
            { path: 'maintenance', loadChildren: '../ui/maintenance/maintenance.module#MaintenanceModule', data: { breadcrumbs: true, text: 'Registro de Datos' } },
            { path: 'tracking', loadChildren: '../ui/tracking/tracking.module#TrackingModule', data: { breadcrumbs: true, text: 'Localizaciones' } },
            { path: 'user', loadChildren: '../ui/user/user.module#UserModule', data: { breadcrumbs: true, text: 'Usuarios' } }
        ]
    },
    {
        path: 'login',
        component: UserLoginComponent
    },
];
