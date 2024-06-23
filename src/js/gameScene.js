import { Scene, Vector } from "excalibur";
import { CreateTileMap, CreateMapGridOverlay } from './createWorld.js';
import { UI } from './ui.js';
import { SpiderEnemySpawner } from './spawnEnemy.js';

export class GameScene extends Scene {

    constructor(game) {
        super();
        this.game = game; // Bewaar de game instantie
    }
    onInitialize(engine) {
        engine.playerHealth = 1000;

        const createTileMap = new CreateTileMap(this.game);
        this.add(createTileMap);

        const ui = new UI(this.game);
        this.add(ui)

        const cellPositions = [
            new Vector(370, 555), new Vector(470, 555), new Vector(570, 555), new Vector(670, 555), 
            new Vector(370, 400), new Vector(470, 400), new Vector(570, 400), new Vector(670, 400), 
            new Vector(370, 235), new Vector(470, 235), new Vector(570, 235), new Vector(670, 235), 
            new Vector(370, 70), new Vector(470, 70), new Vector(570, 70), new Vector(670, 70), 
        ]

        const gridOverlay = new CreateMapGridOverlay(this.game, cellPositions, 96);
        this.add(gridOverlay);

        const spiderSpawner = new SpiderEnemySpawner(engine.coins, this.game);
        spiderSpawner.startSpawning();
    }
}