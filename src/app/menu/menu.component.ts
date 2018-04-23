import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] = DISHES;
  selectedDish: Dish ;

  constructor() { }

  ngOnInit() {
  }

onSelect(dish: Dish) {
  this.selectedDish = dish;
}
}
