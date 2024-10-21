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
import { LANGUAGE_TOUR } from '../../../core/constants/language.constatnt';
import { ButtonComponent } from '../../../shared/components/ui/button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../shared/toast/toast.service';
import { ToastType } from '../../../shared/toast/toastType.enum';
import { CreateTourFormValidators } from '../../../shared/validators/form.validators';
import { ValidateFormBorderDirective } from '../../../shared/directives/validate-form-border.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { TourInfoComponent } from './form/tour-info.component';
import { TourImageUploadComponent } from './form/tour-image-upload.component';
import { TourMetaComponent } from './form/tour-meta.component';

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
    DragDropModule,
    MatIconModule,
    TourInfoComponent,
    TourImageUploadComponent,
    TourMetaComponent,
  ],
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css'],
})
export class CreateTourComponent implements OnInit, OnDestroy {
  private destroy$ = new Subscription();
  isTheTourCreated$: Observable<boolean> = of(false);
  tourForm!: FormGroup;
  tourTimes = TOUR_TIMES;
  tourType = TYPE_TOUR;
  locationArea = LOCATION;
  language = LANGUAGE_TOUR;
  isTourCreated = false;
  isEdit = false;
  tourId!: string;
  tour!: ITour;
  deleteStep: number = 1;
  image: File | null = null;
  imagePreview: SafeUrl | null = null;

