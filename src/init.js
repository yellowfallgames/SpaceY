var config = {
    width: 1024,
    height: 720,
    parent: "container",
    type: Phaser.AUTO,
    /*scene: {
        preload: preload,
        create: create,
        update: update     
    },//*/
    scene:[SceneMenu, SceneGame, SceneContact, SceneOptions],
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

