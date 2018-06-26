import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldsStatusComponent } from './components/form-fields-status/form-fields-status.component';
import { FormFieldValidationStateDirective } from './directives/form-field-validation-state.directive';
import { FormRequiredLabelDirective } from './directives/form-required-label.directive';
import { ButtonAddComponent } from './components/button-add/button-add.component';
import { ButtonCancelComponent } from './components/button-cancel/button-cancel.component';
import { ButtonSaveComponent } from './components/button-save/button-save.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ButtonDeleteComponent } from './components/button-delete/button-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFieldValidationMessagesComponent } from './components/form-field-validation-messages/form-field-validation-messages.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { ReadFileComponent } from './components/read-file/read-file.component';
import { FileSizePipe } from './pipe/file-size.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DropZoneFileComponent } from './components/drop-zone-file/drop-zone-file.component';
import { ButtonLoginComponent } from './components/button-login/button-login.component';
import { NotifyMessageComponent } from './components/notify-message/notify-message.component';
import { ReadMultiFileComponent } from './components/read-multi-file/read-multi-file.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormFieldValidationStateDirective,
    FormRequiredLabelDirective,
    DropZoneDirective,

    FormFieldsStatusComponent,
    FormFieldValidationMessagesComponent,

    ButtonAddComponent,
    ButtonCancelComponent,
    ButtonSaveComponent,
    ButtonDeleteComponent,
    ButtonLoginComponent,
    LoadingComponent,
    ReadFileComponent,
    ReadMultiFileComponent,
    DropZoneFileComponent,
    NotifyMessageComponent,

    TruncatePipe,
    FileSizePipe

  ],
  exports: [
    FormFieldValidationStateDirective,
    FormRequiredLabelDirective,
    DropZoneDirective,

    FormFieldsStatusComponent,
    FormFieldValidationMessagesComponent,

    ButtonAddComponent,
    ButtonCancelComponent,
    ButtonSaveComponent,
    ButtonDeleteComponent,
    ButtonLoginComponent,
    LoadingComponent,
    ReadFileComponent,
    ReadMultiFileComponent,
    DropZoneFileComponent,
    NotifyMessageComponent,

    TruncatePipe,
    FileSizePipe
  ]
})
export class SharedModule { }
