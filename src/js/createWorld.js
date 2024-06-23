import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'
import { placeTower } from './buildTower.js';


// maak een klasse aan voor de achtergrond van de game scene
export class CreateTileMap extends Actor {
    constructor(game) {
        super();
        this.game = game
    }
    /**
     * 
     * @param {*} engine 
     */
    onInitialize(engine) {
        Resources.TiledMapResource.addToScene(engine.currentScene) // laad de tilemap in vanuit resources
    }
}

// maak een klasse voor de grid overlay
export class CreateMapGridOverlay extends Actor {
    constructor(game, cellPositions, cellSize) {
        super();
        this.cellPositions = cellPositions; // de posities van de cellen
        this.cellSize = cellSize; // grote van de cellen
        this.gridCells = []; // sla de hoeveelheid cellen op
        this.game = game // haal de info op uit game.js
    }

    onInitialize(engine) {
        // maak een gridcell aan voor elke cell in de array
        this.cellPositions.forEach(pos => {
            const cell = new GridCell(
                this.game,
                pos.x,
                pos.y,
                this.cellSize,
                this.cellSize
            );


            this.gridCells.push(cell); // zet het in een array

            engine.add(cell); 
        });

    }

}

// maak een klasse voor het maken van gridcellen
class GridCell extends Actor {
    constructor(game, x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,

        });

        this.game = game;
    
    }

    // regel de gebeurtenissen van het klikken op de gridcellen
    onInitialize(engine) {
        this.on('pointerdown', () => {
            if (this.game.buildMode && this.game.typeOfTower && !this.hasTower) {
                placeTower(engine, this.pos.x, this.pos.y, this.width, this.height, this.game.typeOfTower);
                this.game.buildMode = false; // schakel bouwmodus uit
                this.game.typeOfTower = null; // haal het weer leeg zodat er een nieuwe toren gekozen kan worden
                this.hasTower = true; // voorkom 2 torens op 1 cell plaatsen
            }
        });
    }
}