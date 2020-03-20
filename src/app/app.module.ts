import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthmoduleModule} from "./authmodule/authmodule.module"


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthmoduleModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
