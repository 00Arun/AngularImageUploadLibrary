import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialUploaderModule } from 'angular-material-image-uploader';


@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    AngularMaterialUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
