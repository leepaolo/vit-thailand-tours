import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
import { ToastService } from '../../../shared/toast/toast.service';
import { ToastType } from '../../../shared/toast/toastType.enum';
import { CreateTourFormValidators } from '../../../shared/validators/form.validators';
import { ValidateFormBorderDirective } from '../../../shared/directives/validate-form-border.directive';

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
    ValidateFormBorderDirective,
    ValidateFormBorderDirective,
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
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.tourForm = this.fb.group({
      title: ['', CreateTourFormValidators.titleValidator()], // Correctly invoked
      priceAdult: [null, CreateTourFormValidators.priceValidator()], // Correctly invoked
      priceChild: [null, CreateTourFormValidators.priceValidator()], // Correct invocation for priceChild
      location: ['', CreateTourFormValidators.locationValidator()], // Correctly invoked
      mainDescription: [
        '',
        CreateTourFormValidators.mainDescriptionValidator(),
      ], // Correctly invoked
      tourType: [[], Validators.required],
      startAt: [null, Validators.required],
      finishAt: [null, Validators.required],
      steps: this.fb.array([]),
    });

    // Check if validators are applied

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
          // language: tour.tourLanguage,
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
      tourStepTitle: ['', CreateTourFormValidators.tourStepTitleValidator()],
      tourStepDescription: [
        '',
        CreateTourFormValidators.tourStepDescriptionValidator(),
      ],
    });
    this.steps.push(stepForm);
  }

  updateTour(): void {
    console.log('updateTour method is called'); //
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
        // tourLanguage: this.tourForm.get('language')?.value,
        tourStartAt: this.tourForm.get('startAt')?.value,
        tourFinishAt: this.tourForm.get('finishAt')?.value,
        steps: this.steps.value, // *** Retrieve the steps array
      };

      // Call the update method in the service
      this.tourQuery.updateTour(updatedTour).subscribe({
        next: (tour) => {
          this.toastService.setToast({
            type: ToastType.SUCCESS,
            text: 'Tour Updated successfully!',
          });
        },
        error: (err) => {
          this.toastService.setToast({
            type: ToastType.ERROR,
            text: 'Error updating tour. Please try again.',
          });
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
        id: this.isEdit ? this.tourId : Math.random().toString(36).substr(2, 9), // Generate ID if creating new
        tourActive: true,
        tourTitle: this.tourForm.get('title')?.value,
        tourMainDescription: this.tourForm.get('mainDescription')?.value,
        tourPriceAdult: this.tourForm.get('priceAdult')?.value,
        tourPriceChild: this.tourForm.get('priceChild')?.value,
        tourLocation: this.tourForm.get('location')?.value,
        tourType: this.tourForm.get('tourType')?.value,
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
            this.toastService.setToast({
              type: ToastType.SUCCESS,
              text: 'Tour Updated successfully!', // Corrected the message here
            });
          },
          error: (err) => {
            console.error('Error updating the tour:', err); // *** Handle error in tour update
            this.toastService.setToast({
              type: ToastType.ERROR,
              text: 'Error updating tour. Please try again.', // Corrected the error message
            });
          },
        });
      } else {
        // *** Create new tour
        this.tourQuery.addTour(newTour).subscribe({
          next: (createdTour) => {
            console.log('Tour added successfully:', createdTour);
            this.isTourCreated = true; // *** Indicate successful creation
            this.toastService.setToast({
              type: ToastType.SUCCESS,
              text: 'Tour Created successfully!', // Add success toast for creation
            });
          },
          error: (err) => {
            console.error('Error adding new tour:', err); // *** Handle error in tour creation
            this.toastService.setToast({
              type: ToastType.ERROR,
              text: 'Error creating tour. Please try again.', // Add error toast for creation failure
            });
          },
        });
      }
    } else {
      console.log('Form is invalid');
      this.logInvalidControls(); // Log invalid controls if the form is invalid
    }
  }

  // Method to log invalid controls
  logInvalidControls(): void {
    Object.keys(this.tourForm.controls).forEach((key) => {
      const control = this.tourForm.get(key);
      if (control && control.invalid) {
        const errors = control.errors;
        console.log(`Invalid field: ${key}`, errors);
      }
    });

    // Check FormArray controls (steps)
    this.steps.controls.forEach((step, index) => {
      if (step.invalid) {
        console.log(`Invalid Step ${index}`, step.errors);
      }
    });
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
