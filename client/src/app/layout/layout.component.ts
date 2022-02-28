import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild('mainDrawer') mainDrawer: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit(): Promise<void> {
    if (!this.route.snapshot.data['userProfile']) {
      await this.router.navigate(['/setup'], {
        state: {
          profileIsFinished: false
        }
      });
      return;
    }

    this.router.events.subscribe(() => {
      this.mainDrawer.nativeElement.checked = false;
    });
  }
}
