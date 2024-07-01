import { RandomModel } from './models/randomModel.js';
import { GoodModel } from './models/alwaysYesModel.js';
import { AggressiveModel } from './models/alwaysNoModel.js';
import { TitForTatModel } from './models/titForTatModel.js';
import { TrustIssuesModel } from './models/trustIssuesModel.js';
import { NoModel } from './models/noModel.js';
import { RiskyModel } from './models/riskyModel.js';

class ModelManager{
    constructor(){
        this.models = {
            1: new RandomModel(),
            2: new AggressiveModel(),
            3: new GoodModel(),
            4: new TitForTatModel(),
            5: new TrustIssuesModel(),
            6: new NoModel(),
            7: new RiskyModel()
        }

        this.currentModel = this.models[(Math.floor(Math.random() * Object.keys(this.models).length)) + 1];
        console.log(this.currentModel);
    }

    setModel(modelName){
        if(this.models[modelName]){
            this.currentModel = this.models[modelName];
        }
        else{
            throw new Error(`Model ${modelName} does not exist`);
        }
    }

    getDecision(){
        return this.currentModel.decide();
    }
}

export const modelManager = new ModelManager();