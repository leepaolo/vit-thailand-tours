import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLayoutComponent } from './pages/page-layout/page-layout.component';
import { NavbarTopComponent } from './shared/components/navbar-top/navbar-top.component';
import { ToastComponent } from './shared/toast/toast.component';
import { ToastService } from './shared/toast/toast.service';
import { ToastType } from './shared/toast/toastType.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    PageLayoutComponent,
    NavbarTopComponent,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  messageTypes = ToastType;
  constructor(private toastService: ToastService) {}

  showToast(type: ToastType) {
    console.log('Manual toast trigger:', type); // Log for debugging
    this.toastService.setToast({
      type,
      text: 'This is a toast message',
    });
  }
}
