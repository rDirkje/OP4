import { Scene, Label, Vector, Actor, Color, Font, FontUnit } from "excalibur";

export class EndScene extends Scene {
    onInitialize(engine) {
        this.backgroundColor = Color.Black;
        const endLabel = new Label({
            text: 'You lost :( Try again!',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            color: Color.White,
            font: new Font({
                family: 'Courier new',
                size: 40,
                unit: FontUnit.Px,
                textAlign: 'center'
            }),
        });
        this.add(endLabel);

        const endButton = new Actor({
            pos: new Vector(640, 460),
            width: 200,
            height: 50,
            color: Color.Magenta
        });

        this.add(endButton);

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

        this.add(endButtonLabel);

        endButton.on('pointerup', () => {
            engine.goToScene('game');
        });
    }
}