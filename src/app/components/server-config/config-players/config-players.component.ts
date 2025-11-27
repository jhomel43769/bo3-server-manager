import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-config-players',
  imports: [CommonModule],
  templateUrl: './config-players.component.html',
})
export class ConfigPlayersComponent {
  maxPlayers = input.required<number>();
  updateMaxPlayers = output<number>();
}