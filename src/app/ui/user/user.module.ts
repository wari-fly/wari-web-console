import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutes } from './user.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UserRoutes),
    SharedModule,
    CoreModule
  ],
  declarations: [UserLoginComponent, UserFormComponent, UserProfileComponent],
  exports: [UserLoginComponent, UserFormComponent, UserProfileComponent]
})
export class UserModule { }
