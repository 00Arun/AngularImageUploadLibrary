import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialUploaderModule } from 'projects/angular-material-uploader/src/lib/angular-material-uploader.module';


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
