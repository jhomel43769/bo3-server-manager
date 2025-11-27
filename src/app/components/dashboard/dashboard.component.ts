import { Component, inject, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerService } from '../../services/server.service';
import { MapsService } from '../../services/maps.service';
import { ServerConfigComponent } from '../server-config/server-config.component';

import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';
import { DashboardControlsComponent } from './dashboard-controls/dashboard-controls.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ServerConfigComponent,
    DashboardHeaderComponent,
    DashboardStatsComponent,
    DashboardControlsComponent,
    DashboardInfoComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private serverService = inject(ServerService);
  private mapsService = inject(MapsService);

  // Referencia al componente de configuración para abrirlo
  // Usamos viewChild (nuevo en Angular 17.3+) en lugar de ViewChild decorador
  configComponent = viewChild(ServerConfigComponent);

  // Signals
  serverInfo = this.serverService.serverInfo;
  config = this.serverService.config;
  isRunning = this.serverService.isRunning;
  isStarting = this.serverService.isStarting;
  canStart = this.serverService.canStart;

  currentMap = computed(() => {
    const mapId = this.config().map;
    return this.mapsService.getMapById(mapId);
  });

  statusColor = computed(() => {
    switch (this.serverInfo().status) {
      case 'running': return 'bg-green-500';
      case 'starting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  });

  statusText = computed(() => {
    switch (this.serverInfo().status) {
      case 'running': return 'En Línea';
      case 'starting': return 'Iniciando...';
      case 'error': return 'Error';
      default: return 'Detenido';
    }
  });

  onStartServer() {
    this.serverService.startServer();
  }

  onStopServer() {
    this.serverService.stopServer();
  }

  onOpenConfig() {
    // Abrimos el modal accediendo al método del hijo
    this.configComponent()?.open();
  }
}