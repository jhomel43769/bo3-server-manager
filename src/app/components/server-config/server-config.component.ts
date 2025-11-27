import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerService } from '../../services/server.service';
import { MapsService } from '../../services/maps.service';
import { ServerConfig } from '../../models/server.model';
import { ConfigGeneralComponent } from './config-general/config-general.component';
import { ConfigMapSelectorComponent } from './config-map-selector/config-map-selector.component';
import { ConfigPlayersComponent } from './config-players/config-players.component';
import { ConfigSecurityComponent } from './config-security/config-security.component';

@Component({
  selector: 'app-server-config',
  standalone: true,
  imports: [
    CommonModule,
    ConfigGeneralComponent,
    ConfigMapSelectorComponent,
    ConfigPlayersComponent,
    ConfigSecurityComponent
  ],
  templateUrl: './server-config.component.html',
})
export class ServerConfigComponent {
  private serverService = inject(ServerService);
  private mapsService = inject(MapsService);

  maps = this.mapsService.maps;
  config = this.serverService.config;
  isRunning = this.serverService.isRunning;
  formConfig = signal<ServerConfig>({ ...this.config() });
  isOpen = signal(false);

  open() {
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
    this.formConfig.update(config => ({ ...config, [field]: value }));
  }

  onUpdateField(event: {field: string, value: any}) {
    this.updateField(event.field as keyof ServerConfig, event.value);
  }
}