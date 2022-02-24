import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/authentication/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email?: string;

  constructor(
    private supabaseService: SupabaseService
  ) { }

  ngOnInit(): void {
    this.email = this.supabaseService.getUser()?.email;
  }

}
