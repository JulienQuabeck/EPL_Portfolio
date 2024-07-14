class Chicken extends MovableObject {

    y = 340;
    height = 80;
    width = 70;
    id;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    offset = {
        top: 5,
        left: 0,
        right: 0,
        bottom: 10
    };

    constructor(id) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.id = id;
        this.loadImages(this.IMAGES_WALKING);
        this.x = 200 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * This function starts the moving animation of the chicken
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}