import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShellModule } from './shell/shell.module';
import { MessageService } from './core/data/message.service';
import { NotificationService } from 'patternfly-ng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    ShellModule
  ],
  providers: [    MessageService    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
