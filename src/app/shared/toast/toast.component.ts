import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="show"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg text-center"
    >
      <p>{{ message }}</p>
    </div>
  `,
  styles: [],
})
export class ToastComponent {
  @Input() message: string = 'This is a toast message';
  show = false;

  constructor() {
    setTimeout(() => {
      this.showToast();
    }, 3000);
  }

  showToast() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 5000);
  }
}
