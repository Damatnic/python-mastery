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

---

## 🎬 What Gerber Covers in the Videos

**Pygame Install (2:09)**
- \`pip install pygame\` in terminal
- \`import pygame\` at the top of your file
- \`pygame.init()\` to initialize all modules
- Testing with a simple window to confirm it works

**Rectangles vs Vectors (5:39)** — this is important!
- When to use \`pygame.Rect\` vs \`pygame.math.Vector2\`
- Rects are great for collision detection and positioning
- Vectors are better for physics and smooth movement
- Gerber's advice: use Rect for position/collision, Vector2 for velocity/direction

**Delta Time (3:48)**
- Frame-rate independent movement
- Why 60fps on your machine != 60fps on another machine
- The \`dt\` pattern that makes movement consistent everywhere

---

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

## Delta Time — Frame-Rate Independence

This tripped me up at first. If you just do \`x += 5\` every frame, your game runs at different speeds on different computers. A faster computer runs more frames per second, so things move faster. That's bad.

The fix is **delta time** (dt). It measures how long the last frame took:

\`\`\`python
clock = pygame.time.Clock()

while running:
    dt = clock.tick(60) / 1000.0  # dt in seconds (e.g., 0.016 for 60fps)

    # Now multiply ALL movement by dt
    x += velocity * dt  # consistent speed regardless of frame rate
\`\`\`

**Gerber tip:** Always multiply velocity by dt. It's the difference between "5 pixels per frame" (inconsistent) and "300 pixels per second" (consistent on every machine).

\`\`\`python
# BAD — frame-dependent
x += 5

# GOOD — frame-independent
SPEED = 300  # pixels per second
x += SPEED * dt
\`\`\`

## Rect vs Vector2 — When to Use Each

Gerber makes an entire video about this because students get confused:

**Use pygame.Rect when:**
- You need collision detection (\`colliderect()\`, \`collidepoint()\`)
- You want to use handy properties like \`.center\`, \`.topleft\`, \`.clamp_ip()\`
- You're positioning sprites on screen

**Use pygame.math.Vector2 when:**
- You need smooth movement with floats (Rects use integers!)
- You want to normalize directions
- You need distance calculations
- You're doing physics with velocity/acceleration

**Common pattern — use both:**
\`\`\`python
class Ball(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.pos = pygame.math.Vector2(400, 300)  # float position
        self.vel = pygame.math.Vector2(3, -2)     # float velocity
        self.rect = pygame.Rect(0, 0, 20, 20)     # for collision

    def update(self, dt):
        self.pos += self.vel * dt * 60
        self.rect.center = self.pos  # sync rect to float pos
\`\`\`

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

## 🎨 Asset Creation Tips

Where to find free sprites and tilesets:
- **Kenney.nl** — amazing free assets, super polished, great for prototyping
- **itch.io** — search "free sprites" or "free tileset", tons of options
- **OpenGameArt.org** — community-contributed art, check licenses

Tools for making your own:
- **Aseprite** (paid but worth it) — pixel art and animation
- **Piskel** (free, browser-based) — simple pixel art
- **Tiled** — tilemap editor, exports JSON your game can load

---

## 💡 Tips & Tricks

- **Gerber tip:** Keep all constants in a \`settings.py\` file — way easier to tune the game later
- **Gerber tip:** Always call \`pygame.quit()\` at the end — prevents the window from hanging
- **Tip:** Use \`pygame.display.set_caption("Game Title")\` to set the window title
- **Tip:** \`clock.tick(60)\` returns milliseconds since last call — divide by 1000 for seconds

---

## ⚠️ Common Mistakes

- **Forgetting pygame.quit()** — the window hangs when you close it
- **Not calling pygame.display.flip()** — nothing shows up, you just stare at a black screen wondering why
- **Using pygame.QUIT instead of pygame.quit()** — QUIT is an event type, quit() is a function
- **Hardcoding frame rate assumptions** — use delta time instead of assuming 60fps
- **Putting draw calls before update** — you'll draw the old state, not the new one
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
    # Delta time for frame-rate independence
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill(BLACK)

    # Draw a rectangle and a circle
    pygame.draw.rect(screen, RED, (100, 100, 80, 80))
    pygame.draw.circle(screen, BLUE, (400, 300), 50)

    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Minimal Game Loop with Delta Time",
        explanation: "The simplest Pygame setup with proper delta time handling",
        code: `import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

running = True
while running:
    dt = clock.tick(60) / 1000.0  # delta time in seconds

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((30, 30, 30))
    pygame.display.flip()

pygame.quit()`,
      },
      {
        title: "Settings File Pattern",
        explanation: "Gerber's recommended structure — all constants in one place",
        code: `# settings.py
WIDTH, HEIGHT = 800, 600
FPS = 60

# Player settings
PLAYER_SPEED = 300  # pixels per second (multiply by dt!)
PLAYER_SIZE = 40

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# In main.py:
# from settings import *`,
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
        prompt: "Why do you multiply velocity by delta time (dt)? What problem does it solve?",
        hint: "Think about what happens on faster vs slower computers",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("frame" in answer or "fps" in answer or "rate" in answer or "speed" in answer or "consistent" in answer or "independent" in answer)
`,
        solution: "Delta time makes movement frame-rate independent. Without it, the game runs faster on faster computers (more frames per second = more movement). Multiplying by dt ensures consistent speed regardless of frame rate.",
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
## 🎬 What Gerber Covers in the Videos

**Basic Platform Movement (Brick Breakaway Video 3)**
- \`keys = pygame.key.get_pressed()\` for continuous input
- Moving the paddle with \`rect.x += speed\`
- Boundary clamping so paddle doesn't leave the screen

**Delta Time and Smooth Movements (Brick Breakaway Video 4)**
- \`clock.tick(60)\` returns milliseconds
- \`dt = clock.tick(60) / 1000.0\` converts to seconds
- Multiplying velocity by dt for frame-rate independence

**Vector Normalization (General Concepts)**
- Why diagonal movement is faster without normalization
- Using \`.normalize()\` to get consistent speed at any angle
- Essential for anything with 8-directional movement

---

## Delta Time Movement — The Right Way

Gerber teaches this early because it's foundational. Here's the pattern:

\`\`\`python
clock = pygame.time.Clock()

# Define speed in pixels PER SECOND, not per frame
SPEED = 300

while running:
    dt = clock.tick(60) / 1000.0  # dt in seconds

    keys = pygame.key.get_pressed()
    if keys[pygame.K_RIGHT]:
        x += SPEED * dt  # moves 300 pixels per second, regardless of FPS
\`\`\`

**Why this matters:** If you just do \`x += 5\` every frame, your game runs at different speeds on different computers. Delta time fixes that.

## Keyboard Input

\`\`\`python
keys = pygame.key.get_pressed()  # snapshot of current key state

if keys[pygame.K_LEFT]:
    x -= SPEED * dt
if keys[pygame.K_RIGHT]:
    x += SPEED * dt
if keys[pygame.K_UP]:
    y -= SPEED * dt
if keys[pygame.K_DOWN]:
    y += SPEED * dt
\`\`\`

Common keys: \`pygame.K_LEFT\`, \`pygame.K_RIGHT\`, \`pygame.K_UP\`, \`pygame.K_DOWN\`, \`pygame.K_SPACE\`, \`pygame.K_RETURN\`, \`pygame.K_a\`, \`pygame.K_w\`, etc.

## Boundary Clamping

Keep the player on screen. Gerber shows two ways:

**Manual clamping:**
\`\`\`python
# After moving
if player_rect.left < 0:
    player_rect.left = 0
if player_rect.right > WIDTH:
    player_rect.right = WIDTH
\`\`\`

**Using clamp_ip() — cleaner:**
\`\`\`python
# Clamp rect to stay within screen bounds
player_rect.clamp_ip(screen.get_rect())
\`\`\`

The \`_ip\` suffix means "in place" — it modifies the rect directly instead of returning a new one.

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

**Better bouncing with abs():**
\`\`\`python
# Using abs() prevents "stuck in wall" bugs
if x - BALL_RADIUS <= 0:
    x = BALL_RADIUS
    vx = abs(vx)  # force positive (moving right)
elif x + BALL_RADIUS >= WIDTH:
    x = WIDTH - BALL_RADIUS
    vx = -abs(vx)  # force negative (moving left)
\`\`\`

## Acceleration and Friction

This is what makes movement feel good instead of robotic:

\`\`\`python
# Physics constants
ACCELERATION = 500    # pixels per second squared
FRICTION = 0.85       # multiplier each frame (must be < 1.0)
MAX_SPEED = 400       # pixels per second

vx = 0  # velocity starts at 0

while running:
    dt = clock.tick(60) / 1000.0

    keys = pygame.key.get_pressed()

    # Apply acceleration when key pressed
    if keys[pygame.K_RIGHT]:
        vx += ACCELERATION * dt
    if keys[pygame.K_LEFT]:
        vx -= ACCELERATION * dt

    # Apply friction (slows you down when not pressing)
    vx *= FRICTION

    # Clamp to max speed
    vx = max(-MAX_SPEED, min(MAX_SPEED, vx))

    # Stop completely at very low speeds (prevents drift)
    if abs(vx) < 0.5:
        vx = 0

    x += vx * dt
\`\`\`

**Gerber tip:** Friction below 1.0 means velocity shrinks each frame when you're not pressing anything — that's the "sliding to a stop" feel.

## Vector Normalization — Diagonal Movement Fix

Without normalization, diagonal movement is ~41% faster than horizontal/vertical. That's because you're adding two velocities together:

\`\`\`python
# BAD — diagonal is faster
if keys[pygame.K_RIGHT]: vx = SPEED
if keys[pygame.K_DOWN]:  vy = SPEED
# Moving right+down = sqrt(SPEED^2 + SPEED^2) = SPEED * 1.414
\`\`\`

**The fix — normalize the direction:**
\`\`\`python
from pygame.math import Vector2

direction = Vector2(0, 0)
if keys[pygame.K_LEFT]:  direction.x -= 1
if keys[pygame.K_RIGHT]: direction.x += 1
if keys[pygame.K_UP]:    direction.y -= 1
if keys[pygame.K_DOWN]:  direction.y += 1

if direction.length() > 0:
    direction = direction.normalize()  # length becomes 1
    pos += direction * SPEED * dt
\`\`\`

## Storing Float Position Separately

**Gerber tip:** Rects use integers, which causes jitter with small movements. Store a float position separately:

\`\`\`python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((40, 40))
        self.rect = self.image.get_rect()

        # Float position for smooth movement
        self.float_x = float(self.rect.x)
        self.float_y = float(self.rect.y)

    def update(self, dt):
        self.float_x += self.vx * dt
        self.float_y += self.vy * dt

        # Sync rect to float position
        self.rect.x = int(self.float_x)
        self.rect.y = int(self.float_y)
\`\`\`

---

## 💡 Tips & Tricks

- **Gerber tip:** Always multiply velocity by dt for frame-rate independence
- **Tip:** Store float positions separately from the rect for smooth sub-pixel movement
- **Tip:** Use \`rect.clamp_ip(screen.get_rect())\` for easy boundary clamping
- **Tip:** Friction values around 0.85-0.92 feel natural for most games
- **Tip:** Normalize direction vectors when allowing 8-directional movement

---

## ⚠️ Common Mistakes

- **Not using delta time** — game runs at different speeds on different machines
- **Using integer division** on rect positions — causes visible jitter
- **Forgetting to check direction.length() > 0** before normalizing — divides by zero
- **Just flipping velocity on wall bounce** — ball can get stuck, use abs() instead
- **Diagonal movement 41% faster** — forgot to normalize the direction vector
`,
    starterCode: `# Ball bouncing with delta time — run this locally

import pygame
pygame.init()

WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

BALL_RADIUS = 20
BALL_COLOR = (255, 100, 0)
SPEED = 300  # pixels per second

# Float position for smooth movement
x, y = 400.0, 300.0
vx, vy = SPEED, SPEED * 0.75

running = True
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Move the ball (using dt!)
    x += vx * dt
    y += vy * dt

    # Bounce off walls (with abs to prevent sticking)
    if x - BALL_RADIUS <= 0:
        x = BALL_RADIUS
        vx = abs(vx)
    elif x + BALL_RADIUS >= WIDTH:
        x = WIDTH - BALL_RADIUS
        vx = -abs(vx)

    if y - BALL_RADIUS <= 0:
        y = BALL_RADIUS
        vy = abs(vy)
    elif y + BALL_RADIUS >= HEIGHT:
        y = HEIGHT - BALL_RADIUS
        vy = -abs(vy)

    screen.fill((20, 20, 20))
    pygame.draw.circle(screen, BALL_COLOR, (int(x), int(y)), BALL_RADIUS)
    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Acceleration & Friction Movement",
        explanation: "Smooth movement that builds up speed and slides to a stop",
        code: `import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

# Float position
x, y = 400.0, 300.0
vx, vy = 0.0, 0.0

ACCEL = 600       # pixels per second squared
FRICTION = 0.88   # multiplier per frame
MAX_SPEED = 400   # pixels per second

running = True
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:  vx -= ACCEL * dt
    if keys[pygame.K_RIGHT]: vx += ACCEL * dt
    if keys[pygame.K_UP]:    vy -= ACCEL * dt
    if keys[pygame.K_DOWN]:  vy += ACCEL * dt

    # Apply friction
    vx *= FRICTION
    vy *= FRICTION

    # Clamp speed
    vx = max(-MAX_SPEED, min(MAX_SPEED, vx))
    vy = max(-MAX_SPEED, min(MAX_SPEED, vy))

    # Stop at low speeds
    if abs(vx) < 0.5: vx = 0
    if abs(vy) < 0.5: vy = 0

    x += vx * dt
    y += vy * dt

    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, (100, 200, 255), (int(x)-20, int(y)-20, 40, 40))
    pygame.display.flip()

pygame.quit()`,
      },
      {
        title: "Normalized 8-Directional Movement",
        explanation: "Same speed in all directions, including diagonals",
        code: `from pygame.math import Vector2

SPEED = 300  # pixels per second

def get_movement_vector(keys, dt):
    direction = Vector2(0, 0)

    if keys[pygame.K_LEFT] or keys[pygame.K_a]:
        direction.x -= 1
    if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
        direction.x += 1
    if keys[pygame.K_UP] or keys[pygame.K_w]:
        direction.y -= 1
    if keys[pygame.K_DOWN] or keys[pygame.K_s]:
        direction.y += 1

    # Normalize to prevent faster diagonal movement
    if direction.length() > 0:
        direction = direction.normalize()

    return direction * SPEED * dt

