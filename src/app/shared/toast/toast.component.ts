import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs';
import { IToast } from './toast.interface';
import { ToastType } from './toastType.enum';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="message"
      [ngClass]="['message', message.type]"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-lg text-center"
    >
      {{ message.text }}
    </div>
    <button (click)="showToast(messageTypes.SUCCESS)">Show SUCCESS</button>
    <button (click)="showToast(messageTypes.WARNING)">Show WARNING</button>
  `,
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  message?: IToast;
  messageTypes = ToastType;

  timeoutId?: number;
  private destroy: Subscription = new Subscription();

  constructor(
    private toastService: ToastService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.destroy = this.toastService.showToast().subscribe((message) => {
      if (message) {
        console.log('ToastComponent: Received toast message:', message);
        this.message = message;
        this.resetTimer();

        // *** Add this to ensure the toast is displayed
        this.cdRef.detectChanges(); // Manually trigger change detection in ToastComponent
      }
    });
  }

  showToast(type: ToastType) {
    console.log('Manual toast trigger:', type); // Log for debugging
    this.toastService.setToast({
      type,
      text: 'This is a toast message',
    });
  }
  resetTimer(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }

  ngOnDestroy() {
    if (this.destroy) {
      this.destroy.unsubscribe();
    }
  }
}
