class Level {
    enemies;
    clouds;
    collectables;
    bottles;
    coins;
    backgroundObject;
    level_end_x = 4000;

    constructor(enemies, bottles, coins, clouds, backgroundObject) {
        this.enemies = enemies;
        this.bottles = bottles;
        this.coins = coins;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
    }
}