import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerInfo, ServerConfig, MapInfo } from '../../../models/server.model';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-stats.component.html',
})
export class DashboardStatsComponent {
  serverInfo = input.required<ServerInfo>();
  config = input.required<ServerConfig>();
  currentMap = input<MapInfo>(); // Opcional porque puede ser undefined
}