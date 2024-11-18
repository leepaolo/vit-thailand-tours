import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { TextAreaComponent } from '../../shared/components/ui/text-area.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-contact',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextComponent,
    ButtonComponent,
    TextAreaComponent,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  constructor() {}

  contactForm!: FormGroup;

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      adultNumber: new FormControl('', Validators.pattern('^[0-9]*$')),
      childrenNumber: new FormControl('', Validators.pattern('^[0-9]*$')),
      dateOdTour: new FormControl(''),
      message: new FormControl('', Validators.required),
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
