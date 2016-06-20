import { Injectable } from '@angular/core';
import {Match} from './match';
import {PlayerStatistics} from './playerStatistics';

@Injectable()
export class MatchService {


    calculateWinner(matches: Array<Match>): any {
        let winners: Array<PlayerStatistics>;
        try {
            winners = this.calculateWinners(matches);
        } catch (e) {
            return { reasons: [{ text: e }] };
        }

        let reasons: Array<any> = new Array<any>();

        let mostWins = winners[0].wonCount;
        let equalWins = winners.filter((w) => w.wonCount === mostWins);
        if (equalWins.length === 1) { // 1. Vundne kampe
            reasons.push({ text: 'Most matches won.', details: `${mostWins} matches won by ${equalWins[0].player.name}.`});
            return { winner: equalWins[0].player, reasons: reasons }; 
        } 
        reasons.push({ text: 'No single players had the most wins.', details: `${mostWins} matches won by ${equalWins.length} players.` });        
        if (equalWins.length === 2) { // 2. Indbyrdes
            let mutualMatch = this.findMutualMatch(equalWins, matches); 
            reasons.push({ 
                text: 'Two players had the same number of wins. Winner found in mutual match.', 
                details: `Mutual match ${mutualMatch.winner.name} vs. ${mutualMatch.looser.name} won by ${mutualMatch.winner.name}.`
            });
            return { winner: mutualMatch.winner, reasons: reasons }; 
        } 
        reasons.push({ text: 'More than two players had the same number of wins.' });

        let mostSets = equalWins[0].setDiff;
        let equalSets = equalWins.filter((w) => w.setDiff === mostSets);
        if (equalSets.length === 1) { // 3. Difference i sæt 
            reasons.push({ 
                text: 'One player had the most sets won difference.', 
                details: `${mostSets} sets difference won by ${equalSets[0].player.name}.`
            });
            return { winner: equalSets[0].player, reasons: reasons }; 
        }
        reasons.push({ text: 'No single player had the best set difference.', details: `${mostSets} sets difference by ${equalSets.length} players.`});
        if (equalSets.length === 2) { // 3. Difference i sæt. Indbyrdes
            let mutualMatch = this.findMutualMatch(equalSets, matches); 
            reasons.push({ 
                text: 'Two players had the same number of set differences. Winner found in mutual match.', 
                details: `Mutual match ${mutualMatch.winner.name} vs. ${mutualMatch.looser.name} won by ${mutualMatch.winner.name}.`
            });
            return { winner: mutualMatch.winner, reasons: reasons }; 
        }
        reasons.push({ text: 'More than two players had the same number of set differences.' });

        let mostPoints = equalSets[0].pointDiff;
        let equalPoints = equalSets.filter((w) => w.pointDiff === mostPoints);
        if (equalPoints.length === 1) { // 4. Difference i point 
            reasons.push({ 
                text: 'One player had the most points difference.', 
                details: `${mostPoints} points difference won by ${equalPoints[0].player.name}.`
            });
            return { winner: equalPoints[0].player, reasons: reasons }; 
        }
        reasons.push({ text: 'No single player had the best points difference.', details: `${mostPoints} sets difference by ${equalPoints.length} players.`});
        if (equalPoints.length === 2) { // 4. Difference i point. Indbyrdes.
            let mutualMatch = this.findMutualMatch(equalPoints, matches); 
            reasons.push({ 
                text: 'Two players had the same number of points differences. Winner found in mutual match.', 
                details: `Mutual match ${mutualMatch.winner.name} vs. ${mutualMatch.looser.name} won by ${mutualMatch.winner.name}.`
            });
            return { winner: mutualMatch.winner, reasons: reasons }; 
        }
        reasons.push({text: 'More than two players have the same number of points difference. Winner found by draw!'})

        return { winner: null, reasons: reasons }; // Winner not determined. To be found by draw!
    }

    private findMutualMatch(stats: Array<any>, matches: Array<Match>) {
        let p1 = stats[0].player;
        let p2 = stats[1].player;

        return matches.find((m: Match) => (m.player1 === p1 && m.player2 === p2) || (m.player1 === p2 && m.player2 === p1));
    }

    private calculatePlayerStats(matches: Array<Match>): { [key: string]: PlayerStatistics; } {
        let hashMap: { [key: string]: PlayerStatistics; } = {};
        for (let match of matches.filter((m: Match) => m.matchDone)) {
            let winningPlayerHash = hashMap[match.winner.name] || ( hashMap[match.winner.name] = {
                player: match.winner,
                wonCount: 0,
                setDiff: 0,
                pointDiff: 0
            });
            winningPlayerHash.wonCount++;
            winningPlayerHash.setDiff += match.setDiff;
            winningPlayerHash.pointDiff += match.pointDiff;

            let loosingPlayerHash = hashMap[match.looser.name] || (hashMap[match.looser.name] = {
                player: match.looser,
                wonCount: 0,
                setDiff: 0,
                pointDiff: 0
            });
            loosingPlayerHash.setDiff -= match.setDiff;
            loosingPlayerHash.pointDiff -= match.pointDiff;
        }

        return hashMap;
    }

    private calculateWinners(matches: Array<Match>): Array<PlayerStatistics> {
        let hash: { [key: string]: PlayerStatistics; } = this.calculatePlayerStats(matches);
        if (Object.keys(hash).length === 0) { throw 'No finished matches.'; }

        let array = new Array<any>();
        /* tslint:disable */
        for (let key in hash) {
            array.push(hash[key]);
        }
        /* tslint:enable */

        return array.sort((i1, i2) =>  {
            let wonDiff = i2.wonCount - i1.wonCount;
            if (wonDiff !== 0) { return wonDiff; }
            let setDiff = i2.setDiff - i1.setDiff;
            if (setDiff !== 0) { return setDiff; }

            return i2.pointDiff - i1.pointDiff;
        });
    }

}
