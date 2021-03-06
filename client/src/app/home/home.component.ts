import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/authentication/supabase.service';
import { UserProfileDto } from 'src/app/user/user-profile-dto';
import { ActivatedRoute } from '@angular/router';
import { StatisticService } from 'src/app/statistic/statistic.service';
import { AbsenceService } from 'src/app/absence/absence.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  email?: string;
  profile: UserProfileDto;
  unexcused: number;
  statistic = {
    last30Days: 0,
    all: 0,
    thisYear: 0
  };

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute,
    private statisticService: StatisticService,
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    this.email = this.supabaseService.getUser()?.email;
    this.profile = this.route.snapshot.parent?.data['userProfile'];

    this.loadStatistics();
    this.checkForUnexcused();
  }

  loadStatistics() {
    this.statisticService.getHoursByDays(30).subscribe(data => this.statistic.last30Days = data.hours);
    this.statisticService.getAllHours().subscribe(data => this.statistic.all = data.hours);
    this.statisticService.getYearHours().subscribe(data => this.statistic.thisYear = data.hours);
  }

  checkForUnexcused() {
    this.absenceService.getUnexcusedHours().subscribe(data => this.unexcused = data.unexcused);
  }
}
