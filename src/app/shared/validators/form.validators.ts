import { Validators } from '@angular/forms';

export class CreateTourFormValidators {
  // Validator for title field
  static titleValidator() {
    return [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
    ];
  }

  // Validator for price
  static priceValidator() {
    return [Validators.required, Validators.min(0)];
  }

  // Validator for location field
  static locationValidator() {
    return [Validators.required, Validators.maxLength(100)];
  }

  // Validator for main description field
  static mainDescriptionValidator() {
    return [Validators.required, Validators.maxLength(500)];
  }
}
