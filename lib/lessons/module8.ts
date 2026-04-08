import type { Lesson } from "../types";

export const lessonsModule8: Lesson[] = [
  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 36,
    slug: "pygame-basics",
    title: "Pygame Setup & Game Loop",
    badge: "concept",
    theory: `
## What is Pygame?

Pygame is a Python library for making games. It handles the window, drawing, keyboard/mouse input, and timing. You basically get a blank canvas and Pygame gives you the tools to draw on it 60 times per second.

\`\`\`python
import pygame
pygame.init()
\`\`\`

That's all you need to get started. Everything else builds on top.

## The Game Loop

Every game runs in a loop. It keeps going until the player quits. Each time through the loop is one "frame."

\`\`\`python
import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()
running = True

while running:
    # 1. Handle events (keyboard, mouse, quit)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # 2. Update game state (move things, check collisions)
    # ... game logic goes here

    # 3. Draw everything
    screen.fill((0, 0, 0))  # black background
    pygame.display.flip()   # show the frame

    clock.tick(60)  # cap at 60 frames per second

pygame.quit()
\`\`\`

Those three steps — **handle events → update → draw** — repeat every frame. That's the whole pattern.

## Screen Coordinates

Pygame's coordinate system starts at the top-left corner:
- (0, 0) = top-left
- x increases going RIGHT
- y increases going DOWN

So (800, 600) is the bottom-right of an 800x600 window. A bit counterintuitive if you're used to math, but you get used to it fast.

## Colors

Colors are (R, G, B) tuples with values 0-255:

\`\`\`python
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED   = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE  = (0, 0, 255)
\`\`\`

## Drawing Basics

\`\`\`python
# Draw a filled rectangle: surface, color, (x, y, width, height)
pygame.draw.rect(screen, RED, (100, 100, 50, 50))

# Draw a circle: surface, color, (center_x, center_y), radius
pygame.draw.circle(screen, BLUE, (400, 300), 30)

# Draw a line: surface, color, start_pos, end_pos, width
pygame.draw.line(screen, WHITE, (0, 0), (800, 600), 2)
\`\`\`

The order matters — things drawn later appear on top.
`,
    starterCode: `# This runs in a real Pygame environment, not the browser
# Use this as a reference — copy it into your local Python setup

import pygame
pygame.init()

# Screen setup
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("My First Pygame Window")

# Colors
BLACK = (0, 0, 0)
RED = (255, 0, 0)
BLUE = (0, 100, 255)

clock = pygame.time.Clock()
running = True

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill(BLACK)

    # Draw a rectangle and a circle
    pygame.draw.rect(screen, RED, (100, 100, 80, 80))
    pygame.draw.circle(screen, BLUE, (400, 300), 50)

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
`,
    examples: [
      {
        title: "Minimal Game Loop",
        explanation: "The simplest possible Pygame setup — just a window that closes when you quit",
        code: `import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((30, 30, 30))  # dark gray background
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      },
      {
        title: "Drawing Shapes",
        explanation: "Draw rectangles, circles, and lines on the screen",
        code: `import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

WHITE = (255, 255, 255)
RED   = (255, 0, 0)
BLUE  = (0, 100, 255)
BLACK = (0, 0, 0)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill(BLACK)

    # rectangle at (50, 50), size 100x60
    pygame.draw.rect(screen, RED, (50, 50, 100, 60))

    # circle at center (400, 300), radius 40
    pygame.draw.circle(screen, BLUE, (400, 300), 40)

    # diagonal line
    pygame.draw.line(screen, WHITE, (0, 0), (800, 600), 3)

    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      },
    ],
    challenges: [
      {
        id: "pygame-basics-1",
        prompt: "What are the three main steps in a game loop, in order?",
        hint: "Think: input → logic → output",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("event" in answer or "input" in answer) and ("update" in answer or "logic" in answer or "state" in answer) and ("draw" in answer or "render" in answer or "display" in answer)
`,
        solution: "Handle events (input), update game state (logic), draw/render (display)",
      },
      {
        id: "pygame-basics-2",
        prompt: "In Pygame, what color does (255, 0, 0) represent? And where is coordinate (0, 0) on the screen?",
        hint: "RGB = Red, Green, Blue. Think about where Pygame starts counting.",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return "red" in answer and ("top" in answer or "left" in answer or "corner" in answer)
`,
        solution: "(255, 0, 0) is red (max red, no green, no blue). (0, 0) is the top-left corner of the screen.",
      },
    ],
  },

  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 37,
    slug: "pygame-movement",
    title: "Movement, Velocity & Physics",
    badge: "concept",
    theory: `
## Moving Things Around

The basic idea: every game object has a position (x, y) and a velocity (vx, vy). Each frame, you add velocity to position.

\`\`\`python
# Object starts at (100, 100) moving right and down
x, y = 100, 100
vx, vy = 3, 2   # pixels per frame

# In the game loop:
x += vx
y += vy
\`\`\`

After one frame: (103, 102). After two frames: (106, 104). That's it — movement is just addition every frame.

## Bouncing Off Walls

When the object hits a wall, flip the velocity:

\`\`\`python
WIDTH, HEIGHT = 800, 600
BALL_RADIUS = 20

# Bounce off left/right walls
if x - BALL_RADIUS <= 0 or x + BALL_RADIUS >= WIDTH:
    vx = -vx

# Bounce off top/bottom
if y - BALL_RADIUS <= 0 or y + BALL_RADIUS >= HEIGHT:
    vy = -vy
\`\`\`

The radius check makes sure we're using the edge of the ball, not its center.

## Acceleration and Friction

Real games don't have instant max speed — things speed up and slow down. That's acceleration and friction.

\`\`\`python
# Player movement with acceleration
acceleration = 0.5
friction = 0.85   # multiply each frame to slow down (must be < 1.0)
max_speed = 6

keys = pygame.key.get_pressed()
if keys[pygame.K_RIGHT]:
    vx += acceleration
if keys[pygame.K_LEFT]:
    vx -= acceleration

# Apply friction (drag)
vx *= friction

# Clamp to max speed
vx = max(-max_speed, min(max_speed, vx))

x += vx
\`\`\`

Friction below 1.0 means velocity shrinks each frame when you're not pressing anything — that's the "sliding to a stop" feel.

## Keyboard Input

\`\`\`python
keys = pygame.key.get_pressed()  # snapshot of current key state

if keys[pygame.K_LEFT]:  # holding left arrow
    x -= 5
if keys[pygame.K_RIGHT]:
    x += 5
if keys[pygame.K_UP]:
    y -= 5
if keys[pygame.K_DOWN]:
    y += 5
\`\`\`

Common keys: \`pygame.K_LEFT\`, \`pygame.K_RIGHT\`, \`pygame.K_UP\`, \`pygame.K_DOWN\`, \`pygame.K_SPACE\`, \`pygame.K_RETURN\`

## Vectors (pygame.math.Vector2)

For more complex movement, use Pygame's built-in Vector2:

\`\`\`python
from pygame.math import Vector2

pos = Vector2(400, 300)
vel = Vector2(3, -2)

# In game loop:
pos += vel  # same as pos.x += vel.x, pos.y += vel.y

# Get distance between two points
dist = pos.distance_to(other_pos)

# Normalize (get direction without speed)
direction = vel.normalize()
\`\`\`

Vectors make the math cleaner, especially for angles and distances.
`,
    starterCode: `# Ball bouncing example — run this locally with Pygame installed

import pygame
pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

BALL_RADIUS = 20
BALL_COLOR = (255, 100, 0)

# starting position and velocity
x, y = 400, 300
vx, vy = 4, 3

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # move the ball
    x += vx
    y += vy

    # bounce off walls
    if x - BALL_RADIUS <= 0 or x + BALL_RADIUS >= WIDTH:
        vx = -vx
    if y - BALL_RADIUS <= 0 or y + BALL_RADIUS >= HEIGHT:
        vy = -vy

    screen.fill((20, 20, 20))
    pygame.draw.circle(screen, BALL_COLOR, (int(x), int(y)), BALL_RADIUS)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
`,
    examples: [
      {
        title: "Simple Keyboard Movement",
        explanation: "Move a rectangle with arrow keys at constant speed",
        code: `import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

SPEED = 5
x, y = 400, 300

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  x -= SPEED
    if keys[pygame.K_RIGHT]: x += SPEED
    if keys[pygame.K_UP]:    y -= SPEED
    if keys[pygame.K_DOWN]:  y += SPEED

    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, (0, 200, 100), (x - 20, y - 20, 40, 40))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      },
      {
        title: "Acceleration & Friction",
        explanation: "Smooth movement that builds up speed and slides to a stop",
        code: `import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

x, y = 400, 300
vx, vy = 0, 0
ACCEL = 0.5
FRICTION = 0.88
MAX_SPEED = 7

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  vx -= ACCEL
    if keys[pygame.K_RIGHT]: vx += ACCEL
    if keys[pygame.K_UP]:    vy -= ACCEL
    if keys[pygame.K_DOWN]:  vy += ACCEL

    # friction slows you down when not pressing
    vx *= FRICTION
    vy *= FRICTION

    # clamp speed
    vx = max(-MAX_SPEED, min(MAX_SPEED, vx))
    vy = max(-MAX_SPEED, min(MAX_SPEED, vy))

    x += vx
    y += vy

    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, (100, 200, 255), (int(x)-20, int(y)-20, 40, 40))
    pygame.display.flip()
    clock.tick(60)

pygame.quit()`,
      },
    ],
    challenges: [
      {
        id: "movement-1",
        prompt: "A ball is at position x=100, velocity vx=5. After 3 frames, what is x?",
        hint: "Each frame: x += vx",
        validateFn: `
def validate(answer):
    return answer.strip() in ["115", "x=115", "115.0"]
`,
        solution: "x = 100 + (5 × 3) = 115",
      },
      {
        id: "movement-2",
        prompt: "Why do you multiply velocity by a friction value (like 0.85) instead of subtracting a fixed amount?",
        hint: "Think about what happens when velocity gets very small with subtraction vs multiplication",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("proportion" in answer or "percent" in answer or "smaller" in answer or "zero" in answer or "smooth" in answer or "multiply" in answer or "relative" in answer)
`,
        solution: "Multiplying by friction (< 1.0) slows proportionally — it naturally approaches zero smoothly. Subtracting a fixed amount can cause jitter or overshoot (go negative when it should stop at zero).",
      },
    ],
  },

  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 38,
    slug: "pygame-sprites",
    title: "Sprites & Sprite Groups",
    badge: "concept",
    theory: `
## What's a Sprite?

In Pygame, a sprite is an object that has an image and a position. It inherits from \`pygame.sprite.Sprite\` and you put sprites into groups that handle updating and drawing automatically.

\`\`\`python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 40))
        self.image.fill((0, 200, 100))   # green square for now
        self.rect = self.image.get_rect()
        self.rect.center = (400, 300)

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.rect.x -= 5
        if keys[pygame.K_RIGHT]: self.rect.x += 5
        if keys[pygame.K_UP]:    self.rect.y -= 5
        if keys[pygame.K_DOWN]:  self.rect.y += 5
\`\`\`

The key things every sprite needs:
- **\`self.image\`** — what to draw (Surface or loaded image)
- **\`self.rect\`** — position and size (a Rect object)
- **\`update()\`** method — called every frame

## Sprite Groups

Groups manage collections of sprites. You add sprites to a group and the group handles updating and drawing all of them.

\`\`\`python
all_sprites = pygame.sprite.Group()
player = Player()
all_sprites.add(player)

# In the game loop:
all_sprites.update()          # calls update() on every sprite
all_sprites.draw(screen)      # draws every sprite to the screen
\`\`\`

Way cleaner than manually looping through every object.

## Loading Real Images

\`\`\`python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("player.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.rect.center = (400, 300)
\`\`\`

\`convert_alpha()\` optimizes the image for faster drawing and preserves transparency.

## Sprite Animation (Sheet)

Most game characters use a sprite sheet — one image with multiple frames:

\`\`\`python
class AnimatedPlayer(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.sheet = pygame.image.load("player_sheet.png").convert_alpha()
        self.frame_width = 64
        self.frame_height = 64
        self.frame_index = 0
        self.animation_timer = 0
        self.image = self.get_frame(0)
        self.rect = self.image.get_rect()

    def get_frame(self, index):
        # cut a single frame from the sheet
        x = index * self.frame_width
        frame = pygame.Surface((self.frame_width, self.frame_height), pygame.SRCALPHA)
        frame.blit(self.sheet, (0, 0), (x, 0, self.frame_width, self.frame_height))
        return frame

    def update(self):
        self.animation_timer += 1
        if self.animation_timer >= 8:  # change frame every 8 ticks (~7.5fps)
            self.animation_timer = 0
            self.frame_index = (self.frame_index + 1) % 4  # 4 frames
            self.image = self.get_frame(self.frame_index)
\`\`\`

## Rect is Your Best Friend

The \`rect\` object has tons of useful properties:

\`\`\`python
rect.x, rect.y         # top-left corner
rect.center            # (center_x, center_y)
rect.centerx, rect.centery
rect.top, rect.bottom, rect.left, rect.right
rect.width, rect.height
rect.midleft, rect.midright  # midpoints of sides
\`\`\`

Use these instead of calculating positions manually.
`,
    starterCode: `# Sprite example — copy to local Pygame environment

import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # placeholder colored square
        self.image = pygame.Surface((40, 40))
        self.image.fill((0, 200, 100))
        self.rect = self.image.get_rect()
        self.rect.center = (400, 300)
        self.speed = 5

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.rect.x -= self.speed
        if keys[pygame.K_RIGHT]: self.rect.x += self.speed
        if keys[pygame.K_UP]:    self.rect.y -= self.speed
        if keys[pygame.K_DOWN]:  self.rect.y += self.speed

        # keep on screen
        self.rect.clamp_ip(screen.get_rect())

all_sprites = pygame.sprite.Group()
player = Player()
all_sprites.add(player)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update()
    screen.fill((30, 30, 30))
    all_sprites.draw(screen)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
`,
    examples: [
      {
        title: "Basic Sprite Class",
        explanation: "Minimum viable sprite with image, rect, and update",
        code: `class Enemy(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((30, 30))
        self.image.fill((255, 50, 50))   # red square
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)
        self.speed = 2

    def update(self):
        # move left across the screen
        self.rect.x -= self.speed
        # remove when off-screen
        if self.rect.right < 0:
            self.kill()  # removes from all groups`,
      },
      {
        title: "Multiple Sprite Groups",
        explanation: "Separate groups for players, enemies, and bullets — useful for targeted collision detection",
        code: `all_sprites = pygame.sprite.Group()
enemies = pygame.sprite.Group()
bullets = pygame.sprite.Group()

# add an enemy to both groups
enemy = Enemy(700, 300)
all_sprites.add(enemy)
enemies.add(enemy)

# collision check: did any bullet hit any enemy?
hits = pygame.sprite.groupcollide(bullets, enemies, True, True)
# True, True = kill both the bullet and enemy on hit
# hits is a dict of {bullet: [enemies_hit]}`,
      },
    ],
    challenges: [
      {
        id: "sprites-1",
        prompt: "What two attributes does every Pygame sprite MUST have to work with sprite groups?",
        hint: "One is what gets drawn, one defines position and size",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return "image" in answer and "rect" in answer
`,
        solution: "self.image (the Surface to draw) and self.rect (the Rect defining position and size)",
      },
      {
        id: "sprites-2",
        prompt: "What does sprite.kill() do?",
        hint: "It doesn't delete the Python object — it removes from something",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return "group" in answer or "remove" in answer or "all" in answer
`,
        solution: "kill() removes the sprite from all sprite groups it belongs to. It doesn't delete the Python object, but it won't be updated or drawn anymore.",
      },
    ],
  },

  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 39,
    slug: "pygame-collision",
    title: "Collision Detection",
    badge: "practice",
    theory: `
## Why Collision Detection Matters

Without it, things pass through each other. Bullets don't hit enemies. The ball goes through the paddle. The player walks through walls. Collision detection is what makes games feel real.

## Rect Collision (Fastest)

The simplest method — check if two rectangles overlap:

\`\`\`python
# Two rect objects
if rect1.colliderect(rect2):
    print("collision!")

# Check a rect against a point
if rect.collidepoint(mouse_x, mouse_y):
    print("mouse is inside rect")
\`\`\`

Rect collision is fast and good enough for most cases. Brick Breakaway uses this for the ball hitting the paddle and bricks.

## Sprite Group Collision

For checking one sprite against a whole group:

\`\`\`python
# Did the player touch any enemy?
hit_list = pygame.sprite.spritecollide(player, enemies, False)
# False = don't kill the enemies on collision
# Returns list of enemies the player collided with

if hit_list:
    player_health -= 1

# Did any bullet hit any enemy? Kill both.
hits = pygame.sprite.groupcollide(bullets, enemies, True, True)
\`\`\`

## Circle Collision

More accurate for round objects (balls, planets, explosions):

\`\`\`python
# Using collide_circle as a callback
hits = pygame.sprite.spritecollide(ball, bricks, True, pygame.sprite.collide_circle)
\`\`\`

Or manually:

\`\`\`python
import math

def circles_collide(x1, y1, r1, x2, y2, r2):
    dist = math.sqrt((x2-x1)**2 + (y2-y1)**2)
    return dist < r1 + r2
\`\`\`

## Ball + Paddle Collision (Brick Breakaway Style)

The tricky part is figuring out which side of the brick the ball hit:

\`\`\`python
def handle_ball_brick_collision(ball_rect, ball_vel, brick_rect):
    # figure out overlap on each axis
    overlap_left   = ball_rect.right - brick_rect.left
    overlap_right  = brick_rect.right - ball_rect.left
    overlap_top    = ball_rect.bottom - brick_rect.top
    overlap_bottom = brick_rect.bottom - ball_rect.top

    # bounce off the axis with the smallest overlap
    if min(overlap_left, overlap_right) < min(overlap_top, overlap_bottom):
        ball_vel[0] *= -1  # horizontal bounce
    else:
        ball_vel[1] *= -1  # vertical bounce
\`\`\`

## Wall Collision

For keeping a ball inside a window:

\`\`\`python
# Ball with velocity [vx, vy] and radius r
if ball_x - r <= 0:           # hit left wall
    ball_x = r
    vx = abs(vx)              # force positive (moving right)
elif ball_x + r >= WIDTH:     # hit right wall
    ball_x = WIDTH - r
    vx = -abs(vx)             # force negative (moving left)

if ball_y - r <= 0:           # hit top
    ball_y = r
    vy = abs(vy)
elif ball_y + r >= HEIGHT:    # hit bottom (game over or lose life)
    handle_ball_lost()
\`\`\`

Using \`abs()\` instead of just flipping sign prevents the ball from getting "stuck" in a wall.
`,
    starterCode: `# Collision demo — rect-based

import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

# Player (movable)
player_rect = pygame.Rect(100, 270, 40, 60)
SPEED = 5

# Wall (static)
wall_rect = pygame.Rect(350, 200, 20, 200)

WHITE = (255, 255, 255)
GREEN = (0, 200, 100)
RED   = (255, 50, 50)
BLACK = (0, 0, 0)

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]: player_rect.x += SPEED
    if keys[pygame.K_LEFT]:  player_rect.x -= SPEED

    # collision check
    colliding = player_rect.colliderect(wall_rect)
    player_color = RED if colliding else GREEN

    screen.fill(BLACK)
    pygame.draw.rect(screen, player_color, player_rect)
    pygame.draw.rect(screen, WHITE, wall_rect)
    pygame.display.flip()
    clock.tick(60)

pygame.quit()
`,
    examples: [
      {
        title: "spritecollide — one vs group",
        explanation: "Check if one sprite overlaps any sprite in a group",
        code: `# player hits any enemy
hit_enemies = pygame.sprite.spritecollide(player, enemy_group, False)
if hit_enemies:
    player.take_damage(10)

# bullet hits any enemy — kill both
hits = pygame.sprite.groupcollide(bullet_group, enemy_group, True, True)
for bullet, enemies_hit in hits.items():
    score += len(enemies_hit) * 100`,
      },
      {
        title: "Side-Aware Bounce",
        explanation: "Ball bouncing off a brick and detecting which side it hit",
        code: `def bounce_ball_off_rect(ball_x, ball_y, ball_vx, ball_vy, ball_r, rect):
    # how much does the ball overlap each side?
    overlap_left   = (ball_x + ball_r) - rect.left
    overlap_right  = rect.right - (ball_x - ball_r)
    overlap_top    = (ball_y + ball_r) - rect.top
    overlap_bottom = rect.bottom - (ball_y - ball_r)

    min_h = min(overlap_left, overlap_right)
    min_v = min(overlap_top, overlap_bottom)

    if min_h < min_v:
        ball_vx *= -1  # hit a side — reverse horizontal
    else:
        ball_vy *= -1  # hit top or bottom — reverse vertical

    return ball_vx, ball_vy`,
      },
    ],
    challenges: [
      {
        id: "collision-1",
        prompt: "What does pygame.sprite.spritecollide(player, enemies, True) return, and what does the True argument do?",
        hint: "The True argument affects the enemies group",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("list" in answer or "enemies" in answer) and ("kill" in answer or "remove" in answer or "delete" in answer)
`,
        solution: "Returns a list of enemy sprites that collided with the player. The True argument kills (removes from groups) each enemy that was hit.",
      },
      {
        id: "collision-2",
        prompt: "When a ball hits a brick in Brick Breakaway, why check which axis has the smaller overlap to decide bounce direction?",
        hint: "Think about which side the ball actually came from",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("side" in answer or "direction" in answer or "enter" in answer or "overlap" in answer or "minimum" in answer or "smallest" in answer)
`,
        solution: "The smallest overlap tells you which axis the ball entered from. If the horizontal overlap is smaller, the ball came from the left or right side. If vertical overlap is smaller, it came from the top or bottom.",
      },
    ],
  },

  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 40,
    slug: "pygame-project-breakaway",
    title: "Project: Brick Breakaway",
    badge: "challenge",
    theory: `
## What You're Building

Brick Breakaway is a classic arcade game: a ball bounces around breaking bricks, you control a paddle at the bottom to keep the ball from falling off-screen. Clear all the bricks to win.

## Core Components

\`\`\`
BrickBreakaway/
├── main.py          # game loop + main()
├── paddle.py        # Paddle sprite
├── ball.py          # Ball with physics
├── brick.py         # Brick sprite (with color by hits)
└── settings.py      # constants (WIDTH, HEIGHT, colors, speeds)
\`\`\`

## Settings / Constants

Start by defining everything in one place — way easier to tune later:

\`\`\`python
# settings.py
WIDTH, HEIGHT = 800, 600
FPS = 60

PADDLE_SPEED = 7
PADDLE_WIDTH = 120
PADDLE_HEIGHT = 15

BALL_SPEED_INIT = 5
BALL_RADIUS = 10

BRICK_ROWS = 5
BRICK_COLS = 10
BRICK_WIDTH = 70
BRICK_HEIGHT = 25
BRICK_PADDING = 5
BRICK_TOP_OFFSET = 80

COLORS = {
    1: (255, 80, 80),   # red - 1 hit
    2: (255, 165, 0),   # orange - 2 hits
    3: (255, 220, 0),   # yellow - 3 hits
}
\`\`\`

## Paddle Class

\`\`\`python
# paddle.py
import pygame
from settings import *

class Paddle(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((PADDLE_WIDTH, PADDLE_HEIGHT))
        self.image.fill((200, 200, 255))
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 20

    def update(self):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and self.rect.left > 0:
            self.rect.x -= PADDLE_SPEED
        if keys[pygame.K_RIGHT] and self.rect.right < WIDTH:
            self.rect.x += PADDLE_SPEED
\`\`\`

## Ball Class

\`\`\`python
# ball.py
import pygame
from settings import *

class Ball(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((BALL_RADIUS*2, BALL_RADIUS*2), pygame.SRCALPHA)
        pygame.draw.circle(self.image, (255, 255, 255), (BALL_RADIUS, BALL_RADIUS), BALL_RADIUS)
        self.rect = self.image.get_rect()
        self.rect.center = (WIDTH // 2, HEIGHT // 2)
        self.vx = BALL_SPEED_INIT
        self.vy = -BALL_SPEED_INIT
        self.active = False  # waits for spacebar

    def update(self):
        if not self.active:
            return
        self.rect.x += self.vx
        self.rect.y += self.vy

        # wall bounces
        if self.rect.left <= 0 or self.rect.right >= WIDTH:
            self.vx *= -1
        if self.rect.top <= 0:
            self.vy *= -1
\`\`\`

## Brick Class

\`\`\`python
# brick.py
import pygame
from settings import *

class Brick(pygame.sprite.Sprite):
    def __init__(self, x, y, hits=1):
        super().__init__()
        self.hits = hits
        self.max_hits = hits
        self.image = pygame.Surface((BRICK_WIDTH, BRICK_HEIGHT))
        self.image.fill(COLORS.get(hits, (150, 150, 150)))
        self.rect = self.image.get_rect()
        self.rect.topleft = (x, y)

    def hit(self):
        self.hits -= 1
        if self.hits <= 0:
            self.kill()
        else:
            # change color to show damage
            self.image.fill(COLORS.get(self.hits, (150, 150, 150)))
\`\`\`

## Main Game Loop

\`\`\`python
# main.py
import pygame
from settings import *
from paddle import Paddle
from ball import Ball
from brick import Brick

def create_bricks():
    bricks = pygame.sprite.Group()
    for row in range(BRICK_ROWS):
        for col in range(BRICK_COLS):
            x = col * (BRICK_WIDTH + BRICK_PADDING) + 50
            y = row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_TOP_OFFSET
            hits = BRICK_ROWS - row  # top rows = more hits
            brick = Brick(x, y, hits)
            bricks.add(brick)
    return bricks

def main():
    pygame.init()
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    pygame.display.set_caption("Brick Breakaway")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, 36)

    paddle = Paddle()
    ball = Ball()
    bricks = create_bricks()
    all_sprites = pygame.sprite.Group(paddle, ball, *bricks.sprites())

    game_over = False
    won = False

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE and not ball.active:
                    ball.active = True

        if not game_over:
            all_sprites.update()

            # ball hits paddle
            if ball.rect.colliderect(paddle.rect) and ball.vy > 0:
                ball.vy *= -1

            # ball hits bricks
            hit_bricks = pygame.sprite.spritecollide(ball, bricks, False)
            for brick in hit_bricks:
                ball.vy *= -1
                brick.hit()
                break  # only one brick per frame

            # ball falls off bottom
            if ball.rect.top > HEIGHT:
                game_over = True

            # all bricks cleared
            if len(bricks) == 0:
                game_over = True
                won = True

        screen.fill((10, 10, 30))
        all_sprites.draw(screen)

        if not ball.active:
            text = font.render("Press SPACE to start", True, (255, 255, 255))
            screen.blit(text, (WIDTH//2 - text.get_width()//2, HEIGHT//2))

        if game_over:
            msg = "YOU WIN!" if won else "GAME OVER"
            text = font.render(msg, True, (255, 255, 0))
            screen.blit(text, (WIDTH//2 - text.get_width()//2, HEIGHT//2))

        pygame.display.flip()
        clock.tick(FPS)

if __name__ == "__main__":
    main()
\`\`\`

## Step 2 — Improvement Ideas

Pick options worth at least 20 points total:
- **Informative Text (5pts)** — spacebar prompt + game over message (already in template above!)
- **Randomized Ball Start (5pts)** — use \`random.uniform(-45, 45)\` for angle, convert to vx/vy with trig
- **Player Life (10pts)** — track lives, spawn new ball when one falls off
- **Additional Levels (10pts)** — reload \`create_bricks()\` with different layout after clearing
- **Power Up Bricks (15pts)** — special Brick subclass that drops a falling power-up on death
`,
    starterCode: `# Brick Breakaway starter — minimal working version
# Run this locally, then add Step 2 improvements

import pygame
import sys
pygame.init()

WIDTH, HEIGHT = 800, 600
FPS = 60
PADDLE_SPEED = 7
BALL_SPEED = 5
BRICK_ROWS, BRICK_COLS = 5, 10
BRICK_W, BRICK_H = 72, 24
BRICK_PAD = 4

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Brick Breakaway")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 36)

# paddle
paddle = pygame.Rect(WIDTH//2 - 60, HEIGHT - 40, 120, 15)

# ball
bx, by = WIDTH//2, HEIGHT//2
bvx, bvy = BALL_SPEED, -BALL_SPEED
ball_active = False
BALL_R = 10

# bricks
bricks = []
colors = [(255,80,80),(255,140,0),(255,220,0),(100,220,100),(100,180,255)]
for row in range(BRICK_ROWS):
    for col in range(BRICK_COLS):
        x = col * (BRICK_W + BRICK_PAD) + 40
        y = row * (BRICK_H + BRICK_PAD) + 80
        bricks.append(pygame.Rect(x, y, BRICK_W, BRICK_H))

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            ball_active = True

    # paddle movement
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and paddle.left > 0:   paddle.x -= PADDLE_SPEED
    if keys[pygame.K_RIGHT] and paddle.right < WIDTH: paddle.x += PADDLE_SPEED

    if ball_active:
        bx += bvx
        by += bvy

        # wall bounces
        if bx - BALL_R <= 0 or bx + BALL_R >= WIDTH: bvx *= -1
        if by - BALL_R <= 0: bvy *= -1

        # paddle bounce
        ball_rect = pygame.Rect(bx-BALL_R, by-BALL_R, BALL_R*2, BALL_R*2)
        if ball_rect.colliderect(paddle) and bvy > 0:
            bvy *= -1

        # brick collisions
        for brick in bricks[:]:
            if ball_rect.colliderect(brick):
                bricks.remove(brick)
                bvy *= -1
                break

    screen.fill((10, 10, 30))
    pygame.draw.rect(screen, (200, 200, 255), paddle)
    pygame.draw.circle(screen, (255,255,255), (int(bx), int(by)), BALL_R)
    for i, brick in enumerate(bricks):
        pygame.draw.rect(screen, colors[i % BRICK_ROWS], brick)

    if not ball_active:
        txt = font.render("SPACE to launch", True, (255,255,255))
        screen.blit(txt, (WIDTH//2 - txt.get_width()//2, HEIGHT//2))

    if by > HEIGHT:
        txt = font.render("GAME OVER", True, (255,80,80))
        screen.blit(txt, (WIDTH//2 - txt.get_width()//2, HEIGHT//2))

    if not bricks:
        txt = font.render("YOU WIN!", True, (255,220,0))
        screen.blit(txt, (WIDTH//2 - txt.get_width()//2, HEIGHT//2))

    pygame.display.flip()
    clock.tick(FPS)

pygame.quit()
`,
    examples: [
      {
        title: "Randomized Ball Launch Direction",
        explanation: "Step 2 option — ball launches at a random angle on spacebar",
        code: `import math, random

def launch_ball_random():
    # random angle between -60 and 60 degrees (downward direction)
    angle_deg = random.uniform(-60, 60)
    angle_rad = math.radians(angle_deg)
    speed = 5
    vx = speed * math.sin(angle_rad)
    vy = -speed * math.cos(angle_rad)  # negative = upward
    return vx, vy

# usage:
# if event.key == pygame.K_SPACE:
#     ball.vx, ball.vy = launch_ball_random()
#     ball.active = True`,
      },
      {
        title: "Player Lives System",
        explanation: "Step 2 option — track lives, reset ball when it falls off",
        code: `lives = 3
font = pygame.font.Font(None, 36)

# when ball falls off bottom:
if ball.rect.top > HEIGHT:
    lives -= 1
    if lives <= 0:
        game_over = True
    else:
        # reset ball position
        ball.rect.center = (WIDTH // 2, HEIGHT - 100)
        ball.vx = BALL_SPEED
        ball.vy = -BALL_SPEED
        ball.active = False  # wait for spacebar again

# draw lives on screen:
lives_text = font.render(f"Lives: {lives}", True, (255, 255, 255))
screen.blit(lives_text, (10, 10))`,
      },
    ],
    challenges: [
      {
        id: "breakaway-1",
        prompt: "In Brick Breakaway, why do you check 'if ball.vy > 0' before bouncing off the paddle?",
        hint: "Think about the ball moving upward through the paddle from below",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("down" in answer or "below" in answer or "upward" in answer or "through" in answer or "already" in answer or "moving" in answer)
`,
        solution: "If you don't check, the ball can get stuck inside the paddle and bounce back and forth rapidly. Checking vy > 0 means the ball is moving downward — only then do we reverse it upward.",
      },
      {
        id: "breakaway-2",
        prompt: "What's the formula to convert an angle (in degrees) to velocity components vx and vy in Pygame?",
        hint: "Use math.sin for vx and math.cos for vy. Remember Pygame's y-axis is flipped.",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("sin" in answer or "cos" in answer) and ("angle" in answer or "radians" in answer or "math" in answer)
`,
        solution: "angle_rad = math.radians(angle_deg); vx = speed * math.sin(angle_rad); vy = -speed * math.cos(angle_rad). The negative vy is because Pygame's y increases downward.",
      },
    ],
  },
];
