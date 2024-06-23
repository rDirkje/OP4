import { Actor, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from "./resources.js";
import { Arrow } from "./arrows.js"


// Klasse voor het bouwen van een toren
export class BuildTower extends Actor {
    constructor(x, y, width, height, sprite, hp) {
        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed // Collisiontype meegeven
        });
        this.z = 10;
        this.hp = hp; // HP meegeven
        this.graphics.use(sprite);


    }

    onInitialize(engine) {
        engine.addTimer(this.shootingTimer); // Timer toevoegen aan de game wanneer de toren gebouwd is
        this.shootingTimer.start(); // Timer aanzetten
    }

    takeDamage(amount) {
        this.hp -= amount; // Wanneer damage, HP erafco
        if (this.hp <= 0) {
            this.kill(); // Verwijder de toren als HP op is
        }
    }


}

// Hier worden hardcoded alle torens ingezet
export class PurpleTower extends BuildTower {
    constructor(x, y, width, height,) {

        super(x, y, width, height, Resources.purpleTower.toSprite(), 200);
        this.shootingTimer = new Timer(() => {
            this.shootArrow();
        }, 1000, true);
    }
    shootArrow() {
        if (!this.scene) {

            return; // Stop de functie als er geen scène beschikbaar is.
        }
        let arrow = new Arrow(this.pos.x + this.width, this.pos.y + this.height / 5, 500, 10, Resources.purpleArrow.toSprite());
        this.scene.add(arrow);
    }

}

export class PinkTower extends BuildTower {
    constructor(x, y, width, height,) {

        super(x, y, width, height, Resources.pinkTower.toSprite(), 500);
        this.shootingTimer = new Timer(() => {
            this.shootArrow();
        }, 2500, true);
    }

    shootArrow() {
        if (!this.scene) {

            return; // Stop de functie als er geen scène beschikbaar is.
        }
        let arrow = new Arrow(this.pos.x + this.width, this.pos.y + this.height / 5, 200, 150, Resources.pinkArrow.toSprite());
        this.scene.add(arrow);
    }
}

// Functie voor het plaatsen van een toren
export function placeTower(engine, x, y, width, height, typeOfTower) {

    let tower; // Variabel waarin het torentype wordt gemaakt

    if (typeOfTower === 'purpleTower') {
        if (engine.coins >= 100) {
            tower = new PurpleTower(x, y, width, height);
            engine.coins -= 100;

        }
    } else if (typeOfTower === 'pinkTower') {
        if (engine.coins > 150) {
            tower = new PinkTower(x, y, width, height);
            engine.coins -= 150;

        }
    }
    engine.add(tower);
}