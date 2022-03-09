import { Component, Input, OnInit } from '@angular/core';
import { Absence } from 'src/app/absence/absence';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from 'src/app/absence/absence.service';

@Component({
  selector: 'app-view-absence-picture',
  templateUrl: './view-absence-picture.component.html',
  styleUrls: ['./view-absence-picture.component.scss']
})
export class ViewAbsencePictureComponent implements OnInit {

  absence: Absence;

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
      console.log(this.absence);
    });
  }
}
