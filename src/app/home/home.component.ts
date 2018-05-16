import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Promotion } from '../Shared/promotion';
import { Leader } from '../Shared/leader';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
  private Leaderservice: LeaderService,
  @Inject('BaseURL') private BaseURL) {}

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish);
this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
 this.Leaderservice.getFeaturedLeader().subscribe( leader => this. leader =  leader);
}
}
