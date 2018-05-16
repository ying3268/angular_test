import { Component, OnInit, ViewEncapsulation, Inject } from "@angular/core";
import { MenuComponent } from "../menu/menu.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Params, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Comment } from "../shared/comment";
import { Dish } from "../shared/dish";
import { DishService } from "../services/dish.service";

import "rxjs/add/operator/switchMap";



@Component({
  selector: "app-dishdetail",
  templateUrl: "./dishdetail.component.html",
  styleUrls: ["./dishdetail.component.css"]
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishcopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  index: number;
  errMess: string;


  commentForm: FormGroup;
  comment: Comment;

  formErrors = {
    author: "",
    comment: ""
  };

  validationMessages = {
    author: {
      required: "Name is required.",
      minlength: "Name must be at least 2 characters long.",
      maxlength: "Name cannot be more than 25 characters long."
    },
    comment: {
      required: "Comments are required." }
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') private BaseURL) {

  }

  ngOnInit() {
    this.createForm();
    this.dishservice
      .getDishIds()
      .subscribe(dishIds => (this.dishIds = dishIds),
      errmess => this.errMess = <any>errmess);
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params["id"]))
      .subscribe(dish => {
        this.dish = dish;
        this.dishcopy = dish;
        this.setPrevNext(dish.id); },
        errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }
  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ["", Validators.required],
      rating: [5, Validators.required ],
    });

    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + " ";
        }
      }
    }
  }


onSubmit() {
  this.comment = this.commentForm.value;
  console.log(this.comment);
  this.comment.date = new Date().toISOString();
  this.dishcopy.comments.push(this.comment);
    this.dishcopy.save()
      .subscribe(dish => { this.dish = dish; console.log(this.dish); });

  this.commentForm.reset({
    author: "",
    comment: "",
    rating: 5,
  });



}
}
