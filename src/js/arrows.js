import { Actor, Color, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";
import { SpiderEnemy } from "./createEnemy";

// maak een classe voor de pijlen van de torens
export class Arrow extends Actor {
    constructor(x, y, speed, damage, arrowSprite) { // geef de nodige parameters mee
        super({
            pos: new Vector(x, y),
            width: 5,
            height: 5,
            collisionType: CollisionType.Passive,
        });
        this.arrowSprite = arrowSprite;
        this.graphics.use(arrowSprite) 
        this.vel = new Vector(speed, 0);
        this.damage = damage;
        this.speed = speed

    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.onCollision(event));
    }

    onCollision(event) {
        if (event.other instanceof SpiderEnemy) {
            event.other.takeDamage(this.damage);
            this.kill();
        }
    }
}