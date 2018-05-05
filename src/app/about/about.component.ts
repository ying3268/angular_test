import { Component, OnInit } from '@angular/core';
import { Leader } from '../Shared/leader';

import { LeaderService } from '../services/leader.service';



@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  constructor(private leaderservice: LeaderService) {
  }

  ngOnInit() {
    this.leaderservice.getLeaders().then( leaders => this. leaders =  leaders);
  }
}
