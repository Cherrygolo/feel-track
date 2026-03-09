import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Review } from '@features/reviews/models/review.model';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
})
export class ReviewCardComponent {

  @Input() review!: Review;

  get sentimentClass(): string {
    return this.review.type.toLowerCase();
  }
}
