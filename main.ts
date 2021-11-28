namespace SpriteKind {
    export const BossShip = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . . 7 7 . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        `, mySprite, 0, -50)
    music.pewPew.play()
})
info.onCountdownEnd(function () {
    game.over(true, effects.hearts)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    otherSprite2.destroy(effects.fire, 500)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.BossShip, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.disintegrate, 500)
    sprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(10)
})
let BossShip: Sprite = null
let Asteroid: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
game.showLongText("STAR RAIDERS - Press A to start", DialogLayout.Center)
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 7 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . 8 7 . . . . . . . 
    . . . . . . 8 8 5 6 . . . . . . 
    . . . . . . 8 7 5 6 . . . . . . 
    . . . . . c c c 6 6 6 . . . . . 
    . . . . 8 8 7 7 7 5 6 6 . . . . 
    . . 8 f f f c c 6 6 f f 6 6 . . 
    . 8 8 8 8 6 6 7 7 7 7 5 7 6 6 . 
    8 8 8 8 8 8 6 6 7 7 7 5 7 7 6 6 
    8 8 8 8 8 8 6 6 7 7 7 7 5 7 6 6 
    `, SpriteKind.Player)
mySprite.setPosition(76, 111)
controller.moveSprite(mySprite, 100, 0)
mySprite.setStayInScreen(true)
info.startCountdown(60)
game.onUpdateInterval(1000, function () {
    if (1 == randint(1, 2)) {
        Asteroid = sprites.createProjectileFromSide(img`
            . . . . . . . c c c a c . . . . 
            . . c c b b b a c a a a c . . . 
            . c c a b a c b a a a b c c . . 
            . c a b c f f f b a b b b a . . 
            . c a c f f f 8 a b b b b b a . 
            . c a 8 f f 8 c a b b b b b a . 
            c c c a c c c c a b c f a b c c 
            c c a a a c c c a c f f c b b a 
            c c a b 6 a c c a f f c c b b a 
            c a b c 8 6 c c a a a b b c b c 
            c a c f f a c c a f a c c c b . 
            c a 8 f c c b a f f c b c c c . 
            . c b c c c c b f c a b b a c . 
            . . a b b b b b b b b b b b c . 
            . . . c c c c b b b b b c c . . 
            . . . . . . . . c b b c . . . . 
            `, 0, randint(20, 60))
    } else {
        Asteroid = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . c c . . . . . . . . 
            . . . . c 2 f b c . . . . . . . 
            . . . . b f f b c c . . . . . . 
            . . . 2 a f b 2 b 2 c . . . . . 
            . . . c 2 2 b b f f b . . . . . 
            . . . . b f f b f 2 b . . . . . 
            . . . . 2 f f b b b 2 . . . . . 
            . . . . . 2 b b c c . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, randint(25, 60))
    }
    Asteroid.x = randint(0, scene.screenWidth())
    Asteroid.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(10000, function () {
    BossShip = sprites.create(assets.image`BossShip`, SpriteKind.BossShip)
    BossShip.setPosition(scene.screenWidth(), 13)
    BossShip.vx = -80
})
