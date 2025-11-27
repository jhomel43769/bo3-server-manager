import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerService } from '../../services/server.service';
import { MapsService } from '../../services/maps.service';
import { ServerConfigComponent } from '../server-config/server-config.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  // Inyección de servicios
  private serverService = inject(ServerService);
  private mapsService = inject(MapsService);

  // Signals reactivos desde los servicios
  serverInfo = this.serverService.serverInfo;
  config = this.serverService.config;
  isRunning = this.serverService.isRunning;
  isStarting = this.serverService.isStarting;
  canStart = this.serverService.canStart;

  // Computed signal para el mapa actual
  currentMap = computed(() => {
    const mapId = this.config().map;
    return this.mapsService.getMapById(mapId);
  });

  // Computed para el color del estado
  statusColor = computed(() => {
    switch (this.serverInfo().status) {
      case 'running': return 'bg-green-500';
      case 'starting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  });

  // Computed para el texto del estado
  statusText = computed(() => {
    switch (this.serverInfo().status) {
      case 'running': return 'En Línea';
      case 'starting': return 'Iniciando...';
      case 'error': return 'Error';
      default: return 'Detenido';
    }
  });

  // Métodos
  onStartServer() {
    this.serverService.startServer();
  }

  onStopServer() {
    this.serverService.stopServer();
  }
}