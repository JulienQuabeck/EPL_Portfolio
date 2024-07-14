class Coin extends collectableObjects {
    img = 'img/8_coin/coin_1.png';

    width = 100;
    height = 100;
    y = 300;
    id;

    offset = {
        top: 30,
        left: 30,
        right: 60,
        bottom: 60
    };

    constructor(id) {
        super(id).loadImage(this.img);
        this.id = id;
        this.animate();
    }

    /**
   * This function switches between 2 images of the Salsa-Bottle for swaying it from left to right
   * @param {int} no - number 1 for picture 1 and number 2 for picture 2
   */
    switchImage(no) {
        this.img = `img/8_coin/coin_${no}.png`;
        this.loadImage(this.img);
    }
}