  constructor(
    private fb: FormBuilder,
    private tourQuery: TourQueryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.tourForm = this.fb.group({
      title: ['', CreateTourFormValidators.titleValidator()],
      priceAdult: [null, CreateTourFormValidators.priceValidator()],
      priceChild: [null, CreateTourFormValidators.priceValidator()],
      location: ['', CreateTourFormValidators.locationValidator()],
      mainDescription: [
        '',
        CreateTourFormValidators.mainDescriptionValidator(),
      ],
      mainImage: [null, Validators.required],
      tourType: [null, Validators.required],
      startAt: [null, Validators.required],
      finishAt: [null, Validators.required],
      primaryLanguage: [null, Validators.required],
      secondaryLanguage: [null, Validators.required],
      steps: this.fb.array([]),
    });

    const defaultStepCount = 2;
    for (let i = 0; i < defaultStepCount; i++) {
      this.addStep();
    }

    this.route.paramMap.subscribe((params) => {
      const tourId = params.get('id');
      if (tourId) {
        this.tourId = tourId;
        this.isEdit = true;
        this.patchFormFields(tourId);
      }
    });

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

  patchFormFields(tourId: string): void {
    this.tourQuery.getTourById(tourId).subscribe({
      next: (tour: ITour) => {
        this.tourForm.patchValue({
          title: tour.tourTitle,
          priceAdult: tour.tourPriceAdult,
          priceChild: tour.tourPriceChild,
          location: tour.tourLocation,
          mainDescription: tour.tourMainDescription,
          mainImage: tour.tourMainImage, // Ensure this is set
          tourType: tour.tourType,
          primaryLanguage: tour.tourLanguage?.primaryLanguage || null,
          secondaryLanguage: tour.tourLanguage?.secondaryLanguage || null,
          startAt: tour.tourStartAt,
          finishAt: tour.tourFinishAt,
        });

        if (tour.tourMainImage) {
          this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(
            tour.tourMainImage
          );
        }

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.image = input.files[0];

      if (this.image) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.imagePreview =
            this.sanitizer.bypassSecurityTrustUrl(base64String);

          // Set the Base64 string in the form control
          this.tourForm.patchValue({
            mainImage: base64String, // Store Base64 in mainImage control
          });
        };
        reader.readAsDataURL(this.image);
      }
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.image = event.dataTransfer.files[0];

      if (this.image) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          this.imagePreview =
            this.sanitizer.bypassSecurityTrustUrl(base64String);

          // Set the Base64 string in the form control
          this.tourForm.patchValue({
            mainImage: base64String, // Store Base64 in mainImage control
          });
        };
        reader.readAsDataURL(this.image);
      }
    }
  }

  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  get steps(): FormArray {
    return this.tourForm.get('steps') as FormArray;
  }

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
    console.log('updateTour method is called');
    if (this.tourForm.valid && this.isEdit) {
      const updatedTour: ITour = {
        id: this.tourId,
        tourActive: true,
        tourTitle: this.tourForm.get('title')?.value,
        tourMainDescription: this.tourForm.get('mainDescription')?.value,
        tourMainImage: this.tourForm.get('mainImage')?.value,
        tourPriceAdult: this.tourForm.get('priceAdult')?.value,
        tourPriceChild: this.tourForm.get('priceChild')?.value,
        tourLocation: this.tourForm.get('location')?.value,
        tourType: this.tourForm.get('tourType')?.value,
        tourLanguage: {
          primaryLanguage: this.tourForm.get('primaryLanguage')?.value,
          secondaryLanguage: this.tourForm.get('secondaryLanguage')?.value,
        },
        tourStartAt: this.tourForm.get('startAt')?.value,
        tourFinishAt: this.tourForm.get('finishAt')?.value,
        steps: this.steps.value,
      };

      this.tourQuery.updateTour(updatedTour).subscribe({
        next: (tour) => {
          this.toastService.setToast({
            type: ToastType.SUCCESS,
            text: 'Tour Updated successfully!',
          });
          this.router.navigate(['/all-tours']);
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
      this.logInvalidControls();
    }
  }

  // Method to remove a step by index
  removeStep(index: number): void {
    const defaultStepCount = 2;
  } // Number of default steps that should not be deleted

  onSubmit(): void {
    if (this.tourForm.valid) {
      const newTour: ITour = {
        id: this.isEdit ? this.tourId : Math.random().toString(36).substr(2, 9),
        tourActive: true,
        tourTitle: this.tourForm.get('title')?.value,
        tourMainDescription: this.tourForm.get('mainDescription')?.value,
        tourMainImage: this.tourForm.get('mainImage')?.value,
        tourPriceAdult: this.tourForm.get('priceAdult')?.value,
        tourPriceChild: this.tourForm.get('priceChild')?.value,
        tourLocation: this.tourForm.get('location')?.value,
        tourType: this.tourForm.get('tourType')?.value,
        tourStartAt: this.tourForm.get('startAt')?.value,
        tourFinishAt: this.tourForm.get('finishAt')?.value,
        tourLanguage: {
          primaryLanguage: this.tourForm.get('primaryLanguage')?.value,
          secondaryLanguage: this.tourForm.get('secondaryLanguage')?.value,
        },
        steps: this.steps.value,
      };

      if (this.isEdit) {
        this.updateTour();
      } else {
        this.tourQuery.addTour(newTour).subscribe({
          next: (createdTour) => {
            console.log('Tour added successfully:', createdTour);
            this.isTourCreated = true;
            this.toastService.setToast({
              type: ToastType.SUCCESS,
              text: 'Tour Created successfully!',
            });
            this.router.navigate(['/all-tours']);
          },
          error: (err) => {
            console.error('Error adding new tour:', err);
            this.toastService.setToast({
              type: ToastType.ERROR,
              text: 'Error creating tour. Please try again.',
            });
          },
        });
      }
    } else {
      console.log('Form is invalid');
      this.logInvalidControls();
    }
  }

  logInvalidControls(): void {
    Object.keys(this.tourForm.controls).forEach((key) => {
      const control = this.tourForm.get(key);
      if (control && control.invalid) {
        console.log(`Invalid field: ${key}`, control.errors);
      }
    });

    this.steps.controls.forEach((step, index) => {
      if (step.invalid) {
        console.log(`Invalid Step ${index}`, step.errors);
      }
    });
  }

  onDeleteTour(): void {
    if (this.deleteStep === 0) {
      this.deleteStep = 1;
    } else if (this.deleteStep === 1) {
      this.deleteStep = 2;
    } else if (this.deleteStep === 2 && this.tourId) {
      this.tourQuery.deleteTour(this.tourId).subscribe({
        next: (deleted) => {
          console.log('Tour deleted successfully:', deleted);
          this.resetDeleteStep();
          this.toastService.setToast({
            type: ToastType.SUCCESS,
            text: 'Tour deleted successfully!',
          });
          this.router.navigate(['/all-tours']);
        },
        error: (err) => {
          console.error('Error deleting the tour:', err);
          this.toastService.setToast({
            type: ToastType.ERROR,
            text: 'Error deleting the tour',
          });
        },
      });
    } else {
      console.error('No tourId found for deletion');
    }
  }

  getDeleteButtonText(): string {
    if (this.deleteStep === 0) {
      return 'Delete Tour';
    } else if (this.deleteStep === 1) {
      return 'Are you sure?';
    } else {
      return 'Delete Tour Now';
    }
  }

  resetDeleteStep(): void {
    this.deleteStep = 0;
  }

  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.unsubscribe();
    }
  }
}
