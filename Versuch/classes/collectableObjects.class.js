class collectableObjects extends MovableObject {
    width = 100;
    height = 100;
    y = 300;



    constructor() {
        super();
        this.x = 400 + Math.random() * 2100; // 200 + ..
    }

    /**
     * This function calls the switchImage function for bottle/coin-class which switches the shown pictures between the possible pictures to create a animation
     */
    animate() {
        let i = 1;
        setInterval(() => {
            if (i % 2 == 0) {
                this.switchImage(1);
                i++;
            } else {
                this.switchImage(2);
                i++;
            }
        }, 500);
    }
}