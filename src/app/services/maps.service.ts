import { Injectable, signal } from '@angular/core';
import type { MapInfo } from '../models/server.model';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  
  private mapsSignal = signal<MapInfo[]>([
    { id: 'zm_prototype', name: 'Nacht der Untoten', dlc: 'Chronicles', size: 'Muy Pequeño' },
    { id: 'zm_asylum', name: 'Verruckt', dlc: 'Chronicles', size: 'Pequeño' },
    { id: 'zm_sumpf', name: 'Shi No Numa', dlc: 'Chronicles', size: 'Mediano' },
    { id: 'zm_theater', name: 'Kino der Toten', dlc: 'Chronicles', size: 'Mediano' },
    { id: 'zm_cosmodrome', name: 'Ascension', dlc: 'Chronicles', size: 'Grande' },
    { id: 'zm_temple', name: 'Shangri-La', dlc: 'Chronicles', size: 'Mediano' },
    { id: 'zm_moon', name: 'Moon', dlc: 'Chronicles', size: 'Grande' },
    { id: 'zm_tomb', name: 'Origins', dlc: 'Chronicles', size: 'Muy Grande' },
    { id: 'zm_zod', name: 'Shadows of Evil', dlc: 'Base', size: 'Grande' },
    { id: 'zm_factory', name: 'The Giant', dlc: 'Season Pass', size: 'Pequeño' },
    { id: 'zm_castle', name: 'Der Eisendrache', dlc: 'DLC 1', size: 'Grande' },
    { id: 'zm_island', name: 'Zetsubou No Shima', dlc: 'DLC 2', size: 'Mediano' },
    { id: 'zm_stalingrad', name: 'Gorod Krovi', dlc: 'DLC 3', size: 'Grande' },
    { id: 'zm_genesis', name: 'Revelations', dlc: 'DLC 4', size: 'Grande' },
  ]);

  readonly maps = this.mapsSignal.asReadonly();

  getMapById(id: string): MapInfo | undefined {
    return this.maps().find(map => map.id === id);
  }
}
