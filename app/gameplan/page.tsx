"use client";

import { useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "gameplan-progress";

type Task = {
  id: string;
  text: string;
  code?: string;
  qa?: { q: string; a: string };
};

type Section = {
  title: string;
  subtitle: string;
  emoji: string;
  tasks: Task[];
};

type Day = {
  day: number;
  date: string;
  theme: string;
  badge: string;
  badgeColor: string;
  sections: Section[];
};

const days: Day[] = [
  {
    day: 1,
    date: "Thu Apr 9",
    theme: "Game loop, delta time, Platform class",
    badge: "Foundation",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    sections: [
      {
        title: "Watch First",
        subtitle: "General module videos — short but important",
        emoji: "🎬",
        tasks: [
          { id: "d1-v1", text: "Pygame Install (2:09) — pip install pygame, pygame.init()" },
          { id: "d1-v2", text: "Rectangles vs Vectors (5:39) — Rect for collision, Vector2 for physics" },
          { id: "d1-v3", text: "Delta Time (3:48) — why frame-rate independence matters" },
        ],
      },
      {
        title: "Understand the Game Loop",
        subtitle: "main.py lines ~220-297 — the heartbeat of the game",
        emoji: "🔄",
        tasks: [
          {
            id: "d1-loop1",
            text: "Understand dt = clock.tick(60) / 1000.0",
            code: "dt = clock.tick(60) / 1000.0\n# clock.tick returns milliseconds since last frame\n# divide by 1000 to convert to seconds\n# so dt is something like 0.016 at 60fps",
          },
          {
            id: "d1-loop2",
            text: "Know the 3-step loop: events → update → draw",
            code: "while True:\n    dt = clock.tick(60) / 1000.0\n    for event in pygame.event.get():  # 1. events\n        ...\n    platform.update(dt)               # 2. update\n    ball.update(dt, platform)\n    screen.fill(GRAY)                  # 3. draw\n    pygame.display.flip()",
          },
          {
            id: "d1-loop3",
            text: "Q&A: Why multiply by dt?",
            qa: {
              q: "Why do you multiply velocity by dt?",
              a: "Frame-rate independence. Without dt, a 120fps machine moves twice as fast as a 60fps machine. Speed is measured in pixels per second. Multiplying by dt (a fraction of a second) gives consistent real-world speed regardless of framerate.",
            },
          },
        ],
      },
      {
        title: "Platform Class",
        subtitle: "Keyboard movement + boundary clamping",
        emoji: "🎮",
        tasks: [
          {
            id: "d1-plat1",
            text: "Understand movement with delta time",
            code: "def update(self, dt):\n    keys = pygame.key.get_pressed()\n    if keys[pygame.K_LEFT]:\n        self.x -= self.speed * dt  # 500 px/sec × fraction of sec\n    # clamp to screen boundaries\n    self.x = max(0, min(self.x, SCREEN_WIDTH - self.width))",
          },
          {
            id: "d1-plat2",
            text: "Q&A: How does the platform move?",
            qa: {
              q: "How does the platform move?",
              a: "Checks which keys are held each frame using pygame.key.get_pressed(). Moves at 500 pixels per second scaled by dt. The max/min clamps it so it can't go off screen.",
            },
          },
        ],
      },
      {
        title: "Submit + Email Gerber",
        subtitle: "Do this today — first come first serve for Zoom slots",
        emoji: "📧",
        tasks: [
          { id: "d1-run", text: "Run python3 main.py — confirm game launches and plays" },
          { id: "d1-zip", text: "Zip the brick-breakaway folder: zip -r BrickBreakaway_Damato.zip ." },
          { id: "d1-canvas", text: "Upload zip to Canvas" },
          { id: "d1-email", text: "Email pgerber1@wctc.edu — request Step 3 Zoom meeting with available times" },
        ],
      },
    ],
  },
  {
    day: 2,
    date: "Fri Apr 10",
    theme: "Ball physics — launch, bouncing, platform collision",
    badge: "Physics",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    sections: [
      {
        title: "Watch",
        subtitle: "Ball-specific videos",
        emoji: "🎬",
        tasks: [
          { id: "d2-v1", text: "Brick Breakaway Video 5: Ball Class and Attributes" },
          { id: "d2-v2", text: "Brick Breakaway Video 6: Ball Class Methods" },
          { id: "d2-v3", text: "Brick Breakaway Video 7: Ball and Platform Collision" },
        ],
      },
      {
        title: "Ball Launch (Step 2 — Randomized)",
        subtitle: "Random angle using math.cos/sin — Gerber will ask about this",
        emoji: "🎱",
        tasks: [
          {
            id: "d2-launch1",
            text: "Understand the random angle calculation",
            code: "def launch(self):\n    angle_deg = random.uniform(-60, 60)       # spread\n    angle_rad = math.radians(angle_deg - 90)  # -90 = rotate so 0 is straight up\n    self.dx = math.cos(angle_rad) * self.speed\n    self.dy = math.sin(angle_rad) * self.speed\n    self.launched = True",
          },
          {
            id: "d2-launch2",
            text: "Q&A: Walk me through ball launch",
            qa: {
              q: "Walk me through how ball launch works.",
              a: "Pick a random angle between -60 and 60 degrees. Subtract 90 to rotate the reference so 0 degrees points straight up. Convert to radians. Use cos for the x component and sin for the y component of velocity. Speed stays constant regardless of direction.",
            },
          },
        ],
      },
      {
        title: "Wall Bouncing",
        subtitle: "abs() instead of *= -1 — and why that matters",
        emoji: "🧱",
        tasks: [
          {
            id: "d2-wall1",
            text: "Understand abs() for bounce direction",
            code: "if self.x - self.radius <= 0:    # hit left wall\n    self.dx = abs(self.dx)          # force rightward (positive)\nif self.x + self.radius >= SCREEN_WIDTH:\n    self.dx = -abs(self.dx)         # force leftward (negative)\nif self.y - self.radius <= 0:    # hit ceiling\n    self.dy = abs(self.dy)          # force downward",
          },
          {
            id: "d2-wall2",
            text: "Q&A: Why abs() instead of *= -1 for bouncing?",
            qa: {
              q: "Why use abs() instead of *= -1 for wall bouncing?",
              a: "If the ball gets slightly inside a wall (which happens), flipping with *= -1 would keep bouncing it back and forth inside the wall. Using abs() forces it to always move away from the wall regardless of how deep it is.",
            },
          },
        ],
      },
      {
        title: "Platform Collision",
        subtitle: "The most complex part — angle based on hit position",
        emoji: "🏓",
        tasks: [
          {
            id: "d2-plat1",
            text: "Understand the dy > 0 check",
            code: "if ball_rect.colliderect(p_rect) and self.dy > 0:\n#                                       ^^^^^^^^^\n# only bounce when moving DOWN (dy > 0)\n# pygame y increases downward, so positive dy = moving down\n# without this check, ball bouncing upward through the platform also triggers",
          },
          {
            id: "d2-plat2",
            text: "Understand hit position → angle",
            code: "hit_pos = (self.x - platform.x) / platform.width  # 0.0 = left, 1.0 = right\nself.dx = (hit_pos - 0.5) * self.speed * 2\n# hit_pos 0.0 → (0-0.5)*speed*2 = large negative dx (goes left)\n# hit_pos 0.5 → (0.5-0.5)*speed*2 = 0 dx (goes straight up)\n# hit_pos 1.0 → (1-0.5)*speed*2 = large positive dx (goes right)",
          },
          {
            id: "d2-plat3",
            text: "Q&A: Why check dy > 0 before platform collision?",
            qa: {
              q: "Why do you check self.dy > 0 before the platform collision?",
              a: "In pygame, y increases downward. So dy > 0 means the ball is moving downward. Without this check, a ball moving upward through the platform from below would also trigger a bounce, causing it to get stuck or bounce wrong. We only want to bounce when the ball is falling down onto the platform.",
            },
          },
          {
            id: "d2-plat4",
            text: "Q&A: How does hit position change the angle?",
            qa: {
              q: "How does where the ball hits the platform affect the angle?",
              a: "hit_pos maps the hit location to 0.0 to 1.0 across the platform. Subtracting 0.5 centers it around zero. Multiplying by speed * 2 scales it. Left edge hit → large negative dx (sharp left angle). Right edge → large positive dx (sharp right). Dead center → dx near zero (straight up).",
            },
          },
        ],
      },
    ],
  },
  {
    day: 3,
    date: "Sat Apr 11",
    theme: "Bricks — health system, grid, side detection",
    badge: "Collision",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    sections: [
      {
        title: "Watch",
        subtitle: "Brick-specific videos",
        emoji: "🎬",
        tasks: [
          { id: "d3-v1", text: "Brick Breakaway Video 8: Brick Class" },
          { id: "d3-v2", text: "Brick Breakaway Video 9: Brick Collisions" },
        ],
      },
      {
        title: "Brick Class — Health System",
        subtitle: "Color changes with health, alive flag stops rendering",
        emoji: "🟥",
        tasks: [
          {
            id: "d3-brick1",
            text: "Understand health → color mapping",
            code: "BRICK_COLORS = {\n    1: BLUE,    # 1 hp = almost dead\n    2: GREEN,\n    3: YELLOW,\n    4: ORANGE,\n    5: RED,     # 5 hp = full health\n}\n\ndef get_color(self):\n    return BRICK_COLORS.get(self.health, RED)",
          },
          {
            id: "d3-brick2",
            text: "Understand the hit() method",
            code: "def hit(self):\n    self.health -= 1\n    if self.health <= 0:\n        self.alive = False  # stops drawing and collision",
          },
          {
            id: "d3-brick3",
            text: "Understand create_bricks() grid + health by row",
            code: "for row in range(rows):     # 0 = top, 4 = bottom\n    for col in range(cols):\n        health = rows - row     # row 0 → health 5, row 4 → health 1\n        bricks.append(Brick(x, y, health))",
          },
          {
            id: "d3-brick4",
            text: "Q&A: How does the brick health system work?",
            qa: {
              q: "Walk me through the brick health system.",
              a: "Each brick gets a health value based on its row — top rows have 5 HP, bottom rows have 1 HP. The color is looked up from a dict using current health: red = 5, blue = 1. Each hit decrements health. When it reaches 0, alive is set to False which stops it from drawing and colliding.",
            },
          },
        ],
      },
      {
        title: "Brick Collision — Side Detection",
        subtitle: "Minimum overlap trick — the key algorithm",
        emoji: "💥",
        tasks: [
          {
            id: "d3-col1",
            text: "Understand the minimum overlap trick",
            code: "overlap_left   = ball_rect.right - b.left    # how far ball crossed left side\noverlap_right  = b.right - ball_rect.left    # how far ball crossed right side\noverlap_top    = ball_rect.bottom - b.top    # how far ball crossed top\noverlap_bottom = b.bottom - ball_rect.top    # how far ball crossed bottom\n\nmin_overlap = min(overlap_left, overlap_right, overlap_top, overlap_bottom)\n# smallest overlap = the side that was just barely crossed = the hit side",
          },
          {
            id: "d3-col2",
            text: "Understand break after one brick",
            code: "if min_overlap == overlap_top or min_overlap == overlap_bottom:\n    ball.dy *= -1\nelse:\n    ball.dx *= -1\nbreak  # ← only one brick per frame\n# without break: ball could hit 2 bricks in one frame\n# dy gets flipped twice → no actual bounce, ball passes through",
          },
          {
            id: "d3-col3",
            text: "Q&A: How do you detect which side of a brick was hit?",
            qa: {
              q: "How do you know which side of the brick the ball hit?",
              a: "Calculate how much the ball overlaps each of the four sides. The side with the smallest overlap is the one that was just barely crossed — that's the hit side. If it's top or bottom, flip dy. If left or right, flip dx. Then break immediately so only one brick gets hit per frame — without that break, the ball could flip velocity twice and pass straight through.",
            },
          },
        ],
      },
      {
        title: "Step 2 Review — All 3 Improvements",
        subtitle: "Be ready to explain each one to Gerber",
        emoji: "⭐",
        tasks: [
          {
            id: "d3-s2-1",
            text: "Q&A: What are your Step 2 improvements?",
            qa: {
              q: "Walk me through your Step 2 improvements.",
              a: "Three improvements: (1) Randomized ball start — on spacebar, random angle between -60 and 60 degrees using math.cos/sin, so each game feels different. (2) Player lives — 3 lives tracked in a variable, ball resets on each miss, lives shown in HUD, game over when they hit 0. (3) Informative text — launch prompt before ball launches, game over screen with replay prompt, you win screen when all bricks cleared.",
            },
          },
          { id: "d3-s2-2", text: "Test: launch a game — does random angle work?" },
          { id: "d3-s2-3", text: "Test: miss the ball 3 times — does game over appear?" },
          { id: "d3-s2-4", text: "Test: clear all bricks — does You Win appear?" },
        ],
      },
    ],
  },
  {
    day: 4,
    date: "Sun Apr 12",
    theme: "Full run-through + Zoom practice",
    badge: "Prep",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    sections: [
      {
        title: "Full Gerber Q&A Drill",
        subtitle: "Answer every one of these out loud — not in your head",
        emoji: "🎤",
        tasks: [
          {
            id: "d4-qa1",
            text: "Q&A: Walk me through the game loop",
            qa: {
              q: "Walk me through the game loop from start to finish.",
              a: "At the top of each loop, get dt from clock.tick(60)/1000. Then process events — quit, spacebar for launch or restart. Update platform and ball positions using dt. Check brick collisions. Then draw: fill background, draw platform, ball, bricks, HUD. Finally flip the display to show the new frame.",
            },
          },
          {
            id: "d4-qa2",
            text: "Q&A: What is delta time and why do you use it?",
            qa: {
              q: "What is delta time and why do you use it?",
              a: "Delta time is the time elapsed since the last frame, in seconds. I use it to make movement frame-rate independent. Without it, the game runs at different speeds on different computers. Multiplying speed by dt gives pixels-per-second instead of pixels-per-frame.",
            },
          },
          {
            id: "d4-qa3",
            text: "Q&A: What's in BRICK_COLORS?",
            qa: {
              q: "What is BRICK_COLORS?",
              a: "It's a dictionary mapping health values to RGB color tuples. Health 5 is red, health 1 is blue. The brick calls BRICK_COLORS.get(self.health, RED) — the default RED catches any value outside the dict range.",
            },
          },
          {
            id: "d4-qa4",
            text: "Q&A: How does the platform boundary clamping work?",
            qa: {
              q: "How do you prevent the platform from going off screen?",
              a: "After moving, clamp x with max(0, min(self.x, SCREEN_WIDTH - self.width)). Max 0 prevents going off the left edge. Min SCREEN_WIDTH minus width prevents going off the right. It's a one-liner that handles both sides.",
            },
          },
          {
            id: "d4-qa5",
            text: "Q&A: How does the win/lose condition work?",
            qa: {
              q: "How do you detect win and lose conditions?",
              a: "Lose: ball.is_off_screen() checks if the ball's y position plus radius exceeds SCREEN_HEIGHT. When true, decrement lives. Zero lives sets game_over = True. Win: check all(not b.alive for b in bricks) — when every brick is dead, set game_over = True and won = True. The draw code checks won to show either You Win or Game Over.",
            },
          },
        ],
      },
      {
        title: "Live Code Test",
        subtitle: "Can you explain it while looking at it?",
        emoji: "💻",
        tasks: [
          { id: "d4-live1", text: "Open main.py and scroll through it — no looking at notes" },
          { id: "d4-live2", text: "Find the launch() method and explain it from memory" },
          { id: "d4-live3", text: "Find check_ball_brick_collisions and explain the overlap logic" },
          { id: "d4-live4", text: "Find the platform collision block and explain dy > 0" },
        ],
      },
    ],
  },
  {
    day: 5,
    date: "Mon Apr 13",
    theme: "Start Game 2 — Sprite Game concepts",
    badge: "Game 2 Prep",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    sections: [
      {
        title: "Watch — Sprite Game Intro",
        subtitle: "First 3 videos to understand what's different",
        emoji: "🎬",
        tasks: [
          { id: "d5-v1", text: "Sprite Game Video 1: Project Setup" },
          { id: "d5-v2", text: "Sprite Game Video 2: Asset Selection and Background Display" },
          { id: "d5-v3", text: "Sprite Game Video 3: The Character Module" },
        ],
      },
      {
        title: "New Concepts in Sprite Game",
        subtitle: "What's different from Brick Breakaway",
        emoji: "🆕",
        tasks: [
          {
            id: "d5-c1",
            text: "Sprite sheets — one image with all animation frames",
            code: "# Instead of drawing a shape, load an image\nsprite_sheet = pygame.image.load('character.png')\n\n# Cut out a single frame from the sheet\nframe = sprite_sheet.subsurface(pygame.Rect(x, y, width, height))\n\n# Cycle through frames for animation\nself.frame_index += 1\nif self.frame_index >= len(self.frames):\n    self.frame_index = 0\ncurrent_frame = self.frames[self.frame_index]",
          },
          {
            id: "d5-c2",
            text: "Separate module files — character.py, runner.py",
            code: "# main.py imports from other files\nfrom character import Character\nfrom runner import Runner\n\n# Keeps main.py clean\n# Each class lives in its own file",
          },
          {
            id: "d5-c3",
            text: "Surface handler — extracts frames from sprite sheet",
            code: "class SurfaceHandler:\n    def get_frame(self, sheet, row, col, width, height):\n        x = col * width\n        y = row * height\n        return sheet.subsurface(pygame.Rect(x, y, width, height))",
          },
          { id: "d5-start", text: "Create ~/Projects/sprite-game/ folder" },
          { id: "d5-setup", text: "Set up main.py with game loop and empty screen" },
          { id: "d5-bg", text: "Get a background image displaying (pygame.image.load)" },
        ],
      },
      {
        title: "Full Learning Path — All 3 Games",
        subtitle: "Where you're headed",
        emoji: "🗺️",
        tasks: [
          { id: "d5-path1", text: "Game 2 (Sprite Game) — watch videos 4-13, build + submit by Apr 22" },
          { id: "d5-path2", text: "Game 2 Zoom with Gerber — by Apr 26 (email after submit)" },
          { id: "d5-path3", text: "Game 3 (Tower Defense) — watch 12 videos, build + submit by Apr 29" },
          { id: "d5-path4", text: "Game 3 — no Zoom required, just submit the zip" },
        ],
      },
    ],
  },
];

export default function GamePlanPage() {
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [openQA, setOpenQA] = useState<string | null>(null);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const totalTasks = days.flatMap((d) => d.sections.flatMap((s) => s.tasks)).length;
  const completedTasks = checked.size;
  const pct = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground text-sm">← Home</Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-bold">🎮 Game Dev Learning Plan</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">{completedTasks}/{totalTasks} tasks</span>
            <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-accent font-mono font-bold">{pct}%</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">5-Day Game Dev Plan</h1>
          <p className="text-muted-foreground">Game 1 is built. These 5 days are for learning it cold so you can defend every line to Gerber, then getting a head start on Games 2 and 3.</p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-medium">Game 1 due Apr 15</span>
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-medium">Gerber Zoom by Apr 19</span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">Game 2 due Apr 22</span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 font-medium">Game 3 due Apr 29</span>
          </div>
        </div>

        {/* Urgent banner */}
        <div className="mb-8 p-4 rounded-xl border border-red-500/40 bg-red-500/10">
          <p className="font-bold text-red-400 mb-1">🚨 Do this first — email Gerber NOW</p>
          <p className="text-sm text-muted-foreground">pgerber1@wctc.edu — Zoom slots are first come first serve. Subject: &quot;Step 3 Meeting Request — Brick Breakaway&quot;</p>
        </div>

        {/* Days */}
        <div className="space-y-8">
          {days.map((day) => {
            const dayTasks = day.sections.flatMap((s) => s.tasks);
            const dayDone = dayTasks.filter((t) => checked.has(t.id)).length;
            const dayPct = Math.round((dayDone / dayTasks.length) * 100);

            return (
              <div key={day.day} className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden">
                {/* Day header */}
                <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-accent">Day {day.day}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{day.date}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${day.badgeColor}`}>{day.badge}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{day.theme}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-accent">{dayDone}/{dayTasks.length}</div>
                    <div className="w-24 h-1.5 bg-border rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-accent transition-all" style={{ width: `${dayPct}%` }} />
                    </div>
                  </div>
                </div>

                {/* Sections */}
                <div className="p-6 space-y-6">
                  {day.sections.map((section) => (
                    <div key={section.title}>
                      <div className="flex items-center gap-2 mb-3">
                        <span>{section.emoji}</span>
                        <div>
                          <p className="font-semibold text-sm">{section.title}</p>
                          <p className="text-xs text-muted-foreground">{section.subtitle}</p>
                        </div>
                      </div>
                      <div className="space-y-2 ml-6">
                        {section.tasks.map((task) => (
                          <div key={task.id}>
                            <div
                              className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                checked.has(task.id)
                                  ? "bg-accent/10 border border-accent/30"
                                  : "bg-background/50 border border-border/30 hover:border-border"
                              }`}
                              onClick={() => toggle(task.id)}
                            >
                              <div className={`mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                                checked.has(task.id) ? "bg-accent border-accent" : "border-border"
                              }`}>
                                {checked.has(task.id) && <span className="text-white text-xs">✓</span>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${checked.has(task.id) ? "line-through text-muted-foreground" : ""}`}>
                                  {task.text}
                                </p>
                                {task.code && (
                                  <pre className="mt-2 p-3 bg-black/40 rounded-lg text-xs font-mono text-green-400 overflow-x-auto whitespace-pre-wrap">
                                    {task.code}
                                  </pre>
                                )}
                                {task.qa && (
                                  <div className="mt-2">
                                    <button
                                      className="text-xs text-accent hover:underline"
                                      onClick={(e) => { e.stopPropagation(); setOpenQA(openQA === task.id ? null : task.id); }}
                                    >
                                      {openQA === task.id ? "▼ Hide answer" : "▶ Show Gerber's answer"}
                                    </button>
                                    {openQA === task.id && (
                                      <div className="mt-2 p-3 bg-accent/5 border border-accent/20 rounded-lg">
                                        <p className="text-xs font-semibold text-accent mb-1">Q: {task.qa.q}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{task.qa.a}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 p-6 rounded-2xl border border-border/50 bg-card/50 text-center">
          <p className="text-lg font-bold mb-1">After Game 1 → Module 8 on the main site</p>
          <p className="text-sm text-muted-foreground mb-4">Game Dev with Pygame — lessons 36-42 walk through everything Gerber covers in the videos</p>
          <Link href="/learn" className="inline-block px-6 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/80 transition-colors">
            Go to Lessons →
          </Link>
        </div>
      </main>
    </div>
  );
}
