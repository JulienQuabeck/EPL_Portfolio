class Bottle extends collectableObjects {

    img = 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png';
    y = 350;

    offset = {
        top: 20,
        left: 25,
        right: 50,
        bottom: 30
    };

    constructor() {
        super().loadImage(this.img);
        this.animate();
    }

    /**
     * This function switches between 2 images of the Salsa-Bottle for swaying it from left to right
     * @param {int} no - number 1 for picture 1 and number 2 for picture 2
     */
    switchImage(no) {
        this.img = `img/6_salsa_bottle/${no}_salsa_bottle_on_ground.png`;
        this.loadImage(this.img);
    }
}