import { Scene, Label, Vector, Actor, Color, Font, FontUnit } from "excalibur";

// maak nieuwe klasse aan die ook dient als scene
export class EndScene extends Scene {
    onInitialize(engine) {

        // zet achtergrond kleur
        this.backgroundColor = Color.Black;

        // voeg een label voor tekst toe
        const endLabel = new Label({
            text: 'You lost :( Try again!',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2), // geef het midden van het scherm mee als locatie voor de tekst
            color: Color.White,
            font: new Font({
                family: 'Courier new',
                size: 40,
                unit: FontUnit.Px,
                textAlign: 'center'
            }),
        });

        // voeg het label toe aan de scene
        this.add(endLabel);

        // knopje om de game te restarten
        const endButton = new Actor({
            pos: new Vector(640, 460), // locatie midden onder de tekst
            width: 200,
            height: 50,
            color: Color.Magenta
        });

        // voeg de knop toe
        this.add(endButton);

        // tekst voor op de knop aanmaken
        const endButtonLabel = new Label({
            text: 'Restart',
            pos: new Vector(640, 448),
            font: new Font({
                family: 'Courier new',
                size: 24,
                unit: FontUnit.Px,
                textAlign: 'center',
                color: Color.White
            })
        });

        // voeg de tekst toe
        this.add(endButtonLabel);

        // maak de knop werkend
        endButton.on('pointerup', () => {
            engine.goToScene('game'); // stuurt door de volgende scene
        });
    }
}