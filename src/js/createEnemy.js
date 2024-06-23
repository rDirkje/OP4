import { Actor, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from "./resources.js";
import { BuildTower } from "./buildTower.js";
import { Arrow } from "./arrows.js";
import { Game } from "./game.js";

// maak nieuwe klasse aan die je kan manipuleren
export class CreateEnemy extends Actor {
    constructor(position, velocity, hp, damage, sprite) { // geef nodige parameters mee
        super({
            pos: position,
            vel: new Vector(velocity, 0),
            collisionType: CollisionType.Active,
            height: 80,
            width: 80,

        })

        this.hp = hp;
        this.enemiesKilled = 0;
        this.damage = damage;
        this.originalVelocity = new Vector(velocity, 0)
        this.z = 10;

        this.graphics.use(sprite)


    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {

        if (event.other instanceof BuildTower) {
            this.targetTower = event.other; // geef een toren mee als doel
            this.attackTimer.start(); // wanneer een spin de toren raakt de attacktimer starten
        }
    }
}

// maak een klasse aan voor de individuele tegenstanders
export class SpiderEnemy extends CreateEnemy {
    constructor(position, coins) {
        super(position, -100, 500, 50, Resources.spiderEnemy.toSprite()); // zet de afbeelding meegegeven uit resources om naar een sprite
        this.attackTimer = new Timer(() => this.attack(), 500, true);
        this.value = 50;
        this.coins = coins;
        this.enemiesKilled = 0;

    }

    // regel de schade die een spin krijgt
    takeDamage(damage) {
        this.hp -= damage;
        // bij een hp lager dan 0 of 0 doorsturen naar volgende gebeurtenis
        if (this.hp <= 0) { 
            this.onDeath(this.coins); 
        }

    }

    // regel wat gebeurt als de spin doodgaat
    onDeath() {
        this.kill(); // verwijderd de spin uit de game
        this.coins += 20

        if (this.attackTimer) {
            this.attackTimer.stop();  // laat de timer stoppen wanneer de spin verdwijnt
        }
        if (this.targetTower) {
            this.targetTower = null;  // verwijder het doel van de spin
        }
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        engine.addTimer(this.attackTimer); // voeg de attacktimer toe 
    }

    // regel de aanvallen
    attack() {
        if (this.targetTower && !this.targetTower.isKilled()) {
            this.targetTower.takeDamage(this.damage);
        } else {
            this.attackTimer.stop(); // timer stopt als de toren verdwenen is
            this.vel = this.originalVelocity;
        }

    }


    onCollisionEnd(event) {
        if (event.other === this.targetTower) {
            this.targetTower = null; // haal het doelwit weg
            this.attackTimer.stop(); // stop de attacktimer
            this.vel = this.originalVelocity;

        }
    }

    update(engine, delta) {
        super.update(engine, delta);
        // kijk of de spin de linkerkant heeft geraakt
        if (this.pos.x <= 0) {
            engine.playerTakesDamage();
            this.kill();
        }
    }
}
