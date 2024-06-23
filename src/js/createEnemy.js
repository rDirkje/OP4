import { Actor, Vector, CollisionType, Timer } from "excalibur";
import { Resources } from "./resources.js";
import { BuiltTower } from "./buildTower.js";
import { Arrow } from "./arrows.js";
import { Game } from "./game.js";


export class CreateEnemy extends Actor {
    constructor(position, velocity, hp, damage, sprite) {
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

        if (event.other instanceof BuiltTower) {
            this.targetTower = event.other; // Stel de toren in als het doelwit
            this.attackTimer.start(); // Start de aanvalstimer als de vijand een toren raakt
        }
    }
}

export class SpiderEnemy extends CreateEnemy {
    constructor(position, coins) {
        super(position, -100, 500, 50, Resources.spiderEnemy.toSprite());
        this.attackTimer = new Timer(() => this.attack(), 500, true);
        this.value = 50;
        this.coins = coins;
        this.enemiesKilled = 0;

    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.onDeath(this.coins);
        }

    }

    onDeath() {
        this.kill(); // Verwijder de vijand uit het spel
        this.coins += 20

        if (this.attackTimer) {
            this.attackTimer.stop();  // Zorg ervoor dat de timer stopt wanneer de vijand sterft
        }
        if (this.targetTower) {
            this.targetTower = null;  // Verwijder de referentie naar de toren
        }
    }

    onInitialize(engine) {
        super.onInitialize(engine);
        engine.addTimer(this.attackTimer);
    }

    attack() {
        if (this.targetTower && !this.targetTower.isKilled()) {
            this.targetTower.takeDamage(this.damage);
        } else {
            this.attackTimer.stop(); // Stop de timer als de toren vernietigd is
            this.vel = this.originalVelocity;
        }

    }

    onCollisionEnd(event) {
        if (event.other === this.targetTower) {
            this.targetTower = null; // Verwijder het doelwit als de toren vernietigd is
            this.attackTimer.stop(); // Stop de aanvalstimer
            this.vel = this.originalVelocity;

        }
    }

    update(engine, delta) {
        super.update(engine, delta);
        // Controleer of de vijand de linkerzijde van het scherm heeft bereikt
        if (this.pos.x <= 0) {
            engine.playerTakesDamage();
            this.kill();
        }
    }
}
