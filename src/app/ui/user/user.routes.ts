import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const UserRoutes: Routes = [
    { path: '', component: UserListComponent,  data: { breadcrumbs: true, text: 'Usuarios' } },
    { path: 'create', component: UserFormComponent,  data: { breadcrumbs: true, text: 'Crear Usuario' } },
    { path: 'profile', component: UserProfileComponent, data: { breadcrumbs: true, text: 'Perfil Usuario' } }
];
