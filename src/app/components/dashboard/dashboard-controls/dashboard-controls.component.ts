import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-controls',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-controls.component.html',
})
export class DashboardControlsComponent {
  canStart = input.required<boolean>();
  isRunning = input.required<boolean>();
  
  start = output<void>();
  stop = output<void>();
}