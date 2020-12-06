var config = {
    width: 1600,
    height: 900,
    parent: "container",
    type: Phaser.AUTO,
    autoCenter: true,
    /*scene: {
        preload: preload,
        create: create,
        update: update     
    },//*/

    scene:[  SceneLogos, SceneMenu,SceneGame,SceneContact, SceneOptions],

    physics: {
        default: "arcade",
        arcade: {
            debug:false,
            gravity: {
                y: 0,
                debug: false
            }
        }
    }
}

var game = new Phaser.Game(config);

