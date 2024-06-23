import { TiledResource } from '@excaliburjs/plugin-tiled'
import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier alle resources toe
const Resources = {
    purpleUI: new ImageSource('images/purpleTower.png'),
    pinkUI: new ImageSource('images/pinkTower.png'),
    purpleTower: new ImageSource('images/purpleTower.png'),
    pinkTower: new ImageSource('images/pinkTower.png'),
    spiderEnemy: new ImageSource('images/enemy.png'),
    purpleArrow: new ImageSource('images/purpleArrow.png'),
    pinkArrow: new ImageSource('images/pinkArrow.png'),

    TiledMapResource: new TiledResource('images/tilemap2.tmx'),

}

// maak een resourceloader aan zodat de resources opgehaald kunnen worden
const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }