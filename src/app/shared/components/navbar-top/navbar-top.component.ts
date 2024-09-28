import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CONTACT_PAGE_URL,
  HOME_PAGE_URL,
  TOURS_PAGE_URL,
} from '../../../core/constants/navbar.constants';

@Component({
  selector: 'app-navbar-top',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar-top.component.html',
  styleUrl: './navbar-top.component.css',
})
export class NavbarTopComponent {
  navLinks = [
    { label: 'Home', route: HOME_PAGE_URL },
    { label: 'All Tours', route: TOURS_PAGE_URL },
    { label: 'Contact', route: CONTACT_PAGE_URL },
  ];
}
