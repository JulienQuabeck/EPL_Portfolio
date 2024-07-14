class DrawableObject {
    img;
    ImageCache = {};
    currentImage = 0;
    x;
    y;
    height = 300;
    width = 100;
    EndbossHealth = 100;

    throw_sound = new Audio('audio/throw.mp3');

    /**
     * This function insert an image in the canvas
     * @param {*} path images path
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * This function draws the images at the gives coordinates into the canvas
     * @param {canvas} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    //Diese Funktion später löschen
    drawFrame(ctx) {
        if (this instanceof Endboss || this instanceof Character || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    //Diese Funktion später löschen
    drawoffset(ctx) {
        if (this instanceof Endboss || this instanceof Character || this instanceof ThrowableObject) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    /**
     * This function safes all images of an animation in an imageCache
     * @param {*} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    /**
     * This function loads the statusbar-images by reading the number returned by the function "resolveImageIndex"
     */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.ImageCache[path];
        return this.resolveImageIndex();
    }

    /**
     * This function determines which image of the statusbar should be loaded
     * @returns a number from 0 to 5
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1
        } else {
            return 0;
        }
    }

    /**
     * This function increases the statusbar as soon as the player collects a collectable object
     */
    collect() {
        if (this.percentage <= 100) {
            this.percentage += 10;
            this.setPercentage(this.percentage);
        };
    }

    /**
     * This function starts playing a sound as soon as the player clicked the throw button and reduced the bottle-statusbar by 20%
     */
    throwBottle() {
        if (this.percentage > 0) {
            if (mute == false) {
                this.throw_sound.play();
            }
            this.percentage -= 10;
            this.setPercentage(this.percentage);
        }
    }

    /**
     * This function changes the Statusbar of the Endboss, if the endboss gets hit
     */
    ChangeEndbossStatusBar() {
        if (this.percentage > 0) {
            this.percentage -= 20;
            this.setPercentage(this.percentage);
        }
    }
}