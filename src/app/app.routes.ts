import { Routes } from '@angular/router';
import { REVIEW_ROUTES } from './features/reviews/review.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reviews',
    pathMatch: 'full'
  },
  {
    path: 'reviews',
    children: REVIEW_ROUTES
  }
];