import { Injectable, signal, computed, effect } from '@angular/core';
import { ServerConfig, ServerInfo, ServerStatus, MapInfo, ServerLog } from '../models/server.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  private serverInfoSignal = signal<ServerInfo>({
    status: 'stopped',
    currentPlayers: 0,
    uptime: '00:00:00',
    ip: '0.0.0.0'
  });

  private configSignal = signal<ServerConfig>({
    map: 'zm_theater',
    maxPlayers: 4,
    port: 27017,
    password: '',
    rconPassword: 'admin123',
    serverName: 'Mi Servidor BO3 Zombies'
  });

  private logsSignal = signal<ServerLog[]>([]);

  // 🔒 Computed - Valores derivados
  readonly serverInfo = this.serverInfoSignal.asReadonly();
  readonly config = this.configSignal.asReadonly();
  readonly logs = this.logsSignal.asReadonly();
  
  readonly isRunning = computed(() => this.serverInfo().status === 'running');
  readonly isStarting = computed(() => this.serverInfo().status === 'starting');
  readonly canStart = computed(() => {
    const status = this.serverInfo().status;
    return status === 'stopped' || status === 'error';
  });

  constructor() {
    // Effect para logging (opcional)
    effect(() => {
      console.log('Server status changed:', this.serverInfo().status);
    });
  }

  // 🚀 Métodos públicos
  
  updateConfig(config: Partial<ServerConfig>) {
    this.configSignal.update(current => ({ ...current, ...config }));
  }

  async startServer(): Promise<void> {
    if (!this.canStart()) return;

    this.serverInfoSignal.update(info => ({ ...info, status: 'starting' }));
    this.addLog('info', 'Iniciando servidor...');

    try {
      // TODO: Aquí llamaremos a la API del backend
      // const response = await fetch('http://PC_SECUNDARIA:3000/api/server/start', {...});
      
      // Simulación por ahora
      await this.simulateServerStart();
      
    } catch (error) {
      this.serverInfoSignal.update(info => ({ 
        ...info, 
        status: 'error',
        lastError: 'Error al iniciar el servidor'
      }));
      this.addLog('error', 'Error al iniciar: ' + error);
    }
  }

  async stopServer(): Promise<void> {
    if (!this.isRunning()) return;

    this.addLog('info', 'Deteniendo servidor...');
    
    try {
      // TODO: Llamada a API
      await this.simulateServerStop();
      
    } catch (error) {
      this.addLog('error', 'Error al detener: ' + error);
    }
  }

  private addLog(level: ServerLog['level'], message: string) {
    const log: ServerLog = {
      timestamp: new Date(),
      level,
      message
    };
    this.logsSignal.update(logs => [...logs, log].slice(-100)); // Mantener últimos 100
  }

  // 🎭 Métodos de simulación (temporal)
  private async simulateServerStart(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.serverInfoSignal.update(info => ({
          ...info,
          status: 'running',
          ip: '192.168.1.100' // Cambiar a IP real
        }));
        this.addLog('info', '✅ Servidor iniciado correctamente');
        resolve();
      }, 2000);
    });
  }

  private async simulateServerStop(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.serverInfoSignal.set({
          status: 'stopped',
          currentPlayers: 0,
          uptime: '00:00:00',
          ip: '0.0.0.0'
        });
        this.addLog('info', '⏹️ Servidor detenido');
        resolve();
      }, 1000);
    });
  }
}