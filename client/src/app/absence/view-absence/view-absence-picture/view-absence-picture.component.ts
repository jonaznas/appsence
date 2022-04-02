import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/absence/absence';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from 'src/app/absence/absence.service';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-view-absence-picture',
  templateUrl: './view-absence-picture.component.html',
  styleUrls: ['./view-absence-picture.component.scss']
})
export class ViewAbsencePictureComponent implements OnInit {

  absence: Absence;
  error: string | null;
  upload: string | null;
  showDeleteConfirmation: boolean;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private absenceService: AbsenceService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const id = parseInt(<string>this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      await this.router.navigate(['/absence']);
      return;
    }

    this.absenceService.getAbsenceById(id).subscribe(absence => {
      this.absence = absence[0];
    });
  }

  async handleUpload(event: any) {
    const file = event.target.files[0];

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      await this.compressPicture(file, options);
    } catch (error) {
      this.error = 'There was an error while compressing the picture.';
    }
  }

  async compressPicture(file: File, options: any): Promise<void> {
    this.upload = 'Compressing...';
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.uploadPicture(reader.result);
      } else {
        this.error = 'The picture is invalid.';
      }
    };
  }

  uploadPicture(base64: string | null) {
    this.upload = 'Uploading...';
    this.absenceService.updateAbsence(
      this.absence.id,
      this.absence.isExcused,
      this.absence.type,
      this.absence.mustExcused,
      base64
    ).subscribe({
      next: () => {
        this.absence.picture = base64;
        this.loading = false;
        this.upload = null;
      },
      error: () => {
        this.error = 'There was an error while uploading the picture.';
        this.upload = null;
        this.loading = false;
      }
    });
  }

  deletePicture() {
    this.loading = true;
    this.uploadPicture(null);
  }
}
