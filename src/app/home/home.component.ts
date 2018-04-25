import { Component, OnInit } from '@angular/core';
import { Dish } from '../Shared/dish';
import { Promotion } from '../Shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService) {}

  ngOnInit() {
  this.dish = this.dishservice.getFeaturedDish();
  this.promotion = this.promotionservice.getFeaturedPromotion();
  }
}
