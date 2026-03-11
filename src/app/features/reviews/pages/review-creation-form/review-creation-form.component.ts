import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewCreateDto } from '@features/reviews/models/review-create.dto';
import { ReviewService } from '@features/reviews/services/review.service';

@Component({
  selector: 'app-review-creation-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './review-creation-form.component.html',
  styleUrl: './review-creation-form.component.scss',
})
export class ReviewCreationFormComponent {

  private reviewService = inject(ReviewService);
  private formBuilder = inject(FormBuilder);

  reviewForm = this.formBuilder.group({
    email: ['', { validators: [Validators.required, Validators.email] }],
    phone: ['', { validators: [Validators.pattern(/^\d{10}$/)] }],
    review: ['', { validators: [Validators.required] }]
  });

  // Signals for form submission state
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  errorMessage = '';

  submitReview() {

    this.errorMessage = '';
    if (!this.reviewForm.valid) {
      this.reviewForm.markAllAsTouched();
      return;
    } else {
      console.log(this.reviewForm.value);

      // DTO construction from form values to be sent to the backend
      const reviewDto: ReviewCreateDto = {
        text: this.reviewForm.value.review!,
        customer: {
          email: this.reviewForm.value.email!,
          phone: this.reviewForm.value.phone || undefined,
        },
      };
      console.log(reviewDto);

      this.isSubmitting.set(true);
      this.submitSuccess.set(false);
      this.submitError.set(false);

      this.reviewService.postReview(reviewDto).subscribe({
        next: (response) => {
          console.log('Review submitted successfully:', response);
          this.isSubmitting.set(false);
          this.submitSuccess.set(true);
        },
        error: (error) => {
          console.error('Error submitting review:', error);
          this.isSubmitting.set(false);
          this.submitError.set(true);
          this.errorMessage = error.userMessage ? `Erreur lors de l'envoi : ${error.userMessage}` : 'Une erreur est survenue lors de l\'envoi de votre avis.';
        }
      });
    }
  }

  get submitButtonLabel(): string {
    if (this.isSubmitting()) return 'Envoi…';
    if (this.submitError()) return 'Réessayer';
    return 'Envoyer';
  }

  get isSubmitButtonDisabled(): boolean {
    return this.reviewForm.invalid || this.isSubmitting();
  }


}
