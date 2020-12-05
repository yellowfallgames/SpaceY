var config = {
    width: 1600,
    height: 900,
    parent: "container",
    type: Phaser.AUTO,
    /*scene: {
        preload: preload,
        create: create,
        update: update     
    },//*/
    scene:[SceneLogos, SceneGame, SceneMenu, SceneContact, SceneOptions],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0,
                debug: false
            }
        }
    }
}

var game = new Phaser.Game(config);

