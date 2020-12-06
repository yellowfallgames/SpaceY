class Counter{
    constructor(scene, initTime) {
        
        // 2:30 in seconds
        this.initialTime = initTime;

        this.textMinutes = scene.add.text(timerMinutos.x, timerMinutos.y+4,this.formatTimeMinutes(this.initialTime),{
            fontSize:'60px',
            fontStyle:'bold',
            fill:'#ffffff',
        }).setOrigin(0.5);

        this.textSeconds = scene.add.text(timerSegundos.x+1, timerSegundos.y+7,this.formatTimeSeconds(this.initialTime),{
            fontSize:'50px',
            fontStyle:'bold',
            fill:'#ffffff',
        }).setOrigin(0.5);

        // Each 1000 ms call onEvent
        this.timedEvent = scene.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });

        this.stop = false;

    }

    formatTimeMinutes(seconds){
        if (seconds <= 0) {

            DefeatCondition();
            this.stop = true;
        }

        // Minutes
        var minutes = Math.floor(seconds/60);

        // Returns formated time
        return `${minutes}`;
    }

    formatTimeSeconds(seconds){

        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${partInSeconds}`;
    }

}

function onEvent ()
{
    if (!this.stop) {

        this.initialTime -= 1; // One second
        this.textMinutes.setText(this.formatTimeMinutes(this.initialTime));
        this.textSeconds.setText(this.formatTimeSeconds(this.initialTime));
    }
    
}

//Fuente: https://phaser.discourse.group/t/countdown-timer/2471/3