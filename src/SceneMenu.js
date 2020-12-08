class SceneMenu extends Phaser.Scene {

    constructor() {

        super("SceneMenu");
    }

    preload() {
        
        //this.load.image("player", directory+"vulp_i1.png");
        //this.load.spritesheet("button", "./Resources/Img/button.png", 185, 80);
        //this.load.image('background',"./Resources/Img/starfield.jpg");
    }

create() {
    if(musica!=undefined && musica.key!='MusicMenu')
    {
        musica.stop();
        musica = this.sound.add('MusicMenu');
        musica.play();
    }
    //EASINGS
  


    //ASIGNACION DE METODO
    this.playButton = this.add.text(game.config.width/2, -100, 'Jugar', { fill: '#0f0'})
    .setInteractive()
    .on('pointerdown', () => this.startGame() )
    .on('pointerover', () => this.enterButtonHoverState(this.playButton) )
    .on('pointerout', () => this.enterButtonRestState(this.playButton) );
    this.playButton.setOrigin(0.5);
    this.easeMe(this.playButton, this, 1);

    this.optionsButton = this.add.text(-100, (game.config.height/8)*4, 'Opciones', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => this.enterOptions() )
    .on('pointerover', () => this.enterButtonHoverState(this.optionsButton) )
    .on('pointerout', () => this.enterButtonRestState(this.optionsButton) );
    this.optionsButton.setOrigin(0.5);
    this.easeMe(this.optionsButton, this, 2);
    
    this.contactButton = this.add.text(game.config.width + 100, (game.config.height/8)*5, 'Contacto', { fill: '#0f0' })
    .setInteractive()
    .on('pointerdown', () => this.enterContact() )
    .on('pointerover', () => this.enterButtonHoverState(this.contactButton) )
    .on('pointerout', () => this.enterButtonRestState(this.contactButton) );
    this.contactButton.setOrigin(0.5);
    this.easeMe(this.contactButton, this, 3);

    


    
}
//INTERACTIVIDAD

enterButtonHoverState(boton) {
    boton.setStyle({ fill: '#ff0'});
    boton.x = boton.x+movTxt;
    boton.y = boton.y+movTxt;
}

enterButtonRestState(boton) {
    boton.setStyle({ fill: '#0f0' });
    boton.x = boton.x-movTxt;
    boton.y = boton.y-movTxt;
}

//click
startGame() {
    sfx.sounds[0].play();
    this.Rocketeing(this.playButton,this,game.config.width/2,900,2);
}

enterOptions() {
    sfx.sounds[0].play();
    this.scene.start('SceneOptions');
}

enterContact() {
    sfx.sounds[0].play();
    this.scene.start('SceneContact');
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

 //USALO COMO ES DEBIDO PEPE :D
 Rocketeing (object,scene, xPos, yPos, shake)
 {   
     var dir = 1;
     var loopTime = 10;
     var motion;    //landing - launching
     
    
     if(yPos<0){    //si está lanzandose
         motion = 'Expo.easeOut';
        }
    else{   //si aterriza
            motion = 'Expo.easeIn'
        }
     scene.tweens.add({
         targets: object,
         props: {
             x: { value: 
                     function () { 
                     return xPos + (dir*=-1 )*shake;
                     },
                 ease:'Linear',
                 duration : loopTime, //cuanto mas bajo más potente
                 yoyo: true,    //ida y vuelta
                 repeat:-1,  // que se repita en bucle este ease en x
                 },
 
             y: { 
                 value: function () { 
                     return object.y -= yPos; 
                 },
                 ease: motion,
                 duration: yPos  //que el ease en y dure 3s
                 },
         },
         duration:100,  //que todo el tween dure 
     });
     this.contactButton.setVisible(false);
     this.optionsButton.setVisible(false);
     var timedEvent = this.time.addEvent({ delay: yPos+500, callback: function(){this.scene.start('SceneGame')}, callbackScope: this});
 }

//EASINGS
easeMe(boton,scene,nOp) {
    var endX;
    var endY;
    switch (nOp)
    {
        case 1: endX = game.config.width / 2; endY = (game.config.height/8)*3; break;
        case 2: endX = game.config.width / 2; endY = (game.config.height/8)*4; break;
        case 3: endX = game.config.width / 2; endY = (game.config.height/8)*5; break;
        //case 4: endX = game.config.width / 2; endY = game.config.height / 2; break;
        default: break;
    }
    scene.tweens.add({
        targets: boton,
        x: endX,
        y: endY,
        delay: nOp * 100,
        //aplha: {start: game.config.width / 2, to: game.config.width / 8},
        duration: 500,
        ease: 'Circ.easeOut',
        repeat: 0,
        yoyo: false,
        //delay:delay,

        //onComplete: this.EnterOnMachine.bind(this)
    });
}

}