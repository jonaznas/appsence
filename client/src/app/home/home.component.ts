import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/authentication/supabase.service';
import { UserProfileDto } from 'src/app/user/user-profile-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email?: string;
  profile: UserProfileDto;

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.email = this.supabaseService.getUser()?.email;
    this.profile = this.route.snapshot.parent?.data['userProfile'];
  }

}
