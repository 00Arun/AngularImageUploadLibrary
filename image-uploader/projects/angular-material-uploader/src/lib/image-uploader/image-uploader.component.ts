import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgImageCropperComponent } from '../ng-image-cropper/ng-image-cropper.component';
import { DialogService } from '../../_services/dialog.service';
import { AlertService } from '../../_services/alert.service';



@Component({
  selector: 'app-angular-material-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [DialogService]
})
export class ImageUploaderComponent implements OnInit {
  urlsDetails = [];
  @ViewChild("uploader") uploadInput: ElementRef;
  @Output() imageDetails = new EventEmitter<any[]>();
  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    public dialogService: DialogService
  ) {
  }
  ngOnInit(): void {
  }
  public UploadFile(files) {
    let imgae = files.target.files[0];
    let IsValidUpload = false;
    let StatusMessage: string;
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileItem = imgae.size / 1024 / 1024;
    const FileExt = imgae.type.split("/")[1];
    for (let i = 0; i < allowedExtensions.length; i++) {
      if (FileExt === allowedExtensions[i]) {
        IsValidUpload = true;
        if (fileItem > 5) {
          StatusMessage = "File size should be less than 5 MB.";
          IsValidUpload = false;
        }
        break;
      } else {
        StatusMessage = "OOps!! Only jpg, jpeg and png files are allowed.";
        IsValidUpload = false;
      }
    }
    if (IsValidUpload === false) {
      this.alertService.showWarning("", StatusMessage);
    } else {
      const dialogRef = this.dialog.open(NgImageCropperComponent, {
        width: "590px",
        height: "484px",
        data: files,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.event != 'close') {
          this.urlsDetails.push({
            Url: result.data.base64,
            DisplayName: result.data.name,
            OriginalImage: result.data.Image
          });
          this.imageDetails.emit(this.urlsDetails);
        } else {
          this.uploadInput.nativeElement.value = ''
        }
      });
    }
  }
  public dropFiles(event): void {
    if (event.dataTransfer) {
      if (event.dataTransfer.types[0] === "Files") {
        let inputMarkup = {
          target: {
            files: event.dataTransfer.files
          }
        }
        this.UploadFile(inputMarkup);
      } else {
        this.alertService.showError("", "OOps!! something goes wrong");
        return;
      }
    }
  }
  public ondragover(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }
  public ondrop(event): void {
    event.stopPropagation();
    event.preventDefault();
    this.dropFiles(event);
  }
  public onDeleteCall(name: string, index: number) {
    this.dialogService
      .openConfirmDialog("Are you sure you want delete this image?").afterClosed()
      .subscribe(res => {      
        if (res) {
          if (index !== -1) {
            this.uploadInput.nativeElement.value = ''
            this.urlsDetails.splice(index, 1);
            this.imageDetails.emit(this.urlsDetails);
          }
        }
      });
  }

}
