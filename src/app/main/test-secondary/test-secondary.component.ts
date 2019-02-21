import {Component} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, UploadEvent, UploadFile} from 'ngx-file-drop';
import {HttpClient} from '@angular/common/http';
import {ImageService} from '../shared/services/image.service';

@Component({
  selector: 'max-test-secondary',
  templateUrl: './test-secondary.component.html',
  styleUrls: ['./test-secondary.component.sass']
})
export class TestSecondaryComponent {

  constructor(private http: HttpClient, private imageService: ImageService) {
  }

  public files: UploadFile[] = [];

  dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'bkahmhvk');

          this.imageService.postImage(formData)
            .subscribe((data) => {
              console.log(data);
            }, (err) => {
              console.log(err);
            });

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}






















































