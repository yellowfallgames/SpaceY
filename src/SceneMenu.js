var isTutorial = false;
var chatBoxOut = false;
var loginOut = false;
var registerOut = false;

//CHAT POSTITIONS BEFORE - AFTER
var chatPos = [
    game.config.width - 100, game.config.height-100,    //icono
    game.config.width , game.config.height-100, //base
    game.config.width , game.config.height-100, //frame
    game.config.width + 20, game.config.height-40, //write msg
    game.config.width + 20, game.config.height-40  //send
];
var chatTween = [
    game.config.width - 800, game.config.height-100,    //icono
    game.config.width -800, game.config.height-100, //base
    game.config.width -800, game.config.height-100, //frame
    game.config.width - 780, game.config.height-40, //write msg
    game.config.width - 780, game.config.height-40  //send
];
var chatBase, sendButton, chatbutton, chatFrame, chatWritter;
//LOGIN POSTITIONS BEFORE - AFTER
var loginPos = [
    -game.config.width, game.config.height*0.05,    //icono
    -game.config.width , game.config.height*0.1,    //box
];
var loginTween = [
    game.config.width*0.05, game.config.height*0.05, //icono
    game.config.width*0.05 , game.config.height*0.1, //box
];
var loginBox,loginIcon;

//REGISTER POSTITIONS BEFORE - AFTER
var regisTween = [
    game.config.width/2, game.config.height/2,   //regisbox
    game.config.width/2+150, game.config.height/2+100, //boton confirm
    game.config.width/2+150, game.config.height/2+50, //dch
    game.config.width/2+150, game.config.height/2+50, //izq
];
var regisPos = [
    game.config.width/2, -500,    //regisbox
    game.config.width/2, -500, //ctn nfirm
    game.config.width/2, -500, //dech
    game.config.width/2, -500, //izq

];
var registerBox, registerBtn, nextImg, prevImg;

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
    soundtrack.pistas[1].stop();
    soundtrack.pistas[3].stop();
    
    //FONDOS
    this.bckMenu = this.add.image(game.config.width/2,game.config.height/2,'bckMenu').setScale(0.3);

    var that = this;
    this.spaceYlogo = this.add.image(300,game.config.height-300,'spaceYlogo').setScale(0.2);
    this.tweens.add({
        targets: this.spaceYlogo,
        duration: 1500,
        y: this.spaceYlogo.y-25,
        ease: 'linear',
        yoyo: true,
        repeat: -1,
    });

    //ASIGNACION DE METODO
    this.playButton = this.add.text((game.config.width/8)*3, -1000, 'Jugar', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px'})

    .setInteractive()
    .on('pointerdown', () => this.startGame() )
    .on('pointerover', () => this.enterButtonHoverState(this.playButton) )
    .on('pointerout', () => this.enterButtonRestState(this.playButton) );
    this.playButton.setOrigin(0.5);
    this.easeMe(this.playButton, this, 1);

    this.tutorialButton = this.add.text((game.config.width/2)*4, -1000, 'Tutorial', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px'})

    .setInteractive()
    .on('pointerdown', () => this.enterTutorial() )
    .on('pointerover', () => this.enterButtonHoverState(this.tutorialButton) )
    .on('pointerout', () => this.enterButtonRestState(this.tutorialButton) );
    this.tutorialButton.setOrigin(0.5);
    this.easeMe(this.tutorialButton, this, 2);


    this.optionsButton = this.add.text(-1000, (game.config.height/8)*5, 'Opciones', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px' })

    .setInteractive()
    .on('pointerdown', () => this.enterOptions() )
    .on('pointerover', () => this.enterButtonHoverState(this.optionsButton) )
    .on('pointerout', () => this.enterButtonRestState(this.optionsButton) );
    this.optionsButton.setOrigin(0.5);
    this.easeMe(this.optionsButton, this, 3);
    

    this.contactButton = this.add.text(game.config.width + 1000, (game.config.height/8)*6, 'Contacto', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px' })

    .setInteractive()
    .on('pointerdown', () => this.enterContact() )
    .on('pointerover', () => this.enterButtonHoverState(this.contactButton) )
    .on('pointerout', () => this.enterButtonRestState(this.contactButton) );
    this.contactButton.setOrigin(0.5);
    this.easeMe(this.contactButton, this, 4);


    //API REST
    this.apiButton = this.add.text((game.config.width/2), (game.config.height/8)*7, 'API REST', { fill: '#FEDEBE',fontFamily:'menuFont',fontSize:'60px'})
    .setInteractive()
    .on('pointerdown', () => this.enterAPIREST() )
    .on('pointerover', () => this.enterButtonHoverState(this.apiButton) )
    .on('pointerout', () => this.enterButtonRestState(this.apiButton) );
    this.apiButton.setOrigin(0.5);

    //CHATBOX

    //Chatbox icon
    this.chatbutton = this.add.image(chatPos[0], chatPos[1],'ChatBox_chatIcon')
    .setScale(0.4);
    this.chatbutton.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this ,1 ))
    .on('pointerover', () => this.enterButtonHoverState(this.chatbutton))
    .on('pointerout', () => this.enterButtonRestState(this.chatbutton))
    this.chatbutton.setOrigin(0.5);

    //chatbox base
    this.chatBase = this.add.image(chatPos[2], chatPos[3],'ChatBox_base')
    .setScale(0.4);
    this.chatBase.setOrigin(0.5);

    //chatbox frame
    this.chatFrame= this.add.image(chatPos[4], chatPos[5],'ChatBox_Frame')
    .setScale(0.4);
    this.chatFrame.setOrigin(0.5);

    //chatbox write msg
    this.chatWritter = this.add.image(chatPos[6], chatPos[7],'ChatBox_msgBox')
    .setScale(0.4);
    this.chatWritter.setInteractive()
    //.on('pointerdown', () => this.MovinBoxes(this.chatWritter, game.config.width , game.config.height, chatBoxOut,this) )
    .on('pointerover', () => this.enterButtonHoverState(this.chatWritter) )
    this.chatWritter.setOrigin(0.5);

    //chatbox send
    this.sendButton = this.add.image(chatPos[8], chatPos[9],'ChatBox_SendBtn')
    .setScale(0.4);
    this.sendButton.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this.sendButton, game.config.width , game.config.height, chatBoxOut,this) )
    .on('pointerover', () => this.enterButtonHoverState(this.sendButton) )
    this.sendButton.setOrigin(0.5);

    //LOGIN
    
    //Login box
    this.loginBox = this.add.image(loginPos[2], loginPos[3],'LoginBox')
    .setScale(0.4);
    this.loginBox.setOrigin(0.5);

    //login icon
    this.loginIcon = this.add.image(loginPos[0], loginPos[1],'Login_Icon')
    .setScale(0.4);
    this.loginIcon.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this,2) )
    .on('pointerover', () => this.enterButtonHoverState(this.loginIcon))
    .on('pointerout', () => this.enterButtonRestState(this.loginIcon))
    this.loginIcon.setOrigin(0.5);

    //REGISTER
   
    //register box
    this.registerBox = this.add.image(regisPos[0], regisPos[1],'Register_Form')
    .setScale(0.4);
    this.registerBox.setOrigin(0.5);

    //Register button
    this.registerBtn = this.add.image(regisPos[2], regisPos[3],'Register_Btn')
    .setScale(0.4);
    this.registerBtn.setInteractive()
    .on('pointerdown', () => this.MovinBoxes(this,3) )
    .on('pointerover', () => this.enterButtonHoverState(this.registerBtn) )
    .on('pointerout', () => this.enterButtonRestState(this.registerBtn))
    this.registerBtn.setOrigin(0.5);

    //Register next img
    this.nextImg = this.add.image(regisPos[4], regisPos[5],'Register_Arrow')
    .setScale(0.4);
    this.nextImg.setInteractive()
    //.on('pointerdown', () => this.MovinBoxes(this.nextImg, game.config.width , game.config.height, registerOut) )
    .on('pointerover', () => this.enterButtonHoverState(this.nextImg) )
    .on('pointerout', () => this.enterButtonRestState(this.nextImg))
    this.nextImg.setOrigin(0.5);

    //Register prev img
    this.prevImg = this.add.image(gregisPos[6], regisPos[7],'Register_Arrow')
    .setScale(0.4);
    this.prevImg.setInteractive()
    //.on('pointerdown', () => this.MovinBoxes(this.nextImg, game.config.width , game.config.height, registerOut) )
    .on('pointerover', () => this.enterButtonHoverState(this.prevImg) )
    .on('pointerout', () => this.enterButtonRestState(this.prevImg))
    this.prevImg.setOrigin(0.5);

}
//INTERACTIVIDAD

