def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(img("""
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
        """),
        mySprite,
        0,
        -50)
    music.pew_pew.play()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy(effects.disintegrate, 500)
    sprite.destroy(effects.disintegrate, 500)
    info.change_score_by(1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    otherSprite2.destroy(effects.fire, 500)
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

Asteroid: Sprite = None
projectile: Sprite = None
mySprite: Sprite = None
effects.star_field.start_screen_effect()
mySprite = sprites.create(img("""
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
    """),
    SpriteKind.player)
mySprite.set_position(76, 111)
controller.move_sprite(mySprite, 100, 0)
mySprite.set_stay_in_screen(True)

def on_update_interval():
    global Asteroid
    Asteroid = sprites.create_projectile_from_side(img("""
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
        """),
        0,
        50)
    Asteroid.x = randint(0, scene.screen_width())
    Asteroid.set_kind(SpriteKind.enemy)
game.on_update_interval(1000, on_update_interval)
