import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'image-uploader';
  imageDetails = [];
  getImageDetails(event) {
    console.log(event);
  }
}
