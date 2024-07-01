import { RandomModel } from './models/randomModel.js';
import { GoodModel } from './models/alwaysYesModel.js';
import { AggressiveModel } from './models/alwaysNoModel.js';
import { TitForTatModel } from './models/titForTatModel.js';
import { TrustIssuesModel } from './models/trustIssuesModel.js';

class ModelManager{
    constructor(){
        this.models = {
            random: new RandomModel(),
            aggressive: new AggressiveModel(),
            good: new GoodModel(),
            tit: new TitForTatModel(),
            trustIssues: new TrustIssuesModel()
        }

        this.currentModel = this.models.random;
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