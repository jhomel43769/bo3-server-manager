import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServerService } from '../../services/server.service';
import { MapsService } from '../../services/maps.service';
import { ServerConfig } from '../../models/server.model';

@Component({
  selector: 'app-server-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './server-config.component.html',
})
export class ServerConfigComponent {
  private serverService = inject(ServerService);
  private mapsService = inject(MapsService);

  // Signals
  maps = this.mapsService.maps;
  config = this.serverService.config;
  isRunning = this.serverService.isRunning;

  // Local state para el formulario
  formConfig = signal<ServerConfig>({ ...this.config() });

  // Controla si el modal está abierto
  isOpen = signal(false);

  open() {
    // Copiar la configuración actual al formulario
    this.formConfig.set({ ...this.config() });
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }

  save() {
    this.serverService.updateConfig(this.formConfig());
    this.close();
  }

  updateField<K extends keyof ServerConfig>(field: K, value: ServerConfig[K]) {
    this.formConfig.update(config => ({
      ...config,
      [field]: value
    }));
  }
}