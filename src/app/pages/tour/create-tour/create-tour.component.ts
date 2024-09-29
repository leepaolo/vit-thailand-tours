import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/ui/input-text/input-text.component';
import { TourQueryService } from '../../../core/services/tour-query.service';
import { Subscription } from 'rxjs';
import { ITour } from '../../../core/models/tour.interface';

@Component({
  selector: 'app-create-tour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextComponent],
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.css',
})
export class CreateTourComponent implements OnInit, OnDestroy {
  private destroy$ = new Subscription();
  tourForm!: FormGroup;

  // Existing fields
  tourActiveField: boolean = true;
  titleField: string = 'Title of the tour';
  mainDescriptionField: string = 'Description of the tour';
  tourStepOneField: string = 'Step 1 description';
  tourStepTwoField: string = 'Step 2 description';
  tourPriceAdultField: number | null = null;
  tourPriceChildField: number | null = null;
  tourLocationField: string = 'Default Location';
  tourTypeField: string[] = ['Halfday', 'Fullday'];
  tourLanguageField: string[] = ['English', 'Italian'];
  tourStartAtField: string = '10:00 AM';
  tourFinishAtField: string = '2:00 PM';

  constructor(private fb: FormBuilder, private tourQuery: TourQueryService) {}

  ngOnInit(): void {
    this.tourForm = this.fb.group({
      title: [''],
      mainDescription: [''],
      stepOne: [''],
      stepTwo: [''],
      priceAdult: [null],
      priceChild: [null],
      location: [''],
      tourType: [this.tourTypeField],
      tourLanguage: [this.tourLanguageField],
      tourStartAt: [this.tourStartAtField],
      tourFinishAt: [this.tourFinishAtField],
    });
  }

  onSubmit(): void {
    if (this.tourForm.valid) {
      const newTour: ITour = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        tourActive: this.tourActiveField,
        tourTitle: this.tourForm.get('title')?.value,
        tourMainDescription: this.tourForm.get('mainDescription')?.value,
        tourStepOne: this.tourForm.get('stepOne')?.value,
        tourStepTwo: this.tourForm.get('stepTwo')?.value,
        tourPriceAdult: this.tourForm.get('priceAdult')?.value,
        tourPriceChild: this.tourForm.get('priceChild')?.value,
        tourLocation: this.tourForm.get('location')?.value,
        tourType: this.tourForm.get('tourType')?.value,
        tourLanguage: this.tourForm.get('tourLanguage')?.value,
        tourStartAt: this.tourForm.get('tourStartAt')?.value,
        tourFinishAt: this.tourForm.get('tourFinishAt')?.value,
      };

      this.tourQuery.addTour(newTour).subscribe({
        next: (tour) => {
          console.log('Tour added successfully', tour);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.unsubscribe();
    }
  }
}
