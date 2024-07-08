import { Gamestate, BotSelection } from "../models/gamestate";

class Bot {
    private maxDynamites = 100;

    public makeMove(gamestate: Gamestate): BotSelection {
        if (gamestate.rounds.length === 0) {
            return 'D';
        }

        const [p1DynamiteCount, p2DynamiteCount] = this.countDynamitesUsed(gamestate);
        const opponentPreviousChoice = gamestate.rounds[gamestate.rounds.length - 1].p2;

        if (opponentPreviousChoice === 'D' && p2DynamiteCount < this.maxDynamites) {
            return 'W';
        } else if (!(opponentPreviousChoice === 'W') && p1DynamiteCount < this.maxDynamites) {
            return 'D';
        } else if (opponentPreviousChoice === 'R') {
            return 'P';
        } else if (opponentPreviousChoice === 'S') {
            return 'R';
        } else {
            return 'P'
        }
    }

    private countDynamitesUsed(gamestate: Gamestate): number[] {
        let [p1DynamiteCount, p2DynamiteCount] = [0, 0];
        for (const round of gamestate.rounds) {
            if (round.p1 === 'D') {
                p1DynamiteCount++;
            }
            if (round.p2 == 'D') {
                p2DynamiteCount++;
            }
        }
        return [p1DynamiteCount, p2DynamiteCount];
    }
}

export = new Bot();