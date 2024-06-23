import { Vector } from "excalibur";
import { SpiderEnemy } from "./createEnemy";

const spawnLocations = [
    new Vector(1270, 70),
    new Vector(1270, 235),
    new Vector(1270, 400),
    new Vector(1270, 555),

]
export function spawnEnemy(engine) {
    const spiderEnemy = new SpiderEnemy(position)

    engine.add(spiderEnemy);
}

export class SpiderEnemySpawner {
    constructor(coins, engine, maxEnemies = 10) {
        this.engine = engine;
        this.coins = coins
        this.maxEnemies = maxEnemies;
        this.currentEnemies = 0;

    }

    getRandomPosition() {
        const randomIndex = Math.floor(Math.random() * spawnLocations.length);
        return spawnLocations[randomIndex];
    }

    getRandomInterval() {
        return Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
    }

    spawnEnemy(engine, game) {
        if (this.currentEnemies < this.maxEnemies) {
            const position = this.getRandomPosition();
            const enemy = new SpiderEnemy(position, this.coins);
            enemy.on('kill', () => {
                this.currentEnemies--;
            });
            this.engine.add(enemy);
            this.currentEnemies++;
        }
        this.scheduleNextSpawn();
    }

    scheduleNextSpawn() {
        const nextInterval = this.getRandomInterval();
        setTimeout(() => this.spawnEnemy(), nextInterval);
    }

    startSpawning() {
        this.scheduleNextSpawn();
    }
}