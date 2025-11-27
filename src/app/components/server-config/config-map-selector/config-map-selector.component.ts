import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapInfo } from '../../../models/server.model';

@Component({
  selector: 'app-config-map-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-map-selector.component.html'
})
export class ConfigMapSelectorComponent {
  maps = input.required<MapInfo[]>();
  selectedMapId = input.required<string>();
  selectMap = output<string>();

  // TrackBy function para mejorar performance
  trackByMapId(index: number, map: MapInfo): string {
    return map.id;
  }
}