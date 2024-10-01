import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextComponent } from '../../../shared/components/ui/input-text.component';
import { TourQueryService } from '../../../core/services/tour-query.service';
import { Observable, of, Subscription } from 'rxjs';
import { ITour } from '../../../core/models/tour.interface';
import { TextAreaComponent } from '../../../shared/components/ui/text-area.component';
import { InputSelectComponent } from '../../../shared/components/ui/input-select.component';
import { TOUR_TIMES } from '../../../core/constants/tour-time.constants';
import { TYPE_TOUR } from '../../../core/constants/type.constants';
import { LOCATION } from '../../../core/constants/location.costants';
import { ButtonComponent } from '../../../shared/components/ui/button.component';

@Component({
  selector: 'app-create-tour',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputTextComponent,
    TextAreaComponent,
    InputSelectComponent,
  ],
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css'],
})
export class CreateTourComponent implements OnInit, OnDestroy {
  private destroy$ = new Subscription();
  tourForm!: FormGroup;
  tourTimes = TOUR_TIMES;
  tourTypeDay = TYPE_TOUR;
  locationArea = LOCATION;
  isTheTourCreated$: Observable<boolean> = of(false);
  isTourCreated = false;
  isEdit = false;

  constructor(private fb: FormBuilder, private tourQuery: TourQueryService) {}

  ngOnInit(): void {
    // Initialize the form
    this.tourForm = this.fb.group({
      title: [''],
      priceAdult: [null],
      priceChild: [null],
      location: [''],
      mainDescription: [''],
      tourType: [[]],
      language: [[]],
      startAt: [null],
      finishAt: [null],
      steps: this.fb.array([]), // Initialize FormArray for steps
    });

    // Add a default step (title and description)
    this.addStep();

    // Subscribe to the observable
    this.isTheTourCreated$ = this.tourQuery.isTourCreatedObservable(); // Ensure the observable is provided by the service

    this.isTheTourCreated$.subscribe({
      next: (created) => {
        this.isTourCreated = created; // Update the local boolean to control form visibility
      },
      error: (err) => {
        console.error('Error subscribing to isTheTourCreated$', err);
      },
    });
  }

  // Getter to access the steps FormArray
  get steps(): FormArray {
    return this.tourForm.get('steps') as FormArray;
  }

  // Method to add a new step
  addStep(): void {
    const stepForm = this.fb.group({
      tourStepTitle: [''], // This should match the interface's property name
      tourStepDescription: [''], // This should match the interface's property name
    });
    this.steps.push(stepForm);
  }

  // Method to remove a step by index
  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.tourForm.valid) {
      const newTour: ITour = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        tourActive: true,
        tourTitle: this.tourForm.get('title')?.value,
        tourMainDescription: this.tourForm.get('mainDescription')?.value,
        tourPriceAdult: this.tourForm.get('priceAdult')?.value,
        tourPriceChild: this.tourForm.get('priceChild')?.value,
        tourLocation: this.tourForm.get('location')?.value,
        tourType: this.tourForm.get('tourType')?.value,
        tourLanguage: this.tourForm.get('language')?.value,
        tourStartAt: this.tourForm.get('startAt')?.value,
        tourFinishAt: this.tourForm.get('finishAt')?.value,
        steps: this.steps.value, // Get all step blocks
      };

      // Log the data to inspect it
      console.log(newTour);

      // Save the tour via the service
      this.tourQuery.addTour(newTour).subscribe({
        next: (tour) => {
          console.log('Tour added successfully', tour);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Clean up subscriptions on destroy
  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.unsubscribe();
    }
  }
}
