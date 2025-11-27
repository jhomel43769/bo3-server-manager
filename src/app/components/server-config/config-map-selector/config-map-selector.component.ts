import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapInfo } from '../../../models/server.model';

@Component({
  selector: 'app-config-map-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-map-selector.Component.html',
})
export class ConfigMapSelectorComponent {
  maps = input.required<MapInfo[]>();
  selectedMapId = input.required<string>();
  selectMap = output<string>();
}