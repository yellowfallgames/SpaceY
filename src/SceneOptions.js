var slider;
const COLOR_PRIMARY = 0x6dbf67;
const COLOR_LIGHT = 0x00ff04;
const COLOR_DARK = 0x006302;

var sliderMusic = undefined;
var sliderSfx = undefined;

class SceneOptions extends Phaser.Scene {

    constructor() {

        super("SceneOptions");
    }

    preload()
    {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        }); 
    }

    create() {
        var txt1 = (musica ==undefined) ? '0' : musica.volume;
        var txt2 = (sfx == undefined) ? '0' : sfx.volume;
        var print0 = this.add.text(600, 100, txt1);
        var print1 = this.add.text(600, 150, txt2);
        

        //Slider musica
        //if(sliderMusic == undefined)
        sliderMusic = this.rexUI.add.slider({
            x: 400,
            y: 107,
            width: 300,
            height: 20,
            orientation: 'x',
            value: (musica ==undefined) ? '0' : musica.volume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                print0.text = Math.ceil(value*100);
                //if(musica!=undefined)
                    musica.setVolume(value);
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'click', // 'drag'|'click'
        })
            .layout();

        //Slider SFX
        //if(sliderSfx == undefined)
        sliderSfx = this.rexUI.add.slider({
            x: 400,
            y: 157,
            width: 300,
            height: 20,
            orientation: 'x',
            value: (sfx ==undefined) ? '0' : sfx.volume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
            indicator: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),

            valuechangeCallback: function (value) {
                print1.text = Math.ceil(value*100);
                //if(sfx!=undefined)
                //{
                    sfx.volume = value;
                    sfx.sounds.forEach(element => {
                        element.volume = sfx.volume;
                    });
                //}
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'click', // 'drag'|'click'
        })
            .layout();



        this.volumeButton = this.add.text(100, 100, 'Music volume', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.switchMusic() )
        .on('pointerover', () => this.enterButtonHoverState(this.volumeButton) )
        .on('pointerout', () => this.enterButtonRestState(this.volumeButton) );

        this.sfxButton = this.add.text(100, 150, 'SFX volume', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.switchSfx() )
        .on('pointerover', () => this.enterButtonHoverState(this.sfxButton) )
        .on('pointerout', () => this.enterButtonRestState(this.sfxButton) );

        /*
        this.sfxButton = this.add.text(100, 200, 'Ambient volume', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterOptions() )
        .on('pointerover', () => this.enterButtonHoverState(this.sfxButton) )
        .on('pointerout', () => this.enterButtonRestState(this.sfxButton) );
        */

        this.backButton = this.add.text(game.config.width-200, game.config.height-100, 'Atrás', { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.enterBack() )
        .on('pointerover', () => this.enterButtonHoverState(this.backButton) )
        .on('pointerout', () => this.enterButtonRestState(this.backButton) );

    }

    switchMusic() {
        if(sliderMusic.value==1){
            sliderMusic.value = 0;
            console.log("De 100 a 0");
        }
        else if(sliderMusic.value == 0){
            sliderMusic.value = 1;
            console.log("De 0 a 100");
        } else(sliderMusic.value != 0 || sliderMusic.value != 1)
            sliderMusic.value = Math.round(sliderMusic.value);

        sfx.sounds[0].play();

    }

    switchSfx() {
        if(sliderSfx.value==1){
            sliderSfx.value = 0;
            console.log("De 100 a 0");
        }
        else if(sliderSfx.value == 0){
            sliderSfx.value = 1;
            console.log("De 0 a 100");
        } else(sliderSfx.value != 0 || sliderSfx.value != 1)
        sliderSfx.value = Math.round(sliderSfx.value);
            
        sfx.sounds[0].play();

    }

    enterContact() {
        //this.scene.start(SceneContact);
    }

    enterBack() {
        sfx.sounds[0].play();
        this.scene.start('SceneMenu');
    }

    enterButtonHoverState(boton) {
        sfx.sounds[1].play();
        boton.setStyle({ fill: '#ff0'});
        boton.x = boton.x+movTxt;
        boton.y = boton.y+movTxt;
    }
    
    enterButtonRestState(boton) {
        boton.setStyle({ fill: '#0f0' });
        boton.x = boton.x-movTxt;
        boton.y = boton.y-movTxt;
    }

}