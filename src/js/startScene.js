import { Scene, Label, Vector, Actor, Color, Font, FontUnit } from "excalibur";

export class StartScene extends Scene {
    onInitialize(engine) {

        this.backgroundColor = Color.Black;

        const textLabel = new Label({
            text: 'Do not let the enemies get to close to your village, Goodluck!',
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            color: Color.White,
            font: new Font({
                family: 'Courier new',
                size: 30,
                unit: FontUnit.Px,
                textAlign: 'center'
            }),
        });
       
        this.add(textLabel)

        const startButton = new Actor({
            pos: new Vector(640, 460),
            width: 200,
            height: 50,
            color: Color.Magenta
        });

        this.add(startButton);

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

        this.add(startButtonLabel);

        startButton.on('pointerup', () => {
            engine.goToScene('game');
        });
    }
}