export class ModelManager {
    constructor() {
        this.models = {
            1: () => import('./models/randomModel.js').then(m => new m.RandomModel()),
            2: () => import('./models/alwaysNoModel.js').then(m => new m.AggressiveModel()),
            3: () => import('./models/alwaysYesModel.js').then(m => new m.GoodModel()),
            4: () => import('./models/titForTatModel.js').then(m => new m.TitForTatModel()),
            5: () => import('./models/trustIssuesModel.js').then(m => new m.TrustIssuesModel()),
            6: () => import('./models/noModel.js').then(m => new m.NoModel()),
            7: () => import('./models/riskyModel.js').then(m => new m.RiskyModel()),
            8: () => import('./models/copyModel.js').then(m => new m.CopyModel()),
            9: () => import('./models/oppositeModel.js').then(m => new m.OppositeModel()),
            10: () => import('./models/strategicModel.js').then(m => new m.StrategyModel()),
            11: () => import('./models/adaptiveModel.js').then(m => new m.AdaptiveStrategyModel()),
            12: () => import('./models/reactiveModel.js').then(m => new m.ReactiveModel()),
            13: () => import('./models/greedyModel.js').then(m => new m.GreedyModel()),
            14: () => import('./models/gemmaModel.js').then(m => new m.GemmaModel()),
            15: () => import('./models/dorkModel.js').then(m => new m.DorkModel()),
            16: () => import('./models/fakeTitForTatModel.js').then(m => new m.FakeTitForTatModel()),
            17: () => import('./models/forgivingModel.js').then(m => new m.ForgivingModel()),
            18: () => import('./models/thinkingModel.js').then(m => new m.ThinkingModel()),
            19: () => import('./models/revolverModel.js').then(m => new m.RevolverModel()),
            20: () => import('./models/visibleChanceModel.js').then(m => new m.VisibleChanceModel())
        };

        this.currentModel = null;
        this.loadRandomModel();
    }

    async loadRandomModel() {
        const randomKey = Math.floor(Math.random() * Object.keys(this.models).length) + 1;
        this.currentModel = await this.models[randomKey]();
    }

    async setModel(modelName) {
        if (this.models[modelName]) {
            this.currentModel = await this.models[modelName]();
        } else {
            throw new Error(`Model ${modelName} does not exist`);
        }
    }

    getDecision(index) {
        if (!this.currentModel) {
            throw new Error('No model is currently loaded');
        }
        return this.currentModel.decide(index);
    }
}