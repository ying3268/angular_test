import { Component, OnInit, Inject, HostListener } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';

import { DishService } from '../services/dish.service';

import { flyInOut, expand } from '../animations/app.animation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
animations: [
  flyInOut(),
  expand()
]
})


export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getDishes().subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }


}
