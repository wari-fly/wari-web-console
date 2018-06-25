import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../../core/guard/auth.guard';

export const UserRoutes: Routes = [
    { path: '', component: UserProfileComponent, canActivate: [AuthGuard], data: { breadcrumbs: true, text: 'Profile' } },
    { path: 'login', component: UserLoginComponent, data: { breadcrumbs: true, text: 'Login' } },
    { path: 'form', component: UserFormComponent, canActivate: [AuthGuard], data: { breadcrumbs: true, text: 'Form' } }
];