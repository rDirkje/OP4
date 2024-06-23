import { Scene, Label, Vector, Color, Font, FontUnit } from "excalibur";

export class EndScene extends Scene {
    onInitialize(engine) {
        this.backgroundColor = Color.Black;
        const endLabel = new Label({
            text: 'Je hebt verloren! Klik op enter om overnieuw te beginnen',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 40,
                unit: FontUnit.Px,
                textAlign: 'center'
            }),
        });
        this.add(endLabel);

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === 'Enter') {
                engine.resetGame();
                engine.goToScene('game');

            }
        });
    }
}