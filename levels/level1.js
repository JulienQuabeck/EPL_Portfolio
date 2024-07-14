    let level1;
    
    function initLevel(){
    level1 = new Level(
    [
        new Chicken(1),
        new Chicken(2),
        new Chicken(3),
        new SmallChicken(1),
        new SmallChicken(2),
        new SmallChicken(3),
        new Endboss()
    ],
    [
        new Bottle(0),
        new Bottle(1),
        new Bottle(2),
        new Bottle(3),
        new Bottle(4),
        new Bottle(5),
        new Bottle(6),
        new Bottle(7),
        new Bottle(8),
        new Bottle(9)
    ],
    [
        new Coin(0),
        new Coin(1),
        new Coin(2),
        new Coin(3),
        new Coin(4)
    ],
    [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],
    [
        new backgroundObject('img/5_background/layers/air.png', -719),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new backgroundObject('img/5_background/layers/air.png', 0),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new backgroundObject('img/5_background/layers/air.png', 719),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new backgroundObject('img/5_background/layers/air.png', 719*2),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new backgroundObject('img/5_background/layers/air.png', 719*3),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
        new backgroundObject('img/5_background/layers/air.png', 719*4),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
        new backgroundObject('img/5_background/layers/air.png', 719*5),
        new backgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
        new backgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
        new backgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),
        new backgroundObject('img/5_background/layers/air.png', 719*6),
        new backgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
        new backgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
        new backgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),
    ]
    );
}