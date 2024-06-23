import { Actor, ScreenElement, Color, Vector, Label, Font, FontUnit } from "excalibur"
import { Resources } from './resources.js'


// maak een klasse voor de ui
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
        // maak een label om te laten zien hoeveel coins je hebt
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

        // maak een label om te laten zien hoeveel hp je hebt
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

        // maak nieuw ui element aan voor de display van de paarse toren
        const purpleUI_Element = new Actor({
            pos: new Vector(60, 615),
            width: 90,
            height: 90,
        });

        purpleUI_Element.graphics.use(Resources.purpleUI.toSprite());
        purpleUI_Element.z = 10;
        this.addChild(purpleUI_Element);

        // maak nieuw ui element aan voor de display van de roze toren
        const pinkUI_Element = new Actor({
            pos: new Vector(160, 590),
            width: 90,
            height: 90,
        });

        pinkUI_Element.graphics.use(Resources.pinkUI.toSprite())
        pinkUI_Element.z = 10;
        this.addChild(pinkUI_Element);

        // wanneer op de display van de paarse of roze toren geklikt word activeer dan de bouwmodus
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