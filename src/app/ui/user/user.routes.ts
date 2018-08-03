import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { AuthGuard } from '../../core/guard/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const UserRoutes: Routes = [
    { path: '', component: UserListComponent,  data: { breadcrumbs: true, text: 'User' } },
    { path: 'create', component: UserFormComponent,  data: { breadcrumbs: true, text: 'Register' } },
    { path: 'profile', component: UserProfileComponent, data: { breadcrumbs: true, text: 'Profile' } }
];
