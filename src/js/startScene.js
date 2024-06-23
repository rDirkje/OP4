import { Scene, Label, Vector, Actor, Color, Font, FontUnit } from "excalibur";

// maak nieuwe klasse aan die ook dient als scene
export class StartScene extends Scene {
    onInitialize(engine) {

        // zet achtergrond kleur
        this.backgroundColor = Color.Black; 

        // voeg een label voor tekst toe
        const textLabel = new Label({
            text: 'Do not let the enemies get to close to your village, Goodluck!',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2), // geef het midden van het scherm mee als locatie voor de tekst
            color: Color.White,
            font: new Font({
                family: 'Courier new', 
                size: 30, 
                unit: FontUnit.Px,
                textAlign: 'center'
            }),
        });

        // voeg het label toe aan de scene
        this.add(textLabel) 

        // knopje om de game te starten
        const startButton = new Actor({
            pos: new Vector(640, 460), // locatie midden onder de tekst
            width: 200,
            height: 50,
            color: Color.Magenta
        });

        // voeg de knop toe
        this.add(startButton);

        // tekst voor op de knop aanmaken
        const startButtonLabel = new Label({
            text: 'Start',
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
        this.add(startButtonLabel);

        // maak de knop werkend
        startButton.on('pointerup', () => {
            engine.goToScene('game'); // stuurt door de volgende scene
        });
    }
}