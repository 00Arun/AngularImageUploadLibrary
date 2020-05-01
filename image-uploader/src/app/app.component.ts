import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'image-uploader';
  /**  Configuration   **/
  imageDetails = [];
  sizeLimit = 5; //mb
  isCrop = false;
  allowedExtension =   [" jpg", " jpeg", " png"];
  getImageDetails(fileDetails) {
    this.imageDetails = fileDetails;
  }
}
