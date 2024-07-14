class World {
    sky = new sky();
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0; //0
    statusBar = new Statusbar();
    bottleStatusBar = new BottleStatusBar();
    coinStatusBar = new Coinstatus();
    endbossStatusBar = new statusBarEndboss();
    throwableObjects = [];
    bottle = [];
    coins = [];
    coinSound = new Audio('../audio/coin.mp3');
    bottleSound = new Audio('../audio/bottle.mp3');
    newHit;
    lastHit = new Date().getTime();

    lastThrow = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollection();
    }

    /**
     * This function runs the "checkcollisions" and "checkThrowObjects" functions the whole time
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleHit();
        }, 200);
    }

    /**
     * This function let pepe throw a bottle
     */
    checkThrowObjects() {
        let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
        if (this.keyboard.D) {
            if (this.pastThrow()) {
                if (this.bottlesavailable()) {
                    this.lastThrowCountdown();
                    this.throwableObjects.push(bottle);
                    this.bottle.splice(0, 1);
                    this.bottleStatusBar.throwBottle();
                }
            }
        }
    }

    /**
     * This function checks if the player already did a throw in the near past
     * @returns true or false
     */
    pastThrow(){
        return this.lastThrow == 0;
    }

    /**
     * This function checks if bottle are available to throw
     * @returns true or false
     */
    bottlesavailable(){
        return this.bottle.length > 0;
    }

    /**
     * This function starts a Interval which works as a Countdown for the next possible throw of a bottle
     */
    lastThrowCountdown() {
        let cooldown = setInterval(() => {
            if (this.lastThrow < 15) {
                this.lastThrow += 1;
            } else {
                clearInterval(cooldown);
                this.lastThrow = 0;
            }
        }, 100);
    }

    /**
    * This function checks, if the thrown bottle hits an enemy or not
    */
    checkBottleHit() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    if (enemy instanceof Endboss) {
                        this.newHit = new Date().getTime();
                        if (this.endbossStatusBar.percentage > 0 && this.newHit - this.lastHit > 250) {
                            this.endbossStatusBar.ChangeEndbossStatusBar();
                            enemy.energy -= 20;
                            if (enemy.energy < 0) {
                                enemy.energy = 0;
                            }
                        }
                        this.lastHit = this.newHit;
                    } else {
                        let i = 0;
                        setInterval(() => {
                            if (bottle.isColliding(this.level.enemies[i])) {
                                this.level.enemies.splice(i, 1);
                            }
                            i++;
                        }, 10);
                    }
                }
            });
        })
    }

    /**
     * This function checks if pepe jumps on an enemy or not, if pepe hits the chicken, it will be removed from the level
     */
    checkHitEnemyOnHead() {
        let i = 0;
        this.level.enemies.forEach(() => {
            if (this.character.jumpsOnEnemy(this.level.enemies[i]) && !(this.level.enemies[i] instanceof Endboss)) {
                this.character.launchAgain();
                this.level.enemies.splice(i, 1);
            } else {
                //Rückstoß?
            }
            i++;
        });
    }

    /**
     * This function triggers the "checkHitENemyOnHead"-function the whole time
     */
    jumpingOnEnemy() {
        setInterval(() => {
            this.checkHitEnemyOnHead();
        }, 100);
    }

    /**
     * This function checks, if pepe is colliding with an enemy
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.jumpingOnEnemy(enemy);
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
    * This function checks, whether Pepe collided with a coin, if this is true, Pepe will collect the coin, which will be removed from the canvas than
    */
    collectingCoins() {
        let i = 0;
        this.level.coins.forEach(() => {
            if (this.character.isColliding(level1.coins[i])) {
                if (mute == false) {
                    this.coinSound.play();
                }
                level1.coins.splice(i, 1);
                this.coinStatusBar.collect();
            }
            i++;
        });
    }

    /**
    * This function checks, whether Pepe collided with a bottle, if this is true, Pepe will collect the coin, which will be removed from the canvas than
    */
    collectingBottle() {
        let i = 0;
        this.level.bottles.forEach(() => {
            if (this.character.isColliding(level1.bottles[i])) {
                this.bottleStatusBar.collect();
                if (mute == false) {
                    this.bottleSound.play();
                }
                level1.bottles.splice(i, 1);
                let bottle = new Bottle();
                this.bottle.push(bottle);
            }
            i++;
        });
    }

    /**
     * This function continuously checks, whether Pepe is colliding with a coin or a bottle
     */
    checkCollection() {
        setInterval(() => {
            this.collectingCoins();
        }, 100);
        setInterval(() => {
            this.collectingBottle();
        }, 100);
    }

    setWorld() {
        this.character.world = this;
    }

    /**
     * This function draws all Statusbars for Pepe
     */
    drawAllStatusbars() {
        this.addToMap(this.bottleStatusBar);
        this.addToMap(this.coinStatusBar);
        this.addToMap(this.statusBar);
    }

    /**
     * This function draws all collectable Items
     */
    drawCollectables() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * This function draws all the background Objects
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * This function draws all images to the canvas
     */
    draw() {
        this.camera_x = this.character.x - this.canvas.width / 2;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(-this.camera_x, 0);
        this.drawBackground();
        this.addToMap(this.character);
        this.addToMap(this.endbossStatusBar);
        this.addObjectsToMap(this.throwableObjects);
        this.drawCollectables();
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(this.camera_x, 0);
        this.drawAllStatusbars();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * This function triggers the "addToMap" function for every object who calls it
     * @param {objects} objects - every object who calls it to get drawn in the canvas
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * This function draws every single movable object into our canvas
     * @param {object} mo - Every included movable Object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * This function lets pepe face the left side of the screen
     * @param {object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function lets pepe face to the right side of the screen
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * This function relocates the Statusbar
     */
    relocateEndbossStatusbar() {
        this.addToMap(this.endbossStatusBar);
    }
}