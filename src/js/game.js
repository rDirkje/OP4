import '../css/style.css'
import { Engine } from "excalibur"
import { ResourceLoader } from './resources.js'
import { GameScene } from './gameScene.js'
import { EndScene } from './endScene.js'
import { StartScene } from './startScene.js'
import { BuildTower } from './buildTower.js'

export class Game extends Engine {

    // maak de grote variabelen hier aan
    buildMode; 
    typeOfTower; 
    coins; 
    playerHealth;

    constructor() {
        super({
            width: 1248,
            height: 704,
            maxFps: 60,
        })
        this.buildMode = false; // staat op false zodat er niet direct gebouwd kan worden
        this.typeOfTower = null; // zorg dat dit variabel leeg is
        this.coins = 900; // stel een standaard begin-waarde in
        this.playerHealth = 1000;

        // laad alle resources in
        this.start(ResourceLoader).then(() => {
            // voeg alle scenes toe
            this.add("start", new StartScene(this));
            this.add("game", new GameScene(this));
            this.add("end", new EndScene(this));
            this.goToScene("start"); // start de game in de startscene
        }
        )

    }

    playerTakesDamage() {
        if (this.playerHealth >= 150) {
            this.playerHealth -= 500; // verminder de hp van de player als deze nog boven de 150 is

        } else if (this.playerHealth <= 150) {
            this.goToScene("end") // stuurt door naar de volgende scene bij een een hp lager dan 150
        }
    }

    // zorg dat de game reset

}



new Game()
