class Character extends MovableObject {

    x = 120; //120
    y = 130; //150
    speed = 10;//10
    afkPlaying = false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMP_START = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png'
    ];

    IMAGES_JUMP_UP = [
        'img/2_character_pepe/3_jump/J-34.png'
    ];

    IMAGES_JUMP_TOP = [
        'img/2_character_pepe/3_jump/J-35.png',
    ];

    IMAGES_JUMP_DOWN = [
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
    ];

    IMAGES_JUMP_ONGROUND = [
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        '/img/2_character_pepe/4_hurt/H-41.png',
        '/img/2_character_pepe/4_hurt/H-42.png',
        '/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_SLEEP_SHORT = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEP_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',


    ];

    offset = {
        top: 120,
        left: 10,
        right: 20,
        bottom: 0 // 0 müsste eigentlich 120 sein, aber dann funktioniert die jumpsOnEnemy Funktion nicht mehr
    };

    world;
    walking_sound = new Audio('audio/running.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    sleeping_sound = new Audio('audio/snorring.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    pepeAttacks = new Audio('audio/pepeAttack.mp3');
    pepeDead = new Audio('audio/pepe_dead.mp3');

    afkTime = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP_UP);
        this.loadImages(this.IMAGES_JUMP_DOWN);
        this.loadImages(this.IMAGES_JUMP_START);
        this.loadImages(this.IMAGES_JUMP_TOP);
        this.loadImages(this.IMAGES_JUMP_ONGROUND);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEP_SHORT);
        this.loadImages(this.IMAGES_SLEEP_LONG);
        this.applyGravity();
        this.animate();
    }

    /**
     * This function determines whether the player makes a keyboard entry or not
     */
    afkTimer() {
        setInterval(() => {
            if (this.noButtonPushed()) {
                this.afkTime++;
            }
        }, 1000);
    }

    /**
     * This function checks if a button was pushed or not
     * @returns true if no button was pushed
     */
    noButtonPushed() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE;
    }

    /**
     * This function checks, if Pepe should move to the right side of the screen
     */
    pepeMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.resetAFK();
            this.otherDirection = false;
            if (mute == false) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * This function checks, if Pepe should move to the left side of the screen
     */
    pepeMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 100) {
            this.moveLeft();
            this.resetAFK();
            this.otherDirection = true;
            if (mute == false) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * This function checks, if Pepe should jump
     */
    pepeJumps() {
        if (this.spaceWasPushed()) {
            this.playAnimation(this.IMAGES_JUMP_START);
            setTimeout(() => {
                this.jump();
                this.resetAFK();
            }, 30);
        }
    }
    /**
     * This function checks if the space bar was pushed or not
     * @returns true if space was pushed
     */
    spaceWasPushed() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * This function triggers all pepe movements function, which checks if he is moving and what kind of movement it should be
     */
    pepeMovements() {
        this.walking_sound.pause();
        this.pepeMoveRight();
        this.pepeMoveLeft();
        this.pepeJumps();
        this.world.camera_x = -this.x+100; // hier Kamerageschwindigkeit anpassen + 100
    }

    /**
     * This function loads differnt animations depending on the afk-time of the player
     */
    pepeAFK() {
        if (this.shortAfk()) {
            this.afkTime++;
            this.pepeshortafk();
        } else if (this.afkTime >= 10) {
            this.pepelongafk();
        }
    }

    /**
     * This function checks if Pepe is afk for a short time
     * @returns true of no button was pushed for at least 5 seconds
     */
    shortAfk() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && this.afkTime < 10;
    }

    /**
     * This function loads the short afktime animation
     */
    pepeshortafk() {
        this.afkPlaying = true;
        this.playAnimation(this.IMAGES_SLEEP_SHORT);
    }

    /**
     * This function loads the long afktime animation
     */
    pepelongafk() {
        this.playAnimation(this.IMAGES_SLEEP_LONG);
        if (mute == false) {
            this.sleeping_sound.play();
        } else {
            this.sleeping_sound.pause();
        }
        this.afkPlaying = true;
    }

    /**
     * This function checks the Status of Pepes jump
     */
    pepeJumpAnimation() {
        if (this.speedY >= 2.5) {
            this.playAnimation(this.IMAGES_JUMP_UP);
        } else if (this.speedY < 2.5 && this.speedY > -2.5) {
            this.playAnimation(this.IMAGES_JUMP_TOP);
        } else if (this.speedY < -2.5 && this.y < 70) {
            this.playAnimation(this.IMAGES_JUMP_DOWN);
        } else if (this.speedY <= -2.5 && this.y > 70) {
            this.playAnimation(this.IMAGES_JUMP_ONGROUND);
        }
        if (mute == false) {
            this.jump_sound.play();
        }
    }

    /**
     * This function plays the hurt animation + sound of Pepe
     */
    pepeGettingHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (mute == false) {
            this.hurt_sound.play();
        }
    }

    /**
     * This function plays the dead-animation + sound of Pepe
     */
    pepeDies() {
        this.playAnimation(this.IMAGES_DEAD);
        if (mute == false) {
            this.pepeDead.play();
        }
    }

    /**
     * This function plays the walking animation of Pepe
     */
    pepeWalks() {
        if (this.walkingLeftOrRight()) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * This functions returns true if arrow-left or arrow-right is pushed
     * @returns true / false
     */
    walkingLeftOrRight(){
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    /**
     * This function loads the animation for pepe getting hurt, pepe dying, pepe jumping and pepe walking
     */
    pepeDemageDeadJumpAndWalkAnimation() {
        if (this.isDead()) {
            this.pepeDies();
        } else if (this.isHurt()) {
            this.pepeGettingHurt();
        } else if (this.isAboveGround()) {
            this.pepeJumpAnimation();
        } else {
            this.pepeWalks();
        }
    }

    /**
     * This function determines which animation should be played concerning the keyboard inputs
     */
    animate() {
        setInterval(() => {
            this.pepeMovements();
        }, 1000 / 60);
        setInterval(() => {
            this.pepeAFK();
        }, 1000);
        setInterval(() => {
            this.pepeDemageDeadJumpAndWalkAnimation();
        }, 100);//130
    }

    /**
     * This function resets the afk-timer ands stops the snorring sound
     */
    resetAFK() {
        this.afkTime = 0;
        this.sleeping_sound.pause();
        this.afkPlaying = false;
    }

    /**
     * This function let pepe jump
     */
    jump() {
        this.speedY = 25;//25
    }

    /**
     * This function let pepe jump again after hitting a chicken on its head 
     */
    launchAgain() {
        this.speedY = 20;
        if (mute == false) {
            this.pepeAttacks.play();
        }
        this.attacksEnemy = false;
    }
}