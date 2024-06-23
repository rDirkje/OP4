import { Actor, ScreenElement, Color, Vector, Label, Font, FontUnit } from "excalibur"
import { Resources } from './resources.js'


// Klasse voor het maken van de User Interface
export class UI extends ScreenElement {
    currencyLabel;
    healthLabel;
    constructor(game) {
        super();
        this.game = game; 
    }

    onPostUpdate() {
        this.currencyLabel.text = `Coins: ${this.game.coins}`;
        this.healthLabel.text = `Health: ${this.game.playerHealth}`;

    }

    onInitialize() {
        this.currencyLabel = new Label({
            text: `Coins: ${this.game.coins}`,
            pos: new Vector(320, 655), 
            color: Color.White,
            font: new Font({
                family: 'Courier new',
                size: 26, 
                unit: FontUnit.Px
            }),
        });

        this.addChild(this.currencyLabel);

        this.healthLabel = new Label({
            text: `Health: ${this.game.playerHealth}`,
            pos: new Vector(520, 655), 
            color: Color.White,
            font: new Font({
                family: 'Courier new',
                size: 26, 
                unit: FontUnit.Px
            }),
        });

        this.addChild(this.healthLabel);

        // Hier wordt een nieuw UI element aangemaakt en toegevoegd
        const purpleUI_Element = new Actor({
            pos: new Vector(60, 615),
            width: 90,
            height: 90,
        });

        purpleUI_Element.graphics.use(Resources.purpleUI.toSprite());
        purpleUI_Element.z = 10;
        this.addChild(purpleUI_Element);

        const pinkUI_Element = new Actor({
            pos: new Vector(160, 590),
            width: 90,
            height: 90,
        });

        pinkUI_Element.graphics.use(Resources.pinkUI.toSprite())
        pinkUI_Element.z = 10;
        this.addChild(pinkUI_Element);

        // Wanneer er op UI element geklikt wordt bouwmodus activeren
        purpleUI_Element.on('pointerdown', () => {
            this.game.buildMode = true;
            this.game.typeOfTower = 'purpleTower';

        });

        pinkUI_Element.on('pointerdown', () => {
            this.game.buildMode = true;
            this.game.typeOfTower = 'pinkTower';
        });

    }

}