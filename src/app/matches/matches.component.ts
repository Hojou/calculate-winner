import { Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Match } from '../match';
import { MatchService } from '../match.service';

@Component({
  moduleId: module.id,
  providers: [MatchService],
  selector: 'app-matches',
  templateUrl: 'matches.component.html',
  styleUrls: ['matches.component.css']
})
export class MatchesComponent implements OnChanges {
    @Input() players: Array<any>;
    @Output() winnerFound: EventEmitter<any> = new EventEmitter<any>();
    matches: Array<Match>;

    constructor(private matchService: MatchService) {}

    ngOnChanges(changes: any) {
        this.matches = new Array<Match>();

        for (let i = 0; i < this.players.length; i++) {
            for (let l = i + 1; l < this.players.length; l++) {
                this.matches.push(new Match(this.players[i], this.players[l]));
            }
        }
    }

    calculateWinner() {
        this.matches.forEach((m) => m.finishMatch());
        let winner = this.matchService.calculateWinner(this.matches);
        this.winnerFound.next(winner);
    }

}
