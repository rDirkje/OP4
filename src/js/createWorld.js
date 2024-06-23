import { Actor, Vector } from "excalibur"
import { Resources } from './resources.js'
import { placeTower } from './buildTower.js';


// Klasse voor het maken van de achtergrond map
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
        Resources.TiledMapResource.addToScene(engine.currentScene)
    }
}

// Klasse voor het maken van de grid overlay
export class CreateMapGridOverlay extends Actor {
    constructor(game, cellPositions, cellSize) {
        super();
        this.cellPositions = cellPositions; // Dit zijn de posities van de cellen waarop uiteindlijk torens komen
        this.cellSize = cellSize; // Hieruit komt de grote van de cellen
        this.gridCells = []; // Hierin worden de hoeveelheid cellen opgeslagen
        this.game = game // Dit haalt alle informatie uit game.js op
    }

    onInitialize(engine) {
        // Maakt voor elke ingevoerde positie/cell in de array een gridcell aan
        this.cellPositions.forEach(pos => {
            const cell = new GridCell(
                this.game,
                pos.x,
                pos.y,
                this.cellSize,
                this.cellSize
            );


            this.gridCells.push(cell); // Zet de cells in een array

            engine.add(cell); // Voegt de cells toe aan de game
        });
        console.log(this.gridCells)

    }

}

// Klasse voor het maken van een gridcell
class GridCell extends Actor {
    constructor(game, x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,

        });

        this.game = game; // Game ophalen zodat ie meegegeven kan worden aan de functie
    
    }

    // Wanneer er wordt geklikt op een gridcell, zet bouwmodus uit en type toren weer leeg
    onInitialize(engine) {
        this.on('pointerdown', () => {
            if (this.game.buildMode && this.game.typeOfTower && !this.hasTower) {
                placeTower(engine, this.pos.x, this.pos.y, this.width, this.height, this.game.typeOfTower);
                this.game.buildMode = false; // Schakel bouwmodus uit na plaatsen
                this.game.typeOfTower = null; // Reset de geselecteerde toren
                this.hasTower = true; // Zorgt dat er niet nog een toren geplaatst kan worden
            }
        });
    }
}