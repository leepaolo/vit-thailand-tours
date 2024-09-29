import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [CommonModule],
  template: ` <p>date-picker works!</p> `,
  styles: ``,
})
export class DatePickerComponent {
  tourStartAt!: string; // Start time, e.g., '10:00 AM'
  tourFinishAt!: string; // Finish time, e.g., '2:00 PM'
}
