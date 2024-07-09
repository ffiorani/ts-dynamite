import { Gamestate, BotSelection, Round } from '../models/gamestate';
import * as tf from '@tensorflow/tfjs'

class Bot {
    private model: tf.Sequential;
    private currentLoss = 0;
    private currentRound = 0;

    constructor() {
        this.model = this.createModel();
    }

    makeMove(gamestate: Gamestate): BotSelection {
        this.currentRound++;

        gamestate.rounds

        return 'R';
    }

    private createModel(): tf.Sequential {
        const model = tf.sequential();
        model.add(tf.layers.lstm({
            units: 32,
            returnSequences: true
        }));

        model.add(tf.layers.dense({
            units: 5,
            activation: 'softmax'
        }));

        model.compile({
            loss: 'categorical_cross_entropy',
            optimizer: tf.train.rmsprop(0.002)
        });

        return model;
    }

    private onlineCrossEntropy(round: Round, prediction) {
        return -Math.log2(this.model())
    }
}

export = new Bot();