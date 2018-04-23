import { Component, OnInit, Input} from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  @Input()
  dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
