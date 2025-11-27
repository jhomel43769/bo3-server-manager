import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerConfig, ServerInfo, MapInfo } from '../../../models/server.model';

@Component({
  selector: 'app-dashboard-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-info.component.html',
})
export class DashboardInfoComponent {
  config = input.required<ServerConfig>();
  serverInfo = input.required<ServerInfo>();
  currentMap = input<MapInfo>();
  
  // Evento para abrir el modal de configuración desde este panel
  openConfig = output<void>(); 
}