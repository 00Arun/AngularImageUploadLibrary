import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
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
  IsView = false;
  urlView: string;
  @ViewChild("uploader") uploadInput: ElementRef;
  @Output() imageDetails = new EventEmitter<any[]>();
  @Input() allowImageType = [];
  @Input() sizeLimit: number;
  @Input() Iscrop: boolean;
  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    public dialogService: DialogService
  ) {
    if (this.allowImageType.length == 0) {
      this.allowImageType = ["jpg", "jpeg", "png"];
    }
    if (this.sizeLimit == 0 || this.sizeLimit < 0 || typeof (this.sizeLimit) == "undefined") {
      this.sizeLimit = 5;
    }
  }
  ngOnInit(): void {
  }
  public UploadFile(files) {
    let imgae = files.target.files[0];
    let IsValidUpload = false;
    let StatusMessage: string;
    const allowedExtensions = this.allowImageType;
    const fileItem = imgae.size / 1024 / 1024;
    const FileExt = imgae.type.split("/")[1];
    const fileType = imgae.type.split("/")[0];
    for (let i = 0; i < allowedExtensions.length; i++) {
      if (FileExt === allowedExtensions[i].trim()) {
        IsValidUpload = true;
        if (fileItem > this.sizeLimit) {
          StatusMessage = "File size should be less than " + this.sizeLimit + " MB.";
          IsValidUpload = false;
        }
        if (fileType != "image") {
          StatusMessage = "Oops! Only image files are allowed.";
          IsValidUpload = false;
        }
        break;

      } else {
        StatusMessage = "Oops!! Only " + this.allowImageType.toString() + " images are allowed.";
        IsValidUpload = false;
      }
    }
    if (IsValidUpload === false) {
      this.alertService.showWarning("", StatusMessage);
    } else {
      if (this.Iscrop) {
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
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          e.stopPropagation();
          this.urlsDetails.push({
            Url: e.target.result,
            DisplayName: imgae.name,
            OriginalImage: imgae
          });
        };
        reader.readAsDataURL(imgae);
        this.imageDetails.emit(this.urlsDetails);
      }
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
  public viewImage(url: string) {
    if (url != null) {
      console.log(url)
      this.urlView = url;
      this.IsView = true
    }
  }
  public close() {
    this.IsView = false;
    this.urlView = '';
  }
}
