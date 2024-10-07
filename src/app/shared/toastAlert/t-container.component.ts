import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TCoreComponent } from './t-core.component';
import { ToastAlertService } from './toastAlert.service';
import { IToastMessage } from './t-message.model';

@Component({
  selector: 'vit-t-container',
  standalone: true,
  imports: [CommonModule, TCoreComponent],
  template: `
    <div class="fixed top-15 right-5 z-50 max-w-xs">
      <vit-t-core *ngFor="let toast of toasts" [toast]="toast"></vit-t-core>
    </div>
  `,
})
export class TContainerComponent {
  toasts: IToastMessage[] = [];

  constructor(private toastAlertService: ToastAlertService) {}

  // Inside TContainerComponent
  ngOnInit() {
    this.toastAlertService.toastMessage$.subscribe((toast: IToastMessage) => {
      console.log('New toast received:', toast); // Confirm this log appears
      this.toasts.push(toast);
      setTimeout(() => {
        this.toasts.shift();
        console.log('Toast removed:', toast);
      }, toast.duration);
    });
  }
}
