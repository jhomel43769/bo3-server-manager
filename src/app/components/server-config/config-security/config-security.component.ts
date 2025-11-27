import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-config-security',
  imports: [CommonModule],
  templateUrl: './config-security.component.html',
})
export class ConfigSecurityComponent {
  password = input.required<string>();
  rconPassword = input.required<string>();
  updateField = output<{field: string, value: any}>();
}