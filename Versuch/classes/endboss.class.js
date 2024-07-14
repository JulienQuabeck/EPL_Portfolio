class Endboss extends MovableObject {

    height = 500;
    width = 250;
    y = -20;

    EndbossIsDead = false;
    movementBorderLeft = 0; //2300
    movementBorderRight = 4000;
    hadFirstContact = false;
    firstContactCountdown = 0;

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_INTRO = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    offset = {
        top: 80, // 80
        left: 10, // 10
        right: 0, // 0
        bottom: 0 // 0
    };

    lastHit = 0;
    newHit;
    hitEndboss = false;
    attacksPepe = false;
    chickenAttack = new Audio('audio/chicken_attack.mp3');
    chicken_hurt = new Audio('audio/chicken_hurt.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_INTRO);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2600;
        this.animate();
    }

    /**
     * This function plays the dead-Animation of the Endboss
     */
    EndbossDying() {
        this.playAnimation(this.IMAGES_DEAD);
        this.EndbossIsDead = true;
        //dead-sound einfügen
    }

    /**
     * This function plays the hurt-animation of the Endboss
     */
    EndbossGettingHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (mute == false) {
            this.chicken_hurt.play();
        }
    }

    /**
     * This function starts thh the dead or the hurt animation of the endboss
     */
    EndbossHurtAndDeadAnimation() {
        if (this.isDead()) {
            this.EndbossDying();
        } else if (this.isHurt()) {
            this.EndbossGettingHurt();
        }
    }

    /**
     * This function starts the attack-animation of the Endboss 
     */
    Endbossattacks() {
        if (this.isColliding(world.character)) {
            this.playAnimation(this.IMAGES_ATTACK);
            if (mute == false) {
                this.chickenAttack.play();
            }
        }
    }

    clearAllIntervals() {
        this.EndbossHurtAndDeadAnimation();
        if (this.EndbossIsDead) {
            setTimeout(() => {
                clearInterval(3);
                clearInterval(2);
            }, 200);
        }
    }

    /**
    * This function starts the moving animation of the chicken
    */
    animate() {
        setInterval(() => {
            this.playWalkingOrIntroAnimations();
            this.firstContactCountdown++;
            this.firstContact();
            this.Endbossattacks();
            if (this.attacksPepe) {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 200);
        setInterval(() => {
            this.clearAllIntervals();
        }, 200);
    }

    /**
     * This function switches from the intro to the walking animation
     * @param {int} i = countdown for stopping intro- and start the walking animation
     */
    playWalkingOrIntroAnimations() {
        if (this.firstContactCountdown <10) {
            this.playAnimation(this.IMAGES_INTRO);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * This function checks, if Pepe and the Endboss had their first contact or not
     */
    firstContact(){
        if (world.character.x > 1900 && !this.hadFirstContact) {
            this.firstContactCountdown = 0;
            this.hadFirstContact = true;
            this.EndbossMovement();
        };
    }

    /**
     * This function starts the moving process of the Endboss
     */
    EndbossMovement() {
        setTimeout(() => {
            setInterval(() => {
                if (!this.EndbossIsDead) {
                    this.determineDirection();
                } else {
                    this.stopMoving();
                }
            }, 1000);
        }, 2000);
    }

    /**
     * This function stops all interval in case of killing the endboss
     */
    stopMoving() {
        clearInterval(4);
        setTimeout(() => {
            this.stopAnimationCausePepeWon();
        }, 400)
    }

    /**
     * This function determines the direction the Endboss will move
     */
    // determineDirection() {
    //     let movement = Math.random() * 99;
    //     movement = Math.ceil(movement);
    //     if (movement > 70) {//50
    //         this.movement(-1); // move to left side
    //     } else if (movement < 69) {//50
    //         //this.movement(+1); // move to right side
    //     }
    // }

    determineDirection() {
        let movement = Math.random() * 99;
        movement = Math.ceil(movement);
        if (world.character.x < this.x) {//50
            this.movement(-1); // move to left side
            this.otherDirection = false;
        } else if (world.character.x > this.x) {//50
            this.movement(+1); // move to right side
            this.otherDirection = true;
        }
    }

    /**
 * This function causes a smooth movement of the Endboss to the left or the right side
 * @param {int} direction - -1 for left movement and 1 for a right movement
 */
    movement(direction) {
        setInterval(() => {
            if (this.canMoveLeft(direction)) {
                let speed = 0;
                speed = 0.4;
                this.x = this.x - speed;//0.1
                world.endbossStatusBar.x = this.x;
            } else if (this.canMoveRight(direction)) {
                this.x = this.x + 0.4;//0.1
                world.endbossStatusBar.x = this.x;
            }
        }, 1);
    }

    canMoveLeft(direction) {
        return direction < 0 && this.x > this.movementBorderLeft && !this.EndbossIsDead;
    }

    canMoveRight(direction) {
        return direction > 0 && this.x < this.movementBorderRight && !this.EndbossIsDead;
    }
}