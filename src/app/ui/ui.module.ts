import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UiComponent } from './ui.component';
import { UIRoutes } from './ui.routes';
import { SharedModule } from '../shared/shared.module';
import { ShellModule } from '../shell/shell.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UIRoutes),
    ShellModule,
    SharedModule
  ],
  declarations: [UiComponent],
  exports:[RouterModule]
})
export class WariUIModule { }