enterButtonHoverState(boton) {
    boton.setStyle({ fill: '#FE6E00'});
    boton.x = boton.x+movTxt;
    boton.y = boton.y+movTxt;
}

enterButtonRestState(boton) {
    boton.setStyle({ fill: '#FEDEBE' });
    boton.x = boton.x-movTxt;
    boton.y = boton.y-movTxt;
}

//click
startGame() {
    sfx.sounds[0].play();
    this.Rocketeing(this.playButton,this,game.config.width/2,900,2);
}
enterTutorial() {
    soundtrack.pistas[0].stop();
    sfx.sounds[0].play();
    this.tweens.add({
            targets: [this.playButton,this.optionsButton,this.tutorialButton,this.contactButton],
            //delay: 100,
            alpha:0,
            duration: 2000,
            ease: 'Expo.easeOut',
            onComplete: this.scene.start('SceneTutorial')
        });
    //fin transicion
    isTutorial = true;
}

enterOptions() {
    sfx.sounds[0].play();
    this.scene.start('SceneOptions');
}

enterContact() {
    sfx.sounds[0].play();
    this.scene.start('SceneContact');
}

enterAPIREST() {
    sfx.sounds[0].play();
    this.scene.start('SceneREST');
}



enterButtonHoverState(boton) {
    sfx.sounds[1].play();
    boton.setStyle({ fill: '#FE6E00'});
    boton.x = boton.x+movTxt;
    boton.y = boton.y+movTxt;
}

