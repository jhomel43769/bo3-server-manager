export type ServerStatus = 'stopped' | 'starting' | 'running' | 'error';

export interface ServerConfig {
  map: string;
  maxPlayers: number;
  port: number;
  password: string;
  rconPassword: string;
  serverName: string;
}

export interface ServerInfo {
  status: ServerStatus;
  currentPlayers: number;
  uptime: string;
  ip: string;
  lastError?: string;
}

export interface MapInfo {
  id: string;
  name: string;
  dlc: string;
  size: 'Muy Pequeño' | 'Pequeño' | 'Mediano' | 'Grande' | 'Muy Grande';
  imageUrl?: string;
}

export interface ServerLog {
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
}