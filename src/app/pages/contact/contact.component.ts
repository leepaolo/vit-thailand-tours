import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IContactForm } from '../../core/models/contact-form.interface';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from '../../shared/components/ui/input-text.component';
import { ButtonComponent } from '../../shared/components/ui/button.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      adultNumber: new FormControl('', Validators.pattern('^[0-9]*$')),
      childrenNumber: new FormControl('', Validators.pattern('^[0-9]*$')),
      dateOdTour: new FormControl(''),
      message: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData: IContactForm = this.contactForm.value;
      console.log('Form submitted:', formData);
      // Additional logic for form submission (e.g., HTTP request)
    } else {
      this.contactForm.markAllAsTouched(); // Mark fields as touched to show validation errors
    }
  }
}
