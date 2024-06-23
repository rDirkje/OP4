import { Vector } from "excalibur";
import { SpiderEnemy } from "./createEnemy";

// geef de locaties door waar de spinnen vandaan komen
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
    constructor(coins, engine, maxEnemies = 8) {
        this.engine = engine;
        this.coins = coins
        this.maxEnemies = maxEnemies;
        this.currentEnemies = 0;

    }

    // laat de spinnen random op 1 van de 4 locaties spawnen
    getRandomPosition() {
        const randomIndex = Math.floor(Math.random() * spawnLocations.length);
        return spawnLocations[randomIndex];
    }

    // geef een random pauze tussen de spinnen die spawnen
    getRandomInterval() {
        return Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
    }

    // spawn de spinnen in
    spawnEnemy(engine, game) {
        if (this.currentEnemies < this.maxEnemies) {
            const position = this.getRandomPosition();
            const enemy = new SpiderEnemy(position, this.coins);
            enemy.on('kill', () => {
                this.currentEnemies--; // geef aan dat er minder spinnen in het speelveld zijn
            });
            this.engine.add(enemy);
            this.currentEnemies++; // geef aan dat er weer meer spinnen in het speelveld zijn
        }
        this.scheduleNextSpawn();
    }

    // zorg dat de volgende spin ook zal spawnen
    scheduleNextSpawn() {
        const nextInterval = this.getRandomInterval();
        setTimeout(() => this.spawnEnemy(), nextInterval);
    }

    // begin de spawning cyclus
    startSpawning() {
        this.scheduleNextSpawn();
    }
}