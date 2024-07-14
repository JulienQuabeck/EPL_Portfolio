class MovableObject extends DrawableObject {
    speed = 5;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    attacksEnemy = false;
    attacksPepe = false;
    lookingLeft = false;
    lookingRight = true;

    constructor() {
        super();
    }

    /**
     * This function applies gravity to the game
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.PepeLowerThanGroundleven();
            }
        }, 1000 / 25);
    }

    /**
     * This function checks if Pepe is lower the groundlevel
     */
    PepeLowerThanGroundleven() {
        if (this instanceof Character && this.y > 130) {
            this.y = 130;
        }
    }

    /**
     * This function controles whether pepe jump during a jump/while in the air or not so that he is only allowd to jump when he is lower the 130 px
     * @returns true/false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true; // Throwable-Object should always fall
        } else {
            return this.y < 130 // <=
        }
    }

    /**
     * This function allows Pepe to run to the left side of the canvas
     */
    moveLeft() {
        this.x -= this.speed;
        this.lookingLeft = true;
        this.lookingRight = false;
    }

    /**
     * This function ensures that the animation is always starting from the beginning without stopping anytime
     * @param {path} images The path of the images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.ImageCache[path];
        this.currentImage++;
    }

    /**
     * This function allows Pepe to run to the right side of the canvas
     */
    moveRight() {
        this.x += this.speed;
        this.lookingLeft = false;
        this.lookingRight = true;
    }

    /**
     * This function checks whether Pepe collided with an enemy/a collectable object or not
     * @param {*} mo - enemy-object
     * @returns true/false
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // +300 entfernen
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x - this.offset.left < mo.x + mo.width - mo.offset.right && // +300 entfernen
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * This function controles whether Pepe jumped on a chicken or not
     * @param {*} mo - enemy.object
     * @returns true/false
     */
    jumpsOnEnemy(mo) {
        if (this.isAboveGround(mo) && this.isColliding(mo) && this.speedY < 0) {
            this.attacksEnemy = true;
            return true;
        }
    }

    /**
     * This function stops all Animation as soon as the game is over
     */
    stopAnimation() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
        gameOver();
    }

    /**
     * This function stops all Animation as soon as Pepe won the game
     */
    stopAnimationCausePepeWon() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
        pepeWon();
    }

    /**
     * This function reduces the energy of pepe by 5 in the moment he gets hit by a chicken
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
            setTimeout(() => {
                this.stopAnimation();
            }, 300);

        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function determinds whether Pepe still has energy or not
     * @returns true/false
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * This function checks whether Pepe was injured more than 1 second ago
     */
    isHurt() {
        if (this instanceof Character && this.attacksEnemy == false) {
            let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
            timepassed = timepassed / 1000; // Differenz in s
            return timepassed < 1;
        } else if (this instanceof Endboss) {
            for (let i = 0; i < world.throwableObjects.length; i++) {
                if (this.isColliding(world.throwableObjects[i])) {
                    return true;
                }
            }
        }
    }

    /**
     * This function sets the variable "attacksPepe" to "true"
     */
    attacksPepe() {
        this.attacksPepe = true;
    }
}