# In game loop:
# movement = get_movement_vector(keys, dt)
# pos += movement`,
      },
    ],
    challenges: [
      {
        id: "movement-1",
        prompt: "A ball moves at 300 pixels per second. If dt = 0.016 (60fps), how many pixels does it move in one frame?",
        hint: "pixels = speed * dt",
        validateFn: `
def validate(answer):
    # 300 * 0.016 = 4.8
    return "4.8" in answer or "4.80" in answer or "5" in answer.split()[0]
`,
        solution: "300 * 0.016 = 4.8 pixels per frame",
      },
      {
        id: "movement-2",
        prompt: "Why do you multiply velocity by a friction value (like 0.88) instead of subtracting a fixed amount?",
        hint: "Think about what happens when velocity gets very small",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("proportion" in answer or "percent" in answer or "smaller" in answer or "zero" in answer or "smooth" in answer or "relative" in answer)
`,
        solution: "Multiplying by friction (< 1.0) slows proportionally — it naturally approaches zero smoothly. Subtracting a fixed amount can cause jitter or overshoot past zero.",
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
## 🎬 What Gerber Covers in the Videos

**User Platform Class and Attributes (Brick Breakaway Video 2)**
- Creating a class that extends \`pygame.sprite.Sprite\`
- \`self.image\` — the Surface to draw
- \`self.rect\` — position and collision bounds
- Speed as an attribute

**Surface Handler (Sprite Game Video 4)**
- Extracting frames from a sprite sheet by pixel offset
- The \`get_frame(col, row)\` pattern
- Using \`pygame.SRCALPHA\` for transparency

**Animating the User (Sprite Game Video 6)**
- \`frame_index\` to track current animation frame
- \`animation_timer\` to control speed
- Cycling through frames with modulo

**Character Resize (Sprite Game Video 9)**
- \`pygame.transform.scale()\` for resizing sprites
- Keeping aspect ratio when scaling

---

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

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.rect.x -= 300 * dt
        if keys[pygame.K_RIGHT]: self.rect.x += 300 * dt
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
all_sprites.update(dt)        # calls update(dt) on every sprite
all_sprites.draw(screen)      # draws every sprite to the screen
\`\`\`

**Gerber tip:** Use sprite groups — \`all_sprites.update()\` and \`all_sprites.draw()\` handle everything. Way cleaner than manually looping through every object.

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

## Resizing Sprites

\`\`\`python
# Load and scale in one step
original = pygame.image.load("player.png").convert_alpha()
self.image = pygame.transform.scale(original, (64, 64))  # new size

# Scale by factor (2x bigger, or 0.5x smaller)
self.image = pygame.transform.scale(original, (original.get_width() * 2, original.get_height() * 2))
\`\`\`

**Tip:** Use \`pygame.transform.scale()\` with 2x or 0.5x for quick sizing. Pixel art looks best at integer multiples.

## The Surface Handler Pattern

Gerber's pattern for extracting frames from a sprite sheet. This is super useful:

\`\`\`python
class SurfaceHandler:
    def __init__(self, sheet_path, frame_width, frame_height):
        self.sheet = pygame.image.load(sheet_path).convert_alpha()
        self.frame_width = frame_width
        self.frame_height = frame_height

    def get_frame(self, col, row=0):
        """Cut a single frame from the sheet at (col, row)"""
        x = col * self.frame_width
        y = row * self.frame_height

        # Create transparent surface
        frame = pygame.Surface((self.frame_width, self.frame_height), pygame.SRCALPHA)

        # Copy just this frame from the sheet
        frame.blit(self.sheet, (0, 0), (x, y, self.frame_width, self.frame_height))
        return frame

    def get_animation(self, row, num_frames):
        """Get a list of frames for animation"""
        return [self.get_frame(col, row) for col in range(num_frames)]
\`\`\`

**Usage:**
\`\`\`python
handler = SurfaceHandler("character.png", 64, 64)
walk_frames = handler.get_animation(row=0, num_frames=4)  # frames 0-3 on row 0
attack_frames = handler.get_animation(row=1, num_frames=3)  # frames 0-2 on row 1
\`\`\`

## Sprite Sheet Frame Extraction — The Math

If your sprite sheet has 64x64 pixel frames arranged in a grid:

\`\`\`
Frame positions on a 256x128 sheet (4 cols x 2 rows):
(0,0)   (64,0)   (128,0)  (192,0)    <- row 0
(0,64)  (64,64)  (128,64) (192,64)   <- row 1
\`\`\`

\`\`\`python
# Get frame at column 2, row 1
col, row = 2, 1
frame_width, frame_height = 64, 64

x = col * frame_width   # 2 * 64 = 128
y = row * frame_height  # 1 * 64 = 64

# The source rect for blit is (128, 64, 64, 64)
frame.blit(sheet, (0, 0), (x, y, frame_width, frame_height))
\`\`\`

## Animation System

\`\`\`python
class AnimatedSprite(pygame.sprite.Sprite):
    def __init__(self, frames):
        super().__init__()
        self.frames = frames
        self.frame_index = 0
        self.animation_timer = 0
        self.animation_speed = 8  # frames between changes
        self.image = self.frames[0]
        self.rect = self.image.get_rect()

    def animate(self):
        self.animation_timer += 1
        if self.animation_timer >= self.animation_speed:
            self.animation_timer = 0
            self.frame_index = (self.frame_index + 1) % len(self.frames)
            self.image = self.frames[self.frame_index]

    def update(self, dt):
        self.animate()
        # ... movement code
\`\`\`

## Flipping Sprites for Direction

Most sprite sheets only have one direction. Flip at runtime:

\`\`\`python
# Flip horizontally (True, False = horizontal flip, no vertical flip)
flipped = pygame.transform.flip(self.image, True, False)

# In update:
if self.vx < 0:  # moving left
    self.facing_right = False
elif self.vx > 0:
    self.facing_right = True

# Apply flip when needed
if not self.facing_right:
    self.image = pygame.transform.flip(self.frames[self.frame_index], True, False)
\`\`\`

## Rect Properties — Your Best Friends

\`\`\`python
rect.x, rect.y         # top-left corner
rect.center            # (center_x, center_y) — set position by center!
rect.centerx, rect.centery
rect.top, rect.bottom, rect.left, rect.right
rect.width, rect.height
rect.topleft, rect.topright, rect.bottomleft, rect.bottomright
rect.midleft, rect.midright, rect.midtop, rect.midbottom
\`\`\`

**Tip:** Setting \`rect.center = (x, y)\` is often easier than calculating \`rect.x\` and \`rect.y\`.

---

## 💡 Tips & Tricks

- **Gerber tip:** Use sprite groups — \`all_sprites.update()\` and \`all_sprites.draw()\` handle everything
- **Tip:** Kenney.nl has free sprite sheets that work great for prototyping
- **Tip:** Use \`pygame.SRCALPHA\` when creating surfaces for transparent sprites
- **Tip:** Pixel art looks best scaled at integer multiples (2x, 3x, not 1.5x)
- **Tip:** Call \`self.kill()\` to remove a sprite from all its groups

---

## ⚠️ Common Mistakes

- **Forgetting \`super().__init__()\`** — sprite doesn't work properly with groups
- **Not setting both self.image AND self.rect** — sprite won't draw
- **Loading images inside update()** — loads every frame, kills performance
- **Modifying self.image directly** — messes up animation, keep original frames separate
- **Using convert() instead of convert_alpha()** — loses transparency
`,
    starterCode: `# Sprite example — copy to local Pygame environment

import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        # Placeholder colored square
        self.image = pygame.Surface((40, 40))
        self.image.fill((0, 200, 100))
        self.rect = self.image.get_rect()
        self.rect.center = (400, 300)

        # Float position for smooth movement
        self.float_x = float(self.rect.centerx)
        self.float_y = float(self.rect.centery)
        self.speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.float_x -= self.speed * dt
        if keys[pygame.K_RIGHT]: self.float_x += self.speed * dt
        if keys[pygame.K_UP]:    self.float_y -= self.speed * dt
        if keys[pygame.K_DOWN]:  self.float_y += self.speed * dt

        self.rect.center = (int(self.float_x), int(self.float_y))

        # Keep on screen
        self.rect.clamp_ip(screen.get_rect())
        self.float_x = float(self.rect.centerx)
        self.float_y = float(self.rect.centery)

all_sprites = pygame.sprite.Group()
player = Player()
all_sprites.add(player)

running = True
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    all_sprites.update(dt)
    screen.fill((30, 30, 30))
    all_sprites.draw(screen)
    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Surface Handler — Sprite Sheet Loader",
        explanation: "Gerber's pattern for extracting frames from a sprite sheet",
        code: `class SurfaceHandler:
    def __init__(self, sheet_path, frame_width, frame_height):
        self.sheet = pygame.image.load(sheet_path).convert_alpha()
        self.frame_width = frame_width
        self.frame_height = frame_height

    def get_frame(self, col, row=0):
        x = col * self.frame_width
        y = row * self.frame_height
        frame = pygame.Surface((self.frame_width, self.frame_height), pygame.SRCALPHA)
        frame.blit(self.sheet, (0, 0), (x, y, self.frame_width, self.frame_height))
        return frame

    def get_animation(self, row, num_frames):
        return [self.get_frame(col, row) for col in range(num_frames)]

# Usage:
# handler = SurfaceHandler("hero.png", 32, 32)
# walk_right = handler.get_animation(row=0, num_frames=4)
# walk_left = [pygame.transform.flip(f, True, False) for f in walk_right]`,
      },
      {
        title: "Animated Player with Direction",
        explanation: "Full animation system with sprite flipping",
        code: `class AnimatedPlayer(pygame.sprite.Sprite):
    def __init__(self, frames):
        super().__init__()
        self.frames = frames
        self.frame_index = 0
        self.animation_timer = 0
        self.image = self.frames[0]
        self.rect = self.image.get_rect(center=(400, 300))
        self.facing_right = True
        self.speed = 300
        self.float_x = float(self.rect.centerx)

    def update(self, dt):
        keys = pygame.key.get_pressed()
        moving = False

        if keys[pygame.K_LEFT]:
            self.float_x -= self.speed * dt
            self.facing_right = False
            moving = True
        if keys[pygame.K_RIGHT]:
            self.float_x += self.speed * dt
            self.facing_right = True
            moving = True

        self.rect.centerx = int(self.float_x)

        # Animate only when moving
        if moving:
            self.animation_timer += 1
            if self.animation_timer >= 8:
                self.animation_timer = 0
                self.frame_index = (self.frame_index + 1) % len(self.frames)
        else:
            self.frame_index = 0

        # Get frame and flip if needed
        self.image = self.frames[self.frame_index]
        if not self.facing_right:
            self.image = pygame.transform.flip(self.image, True, False)`,
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
        prompt: "In a sprite sheet where each frame is 32x32 pixels, what pixel coordinates (x, y) would you use to get the frame at column 3, row 2?",
        hint: "x = col * width, y = row * height",
        validateFn: `
def validate(answer):
    return ("96" in answer and "64" in answer) or ("(96, 64)" in answer) or ("96,64" in answer)
`,
        solution: "x = 3 * 32 = 96, y = 2 * 32 = 64. The source rect would be (96, 64, 32, 32).",
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
## 🎬 What Gerber Covers in the Videos

**Ball and Platform Collision (Brick Breakaway Video 7)**
- \`colliderect()\` for rect-to-rect detection
- Checking \`vy > 0\` before bouncing (prevent stuck ball)
- The offset trick for angled bounces

**Brick Collisions (Brick Breakaway Video 9)**
- \`pygame.sprite.spritecollide()\` for one-vs-group
- Removing bricks when hit
- Figuring out which direction to bounce

**Enemy Methods (Tower Defense Video 8)**
- Waypoint path following for enemies
- Moving toward a target point
- Distance checking to know when you've arrived

**Projectile Class (Tower Defense Videos 10-11)**
- Velocity toward target using angle calculation
- \`math.atan2(dy, dx)\` for angle between two points
- Tracking a moving target

**Collisions and Bug Fixes (Sprite Game Video 13)**
- Player vs NPC collision
- Common collision bugs and how to fix them

---

## Why Collision Detection Matters

Without it, things pass through each other. Bullets don't hit enemies. The ball goes through the paddle. The player walks through walls. Collision detection is what makes games feel real.

## Rect Collision (Fastest)

The simplest method — check if two rectangles overlap:

\`\`\`python
# Two rect objects
if rect1.colliderect(rect2):
    print("collision!")

# Check a rect against a point (like mouse position)
if rect.collidepoint(mouse_x, mouse_y):
    print("mouse is inside rect")
\`\`\`

Rect collision is fast and good enough for most cases.

## Sprite Group Collision

For checking one sprite against a whole group:

\`\`\`python
# Did the player touch any enemy?
hit_list = pygame.sprite.spritecollide(player, enemies, False)
# False = don't kill the enemies on collision
# Returns list of enemies the player collided with

if hit_list:
    player.take_damage(10)

# Did any bullet hit any enemy? Kill both.
hits = pygame.sprite.groupcollide(bullets, enemies, True, True)
# True, True = kill both the bullet and enemy on hit
\`\`\`

## Circle/Distance-Based Collision

More accurate for round objects or when you need range detection (like tower targeting):

\`\`\`python
import math

def circles_collide(x1, y1, r1, x2, y2, r2):
    dist = math.sqrt((x2-x1)**2 + (y2-y1)**2)
    return dist < r1 + r2

# Or use math.dist (cleaner):
dist = math.dist((x1, y1), (x2, y2))
if dist < r1 + r2:
    # collision!
\`\`\`

**For tower range checking:**
\`\`\`python
# Is enemy within tower's attack range?
dist = math.dist(tower.rect.center, enemy.rect.center)
if dist <= TOWER_RANGE:
    tower.target = enemy
\`\`\`

## Waypoint/Path Following (Tower Defense)

Enemies follow a list of waypoints. The key is tracking which waypoint they're heading toward:

\`\`\`python
class Enemy:
    def __init__(self, waypoints):
        self.waypoints = waypoints
        self.waypoint_index = 0
        self.pos = pygame.math.Vector2(waypoints[0])
        self.speed = 100  # pixels per second

    def update(self, dt):
        if self.waypoint_index >= len(self.waypoints):
            return  # reached the end

        target = pygame.math.Vector2(self.waypoints[self.waypoint_index])
        direction = target - self.pos
        dist = direction.length()

        if dist < self.speed * dt:
            # Reached this waypoint, go to next
            self.pos = target
            self.waypoint_index += 1
        else:
            # Move toward waypoint
            direction = direction.normalize()
            self.pos += direction * self.speed * dt
\`\`\`

## Angle Calculation with math.atan2

**Essential for projectiles that need to aim at a target:**

\`\`\`python
import math

# Get angle from point A to point B
dx = target_x - start_x
dy = target_y - start_y
angle = math.atan2(dy, dx)  # radians

# Convert to velocity
speed = 400  # pixels per second
vx = math.cos(angle) * speed
vy = math.sin(angle) * speed
\`\`\`

**Why atan2 instead of atan?** \`atan2(y, x)\` handles all four quadrants correctly. Regular \`atan\` doesn't know which quadrant you're in.

## Projectile That Tracks a Moving Target

\`\`\`python
class Projectile:
    def __init__(self, start_pos, target_sprite):
        self.pos = pygame.math.Vector2(start_pos)
        self.target = target_sprite  # reference to enemy
        self.speed = 500
        self.damage = 25
        self.alive = True

    def update(self, dt):
        if not self.target or not self.target.alive():
            self.alive = False
            return

        # Aim at target's current position (tracks movement!)
        target_pos = pygame.math.Vector2(self.target.rect.center)
        direction = target_pos - self.pos
        dist = direction.length()

        if dist < self.speed * dt:
            # Hit!
            self.target.take_damage(self.damage)
            self.alive = False
        else:
            direction = direction.normalize()
            self.pos += direction * self.speed * dt
\`\`\`

## Ball + Paddle Collision (The Right Way)

**Gerber tip:** Always check \`vy > 0\` before bouncing off the paddle:

\`\`\`python
if ball_rect.colliderect(paddle_rect) and ball_vy > 0:
    ball_vy *= -1
\`\`\`

**Why?** If you don't check, the ball can get stuck inside the paddle and bounce back and forth rapidly. \`vy > 0\` means the ball is moving downward — only then should we bounce it up.

## Side-Aware Bounce (Which Side Did I Hit?)

For bouncing off bricks, you need to know if you hit the top/bottom or left/right:

\`\`\`python
def bounce_off_rect(ball_rect, ball_vel, target_rect):
    # Calculate overlap on each side
    overlap_left   = ball_rect.right - target_rect.left
    overlap_right  = target_rect.right - ball_rect.left
    overlap_top    = ball_rect.bottom - target_rect.top
    overlap_bottom = target_rect.bottom - ball_rect.top

    min_horizontal = min(overlap_left, overlap_right)
    min_vertical   = min(overlap_top, overlap_bottom)

    # Bounce off the axis with smaller overlap
    if min_horizontal < min_vertical:
        ball_vel[0] *= -1  # horizontal bounce
    else:
        ball_vel[1] *= -1  # vertical bounce

    return ball_vel
\`\`\`

**Why smallest overlap?** The smallest overlap indicates which side the ball entered from. If horizontal overlap is smaller, it came from the left/right. If vertical is smaller, it came from top/bottom.

---

## 💡 Tips & Tricks

- **Gerber tip:** Check \`vy > 0\` on paddle collision — prevents ball getting stuck
- **Tip:** \`math.atan2(dy, dx)\` gives angle from point A to point B — essential for Tower Defense
- **Tip:** Use \`math.dist()\` instead of manual sqrt — cleaner and just as fast
- **Tip:** Keep a reference to the target, not just its position, for tracking projectiles
- **Tip:** Process only one brick collision per frame to prevent weird double-bounces

---

## ⚠️ Common Mistakes

- **Not checking vy > 0 on paddle** — ball gets stuck and vibrates
- **Using position-at-fire instead of tracking** — projectiles miss moving targets
- **Bouncing off multiple bricks in one frame** — causes erratic behavior
- **Forgetting to check if target is still alive** — crashes or weird behavior
- **Using atan instead of atan2** — wrong angles in some quadrants
`,
    starterCode: `# Collision demo — rect-based

import pygame
pygame.init()

screen = pygame.display.set_mode((800, 600))
clock = pygame.time.Clock()

# Player (movable)
player_rect = pygame.Rect(100, 270, 40, 60)
speed = 300

# Walls (static)
walls = [
    pygame.Rect(350, 100, 20, 400),
    pygame.Rect(500, 200, 200, 20),
]

WHITE = (255, 255, 255)
GREEN = (0, 200, 100)
RED = (255, 50, 50)

running = True
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    keys = pygame.key.get_pressed()
    dx, dy = 0, 0
    if keys[pygame.K_RIGHT]: dx = speed * dt
    if keys[pygame.K_LEFT]:  dx = -speed * dt
    if keys[pygame.K_UP]:    dy = -speed * dt
    if keys[pygame.K_DOWN]:  dy = speed * dt

    # Move and check collision
    player_rect.x += dx
    for wall in walls:
        if player_rect.colliderect(wall):
            if dx > 0: player_rect.right = wall.left
            if dx < 0: player_rect.left = wall.right

    player_rect.y += dy
    for wall in walls:
        if player_rect.colliderect(wall):
            if dy > 0: player_rect.bottom = wall.top
            if dy < 0: player_rect.top = wall.bottom

    # Check collision status for color
    colliding = any(player_rect.colliderect(w) for w in walls)
    player_color = RED if colliding else GREEN

    screen.fill((0, 0, 0))
    pygame.draw.rect(screen, player_color, player_rect)
    for wall in walls:
        pygame.draw.rect(screen, WHITE, wall)
    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Tower Targeting with Range Check",
        explanation: "Find the closest enemy within range using distance",
        code: `import math

def find_target(tower, enemies, tower_range):
    closest = None
    closest_dist = tower_range + 1

    for enemy in enemies:
        if not enemy.alive:
            continue
        dist = math.dist(tower.rect.center, enemy.rect.center)
        if dist <= tower_range and dist < closest_dist:
            closest = enemy
            closest_dist = dist

    return closest

# Usage in tower.update():
# self.target = find_target(self, enemies, TOWER_RANGE)
# if self.target and self.cooldown <= 0:
#     fire_projectile(self.pos, self.target)`,
      },
      {
        title: "Projectile Velocity from Angle",
        explanation: "Calculate vx/vy to fire toward a target",
        code: `import math

def calculate_velocity_to_target(start_pos, target_pos, speed):
    dx = target_pos[0] - start_pos[0]
    dy = target_pos[1] - start_pos[1]

    angle = math.atan2(dy, dx)

    vx = math.cos(angle) * speed
    vy = math.sin(angle) * speed

    return vx, vy

# Usage:
# vx, vy = calculate_velocity_to_target(tower.pos, enemy.pos, PROJECTILE_SPEED)
# projectile = Projectile(tower.pos, vx, vy)`,
      },
    ],
    challenges: [
      {
        id: "collision-1",
        prompt: "Why do you check 'vy > 0' before bouncing the ball off the paddle in Brick Breakaway?",
        hint: "Think about the ball moving upward through the paddle",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("down" in answer or "stuck" in answer or "through" in answer or "direction" in answer or "moving" in answer)
`,
        solution: "If you don't check, the ball can get stuck inside the paddle and bounce rapidly. vy > 0 means the ball is moving downward — only then do we reverse it.",
      },
      {
        id: "collision-2",
        prompt: "What does math.atan2(dy, dx) return, and why use it instead of math.atan(dy/dx)?",
        hint: "Think about different quadrants and division by zero",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("angle" in answer or "radian" in answer) and ("quadrant" in answer or "zero" in answer or "direction" in answer or "four" in answer or "all" in answer)
`,
        solution: "atan2 returns the angle in radians from the positive x-axis to the point (dx, dy). It handles all four quadrants correctly and doesn't divide by zero when dx=0. Regular atan can't distinguish between opposite directions.",
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

---

## 🎬 Gerber's Video Breakdown (9 Videos)

Follow along with Gerber's videos in order. Each video adds one piece:

**Video 1: Project Setup**
- Create folder structure: main.py, settings.py
- Import pygame, basic window setup
- Empty game loop with clock

**Video 2: User Platform Class and Attributes**
- Create Paddle class extending pygame.sprite.Sprite
- self.image, self.rect, self.speed
- Position at bottom of screen

**Video 3: Basic Platform Movement**
- \`keys = pygame.key.get_pressed()\`
- Move paddle left/right with \`rect.x += speed\`
- Clamp to screen boundaries

**Video 4: Delta Time and Smooth Movements**
- \`dt = clock.tick(60) / 1000.0\`
- Multiply velocity by dt
- Consistent speed on any machine

**Video 5: Ball Class and Attributes**
- Ball sprite with vx/vy as floats
- \`pygame.SRCALPHA\` for circular surface
- Float position separate from rect

**Video 6: Ball Class Methods**
- update() with wall bounce logic
- \`active\` flag for spacebar launch
- Wait until player is ready

**Video 7: Ball and Platform Collision**
- \`colliderect()\` detection
- Check \`vy > 0\` before bouncing!
- Offset trick for angled bounces based on hit position

**Video 8: Brick Class**
- Grid layout with nested loops
- Color by row (harder = different color)
- Rect-based collision bounds

**Video 9: Brick Collisions**
- \`spritecollide()\` or manual rect check
- Remove bricks on hit
- Determine bounce direction

---

## Project Structure

\`\`\`
BrickBreakaway/
├── main.py          # game loop + main()
├── settings.py      # constants (WIDTH, HEIGHT, colors, speeds)
├── paddle.py        # Paddle sprite
├── ball.py          # Ball with physics
└── brick.py         # Brick sprite
\`\`\`

## Video 1: Settings / Constants

\`\`\`python
# settings.py
WIDTH, HEIGHT = 800, 600
FPS = 60

PADDLE_SPEED = 400   # pixels per second (use dt!)
PADDLE_WIDTH = 120
PADDLE_HEIGHT = 15

BALL_SPEED = 350     # pixels per second
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

## Video 2-3: Paddle Class

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
        self.float_x = float(self.rect.x)

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and self.rect.left > 0:
            self.float_x -= PADDLE_SPEED * dt
        if keys[pygame.K_RIGHT] and self.rect.right < WIDTH:
            self.float_x += PADDLE_SPEED * dt

        self.rect.x = int(self.float_x)
        self.rect.clamp_ip(pygame.Rect(0, 0, WIDTH, HEIGHT))
        self.float_x = float(self.rect.x)
\`\`\`

## Video 5-6: Ball Class

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
        self.reset()

    def reset(self):
        self.rect.center = (WIDTH // 2, HEIGHT // 2)
        self.float_x = float(self.rect.centerx)
        self.float_y = float(self.rect.centery)
        self.vx = BALL_SPEED * 0.7
        self.vy = -BALL_SPEED
        self.active = False

    def update(self, dt):
        if not self.active:
            return

        self.float_x += self.vx * dt
        self.float_y += self.vy * dt

        # Wall bounces
        if self.float_x - BALL_RADIUS <= 0:
            self.float_x = BALL_RADIUS
            self.vx = abs(self.vx)
        elif self.float_x + BALL_RADIUS >= WIDTH:
            self.float_x = WIDTH - BALL_RADIUS
            self.vx = -abs(self.vx)

        if self.float_y - BALL_RADIUS <= 0:
            self.float_y = BALL_RADIUS
            self.vy = abs(self.vy)

        self.rect.center = (int(self.float_x), int(self.float_y))
\`\`\`

## Video 7: Ball + Paddle Collision

\`\`\`python
# In main game loop:
if ball.rect.colliderect(paddle.rect) and ball.vy > 0:
    ball.vy = -abs(ball.vy)  # Bounce up

    # Offset trick: angle based on where ball hit paddle
    offset = (ball.rect.centerx - paddle.rect.centerx) / (PADDLE_WIDTH / 2)
    ball.vx = BALL_SPEED * offset * 0.8
\`\`\`

**Gerber tip:** The offset trick makes the game more interesting. Hit the ball with the edge of the paddle and it bounces at an angle.

## Video 8-9: Brick Class and Collisions

\`\`\`python
# brick.py
import pygame
from settings import *

class Brick(pygame.sprite.Sprite):
    def __init__(self, x, y, hits=1):
        super().__init__()
        self.hits = hits
        self.image = pygame.Surface((BRICK_WIDTH, BRICK_HEIGHT))
        self.image.fill(COLORS.get(hits, (150, 150, 150)))
        self.rect = self.image.get_rect(topleft=(x, y))

    def hit(self):
        self.hits -= 1
        if self.hits <= 0:
            self.kill()
        else:
            self.image.fill(COLORS.get(self.hits, (150, 150, 150)))
\`\`\`

---

## 💡 Tips & Tricks

- **Gerber tip:** Keep all constants in settings.py — way easier to tune
- **Gerber tip:** Check \`vy > 0\` before paddle bounce — prevents stuck ball
- **Tip:** Use float positions for smooth movement, sync to rect each frame
- **Tip:** Process only one brick collision per frame to prevent double-bounces

---

## ⚠️ Common Mistakes

- **Forgetting vy > 0 check** — ball gets stuck in paddle
- **Integer positions causing jitter** — use floats, convert to int for rect
- **Not clamping paddle to screen** — paddle escapes the window
- **Multiple brick collisions per frame** — break after first hit

---

## Step 2 — Improvement Ideas (20+ points required)

- **Informative Text (5pts)** — spacebar prompt + game over message
- **Randomized Ball Start (5pts)** — random angle on launch
- **Player Life (10pts)** — 3 lives, reset ball on fall
- **Additional Levels (10pts)** — new brick layout after clearing
- **Power Up Bricks (15pts)** — special bricks drop power-ups
`,
    starterCode: `# Brick Breakaway — complete starter with delta time
import pygame
pygame.init()

WIDTH, HEIGHT = 800, 600
FPS = 60
PADDLE_SPEED = 400
BALL_SPEED = 350
BRICK_ROWS, BRICK_COLS = 5, 10
BRICK_W, BRICK_H = 72, 24

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Brick Breakaway")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 36)

# Paddle
paddle = pygame.Rect(WIDTH//2 - 60, HEIGHT - 40, 120, 15)
paddle_float_x = float(paddle.x)

# Ball (float position)
bx, by = float(WIDTH//2), float(HEIGHT//2)
bvx, bvy = BALL_SPEED * 0.7, -BALL_SPEED
ball_active = False
BALL_R = 10

# Bricks
bricks = []
colors = [(255,80,80),(255,140,0),(255,220,0),(100,220,100),(100,180,255)]
for row in range(BRICK_ROWS):
    for col in range(BRICK_COLS):
        x = col * (BRICK_W + 4) + 40
        y = row * (BRICK_H + 4) + 80
        bricks.append(pygame.Rect(x, y, BRICK_W, BRICK_H))

running = True
while running:
    dt = clock.tick(FPS) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN and event.key == pygame.K_SPACE:
            ball_active = True

    # Paddle movement with dt
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT] and paddle.left > 0:
        paddle_float_x -= PADDLE_SPEED * dt
    if keys[pygame.K_RIGHT] and paddle.right < WIDTH:
        paddle_float_x += PADDLE_SPEED * dt
    paddle.x = int(paddle_float_x)

    if ball_active:
        bx += bvx * dt
        by += bvy * dt

        # Wall bounces
        if bx - BALL_R <= 0:
            bx = BALL_R
            bvx = abs(bvx)
        elif bx + BALL_R >= WIDTH:
            bx = WIDTH - BALL_R
            bvx = -abs(bvx)
        if by - BALL_R <= 0:
            by = BALL_R
            bvy = abs(bvy)

        # Paddle bounce
        ball_rect = pygame.Rect(bx-BALL_R, by-BALL_R, BALL_R*2, BALL_R*2)
        if ball_rect.colliderect(paddle) and bvy > 0:
            bvy = -abs(bvy)
            # Offset for angle
            offset = (bx - paddle.centerx) / (paddle.width / 2)
            bvx = BALL_SPEED * offset * 0.8

        # Brick collision
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

pygame.quit()
`,
    examples: [
      {
        title: "Player Lives System",
        explanation: "Step 2 option (10pts) — track lives, reset ball on fall",
        code: `lives = 3

# When ball falls:
if by > HEIGHT:
    lives -= 1
    if lives <= 0:
        game_over = True
    else:
        # Reset ball
        bx, by = float(WIDTH//2), float(HEIGHT - 100)
        bvx, bvy = BALL_SPEED * 0.7, -BALL_SPEED
        ball_active = False

# Draw lives:
lives_text = font.render(f"Lives: {lives}", True, (255,255,255))
screen.blit(lives_text, (10, 10))`,
      },
      {
        title: "Randomized Ball Launch",
        explanation: "Step 2 option (5pts) — random angle on spacebar",
        code: `import math, random

def launch_ball():
    angle = random.uniform(-45, 45)  # degrees
    rad = math.radians(angle)
    vx = BALL_SPEED * math.sin(rad)
    vy = -BALL_SPEED * math.cos(rad)  # negative = up
    return vx, vy

# On spacebar:
if event.key == pygame.K_SPACE and not ball_active:
    bvx, bvy = launch_ball()
    ball_active = True`,
      },
    ],
    challenges: [
      {
        id: "breakaway-1",
        prompt: "Why check 'vy > 0' before bouncing off the paddle?",
        hint: "What happens if the ball is already moving up?",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("stuck" in answer or "through" in answer or "down" in answer or "moving" in answer)
`,
        solution: "Without the check, the ball can get stuck inside the paddle and vibrate. vy > 0 means it's moving down — only then should we bounce it up.",
      },
      {
        id: "breakaway-2",
        prompt: "What does the 'offset trick' do for paddle collision?",
        hint: "Think about where on the paddle the ball hits",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("angle" in answer or "direction" in answer or "edge" in answer or "position" in answer or "where" in answer)
`,
        solution: "It changes the ball's horizontal velocity based on where it hits the paddle. Hit the edge = steep angle. Hit the center = straight up.",
      },
    ],
  },

  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 41,
    slug: "pygame-project-tower-defense",
    title: "Project: Tower Defense",
    badge: "challenge",
    theory: `
## What You're Building

Tower Defense: enemies walk down a path, you place towers to shoot them. More complex than Brick Breakaway because you need waypoint pathfinding, targeting logic, and projectiles that track moving targets.

---

## 🎬 Gerber's Video Breakdown (12 Videos)

**Video 1: Project Setup**
- Folder structure, main.py, settings.py
- Basic window and game loop

**Video 2: Game Settings**
- Constants file: screen size, colors
- Tower cost, enemy speed, projectile damage
- Starting gold and lives

**Video 3: Game Loop Setup**
- Clock and dt for frame-rate independence
- Event handling structure
- Update/draw pattern

**Video 4: Adding the Map**
- Loading tilemap from 2D list
- 0 = grass (buildable), 1 = path
- Drawing tiles with nested loops

**Video 5: Creating the Level Class**
- Encapsulate map data
- Tile drawing method
- \`can_build_tower(x, y)\` check

**Video 6: Adding Level Data and Cursors**
- Cursor highlight for tower placement
- Click detection on tiles
- Visual feedback before building

**Video 7: Enemy Class Attributes**
- Waypoints list (path to follow)
- current_waypoint index
- Speed, HP, alive flag

**Video 8: Enemy Methods and Spawning**
- \`move_toward_waypoint()\` using normalize
- Spawn timer, enemy list
- Check if reached end

**Video 9: Tower Class and Spawning**
- Click to place (if gold and valid tile)
- Range circle for targeting
- Find nearest enemy in range

**Video 10: Projectile Class**
- Velocity toward target at creation
- \`math.atan2(dy, dx)\` for angle
- Store reference to target sprite

**Video 11: Firing Projectiles**
- Tower fire rate / cooldown timer
- Spawn projectile toward nearest enemy
- Track cooldown between shots

**Video 12: Collision Detection**
- Projectile hits enemy (distance check)
- Deal damage, kill when HP <= 0
- Remove projectile after hit

---

## Project Structure

\`\`\`
TowerDefense/
├── main.py
├── settings.py
├── level.py      # map data + waypoints
├── enemy.py
├── tower.py
└── projectile.py
\`\`\`

## Key Concepts

### Waypoint Path Following

\`\`\`python
class Enemy:
    def __init__(self, waypoints):
        self.waypoints = waypoints
        self.wp_index = 0
        self.pos = pygame.math.Vector2(waypoints[0])
        self.speed = 80

    def update(self, dt):
        if self.wp_index >= len(self.waypoints):
            return True  # reached end, damage player

        target = pygame.math.Vector2(self.waypoints[self.wp_index])
        direction = target - self.pos
        dist = direction.length()

        if dist < self.speed * dt:
            self.pos = target
            self.wp_index += 1
        else:
            direction = direction.normalize()
            self.pos += direction * self.speed * dt
        return False
\`\`\`

### Tower Targeting with math.atan2

\`\`\`python
import math

def find_closest_enemy(tower_pos, enemies, tower_range):
    closest = None
    closest_dist = tower_range + 1
    for enemy in enemies:
        if not enemy.alive:
            continue
        dist = math.dist(tower_pos, enemy.pos)
        if dist <= tower_range and dist < closest_dist:
            closest = enemy
            closest_dist = dist
    return closest

def calc_projectile_velocity(start, target_pos, speed):
    dx = target_pos[0] - start[0]
    dy = target_pos[1] - start[1]
    angle = math.atan2(dy, dx)
    return math.cos(angle) * speed, math.sin(angle) * speed
\`\`\`

### Projectile Tracking

\`\`\`python
class Projectile:
    def __init__(self, pos, target):
        self.pos = pygame.math.Vector2(pos)
        self.target = target  # reference to enemy
        self.speed = 400
        self.damage = 25
        self.alive = True

    def update(self, dt):
        if not self.target or not self.target.alive:
            self.alive = False
            return

        target_pos = pygame.math.Vector2(self.target.pos)
        direction = target_pos - self.pos
        dist = direction.length()

        if dist < self.speed * dt:
            self.target.hp -= self.damage
            if self.target.hp <= 0:
                self.target.alive = False
            self.alive = False
        else:
            self.pos += direction.normalize() * self.speed * dt
\`\`\`

---

## 💡 Tips & Tricks

- **Gerber tip:** Store enemy reference in projectile, not just position — tracks moving targets
- **Tip:** \`math.atan2(dy, dx)\` gives angle in radians — essential for aiming
- **Tip:** Check \`enemy.alive\` before targeting — prevents crashes
- **Tip:** Wave scaling: increase enemy HP/speed each wave for difficulty curve

---

## ⚠️ Common Mistakes

- **Storing position instead of reference** — projectiles miss moving enemies
- **Not checking if target is alive** — crashes when enemy dies mid-flight
- **Forgetting to normalize direction** — speed varies with distance
- **Spawning too many enemies at once** — overwhelms player immediately

---

## Step 2 Options (20+ points required)

- **Tower Sprite (5pts)** — load image instead of drawing shape
- **Projectile Rotation (5pts)** — rotate sprite to face target
- **Wave Balance (5pts)** — enemies scale with waves
- **Enemy HP Bar (10pts)** — draw health above enemies
- **Additional Levels (10pts)** — new maps after X waves
- **New Tower Type (15pts)** — subclass with splash damage or slow
`,
    starterCode: `# Tower Defense — complete starter with delta time
import pygame
import math
pygame.init()

WIDTH, HEIGHT = 800, 600
FPS = 60
TOWER_RANGE = 120
TOWER_COST = 50
TOWER_FIRE_RATE = 0.8  # seconds between shots

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tower Defense")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 32)

# Map: 0=grass, 1=path
MAP = [
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,0,0,0],
    [0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,1,1,1,1],
]
TILE = 80
WAYPOINTS = [(3*TILE+40,-20), (3*TILE+40,1*TILE+40), (6*TILE+40,2*TILE+40),
             (6*TILE+40,3*TILE+40), (9*TILE+40,4*TILE+40), (9*TILE+40,HEIGHT+20)]

gold, lives, wave = 200, 10, 1
spawn_timer, spawned, enemies_per_wave = 0.0, 0, 5

enemies, towers, projectiles = [], [], []

class Enemy:
    def __init__(self):
        self.pos = pygame.math.Vector2(WAYPOINTS[0])
        self.wp_idx = 0
        self.speed = 80
        self.hp = 80
        self.alive = True

    def update(self, dt):
        if self.wp_idx >= len(WAYPOINTS):
            self.alive = False
            return True
        target = pygame.math.Vector2(WAYPOINTS[self.wp_idx])
        direction = target - self.pos
        dist = direction.length()
        if dist < self.speed * dt:
            self.pos = target
            self.wp_idx += 1
        else:
            self.pos += direction.normalize() * self.speed * dt
        return False

class Tower:
    def __init__(self, x, y):
        self.pos = (x, y)
        self.cooldown = 0.0

    def update(self, dt, enemies):
        self.cooldown -= dt
        if self.cooldown > 0:
            return
        target = None
        closest = TOWER_RANGE + 1
        for e in enemies:
            if not e.alive: continue
            d = math.dist(self.pos, e.pos)
            if d <= TOWER_RANGE and d < closest:
                target, closest = e, d
        if target:
            projectiles.append(Projectile(self.pos, target))
            self.cooldown = TOWER_FIRE_RATE

class Projectile:
    def __init__(self, pos, target):
        self.pos = pygame.math.Vector2(pos)
        self.target = target
        self.speed = 400
        self.alive = True

    def update(self, dt):
        if not self.target or not self.target.alive:
            self.alive = False
            return
        direction = pygame.math.Vector2(self.target.pos) - self.pos
        dist = direction.length()
        if dist < self.speed * dt:
            self.target.hp -= 30
            if self.target.hp <= 0:
                self.target.alive = False
            self.alive = False
        else:
            self.pos += direction.normalize() * self.speed * dt

running = True
while running:
    dt = clock.tick(FPS) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
            mx, my = pygame.mouse.get_pos()
            col, row = mx // TILE, my // TILE
            if row < len(MAP) and col < len(MAP[0]) and MAP[row][col] == 0:
                if gold >= TOWER_COST:
                    towers.append(Tower(mx, my))
                    gold -= TOWER_COST

    # Spawn enemies
    spawn_timer += dt
    if spawn_timer >= 1.0 and spawned < enemies_per_wave:
        enemies.append(Enemy())
        spawned += 1
        spawn_timer = 0.0

    # Update
    for e in enemies[:]:
        if e.update(dt): lives -= 1
        if not e.alive: enemies.remove(e)
    for t in towers: t.update(dt, enemies)
    for p in projectiles[:]:
        p.update(dt)
        if not p.alive: projectiles.remove(p)

    # Next wave
    if spawned >= enemies_per_wave and not enemies:
        wave += 1
        enemies_per_wave += 2
        spawned = 0
        gold += 40

    # Draw
    screen.fill((34, 100, 34))
    for r, row in enumerate(MAP):
        for c, tile in enumerate(row):
            color = (139, 119, 101) if tile == 1 else (34, 139, 34)
            pygame.draw.rect(screen, color, (c*TILE, r*TILE, TILE, TILE))
    for e in enemies:
        pygame.draw.circle(screen, (255,50,50), (int(e.pos.x), int(e.pos.y)), 15)
    for t in towers:
        pygame.draw.circle(screen, (100,100,200), t.pos, 20)
    for p in projectiles:
        pygame.draw.circle(screen, (255,255,0), (int(p.pos.x), int(p.pos.y)), 5)

    screen.blit(font.render(f"Gold: {gold}", True, (255,215,0)), (10,10))
    screen.blit(font.render(f"Lives: {lives}", True, (255,255,255)), (10,40))
    screen.blit(font.render(f"Wave: {wave}", True, (255,255,255)), (10,70))
    screen.blit(font.render("Click grass to build", True, (200,200,200)), (10, HEIGHT-30))

    if lives <= 0:
        screen.blit(font.render("GAME OVER", True, (255,0,0)), (WIDTH//2-60, HEIGHT//2))

    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Enemy HP Bar",
        explanation: "Step 2 option (10pts) — health bar above enemies",
        code: `def draw_hp_bar(screen, enemy):
    bar_w, bar_h = 40, 6
    x = int(enemy.pos.x) - bar_w // 2
    y = int(enemy.pos.y) - 25

    # Background (red)
    pygame.draw.rect(screen, (100,0,0), (x, y, bar_w, bar_h))
    # Health (green)
    hp_ratio = max(0, enemy.hp / 80)
    pygame.draw.rect(screen, (0,200,0), (x, y, int(bar_w * hp_ratio), bar_h))
    # Border
    pygame.draw.rect(screen, (0,0,0), (x, y, bar_w, bar_h), 1)

# In draw loop:
for e in enemies:
    pygame.draw.circle(screen, (255,50,50), (int(e.pos.x), int(e.pos.y)), 15)
    draw_hp_bar(screen, e)`,
      },
      {
        title: "Splash Tower (New Type)",
        explanation: "Step 2 option (15pts) — damages all enemies near target",
        code: `class SplashTower(Tower):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.splash_radius = 60
        self.damage = 15  # less than normal, but hits many

    def update(self, dt, enemies):
        self.cooldown -= dt
        if self.cooldown > 0:
            return

        # Find target (same as before)
        target = None
        closest = TOWER_RANGE + 1
        for e in enemies:
            if not e.alive: continue
            d = math.dist(self.pos, e.pos)
            if d <= TOWER_RANGE and d < closest:
                target, closest = e, d

        if target:
            # Damage ALL enemies near target
            for e in enemies:
                if not e.alive: continue
                d = math.dist(target.pos, e.pos)
                if d <= self.splash_radius:
                    e.hp -= self.damage
                    if e.hp <= 0: e.alive = False
            self.cooldown = TOWER_FIRE_RATE * 1.5`,
      },
    ],
    challenges: [
      {
        id: "tower-1",
        prompt: "Why store a reference to the target enemy instead of just its position?",
        hint: "Enemies move while projectile is flying",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("move" in answer or "track" in answer or "follow" in answer or "update" in answer)
`,
        solution: "Enemies move while the projectile flies. Storing the position at fire time means the projectile misses. Storing the reference lets us track current position each frame.",
      },
      {
        id: "tower-2",
        prompt: "What does math.atan2(dy, dx) return?",
        hint: "It's an angle measurement",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("angle" in answer or "radian" in answer) and ("point" in answer or "direction" in answer or "target" in answer)
`,
        solution: "The angle in radians from the positive x-axis to the point (dx, dy). Use with cos/sin to get velocity components toward a target.",
      },
    ],
  },

  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 42,
    slug: "pygame-project-sprite-game",
    title: "Project: Sprite Game",
    badge: "challenge",
    theory: `
## What You're Building

A character-based game with animated sprites, NPCs that move around, and collision interactions. The foundation for RPGs, platformers, or action games. The big new thing is sprite sheets — multiple animation frames from a single image.

---

## 🎬 Gerber's Video Breakdown (13 Videos)

**Video 1: Project Setup**
- Folder/file structure
- Constants in settings.py

**Video 2: Asset Selection and Background Display**
- Loading background image
- \`pygame.image.load()\` + \`.convert()\`
- \`screen.blit(background, (0, 0))\`

**Video 3: The Character Module**
- Separate character.py file
- Base class for shared code
- Encapsulation of common attributes

**Video 4: Surface Handler**
- Extracting frames from sprite sheet
- Pixel offset math: \`x = col * frame_width\`
- \`pygame.SRCALPHA\` for transparency

**Video 5: Displaying the User**
- Blit character image at position
- Initial placement on screen

**Video 6: Animating the User**
- \`frame_index\` counter
- \`animation_timer\` for speed control
- Cycling through frames with modulo

**Video 7: User Movement**
- Keyboard input with \`get_pressed()\`
- Velocity-based movement
- Boundary clamping

**Video 8: Character Actions**
- Additional key bindings (attack, interact)
- Triggering action animation frames
- Action state that locks movement

**Video 9: Character Resize and User Limits**
- \`pygame.transform.scale()\` for sizing
- \`rect.clamp_ip()\` for screen bounds
- Keeping aspect ratio

**Video 10: Runner Class Setup**
- NPC subclass of Character
- Initial position and attributes
- Different from player (AI-controlled)

**Video 11: Runner Velocity**
- Random direction or patrol pattern
- Speed attribute
- Movement each frame

**Video 12: Runner Teleport**
- Random teleport on condition
- Edge bounce or wraparound
- Respawn mechanic

**Video 13: Collisions and Bug Fixes**
- Player vs runner rect collision
- Common bugs and fixes
- Final polish

---

## Project Structure

\`\`\`
SpriteGame/
├── main.py
├── settings.py
├── character.py       # base class
├── surface_handler.py # sprite sheet loading
├── user.py            # player character
├── runner.py          # NPC class
└── assets/            # sprites, backgrounds
\`\`\`

## Surface Handler Pattern

\`\`\`python
class SurfaceHandler:
    def __init__(self, sheet_path, frame_w, frame_h):
        self.sheet = pygame.image.load(sheet_path).convert_alpha()
        self.frame_w = frame_w
        self.frame_h = frame_h

    def get_frame(self, col, row=0):
        x = col * self.frame_w
        y = row * self.frame_h
        frame = pygame.Surface((self.frame_w, self.frame_h), pygame.SRCALPHA)
        frame.blit(self.sheet, (0, 0), (x, y, self.frame_w, self.frame_h))
        return frame

    def get_animation(self, row, num_frames):
        return [self.get_frame(col, row) for col in range(num_frames)]
\`\`\`

## Base Character Class

\`\`\`python
class Character(pygame.sprite.Sprite):
    def __init__(self, x, y, frames):
        super().__init__()
        self.frames = frames
        self.frame_index = 0
        self.animation_timer = 0
        self.image = frames[0] if frames else pygame.Surface((40, 40))
        self.rect = self.image.get_rect(center=(x, y))
        self.float_x = float(x)
        self.float_y = float(y)
        self.facing_right = True

    def animate(self, speed=8):
        self.animation_timer += 1
        if self.animation_timer >= speed:
            self.animation_timer = 0
            self.frame_index = (self.frame_index + 1) % len(self.frames)
            self.image = self.frames[self.frame_index]
            if not self.facing_right:
                self.image = pygame.transform.flip(self.image, True, False)
\`\`\`

## Runner NPC with Teleport

\`\`\`python
class Runner(Character):
    def __init__(self, x, y, frames):
        super().__init__(x, y, frames)
        self.vx = random.choice([-100, 100])
        self.vy = random.choice([-100, 100])
        self.change_timer = random.uniform(1.0, 3.0)

    def update(self, dt):
        self.change_timer -= dt
        if self.change_timer <= 0:
            self.vx = random.choice([-100, -50, 0, 50, 100])
            self.vy = random.choice([-100, -50, 0, 50, 100])
            self.change_timer = random.uniform(1.0, 3.0)

        self.float_x += self.vx * dt
        self.float_y += self.vy * dt

        # Bounce off edges
        if self.float_x < 20 or self.float_x > WIDTH - 20:
            self.vx *= -1
        if self.float_y < 20 or self.float_y > HEIGHT - 20:
            self.vy *= -1

        self.rect.center = (int(self.float_x), int(self.float_y))

        if self.vx != 0 or self.vy != 0:
            self.animate(10)

    def teleport(self):
        self.float_x = random.randint(50, WIDTH - 50)
        self.float_y = random.randint(50, HEIGHT - 50)
        self.rect.center = (int(self.float_x), int(self.float_y))
\`\`\`

---

## 💡 Tips & Tricks

- **Gerber tip:** Separate character.py keeps shared code DRY
- **Tip:** \`pygame.SRCALPHA\` is required for transparent sprites
- **Tip:** Flip sprites at runtime instead of making left-facing art
- **Tip:** Animation speed of 8-10 frames feels natural for walking

---

## ⚠️ Common Mistakes

- **Loading sprites inside update()** — kills performance
- **Modifying self.image directly** — keep original frames separate
- **Forgetting to sync float position to rect** — jittery movement
- **Not checking direction.length() > 0** before normalize — division by zero

---

## Step 2 Options (20+ points required)

- **Background Change (5pts)** — swap on score threshold
- **Multiple Sprite Sheets (5pts)** — random NPC appearances
- **Win/Lose Mechanic (5pts)** — timer or catch goal
- **Additional Action (10pts)** — jump or attack animation
- **Character Select (20pts)** — choose character at start
- **Acceleration/Friction (20pts)** — smooth physics for both player and NPCs
`,
    starterCode: `# Sprite Game — complete starter with delta time
import pygame
import random
pygame.init()

WIDTH, HEIGHT = 800, 600
FPS = 60
PLAYER_SPEED = 250

screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Sprite Game")
clock = pygame.time.Clock()
font = pygame.font.Font(None, 36)

class Character:
    def __init__(self, x, y, color, speed):
        self.float_x = float(x)
        self.float_y = float(y)
        self.color = color
        self.speed = speed
        self.width, self.height = 40, 50
        self.facing_right = True
        self.frame = 0
        self.timer = 0.0

    def get_rect(self):
        return pygame.Rect(int(self.float_x), int(self.float_y), self.width, self.height)

class Player(Character):
    def __init__(self, x, y):
        super().__init__(x, y, (100, 150, 200), PLAYER_SPEED)

    def update(self, dt):
        keys = pygame.key.get_pressed()
        dx, dy = 0, 0
        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            dx = -self.speed * dt
            self.facing_right = False
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            dx = self.speed * dt
            self.facing_right = True
        if keys[pygame.K_UP] or keys[pygame.K_w]:
            dy = -self.speed * dt
        if keys[pygame.K_DOWN] or keys[pygame.K_s]:
            dy = self.speed * dt

        self.float_x += dx
        self.float_y += dy
        self.float_x = max(0, min(WIDTH - self.width, self.float_x))
        self.float_y = max(0, min(HEIGHT - self.height, self.float_y))

        if dx != 0 or dy != 0:
            self.timer += dt
            if self.timer >= 0.1:
                self.timer = 0
                self.frame = (self.frame + 1) % 4

    def draw(self, screen):
        shade = self.frame * 20
        color = (self.color[0] + shade, self.color[1], self.color[2])
        pygame.draw.rect(screen, color, self.get_rect())

class Runner(Character):
    def __init__(self, x, y):
        super().__init__(x, y, (200, 100, 100), 80)
        self.vx = random.choice([-80, 80])
        self.vy = random.choice([-80, 80])
        self.change_timer = random.uniform(1.0, 3.0)

    def update(self, dt):
        self.change_timer -= dt
        if self.change_timer <= 0:
            self.vx = random.choice([-80, -40, 0, 40, 80])
            self.vy = random.choice([-80, -40, 0, 40, 80])
            self.change_timer = random.uniform(1.0, 3.0)

        self.float_x += self.vx * dt
        self.float_y += self.vy * dt

        if self.float_x < 0 or self.float_x > WIDTH - self.width:
            self.vx *= -1
            self.float_x = max(0, min(WIDTH - self.width, self.float_x))
        if self.float_y < 0 or self.float_y > HEIGHT - self.height:
            self.vy *= -1
            self.float_y = max(0, min(HEIGHT - self.height, self.float_y))

        if self.vx != 0 or self.vy != 0:
            self.timer += dt
            if self.timer >= 0.12:
                self.timer = 0
                self.frame = (self.frame + 1) % 4

    def draw(self, screen):
        shade = self.frame * 20
        color = (self.color[0], self.color[1] + shade, self.color[2])
        pygame.draw.rect(screen, color, self.get_rect())

    def teleport(self):
        self.float_x = random.randint(50, WIDTH - 100)
        self.float_y = random.randint(50, HEIGHT - 100)
        self.vx = random.choice([-80, 80])
        self.vy = random.choice([-80, 80])

player = Player(WIDTH // 2, HEIGHT // 2)
runners = [Runner(random.randint(50, WIDTH-100), random.randint(50, HEIGHT-100)) for _ in range(5)]
score = 0

running = True
while running:
    dt = clock.tick(FPS) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    player.update(dt)
    for r in runners:
        r.update(dt)

    # Collision
    player_rect = player.get_rect()
    for r in runners:
        if player_rect.colliderect(r.get_rect()):
            score += 10
            r.teleport()

    screen.fill((50, 100, 50))
    for r in runners:
        r.draw(screen)
    player.draw(screen)

    screen.blit(font.render(f"Score: {score}", True, (255,255,255)), (10, 10))
    screen.blit(font.render("WASD/arrows to move, catch runners!", True, (200,200,200)), (10, HEIGHT-30))

    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Acceleration & Friction",
        explanation: "Step 2 option (20pts) — smooth physics movement",
        code: `class PlayerPhysics(Character):
    def __init__(self, x, y):
        super().__init__(x, y, (100, 150, 200), 250)
        self.vx, self.vy = 0.0, 0.0
        self.accel = 600
        self.friction = 0.88
        self.max_speed = 300

    def update(self, dt):
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:  self.vx -= self.accel * dt
        if keys[pygame.K_RIGHT]: self.vx += self.accel * dt
        if keys[pygame.K_UP]:    self.vy -= self.accel * dt
        if keys[pygame.K_DOWN]:  self.vy += self.accel * dt

        self.vx *= self.friction
        self.vy *= self.friction
        self.vx = max(-self.max_speed, min(self.max_speed, self.vx))
        self.vy = max(-self.max_speed, min(self.max_speed, self.vy))

        if abs(self.vx) < 1: self.vx = 0
        if abs(self.vy) < 1: self.vy = 0

        self.float_x += self.vx * dt
        self.float_y += self.vy * dt
        self.float_x = max(0, min(WIDTH - self.width, self.float_x))
        self.float_y = max(0, min(HEIGHT - self.height, self.float_y))`,
      },
      {
        title: "Character Select Screen",
        explanation: "Step 2 option (20pts) — choose before playing",
        code: `def character_select(screen, clock, font):
    chars = [
        {"name": "Blue Knight", "color": (100, 150, 200)},
        {"name": "Red Warrior", "color": (200, 100, 100)},
        {"name": "Green Ranger", "color": (100, 200, 100)},
    ]
    selected = 0

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return None
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    selected = (selected - 1) % len(chars)
                if event.key == pygame.K_RIGHT:
                    selected = (selected + 1) % len(chars)
                if event.key == pygame.K_RETURN:
                    return chars[selected]

        screen.fill((30, 30, 50))
        title = font.render("Choose Your Character", True, (255,255,255))
        screen.blit(title, (WIDTH//2 - title.get_width()//2, 100))

        for i, c in enumerate(chars):
            x, y = 150 + i * 200, 300
            if i == selected:
                pygame.draw.rect(screen, (255,255,0), (x-5, y-5, 60, 70), 3)
            pygame.draw.rect(screen, c["color"], (x, y, 50, 60))
            name = font.render(c["name"], True, (255,255,255))
            screen.blit(name, (x - name.get_width()//2 + 25, y + 80))

        instr = font.render("Left/Right, Enter to confirm", True, (150,150,150))
        screen.blit(instr, (WIDTH//2 - instr.get_width()//2, 500))
        pygame.display.flip()
        clock.tick(60)

# In main:
# choice = character_select(screen, clock, font)
# if choice: player = Player(WIDTH//2, HEIGHT//2, choice["color"])`,
      },
    ],
    challenges: [
      {
        id: "sprite-1",
        prompt: "When extracting a frame from a sprite sheet, what does blit's source rect (x, y, w, h) specify?",
        hint: "It's not copying the whole sheet",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("portion" in answer or "part" in answer or "section" in answer or "rectangle" in answer or "area" in answer or "cut" in answer)
`,
        solution: "The source rect tells blit to copy only that rectangular portion of the source image. (x, y) is the top-left corner, (w, h) is the size of the frame to copy.",
      },
      {
        id: "sprite-2",
        prompt: "Why use pygame.transform.flip(image, True, False) for a left-facing character?",
        hint: "Sprite sheets usually only have one direction",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("horizontal" in answer or "mirror" in answer or "flip" in answer or "direction" in answer or "one" in answer)
`,
        solution: "Most sprite sheets only draw characters facing right. Instead of making separate left-facing art, flip horizontally at runtime. True, False = flip horizontal only.",
      },
    ],
  },
  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 43,
    slug: "pygame-sound",
    title: "Sound & Music",
    badge: "concept",
    theory: `
## Adding Sound to Your Game

A game without sound feels dead. Pygame's \`mixer\` module handles both short sound effects (explosions, jumps, hits) and background music (looping tracks).

\`\`\`python
import pygame
pygame.init()
pygame.mixer.init()  # already called by pygame.init(), but good to know it exists
\`\`\`

There are two separate systems and they work differently:
- **Sound effects** — short clips, multiple can play at once
- **Music** — one track at a time, streams from disk (good for long files)

---

## Sound Effects with pygame.mixer.Sound

Sound effects are loaded into memory. Use \`.wav\` or \`.ogg\` files (mp3 support is inconsistent).

\`\`\`python
# Load sounds (do this ONCE, outside the game loop)
jump_sound = pygame.mixer.Sound("assets/jump.wav")
hit_sound = pygame.mixer.Sound("assets/hit.wav")
coin_sound = pygame.mixer.Sound("assets/coin.ogg")

# Play a sound (inside the game loop, when something happens)
if player_jumped:
    jump_sound.play()

if collision_detected:
    hit_sound.play()
\`\`\`

**Key point:** Load sounds once at startup. Don't load them inside the game loop or you'll destroy your frame rate.

### Volume Control

\`\`\`python
# Set volume (0.0 = silent, 1.0 = full volume)
jump_sound.set_volume(0.5)   # 50% volume
hit_sound.set_volume(0.3)    # quieter

# Get current volume
current_vol = jump_sound.get_volume()
\`\`\`

### Stopping Sounds

\`\`\`python
hit_sound.stop()          # stop this specific sound
pygame.mixer.stop()       # stop ALL sounds
\`\`\`

---

## Background Music with pygame.mixer.music

Music streams from disk instead of loading into memory. Only one track plays at a time.

\`\`\`python
# Load and play background music
pygame.mixer.music.load("assets/background.ogg")
pygame.mixer.music.set_volume(0.4)
pygame.mixer.music.play(-1)  # -1 = loop forever

# Pause / unpause
pygame.mixer.music.pause()
pygame.mixer.music.unpause()

# Stop completely
pygame.mixer.music.stop()

# Fade out over 2 seconds (smooth ending)
pygame.mixer.music.fadeout(2000)
\`\`\`

**The \`-1\` argument** is important. \`play(0)\` plays once, \`play(3)\` plays 3 extra times (4 total), \`play(-1)\` loops forever. For background music you almost always want \`-1\`.

---

## Channels — Playing Multiple Sounds

Pygame has 8 channels by default. Each channel can play one sound at a time. When you call \`sound.play()\`, it grabs a free channel automatically.

\`\`\`python
# Need more simultaneous sounds?
pygame.mixer.set_num_channels(16)  # now 16 channels

# Reserve a channel for important sounds (so it never gets stolen)
pygame.mixer.set_reserved(1)
important_channel = pygame.mixer.Channel(0)  # channel 0 is reserved
important_channel.play(alert_sound)
\`\`\`

If all channels are busy when you play a sound, the oldest sound gets cut off. Reserving a channel guarantees your critical sounds (like a game-over chime) always play.

---

## Common Pattern — Sound Manager

Most games wrap their sounds in a simple manager:

\`\`\`python
class SoundManager:
    def __init__(self):
        self.sounds = {}
        self.muted = False

    def load(self, name, filepath):
        self.sounds[name] = pygame.mixer.Sound(filepath)

    def play(self, name, volume=1.0):
        if not self.muted and name in self.sounds:
            self.sounds[name].set_volume(volume)
            self.sounds[name].play()

    def toggle_mute(self):
        self.muted = not self.muted
        if self.muted:
            pygame.mixer.stop()

# Usage:
sfx = SoundManager()
sfx.load("jump", "assets/jump.wav")
sfx.load("coin", "assets/coin.ogg")

# In game loop:
sfx.play("jump")
sfx.play("coin", volume=0.5)
\`\`\`

**Gerber tip:** Keep your sound loading separate from your game logic. Load everything in an init function, then just call \`play()\` during the game. Clean separation.

---

## File Formats

| Format | Best For | Notes |
|--------|----------|-------|
| .wav | Sound effects | Uncompressed, fast to load, large files |
| .ogg | Music + effects | Compressed, small files, good quality |
| .mp3 | Avoid | Licensing issues, inconsistent support |

Stick with \`.ogg\` for most things. Use \`.wav\` for tiny effects where loading speed matters.
`,
    starterCode: `# Sound & Music Demo — run this locally with pygame installed
# You'll need some .wav or .ogg files in an "assets" folder

import pygame
pygame.init()

screen = pygame.display.set_mode((600, 400))
pygame.display.set_caption("Sound Demo")
clock = pygame.time.Clock()

# --- LOAD SOUNDS ---
# Uncomment these when you have actual sound files:
# jump_sound = pygame.mixer.Sound("assets/jump.wav")
# jump_sound.set_volume(0.5)
#
# pygame.mixer.music.load("assets/background.ogg")
# pygame.mixer.music.set_volume(0.3)
# pygame.mixer.music.play(-1)  # loop forever

# --- Simple visual to go with the demo ---
WHITE = (255, 255, 255)
BLUE = (100, 149, 237)
ball_y = 300
ball_vel = 0
GRAVITY = 800
JUMP_FORCE = -400
on_ground = True

running = True
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE and on_ground:
                ball_vel = JUMP_FORCE
                on_ground = False
                # jump_sound.play()  # uncomment when you have the file
            if event.key == pygame.K_m:
                # Toggle music mute
                # pygame.mixer.music.pause() or .unpause()
                pass

    # Physics
    ball_vel += GRAVITY * dt
    ball_y += ball_vel * dt
    if ball_y >= 300:
        ball_y = 300
        ball_vel = 0
        on_ground = True

    # Draw
    screen.fill((30, 30, 40))
    pygame.draw.circle(screen, BLUE, (300, int(ball_y)), 20)
    pygame.draw.line(screen, WHITE, (0, 320), (600, 320), 2)  # ground

    # HUD
    font = pygame.font.SysFont(None, 24)
    text = font.render("SPACE = jump  |  M = toggle music", True, WHITE)
    screen.blit(text, (10, 10))

    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Loading and Playing a Sound Effect",
        explanation: "Load once at startup, play when events happen. Never load inside the game loop.",
        code: `hit_sound = pygame.mixer.Sound("assets/hit.wav")
hit_sound.set_volume(0.6)

# In the game loop, on collision:
if ball_rect.colliderect(brick_rect):
    hit_sound.play()
    brick.kill()`,
      },
      {
        title: "Looping Background Music with Fadeout",
        explanation: "Music streams from disk. Use play(-1) for infinite loop, fadeout() for smooth transitions.",
        code: `# Start menu music
pygame.mixer.music.load("assets/menu_theme.ogg")
pygame.mixer.music.play(-1)

# When game starts, crossfade to game music:
pygame.mixer.music.fadeout(1000)  # 1 second fade
# After fadeout, load the new track:
pygame.mixer.music.load("assets/game_theme.ogg")
pygame.mixer.music.play(-1)`,
      },
    ],
    challenges: [
      {
        id: "sound-1",
        prompt: "What's the difference between pygame.mixer.Sound and pygame.mixer.music? When would you use each?",
        hint: "Think about file size and how many can play at once",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("memory" in answer or "effect" in answer or "short" in answer or "one" in answer or "stream" in answer or "background" in answer or "loop" in answer)
`,
        solution: "Sound loads the entire file into memory — good for short effects. You can play many at once. Music streams from disk — good for long tracks. Only one music track plays at a time.",
      },
      {
        id: "sound-2",
        prompt: "What does pygame.mixer.music.play(-1) do? What would play(0) and play(3) do?",
        hint: "The number controls repetition",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("loop" in answer or "forever" in answer or "infinite" in answer or "repeat" in answer)
`,
        solution: "play(-1) loops the music forever. play(0) plays it once. play(3) plays it 4 times total (1 initial + 3 repeats).",
      },
      {
        id: "sound-3",
        prompt: "Why should you load all your Sound objects outside the game loop, not inside it?",
        hint: "Think about what happens 60 times per second",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("performance" in answer or "slow" in answer or "frame" in answer or "fps" in answer or "once" in answer or "every" in answer or "load" in answer)
`,
        solution: "Loading a file from disk is slow. If you load inside the game loop, you'd be reading the file 60 times per second, destroying your frame rate. Load once at startup, then just call .play() when you need the sound.",
      },
    ],
  },
  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 44,
    slug: "pygame-text-hud",
    title: "Text & HUD Rendering",
    badge: "concept",
    theory: `
## Rendering Text in Pygame

Pygame doesn't have a text box you can just type into. To show text on screen you render it onto a surface, then blit that surface onto the screen. It's a two-step process.

\`\`\`python
font = pygame.font.SysFont(None, 36)  # None = default system font, 36 = size
text_surface = font.render("Hello!", True, (255, 255, 255))  # text, antialias, color
screen.blit(text_surface, (10, 10))  # draw it at position (10, 10)
\`\`\`

That's the whole pattern. Everything else is just variations on it.

---

## Font Options

### System Fonts
\`\`\`python
# Use any font installed on the system
font = pygame.font.SysFont("arial", 28)
font = pygame.font.SysFont("courier", 20)

# None = pygame default font (always available)
font = pygame.font.SysFont(None, 36)

# Bold and italic
font = pygame.font.SysFont("arial", 28, bold=True, italic=True)

# See what fonts are available:
print(pygame.font.get_fonts())
\`\`\`

### Custom Font Files
\`\`\`python
# Load a .ttf file from your project folder
font = pygame.font.Font("assets/fonts/PressStart2P.ttf", 16)
\`\`\`

Custom fonts make your game look unique. Free pixel fonts from Google Fonts or dafont.com work great for retro games.

---

## The render() Method

\`\`\`python
text_surface = font.render(text, antialias, color, background=None)
\`\`\`

| Param | What it does |
|-------|-------------|
| text | The string to display |
| antialias | True = smooth edges, False = pixelated |
| color | (R, G, B) text color |
| background | Optional (R, G, B) background color |

**Anti-aliasing:** Use \`True\` for most text. Use \`False\` for pixel art games where you want that crispy look.

\`\`\`python
# Smooth text
smooth = font.render("Score: 100", True, (255, 255, 255))

# Pixel-crisp text (retro style)
crispy = font.render("GAME OVER", False, (255, 0, 0))

# Text with background color (like a highlight)
highlighted = font.render("NEW HIGH SCORE!", True, (255, 255, 0), (0, 0, 100))
\`\`\`

---

## Positioning Text

The tricky part. \`font.render()\` gives you a surface. You need to position it yourself.

### Basic Positioning
\`\`\`python
# Top-left corner
screen.blit(text_surface, (10, 10))

# But what if you want it centered?
text_rect = text_surface.get_rect()
text_rect.center = (400, 300)  # center of an 800x600 screen
screen.blit(text_surface, text_rect)
\`\`\`

### Alignment Shortcuts
\`\`\`python
rect = text_surface.get_rect()

# Center on screen
rect.center = (SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)

# Top-center
rect.midtop = (SCREEN_WIDTH // 2, 10)

# Right-aligned
rect.topright = (SCREEN_WIDTH - 10, 10)

# Bottom-center (for UI at bottom of screen)
rect.midbottom = (SCREEN_WIDTH // 2, SCREEN_HEIGHT - 10)
\`\`\`

---

## Building a HUD (Heads-Up Display)

A HUD shows game info that updates every frame: score, lives, timer, level.

### The Pattern
\`\`\`python
class HUD:
    def __init__(self):
        self.font = pygame.font.SysFont(None, 28)
        self.score = 0
        self.lives = 3
        self.level = 1

    def draw(self, screen):
        # Score — top left
        score_text = self.font.render(f"Score: {self.score}", True, (255, 255, 255))
        screen.blit(score_text, (10, 10))

        # Lives — top right
        lives_text = self.font.render(f"Lives: {self.lives}", True, (255, 100, 100))
        lives_rect = lives_text.get_rect(topright=(screen.get_width() - 10, 10))
        screen.blit(lives_text, lives_rect)

        # Level — top center
        level_text = self.font.render(f"Level {self.level}", True, (200, 200, 200))
        level_rect = level_text.get_rect(midtop=(screen.get_width() // 2, 10))
        screen.blit(level_text, level_rect)
\`\`\`

### Using It

\`\`\`python
hud = HUD()

while running:
    # ... game logic ...

    if brick_destroyed:
        hud.score += 10

    if player_hit:
        hud.lives -= 1

    # Draw everything
    screen.fill((0, 0, 0))
    # ... draw game objects ...
    hud.draw(screen)  # HUD goes LAST (on top of everything)
    pygame.display.flip()
\`\`\`

**Key insight:** Draw the HUD last so it renders on top of everything else.

---

## Performance Tip — Cache Rendered Text

Re-rendering text every frame is wasteful if the text hasn't changed. Cache it:

\`\`\`python
class HUD:
    def __init__(self):
        self.font = pygame.font.SysFont(None, 28)
        self._score = 0
        self._cached_score_surface = None

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        self._score = value
        # Only re-render when score actually changes
        self._cached_score_surface = self.font.render(
            f"Score: {value}", True, (255, 255, 255)
        )

    def draw(self, screen):
        if self._cached_score_surface:
            screen.blit(self._cached_score_surface, (10, 10))
\`\`\`

For simple games this optimization doesn't matter much, but it's a good habit. Rendering text is one of the slower operations in Pygame.

---

## Timer Display

\`\`\`python
start_time = pygame.time.get_ticks()

# In game loop:
elapsed_ms = pygame.time.get_ticks() - start_time
seconds = elapsed_ms // 1000
minutes = seconds // 60
display_seconds = seconds % 60
timer_text = font.render(f"{minutes:02d}:{display_seconds:02d}", True, WHITE)
\`\`\`

The \`:02d\` format pads with zeros: "01:05" instead of "1:5".
`,
    starterCode: `# Text & HUD Demo — run this locally with pygame installed

import pygame
pygame.init()

SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("HUD Demo")
clock = pygame.time.Clock()

# Fonts
title_font = pygame.font.SysFont(None, 48)
hud_font = pygame.font.SysFont(None, 28)
small_font = pygame.font.SysFont(None, 20)

# Game state
score = 0
lives = 3
level = 1
start_time = pygame.time.get_ticks()

# Colors
WHITE = (255, 255, 255)
RED = (255, 100, 100)
GREEN = (100, 255, 100)
GRAY = (150, 150, 150)
BG = (25, 25, 35)

# Simple interactive element
box_rect = pygame.Rect(375, 275, 50, 50)

running = True
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.MOUSEBUTTONDOWN:
            if box_rect.collidepoint(event.pos):
                score += 10
                # Move box to random position
                import random
                box_rect.x = random.randint(50, SCREEN_WIDTH - 100)
                box_rect.y = random.randint(80, SCREEN_HEIGHT - 100)

    # Timer
    elapsed = (pygame.time.get_ticks() - start_time) // 1000
    mins = elapsed // 60
    secs = elapsed % 60

    # Draw
    screen.fill(BG)

    # Draw clickable box
    pygame.draw.rect(screen, GREEN, box_rect)

    # --- HUD ---
    # Score (top-left)
    score_surf = hud_font.render(f"Score: {score}", True, WHITE)
    screen.blit(score_surf, (10, 10))

    # Lives (top-right)
    lives_surf = hud_font.render(f"Lives: {lives}", True, RED)
    lives_rect = lives_surf.get_rect(topright=(SCREEN_WIDTH - 10, 10))
    screen.blit(lives_surf, lives_rect)

    # Level (top-center)
    level_surf = hud_font.render(f"Level {level}", True, GRAY)
    level_rect = level_surf.get_rect(midtop=(SCREEN_WIDTH // 2, 10))
    screen.blit(level_surf, level_rect)

    # Timer (below level)
    timer_surf = small_font.render(f"{mins:02d}:{secs:02d}", True, GRAY)
    timer_rect = timer_surf.get_rect(midtop=(SCREEN_WIDTH // 2, 40))
    screen.blit(timer_surf, timer_rect)

    # Instructions (bottom)
    instr = small_font.render("Click the green box to score points!", True, GRAY)
    instr_rect = instr.get_rect(midbottom=(SCREEN_WIDTH // 2, SCREEN_HEIGHT - 10))
    screen.blit(instr_surf, instr_rect)

    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Centering Text on Screen",
        explanation: "Use get_rect() with center to position text in the middle of the screen.",
        code: `font = pygame.font.SysFont(None, 64)
text = font.render("GAME OVER", True, (255, 0, 0))
rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
screen.blit(text, rect)`,
      },
      {
        title: "Dynamic Score with Right Alignment",
        explanation: "Right-align the score so it doesn't jump around as the number gets bigger.",
        code: `score_text = font.render(f"Score: {score:,}", True, WHITE)
# :, adds comma separators (1,000 instead of 1000)
score_rect = score_text.get_rect(topright=(SCREEN_WIDTH - 10, 10))
screen.blit(score_text, score_rect)`,
      },
    ],
    challenges: [
      {
        id: "hud-1",
        prompt: "What are the two steps to display text in Pygame? Why can't you just 'print' text to the screen?",
        hint: "Think about surfaces",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("render" in answer or "surface" in answer or "blit" in answer)
`,
        solution: "Step 1: Render the text onto a surface with font.render(). Step 2: Blit that surface onto the screen. Pygame doesn't have a text box — everything is drawn as pixel surfaces.",
      },
      {
        id: "hud-2",
        prompt: "How do you center text horizontally on an 800px wide screen?",
        hint: "Use get_rect() with a positioning argument",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("get_rect" in answer or "center" in answer or "400" in answer or "midtop" in answer or "// 2" in answer or "/2" in answer)
`,
        solution: "Call text_surface.get_rect(center=(400, y)) or text_surface.get_rect(midtop=(400, y)). Then blit using that rect as the position.",
      },
      {
        id: "hud-3",
        prompt: "Why should you draw your HUD last in the draw step, after all other game objects?",
        hint: "Think about layering",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("top" in answer or "over" in answer or "above" in answer or "front" in answer or "last" in answer or "layer" in answer)
`,
        solution: "Whatever you draw last appears on top. If you draw the HUD before game objects, sprites could render over your score text. Drawing the HUD last ensures it's always visible on top of everything.",
      },
    ],
  },
  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 45,
    slug: "pygame-game-states",
    title: "Game State Management",
    badge: "practice",
    theory: `
## Why State Management Matters

Right now your games probably have a single game loop that handles everything. But real games have multiple screens: a title screen, the actual gameplay, a pause menu, a game-over screen. Without state management, your code turns into a tangled mess of \`if show_menu\` and \`if game_over\` flags scattered everywhere.

The fix is simple: use a state variable and organize your code around it.

---

## The State Pattern

\`\`\`python
# Define your states
STATE_MENU = "menu"
STATE_PLAYING = "playing"
STATE_PAUSED = "paused"
STATE_GAME_OVER = "game_over"
STATE_WIN = "win"

# Current state
game_state = STATE_MENU
\`\`\`

Then in your game loop, check the state and run only the relevant code:

\`\`\`python
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        # Handle input differently per state
        if game_state == STATE_MENU:
            handle_menu_input(event)
        elif game_state == STATE_PLAYING:
            handle_game_input(event)
        elif game_state == STATE_PAUSED:
            handle_pause_input(event)
        elif game_state == STATE_GAME_OVER:
            handle_game_over_input(event)

    # Update
    if game_state == STATE_PLAYING:
        update_game(dt)

    # Draw
    screen.fill((0, 0, 0))
    if game_state == STATE_MENU:
        draw_menu(screen)
    elif game_state == STATE_PLAYING:
        draw_game(screen)
    elif game_state == STATE_PAUSED:
        draw_game(screen)  # draw game underneath
        draw_pause_overlay(screen)  # then overlay
    elif game_state == STATE_GAME_OVER:
        draw_game_over(screen)

    pygame.display.flip()
\`\`\`

That's the entire pattern. Each state gets its own input handler, its own update logic, and its own draw function. Clean separation.

---

## State Transitions

States change when specific things happen:

\`\`\`python
# Menu → Playing (player presses Enter)
def handle_menu_input(event):
    global game_state
    if event.type == pygame.KEYDOWN and event.key == pygame.K_RETURN:
        game_state = STATE_PLAYING
        reset_game()  # initialize game variables

# Playing → Paused (player presses Escape)
def handle_game_input(event):
    global game_state
    if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
        game_state = STATE_PAUSED

# Paused → Playing (player presses Escape again)
def handle_pause_input(event):
    global game_state
    if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
        game_state = STATE_PLAYING  # resume

# Playing → Game Over (player dies)
def update_game(dt):
    global game_state
    # ... game logic ...
    if lives <= 0:
        game_state = STATE_GAME_OVER

# Game Over → Menu (player presses R to restart)
def handle_game_over_input(event):
    global game_state
    if event.type == pygame.KEYDOWN and event.key == pygame.K_r:
        game_state = STATE_MENU
\`\`\`

---

## Drawing Each State

### Menu Screen
\`\`\`python
def draw_menu(screen):
    title_font = pygame.font.SysFont(None, 72)
    sub_font = pygame.font.SysFont(None, 28)

    title = title_font.render("MY GAME", True, (255, 255, 255))
    title_rect = title.get_rect(center=(SCREEN_WIDTH // 2, 200))
    screen.blit(title, title_rect)

    prompt = sub_font.render("Press ENTER to start", True, (180, 180, 180))
    prompt_rect = prompt.get_rect(center=(SCREEN_WIDTH // 2, 350))
    screen.blit(prompt, prompt_rect)
\`\`\`

### Pause Overlay
\`\`\`python
def draw_pause_overlay(screen):
    # Semi-transparent dark overlay
    overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
    overlay.set_alpha(128)
    overlay.fill((0, 0, 0))
    screen.blit(overlay, (0, 0))

    font = pygame.font.SysFont(None, 48)
    text = font.render("PAUSED", True, (255, 255, 255))
    text_rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2))
    screen.blit(text, text_rect)

    sub = pygame.font.SysFont(None, 24)
    hint = sub.render("Press ESC to resume", True, (180, 180, 180))
    hint_rect = hint.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 40))
    screen.blit(hint, hint_rect)
\`\`\`

### Game Over Screen
\`\`\`python
def draw_game_over(screen):
    font = pygame.font.SysFont(None, 64)
    text = font.render("GAME OVER", True, (255, 50, 50))
    text_rect = text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 - 30))
    screen.blit(text, text_rect)

    score_font = pygame.font.SysFont(None, 32)
    score_text = score_font.render(f"Final Score: {score}", True, (255, 255, 255))
    score_rect = score_text.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 20))
    screen.blit(score_text, score_rect)

    hint = score_font.render("Press R to restart", True, (180, 180, 180))
    hint_rect = hint.get_rect(center=(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2 + 60))
    screen.blit(hint, hint_rect)
\`\`\`

---

## reset_game() — The Restart Function

When transitioning from Game Over back to Playing, you need to reset everything:

\`\`\`python
def reset_game():
    global score, lives, level, ball_pos, ball_vel
    score = 0
    lives = 3
    level = 1
    ball_pos = pygame.math.Vector2(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
    ball_vel = pygame.math.Vector2(3, -3)
    # Reset any other game objects, sprites, etc.
\`\`\`

**Common mistake:** Forgetting to reset something. The player restarts and an old brick is still missing, or the score isn't zero. Always reset EVERYTHING.

---

## Gerber Tip — Keep It Simple

You don't need a fancy state machine library. A string variable and some if/elif blocks is all most games need. Don't over-engineer it. The pattern above handles menus, pausing, game over, and win screens for any Pygame project.

If your game gets really complex (multiple levels, cutscenes, shops), you might want to use a class-based approach where each state is its own class with \`handle_input()\`, \`update()\`, and \`draw()\` methods. But for the projects in this course, the simple approach works perfectly.
`,
    starterCode: `# Game State Management Demo — run this locally
# Shows menu, playing, paused, and game over states

import pygame
import random

pygame.init()

SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("State Management Demo")
clock = pygame.time.Clock()

# States
STATE_MENU = "menu"
STATE_PLAYING = "playing"
STATE_PAUSED = "paused"
STATE_GAME_OVER = "game_over"

game_state = STATE_MENU

# Fonts
title_font = pygame.font.SysFont(None, 72)
hud_font = pygame.font.SysFont(None, 32)
small_font = pygame.font.SysFont(None, 24)

# Colors
WHITE = (255, 255, 255)
GRAY = (150, 150, 150)
RED = (255, 80, 80)
GREEN = (80, 255, 80)
BLUE = (100, 149, 237)
BG = (25, 25, 35)

# Game variables
score = 0
lives = 3
player_rect = pygame.Rect(375, 500, 50, 50)
targets = []
SPEED = 300

def reset_game():
    global score, lives, targets
    score = 0
    lives = 3
    player_rect.center = (400, 500)
    targets.clear()
    for _ in range(5):
        spawn_target()

def spawn_target():
    x = random.randint(50, SCREEN_WIDTH - 50)
    y = random.randint(50, 350)
    targets.append(pygame.Rect(x, y, 30, 30))

running = True
while running:
    dt = clock.tick(60) / 1000.0

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.KEYDOWN:
            if game_state == STATE_MENU:
                if event.key == pygame.K_RETURN:
                    game_state = STATE_PLAYING
                    reset_game()

            elif game_state == STATE_PLAYING:
                if event.key == pygame.K_ESCAPE:
                    game_state = STATE_PAUSED

            elif game_state == STATE_PAUSED:
                if event.key == pygame.K_ESCAPE:
                    game_state = STATE_PLAYING

            elif game_state == STATE_GAME_OVER:
                if event.key == pygame.K_r:
                    game_state = STATE_MENU

    # --- UPDATE ---
    if game_state == STATE_PLAYING:
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT] and player_rect.left > 0:
            player_rect.x -= SPEED * dt
        if keys[pygame.K_RIGHT] and player_rect.right < SCREEN_WIDTH:
            player_rect.x += SPEED * dt

        # Check collisions with targets
        for target in targets[:]:
            if player_rect.colliderect(target):
                targets.remove(target)
                score += 10
                spawn_target()

        # Lose a life every 10 seconds (just for demo)
        if pygame.time.get_ticks() % 10000 < 20:
            lives -= 1
            if lives <= 0:
                game_state = STATE_GAME_OVER

    # --- DRAW ---
    screen.fill(BG)

    if game_state == STATE_MENU:
        title = title_font.render("CATCH GAME", True, BLUE)
        screen.blit(title, title.get_rect(center=(400, 200)))
        prompt = small_font.render("Press ENTER to start", True, GRAY)
        screen.blit(prompt, prompt.get_rect(center=(400, 300)))
        controls = small_font.render("Arrow keys to move  |  ESC to pause", True, GRAY)
        screen.blit(controls, controls.get_rect(center=(400, 340)))

    elif game_state == STATE_PLAYING:
        pygame.draw.rect(screen, BLUE, player_rect)
        for t in targets:
            pygame.draw.rect(screen, GREEN, t)
        score_text = hud_font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))
        lives_text = hud_font.render(f"Lives: {lives}", True, RED)
        screen.blit(lives_text, lives_text.get_rect(topright=(SCREEN_WIDTH - 10, 10)))

    elif game_state == STATE_PAUSED:
        # Draw game underneath
        pygame.draw.rect(screen, BLUE, player_rect)
        for t in targets:
            pygame.draw.rect(screen, GREEN, t)
        # Dark overlay
        overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
        overlay.set_alpha(150)
        overlay.fill((0, 0, 0))
        screen.blit(overlay, (0, 0))
        pause_text = title_font.render("PAUSED", True, WHITE)
        screen.blit(pause_text, pause_text.get_rect(center=(400, 280)))
        hint = small_font.render("Press ESC to resume", True, GRAY)
        screen.blit(hint, hint.get_rect(center=(400, 330)))

    elif game_state == STATE_GAME_OVER:
        go_text = title_font.render("GAME OVER", True, RED)
        screen.blit(go_text, go_text.get_rect(center=(400, 250)))
        final = hud_font.render(f"Final Score: {score}", True, WHITE)
        screen.blit(final, final.get_rect(center=(400, 320)))
        hint = small_font.render("Press R to return to menu", True, GRAY)
        screen.blit(hint, hint.get_rect(center=(400, 360)))

    pygame.display.flip()

pygame.quit()
`,
    examples: [
      {
        title: "Semi-Transparent Pause Overlay",
        explanation: "Draw the game underneath, then a dark semi-transparent surface on top. Looks polished with almost no effort.",
        code: `# Create a surface the size of the screen
overlay = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
overlay.set_alpha(128)   # 0=invisible, 255=opaque
overlay.fill((0, 0, 0))  # black
screen.blit(overlay, (0, 0))

# Now draw pause text ON TOP of the overlay
text = font.render("PAUSED", True, WHITE)
screen.blit(text, text.get_rect(center=(400, 300)))`,
      },
      {
        title: "State Transition Diagram",
        explanation: "Map out which states can transition to which. Helps you think through the flow before coding.",
        code: `# MENU --[Enter]--> PLAYING
# PLAYING --[Esc]--> PAUSED
# PLAYING --[lives=0]--> GAME_OVER
# PLAYING --[all bricks gone]--> WIN
# PAUSED --[Esc]--> PLAYING
# GAME_OVER --[R]--> MENU
# WIN --[R]--> MENU

# Each arrow is an if statement in your event handler.
# That's the whole state machine.`,
      },
    ],
    challenges: [
      {
        id: "states-1",
        prompt: "What's the advantage of using a state variable (like game_state = 'menu') instead of multiple boolean flags (show_menu = True, game_over = False)?",
        hint: "Think about what happens when you have 5 different screens",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("one" in answer or "exclusive" in answer or "conflict" in answer or "clear" in answer or "single" in answer or "which" in answer or "only" in answer)
`,
        solution: "With a single state variable, only one state is active at a time. With booleans, you could accidentally have show_menu=True AND game_over=True at the same time, leading to bugs. One variable makes it clear exactly which screen is active.",
      },
      {
        id: "states-2",
        prompt: "When you pause the game, why do you still call draw_game() before drawing the pause overlay?",
        hint: "What would the player see if you only drew the pause text?",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("under" in answer or "behind" in answer or "see" in answer or "background" in answer or "beneath" in answer or "black" in answer or "blank" in answer or "game" in answer)
`,
        solution: "If you only draw the pause overlay, the player sees a blank screen with 'PAUSED' on it. By drawing the game first, then the semi-transparent overlay on top, the player can still see the game state underneath. It looks way better and helps them remember where they were.",
      },
      {
        id: "states-3",
        prompt: "What's the purpose of the reset_game() function? When should it be called?",
        hint: "Think about what happens when a player starts a new game",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("reset" in answer or "initial" in answer or "start" in answer or "zero" in answer or "new" in answer or "fresh" in answer or "clear" in answer)
`,
        solution: "reset_game() sets all game variables back to their starting values (score=0, lives=3, respawn objects, etc). Call it when transitioning from MENU to PLAYING. Without it, starting a new game would keep the old score, dead enemies, and used-up lives from the last round.",
      },
      {
        id: "states-4",
        prompt: "Why should you only call update_game(dt) when game_state is PLAYING, not during PAUSED or MENU?",
        hint: "What would happen to the ball if physics kept running while paused?",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("move" in answer or "keep" in answer or "still" in answer or "stop" in answer or "freeze" in answer or "continue" in answer or "run" in answer or "physics" in answer)
`,
        solution: "If you update game physics while paused, objects keep moving even though the player can't see or control them. When they unpause, everything is in a different position. Only updating during PLAYING means the game truly freezes when paused.",
      },
    ],
  },
  {
    module: "Game Development with Pygame",
    moduleSlug: "game-dev-pygame",
    lessonNumber: 46,
    slug: "pygame-project-breakaway-deep-dive",
    title: "Brick Breakaway — Deep Dive & Demo Prep",
    badge: "challenge",
    theory: `
## Your Brick Breakaway — How Everything Works

This is a deep breakdown of the Brick Breakaway game you built. Everything here maps to your actual code. Know this inside and out for the Zoom demo with Gerber.

---

## The Big Picture

The game has 5 core systems working together:
1. **Platform** — keyboard-controlled paddle at the bottom
2. **Ball** — bounces around, destroys bricks, uses delta time
3. **Bricks** — grid of targets with variable health + power-ups
4. **Power-Ups** — special drops that modify gameplay (wider paddle, extra life, slow ball, multi-ball)
5. **Levels** — 3 different brick layouts with increasing difficulty

Everything runs inside one game loop doing **events → update → draw** at 60fps.

---

## Delta Time — Why It Matters

\`\`\`python
dt = clock.tick(60) / 1000.0  # seconds since last frame
\`\`\`

Every movement in the game multiplies by \`dt\`. This is frame-rate independence. If your computer runs at 30fps instead of 60fps, \`dt\` is bigger, so things move farther per frame, keeping the actual speed the same.

**Gerber will probably ask:** "Why do you use delta time?"
**Your answer:** "So the game runs the same speed on every machine. Without dt, faster computers would make the ball move faster. Multiplying by dt converts from pixels-per-frame to pixels-per-second."

\`\`\`python
# BAD — frame dependent
self.x += 5  # 5 pixels per frame = different speeds at different framerates

# GOOD — frame independent
self.x += self.speed * dt  # 500 pixels per second = same speed everywhere
\`\`\`

---

## Ball Physics — Launch and Bounce

### Random Launch
\`\`\`python
angle_deg = random.uniform(-60, 60)        # random angle range
angle_rad = math.radians(angle_deg - 90)   # offset so 0 = straight up
self.dx = math.cos(angle_rad) * self.speed # horizontal component
self.dy = math.sin(angle_rad) * self.speed # vertical component (negative = up)
\`\`\`

**Why subtract 90?** Pygame's angle system starts at 3 o'clock (right). We want 0 degrees to mean straight up, so we rotate the whole thing by -90 degrees.

**Gerber might ask:** "How does the random launch work?"
**Your answer:** "I pick a random angle between -60 and 60 degrees from vertical, convert to radians, then use cos and sin to get the x and y velocity components. The ball always goes up but at a random horizontal angle."

### Platform Bounce With Angle
\`\`\`python
hit_pos = (self.x - platform.x) / platform.width  # 0.0 to 1.0
self.dx = (hit_pos - 0.5) * self.speed * 2
\`\`\`

This makes the ball bounce in different directions depending on WHERE it hits the paddle:
- Hit the **left edge** → ball goes left (hit_pos near 0, so \`0 - 0.5 = -0.5\`)
- Hit the **center** → ball goes straight up (hit_pos = 0.5, so \`0.5 - 0.5 = 0\`)
- Hit the **right edge** → ball goes right (hit_pos near 1.0, so \`1.0 - 0.5 = 0.5\`)

**Gerber might ask:** "How do you control the bounce angle?"
**Your answer:** "I calculate where on the paddle the ball hit as a 0-to-1 ratio. Subtract 0.5 to center it, then multiply by speed to get the new horizontal velocity. Left side sends it left, right side sends it right."

### Wall Bounces
\`\`\`python
if self.x - self.radius <= 0:       # left wall
    self.dx = abs(self.dx)           # force positive (rightward)
if self.x + self.radius >= SCREEN_WIDTH:  # right wall
    self.dx = -abs(self.dx)          # force negative (leftward)
if self.y - self.radius <= 0:       # top wall
    self.dy = abs(self.dy)           # force positive (downward)
\`\`\`

Using \`abs()\` instead of \`*= -1\` prevents the "stuck in wall" bug where the ball flips direction twice if it's deep inside the wall.

---

## Brick Collision Detection

\`\`\`python
if ball_rect.colliderect(brick.get_rect()):
    # figure out which side was hit
    overlap_left = ball_rect.right - b.left
    overlap_right = b.right - ball_rect.left
    overlap_top = ball_rect.bottom - b.top
    overlap_bottom = b.bottom - ball_rect.top

    min_overlap = min(overlap_left, overlap_right, overlap_top, overlap_bottom)

    if min_overlap == overlap_top or min_overlap == overlap_bottom:
        ball.dy *= -1  # vertical bounce
    else:
        ball.dx *= -1  # horizontal bounce
\`\`\`

**How it works:** When two rectangles overlap, the smallest overlap tells you which side the ball entered from. Top/bottom overlap → flip vertical velocity. Left/right overlap → flip horizontal velocity.

**Why \`break\` after one collision?** If the ball hits the corner where two bricks meet, processing both in the same frame would flip the velocity twice (canceling out). One brick per frame avoids this.

**Gerber might ask:** "How does your collision detection work?"
**Your answer:** "I use colliderect() to check if the ball overlaps a brick. Then I calculate the overlap on all four sides. The smallest overlap tells me which side the ball came from, and I flip the appropriate velocity component."

---

## Power-Up System

### Brick Types
Power-up bricks look different (colored with a letter symbol) and drop a collectible when destroyed:

| Type | Color | Symbol | Effect |
|------|-------|--------|--------|
| Wide Paddle | Cyan | W | Platform +40px wider (max 220px) |
| Extra Life | Pink | + | +1 life immediately |
| Slow Ball | Purple | S | Ball speed -80 px/sec (min 250) |
| Multi Ball | Green | M | Spawns second ball going opposite direction |

### How Drops Work
\`\`\`python
class PowerUpDrop:
    def update(self, dt):
        self.y += self.speed * dt  # falls down at 150 px/sec
        if self.y > SCREEN_HEIGHT:
            self.alive = False      # missed it, gone
\`\`\`

When a power-up brick dies, a \`PowerUpDrop\` spawns at the brick's position and falls. If the platform catches it (colliderect), the effect applies. If it falls off screen, it's gone.

**Gerber might ask:** "How do power-ups work in your game?"
**Your answer:** "Certain bricks are randomly tagged as power-up bricks when the level loads. When you break one, it spawns a falling drop object. If you catch it with the paddle, the power-up activates. There are four types: wider paddle, extra life, slower ball, and multi-ball."

### Multi-Ball Implementation
\`\`\`python
extra = Ball()
extra.x = ball.x
extra.y = ball.y
extra.dx = -ball.dx  # opposite horizontal direction
extra.dy = ball.dy
extra.launched = True
game_state["extra_balls"].append(extra)
\`\`\`

Spawns a second ball at the same position going the opposite horizontal direction. Extra balls are tracked separately and get cleaned up when they fall off screen. Only the main ball costs lives when lost.

---

## Level System

Three level functions return different brick layouts:

**Level 1 — Standard Grid:** 10×5 bricks, top rows have more HP (row 0 = 5HP, row 4 = 1HP)

**Level 2 — Diamond Pattern:** Bricks arranged in a diamond shape. Center bricks have higher health. Uses a \`rows_config = [2, 4, 6, 8, 10, 8, 6, 4, 2]\` array to define width per row.

**Level 3 — Alternating Gaps:** 8 rows, odd rows skip every other brick creating a gap pattern. Higher health in lower rows. Harder because the gaps make precision bounces more important.

Each level randomly places 4-6 power-up bricks. Ball speed increases by 30 px/sec per level. Clearing all bricks gives a 100-point level bonus.

**Gerber might ask:** "How do your levels work?"
**Your answer:** "Each level is a function that returns a list of Brick objects with different positions and health values. When you clear all bricks, the game loads the next level function. Ball speed increases slightly per level. After all three levels, you win."

---

## Background — Procedural Generation

Instead of loading an image file, the background is generated with code:

\`\`\`python
def create_background():
    bg = pygame.Surface((SCREEN_WIDTH, SCREEN_HEIGHT))
    for y in range(SCREEN_HEIGHT):
        ratio = y / SCREEN_HEIGHT
        r = int(10 + ratio * 15)
        g = int(15 + ratio * 10)
        b = int(40 + ratio * 20)
        pygame.draw.line(bg, (r, g, b), (0, y), (SCREEN_WIDTH, y))
    # add stars
    for _ in range(80):
        sx = random.randint(0, SCREEN_WIDTH)
        sy = random.randint(0, SCREEN_HEIGHT - 100)
        pygame.draw.circle(bg, (brightness, brightness, brightness + 30), (sx, sy), size)
    return bg
\`\`\`

Draws a vertical gradient line by line (dark blue getting darker toward the bottom), then scatters random "stars" on top. Generated once at startup, blitted every frame.

**If Gerber asks why you didn't use an image file:** "I wanted the background to be self-contained in the code so there's no external file dependency. The gradient generates in milliseconds at startup and gets cached as a surface."

**If you want to swap in a real image:** Replace \`background = create_background()\` with:
\`\`\`python
background = pygame.image.load("background.png")
background = pygame.transform.scale(background, (SCREEN_WIDTH, SCREEN_HEIGHT))
\`\`\`

---

## Brick Sprites — Cached Rendering

\`\`\`python
BRICK_SPRITES = {}  # cache

def create_brick_sprite(width, height, color, health):
    surf = pygame.Surface((width, height), pygame.SRCALPHA)
    pygame.draw.rect(surf, color, (0, 0, width, height), border_radius=4)
    # highlight on top
    highlight = tuple(min(c + 50, 255) for c in color)
    pygame.draw.rect(surf, highlight, (2, 2, width - 4, 4), border_radius=2)
    # shadow on bottom
    shadow = tuple(max(c - 40, 0) for c in color)
    pygame.draw.rect(surf, shadow, (2, height - 5, width - 4, 3), border_radius=2)
    return surf
\`\`\`

Each unique brick appearance (health level + power-up type) gets rendered once and cached in \`BRICK_SPRITES\`. After the first frame, bricks are just blitting pre-rendered surfaces instead of calling \`draw.rect()\` every frame.

**Gerber might ask:** "Why cache the sprites?"
**Your answer:** "So I'm not re-drawing highlight and shadow effects on 50+ bricks every frame. I render each unique appearance once and reuse the surface. It's a performance optimization."

---

## Common Gerber Questions — Quick Answers

**"Walk me through the game loop."**
"Events first — check for quit, spacebar launch, spacebar restart. Then update — move platform, move ball, check collisions, check if ball fell off screen. Then draw — background, platform, ball, bricks, HUD. Then flip the display."

**"What happens when the ball falls off screen?"**
"I check \`ball.is_off_screen()\` which returns true if the ball's y position is below the screen height. If so, decrement lives. If lives hit 0, game over. Otherwise reset the ball to follow the platform and reset paddle width."

**"How do you handle multiple balls?"**
"Extra balls from the multi-ball power-up are stored in a list. They get the same update and collision logic as the main ball. When they fall off screen they just get removed from the list, no life lost."

**"What's the hardest part of this project?"**
"Getting the collision direction right. The overlap method works but it can be finicky at corners. I used a \`break\` after the first collision to avoid double-bounces."

**"How would you add more levels?"**
"Just write another function that returns a list of Brick objects and add it to the LEVELS array. The level progression code handles the rest automatically."

**"How would you add sound?"**
"Import pygame.mixer, load .wav files at startup with pygame.mixer.Sound(), and call .play() on collision events. Background music with pygame.mixer.music.load() and .play(-1) for looping."
`,
    starterCode: `# This is your actual Brick Breakaway game code
# Run it locally with: python main.py
# Make sure pygame is installed: pip install pygame

# The full game is at ~/Projects/brick-breakaway/main.py
# This starter code shows the core structure

import pygame
import sys
import random
import math

pygame.init()

SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
clock = pygame.time.Clock()

# --- Your 5 core systems ---
# 1. Platform class (keyboard-controlled paddle)
# 2. Ball class (physics, bouncing, delta time)
# 3. Brick class (health, colors, power-ups)
# 4. PowerUpDrop class (falling collectibles)
# 5. Level functions (different brick layouts)

# See the full main.py for complete implementation
# Key concepts to know for the demo:
# - Delta time (dt = clock.tick(60) / 1000.0)
# - Random launch angles (trig with cos/sin)
# - Platform bounce angle (hit position ratio)
# - Collision direction (minimum overlap method)
# - Sprite caching (render once, blit many)
# - Level progression (list of level functions)
# - Power-up drops (spawn on brick death, catch with paddle)

print("Review the theory tab for full code walkthrough!")
print("Know every system for the Gerber Zoom demo.")
`,
    examples: [
      {
        title: "Delta Time Pattern",
        explanation: "The foundational pattern that makes everything consistent. Know this cold.",
        code: `dt = clock.tick(60) / 1000.0  # seconds since last frame

# ALL movement uses dt
self.x += self.speed * dt      # pixels per second, not per frame
self.y += self.speed * dt

# 400 speed * 0.016 dt = 6.4 pixels this frame (at 60fps)
# 400 speed * 0.033 dt = 13.2 pixels this frame (at 30fps)
# Same distance per second either way`,
      },
      {
        title: "Collision Direction Detection",
        explanation: "Minimum overlap tells you which side the ball entered from.",
        code: `# Calculate overlap on all 4 sides
overlap_left = ball_rect.right - brick_rect.left
overlap_right = brick_rect.right - ball_rect.left
overlap_top = ball_rect.bottom - brick_rect.top
overlap_bottom = brick_rect.bottom - ball_rect.top

# Smallest overlap = the side the ball came from
min_overlap = min(overlap_left, overlap_right, overlap_top, overlap_bottom)

if min_overlap == overlap_top or min_overlap == overlap_bottom:
    ball.dy *= -1  # came from top or bottom → flip vertical
else:
    ball.dx *= -1  # came from side → flip horizontal`,
      },
    ],
    challenges: [
      {
        id: "breakaway-deep-1",
        prompt: "Why do you use abs(self.dx) instead of self.dx *= -1 for wall bounces? What bug does it prevent?",
        hint: "Think about what happens if the ball is already past the wall",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("stuck" in answer or "twice" in answer or "inside" in answer or "past" in answer or "double" in answer or "flip" in answer)
`,
        solution: "If the ball moves fast enough to be deep inside the wall, *= -1 would flip it away from the wall, but next frame it's still inside so it flips AGAIN, getting stuck. abs() forces the velocity in the correct direction regardless of how deep the ball is.",
      },
      {
        id: "breakaway-deep-2",
        prompt: "How does the platform bounce angle work? What does hit_pos represent and why subtract 0.5?",
        hint: "Think about the range of values and what center means",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("ratio" in answer or "0 to 1" in answer or "center" in answer or "left" in answer or "right" in answer or "position" in answer or "where" in answer)
`,
        solution: "hit_pos is (ball.x - platform.x) / platform.width, giving a 0.0 to 1.0 ratio of where on the paddle the ball hit. Subtracting 0.5 centers it: left edge = -0.5 (goes left), center = 0 (straight up), right edge = +0.5 (goes right). Multiply by speed to get the actual horizontal velocity.",
      },
      {
        id: "breakaway-deep-3",
        prompt: "Why does check_ball_brick_collisions() use 'break' after hitting one brick?",
        hint: "What happens at the corner where two bricks touch?",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("two" in answer or "double" in answer or "cancel" in answer or "twice" in answer or "corner" in answer or "multiple" in answer or "multi" in answer)
`,
        solution: "If the ball hits the corner where two bricks meet, processing both collisions in the same frame would flip the velocity twice — once for each brick — which cancels out and the ball passes through. Breaking after one collision avoids this bug.",
      },
      {
        id: "breakaway-deep-4",
        prompt: "How does the multi-ball power-up work? Why does losing an extra ball NOT cost a life?",
        hint: "Think about which ball is the 'main' one",
        validateFn: `
def validate(answer):
    answer = answer.lower()
    return ("main" in answer or "list" in answer or "separate" in answer or "extra" in answer or "only" in answer or "primary" in answer or "track" in answer)
`,
        solution: "Extra balls are stored in a separate list (game_state['extra_balls']). Only the main ball is tracked for lives — when the main ball falls off screen, you lose a life. Extra balls just get removed from the list when they fall off. This keeps the game fair while still being chaotic with multiple balls.",
      },
    ],
  },
];
