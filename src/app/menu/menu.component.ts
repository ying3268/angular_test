import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

import { DishService } from '../services/dish.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishservice: DishService,
    @Inject('baseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishes().subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }


}
