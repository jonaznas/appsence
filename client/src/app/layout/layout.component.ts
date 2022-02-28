import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.mainDrawer.nativeElement.checked = false;
    });
  }
}
