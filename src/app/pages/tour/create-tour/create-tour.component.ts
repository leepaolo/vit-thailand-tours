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
import { ActivatedRoute } from '@angular/router';

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
  tourId!: string; // *** To store the tour ID
  tour!: ITour; // *** To store the full tour object

  constructor(
    private fb: FormBuilder,
    private tourQuery: TourQueryService,
    private route: ActivatedRoute // *** Inject ActivatedRoute to access route params
  ) {}

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

    // Add a default step
    this.addStep();

    // *** Retrieve the tour ID from the route
    this.route.paramMap.subscribe((params) => {
      const tourId = params.get('id');
      if (tourId) {
        this.tourId = tourId;
        this.isEdit = true; // *** Set to edit mode
        this.patchFormFields(tourId); // *** Call function to populate the form
      }
    });

    // *** Subscribe to the observable for tour creation status
    this.isTheTourCreated$ = this.tourQuery.isTourCreatedObservable();
    this.isTheTourCreated$.subscribe({
      next: (created) => {
        this.isTourCreated = created;
      },
      error: (err) => {
        console.error('Error subscribing to isTheTourCreated$', err);
      },
    });
  }

  // *** Function to populate the form with tour data
  patchFormFields(tourId: string): void {
    this.tourQuery.getTourById(tourId).subscribe({
      next: (tour: ITour) => {
        // *** Patch the form with the tour data
        this.tourForm.patchValue({
          title: tour.tourTitle,
          priceAdult: tour.tourPriceAdult,
          priceChild: tour.tourPriceChild,
          location: tour.tourLocation,
          mainDescription: tour.tourMainDescription,
          tourType: tour.tourType,
          language: tour.tourLanguage,
          startAt: tour.tourStartAt,
          finishAt: tour.tourFinishAt,
        });

        // *** Clear existing steps and add the steps from the retrieved tour
        this.steps.clear();
        if (tour.steps && tour.steps.length > 0) {
          tour.steps.forEach((step) => {
            const stepForm = this.fb.group({
              tourStepTitle: [step.tourStepTitle],
              tourStepDescription: [step.tourStepDescription],
            });
            this.steps.push(stepForm);
          });
        }
      },
      error: (err) => {
        console.error('Error retrieving tour by ID', err);
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
      tourStepTitle: [''],
      tourStepDescription: [''],
    });
    this.steps.push(stepForm);
  }

  updateTour(): void {
    if (this.tourForm.valid && this.isEdit) {
      const updatedTour: ITour = {
        id: this.tourId, // *** Use the existing tourId
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
        steps: this.steps.value, // *** Retrieve the steps array
      };

      // *** Call the update method in the service
      this.tourQuery.updateTour(updatedTour).subscribe({
        next: (tour) => {
          console.log('Tour updated successfully', tour);
          this.isTourCreated = true; // *** Indicate the tour was updated successfully
        },
        error: (err) => {
          console.error('Error updating tour', err);
        },
      });
    } else {
      console.log('Form is invalid or not in edit mode');
    }
  }

  // Method to remove a step by index
  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.tourForm.valid) {
      const newTour: ITour = {
        id: this.isEdit ? this.tourId : Math.random().toString(36).substr(2, 9), // *** Use the existing tour ID for edit
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
        steps: this.steps.value,
      };

      if (this.isEdit) {
        // *** Update existing tour
        this.tourQuery.updateTour(newTour).subscribe({
          next: (updatedTour) => {
            console.log('Tour updated successfully:', updatedTour);
            this.isTourCreated = true; // *** Indicate successful update
          },
          error: (err) => {
            console.error('Error updating the tour:', err); // *** Handle error in tour update
          },
        });
      } else {
        // *** Create new tour
        this.tourQuery.addTour(newTour).subscribe({
          next: (createdTour) => {
            console.log('Tour added successfully:', createdTour);
            this.isTourCreated = true; // *** Indicate successful creation
          },
          error: (err) => {
            console.error('Error adding new tour:', err); // *** Handle error in tour creation
          },
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onDeleteTour(): void {
    if (this.tourId) {
      // Make sure the tourId exists
      this.tourQuery.deleteTour(this.tourId).subscribe({
        next: (deleted) => {
          console.log('Tour deleted successfully:', deleted);
          // Optionally, redirect or refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting the tour:', err);
        },
      });
    } else {
      console.error('No tourId found for deletion');
    }
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.unsubscribe();
    }
  }
}
