import { Routes } from '@angular/router';
import { ReviewListComponent } from './pages/review-list/review-list.component';
import { ReviewCreationFormComponent } from './pages/review-creation-form/review-creation-form.component';

export const REVIEW_ROUTES: Routes = [
  {
    path: '',
    component: ReviewListComponent
  },
  {
    path: 'new',
    component: ReviewCreationFormComponent
  }
];