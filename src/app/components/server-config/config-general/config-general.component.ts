import { Component, input, output } from '@angular/core';
import { ServerConfig } from '../../../models/server.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-config-general',
  imports: [CommonModule],
  templateUrl: './config-general.component.html',
})
export class ConfigGeneralComponent {
  config = input.required<ServerConfig>();
  updateField = output<{field: string, value: any}>();
}