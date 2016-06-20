import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-players',
  templateUrl: 'players.component.html',
  styleUrls: ['players.component.css']
})
export class PlayersComponent implements AfterViewInit {
    players: Array<any> = new Array<any>();
    @ViewChild('newPlayer') inputElement: ElementRef;
    @Output() playersReady: EventEmitter<any> = new EventEmitter<any>();

    ngAfterViewInit()  {
        this.inputElement.nativeElement.focus();
    }

    public addPlayer(name: string) {
        if (!name.length) {
            this.createMatches();
            return;
        };

        this.players.push({ name: name});
        this.inputElement.nativeElement.value = '';
        this.inputElement.nativeElement.focus();
    }

    public removePlayer(player: any) {
        console.log('player remove', player);
        let index = this.players.indexOf(player);
        if (index !== undefined) {
            this.players.splice(index, 1);
        }
        this.inputElement.nativeElement.focus();
    }

    public createMatches() {
        if (this.players.length < 3) { return; }
        this.playersReady.next(this.players);
    }
}

