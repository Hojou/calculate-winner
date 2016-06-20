import { Component } from '@angular/core';
import { PlayersComponent } from './players/players.component';
import { MatchesComponent } from './matches/matches.component';

@Component({
  moduleId: module.id,
  directives: [PlayersComponent, MatchesComponent],
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
    players: Array<any>;
    winnerData: any;

    playersReady(players: Array<any>) {
        this.winnerData = null;
        console.log('playersReady in app', players);
        this.players = players;
    }

    winnerFound(winnerData: any) {
        this.winnerData = winnerData;
    }
}
