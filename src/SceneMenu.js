class SceneMenu extends Phaser.Scene {

    constructor() {

        super("SceneMenu");
    }
    preload() {

        this.load.image("player", directory+"vulp_i1.png");
    }
    create(){
        //Botón con texto
        var texto;
        console.log('Creando escena menú');
        texto = this.add.text(game.config.width/2, game.config.height/2, 'JUGAR',{
            fontsize:'40 px',
            fill: '#ffffff'
        }).setOrigin(0.5).setInteractive();
    

        texto.on('pointerdown',()=>{
            console.log('Cambiando a escena 2');
            this.scene.start('SceneGame');
        });

        //Botón con sprite
        var btn;
        btn = this.add.image(game.config.width/4, 500, "player");
        btn.setInteractive();

        btn.on('pointerdown',()=>{
            console.log('Cambiando a escena 2');
            this.scene.start('SceneGame');
        });


    }

}