# Angular Material Image Uploader

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

# Installation
npm i angular-material-image-uploader

### Example usage
Add the AngularMaterialUploaderModule  to the imports of the gallery component.
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
<app-angular-material-uploader></app-angular-material-uploader>
```