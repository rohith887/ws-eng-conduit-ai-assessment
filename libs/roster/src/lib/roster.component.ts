import { Component, OnInit } from '@angular/core';
import { RosterService, RosterDto } from './roster.service';

@Component({
  selector: 'realworld-roster',
  templateUrl: './roster.component.html',
  styleUrls: [],
  providers: [],
  imports: [],
  standalone: true,
})
export class RosterComponent implements OnInit {
  roster: RosterDto[] = [];

  constructor(private rosterService: RosterService) {}

  ngOnInit(): void {
    this.rosterService.getRoster().subscribe((data) => {
      this.roster = data;
    });
  }
}