enterButtonRestState(boton) {
    boton.setStyle({ fill: '#FEDEBE' });
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
     this.tutorialButton.setVisible(false);
     isTutorial = false;
     var timedEvent = this.time.addEvent({ delay: yPos+500, callback: function(){this.scene.start('SceneGame'); isTutorial = false;}, callbackScope: this});
 }
//CHATBOX
//sacar el chat 
MovinBoxes(scene, id) 
{
    sfx.sounds[1].play();

    var nX = 0; var nY = 1;
    switch(id)
    {
        case 1: //chatbox : v chatBase, sendButton, chatbutton, chatFrame, chatWritter;

            chatboxStuff = [chatBase,sendButton,chatbutton,chatFrame,chatWritter];
            for (let i = 0; chatboxStuff.length; i++)
            {
                scene.tweens.add({
                    targets: chatboxStuff[i],
                    x: chatTween[nX],
                    y: chatTween[nY],
                    //delay: 100,
                    //aplha: {start: game.config.width / 2, to: game.config.width / 8},
                    duration: 10,
                    ease: 'Expo.easeOut',
                    onComplete: isOut = true
                });
                nX+2;nY+2;
            }
            break;
        case 2: //login loginBox,loginIcon;
            loginStuff = [loginBox,loginIcon];
            for (let i = 0; loginStuff.length; i++)
            {
                scene.tweens.add({
                    targets: loginStuff[i],
                    x: loginTween[nX],
                    y: loginTween[nY],
                    duration: 10,
                    ease: 'Expo.easeOut',
                    onComplete: isOut = true
                });
                nX+2;nY+2;
            }
            break;
        case 3: //register registerBox, registerBtn, nextImg, prevImg;
            registerStuff = [registerBox,registerBtn,nextImg,prevImg];
            for (let i = 0; registerStuff.length; i++)
            {
                scene.tweens.add({
                    targets: registerStuff[i],
                    x: regisTween[nX],
                    y: regisTween[nY],
                    duration: 10,
                    ease: 'Expo.easeOut',
                    onComplete: isOut = true
                });
                nX+2;nY+2;
            }
            break;
    }
        

       
    
}
//LOGIN

//EASINGS
easeMe(boton,scene,nOp){
    var endX;
    var endY;
    switch (nOp)
    {
        case 1: endX = game.config.width / 2; endY = (game.config.height/8)*3; break;
        case 2: endX = game.config.width / 2; endY = (game.config.height/8)*4; break;
        case 3: endX = game.config.width / 2; endY = (game.config.height/8)*5; break;
        case 4: endX = game.config.width / 2; endY = (game.config.height/8)*6; break;
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


