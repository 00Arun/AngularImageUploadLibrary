# Angular Image Uploader with material design

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

# Installation
npm i angular-material-image-uploader

npm i @angular/cdk

npm i @angular/flex-layout

npm i @angular/material

npm i ngx-toastr

npm i ngx-image-cropper


### Dependencies 
angular/cdk

angular/flex-layout

angular/material

ngx-toastr

ngx-image-cropper


### Example usage
Add the AngularMaterialUploaderModule into app.module.ts to import image upload component.
```
import { NgModule } from '@angular/core';
import { AngularMaterialUploaderModule } from 'angular-material-image-uploader';


@NgModule({
    imports: [
        ...
        AngularMaterialUploaderModule 
    ],
    declarations: [
        ...
    ],
    exports: [
        ...
    ],
    providers: [
        ...
    ]
})
export class YourModule {
}
```

Add the element to app.component.html:
```
<app-angular-material-uploader [allowImageType]="allowedExtension" [sizeLimit]=sizeLimit [Iscrop]=isCrop
    (imageDetails)="getImageDetails($event)"></app-angular-material-uploader>

```

Add the element to app.component.ts:
```
export class AppComponent {

  /**  Configuration   **/
  imageDetails = [];
  sizeLimit = 5; //mb
  isCrop = false;
  allowedExtension =   [" jpg", " jpeg", " png"];
  getImageDetails(fileDetails) {
    this.imageDetails = fileDetails;
  }
  ...
}

```


Add style element to angular.json style section:
```
   "styles": [
              "./node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",
              "src/styles.scss",
              "node_modules/ngx-toastr/toastr.css"
            ]

```