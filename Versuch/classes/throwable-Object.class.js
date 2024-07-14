class ThrowableObject extends MovableObject {
    i = 1;

    offset = {
        top: 10, // 10
        left: 10, // 10
        right: 20, // 20
        bottom: 20 // 20
    }


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.throw();
    }

    /**
     * This function causes Pepe to throw a bottle by animate a flying Bottle
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        if (world.character.x < world.endbossStatusBar.x) {//Wurf nach rechts
            setInterval(() => {
                this.x += 10;
            }, 25);
        } else if(world.character.x > world.endbossStatusBar.x){//Wurf nach links
            setInterval(() => {
                this.x -= 10;
            }, 25);
        }
        this.animateBottle();
    }

    /**
    * This function switches between 2 images of the Salsa-Bottle for swaying it from left to right
    * @param {int} no - number 1 for picture 1 and number 2 for picture 2
    */
    switchImage(no) {
        this.img = `img/6_salsa_bottle/bottle_rotation/${no}_bottle_rotation.png`;
        this.loadImage(this.img);
    }

    /**
     * This function switches the displayed picture
     */
    throwBottlePicturePicker() {
        if (this.i % 4 == 1) {
            this.switchImage(1);
            this.i++;
        } else if (this.i % 4 == 2) {
            this.switchImage(2);
            this.i++;
        } else if (this.i % 4 == 3) {
            this.switchImage(3);
            this.i++;
        } else {
            this.switchImage(4);
            this.i++;
        }
    }

    /**
     * This function calls the switchImage function for bottle/coin-class which switches the shown pictures between the possible pictures to create a animation
     */
    animateBottle() {
        setInterval(() => {
            this.throwBottlePicturePicker();
        }, 100);
    }
}