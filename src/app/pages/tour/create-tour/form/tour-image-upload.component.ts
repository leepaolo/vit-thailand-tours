import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tour-image-upload',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="w-full">
      <div
        class="image-drop-area"
        (drop)="onDrop($event)"
        (dragover)="onDragOver($event)"
        class="drop-box flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-md text-center cursor-pointer"
        [ngClass]="{ 'border-green-500': image, 'border-gray-300': !image }"
        (click)="fileInput.click()"
      >
        <mat-icon>cloud_upload</mat-icon>
        <p *ngIf="!image">Drag and drop an image here or click to select</p>
        <p *ngIf="image">{{ image.name }}</p>

        <img
          *ngIf="imagePreview"
          [src]="imagePreview"
          alt="Image Preview"
          class="h-40 w-40 object-cover"
        />

        <input
          type="file"
          accept="image/*"
          class="hidden"
          #fileInput
          (change)="onFileSelected($event)"
        />
      </div>
    </div>
  `,
  styles: [],
})
export class TourImageUploadComponent {
  @Input() image: File | null = null;
  @Input() imagePreview: SafeUrl | null = null;
  @Output() imageSelected = new EventEmitter<File>(); // To emit image file
  @Output() imagePreviewChanged = new EventEmitter<SafeUrl>(); // To emit image preview

  constructor(private sanitizer: DomSanitizer) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const image = input.files[0];
      this.imageSelected.emit(image); // Emit the selected image

      // Generate the preview and emit it
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const preview = this.sanitizer.bypassSecurityTrustUrl(base64String);
        this.imagePreviewChanged.emit(preview); // Emit the new image preview
      };
      reader.readAsDataURL(image);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const image = event.dataTransfer.files[0];
      this.imageSelected.emit(image); // Emit the selected image

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const preview = this.sanitizer.bypassSecurityTrustUrl(base64String);
        this.imagePreviewChanged.emit(preview); // Emit the new image preview
      };
      reader.readAsDataURL(image);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
