---
date: '2026-02-18'
title: Building a Complete Bejeweled Clone with AI in 90 Minutes
description: How I used Claude Opus 4.6 via Kiro CLI to build GemMatch, a fully-featured match-3 puzzle game in Godot 4.x, with zero lines of hand-written code.
---
## Building a Complete Bejeweled Clone with AI in 90 Minutes

I've been following the AI-assisted coding space pretty closely, and I wanted to see just how far I could push it for game development. Could an AI build a complete, polished game from scratch in a single sitting?

Turns out, yes. I built [GemMatch](https://github.com/dylanmtaylor/gemmatch), a complete Bejeweled-style match-3 puzzle game, in about 90 minutes using Claude Opus 4.6 through [Kiro CLI](https://kiro.dev). Every single line of code was written by the AI. I didn't write or edit a single line of code by hand.

<video src="/images/gemmatch-title.webm" autoplay loop muted playsinline></video>

### Why Godot?

I went with Godot 4.x and GDScript for this experiment. Godot's `_draw()` API makes it trivial to render shapes procedurally, and GDScript is simple enough that the AI can generate correct code without fighting a complex type system or engine architecture. This turned out to be a good call -- the entire game is about 950 lines of GDScript across four scripts, and it worked on the first or second try for most features.

### The Process

I started by asking Claude to create structured specs before writing any code. This is something I've found works really well with AI coding -- if you let it plan first, the implementation goes much smoother. Claude generated three documents in `.kiro/specs/`: requirements (user stories with acceptance criteria), an architecture design, and an implementation task list.

From there, the build happened in four iterations:

**V1 -- Basic game.** A minimal working match-3 with click input, match detection, gravity, and scoring. Functional on the first run after fixing a couple of type inference errors.

**V2 -- Animations and sound.** Tween animations for swaps, removal, and gravity. Screen shake, score popups, and procedural sound effects -- all synthesized at runtime, no audio files.

**V3 -- Full feature set.** Special gems (Flame, Star, Hypercube), drag-to-swap, a hint system, level progression, combo text, particle effects, and unique gem shapes.

**V4 -- Polish.** Animated logo, procedural chiptune background music, and a title screen with floating gem shapes.

<video src="/images/gemmatch-gameplay.webm" autoplay loop muted playsinline></video>

*Gameplay shown here at 2x speed.*

Each iteration was tested by launching Godot directly from the terminal via Flatpak:

```bash
flatpak run org.godotengine.Godot --path /var/home/dylan/Projects/gemmatch
```

Claude even handled installing Godot via Flatpak when it wasn't already on my system.

### What Impressed Me

The thing that stood out most was how well Claude handled the iterative refinement. Most features worked correctly on the first attempt. When there were errors, they were almost always minor type annotation issues specific to Godot 4.6 -- not logic bugs. Claude would see the error output, understand the issue immediately, and fix it.

The procedural audio generation was particularly impressive. I just asked for "sounds" and Claude generated a complete synthesis system that creates AudioStreamWAV buffers with configurable frequency sweeps, envelopes, and noise mixing. The background music generator creates an 8-bar chiptune loop at 95 BPM with melody, bass, and pad voices. All of this runs at startup and produces surprisingly pleasant audio.

The special gem system also worked correctly on the first implementation, which I honestly didn't expect. The logic for detecting match patterns (is this a match-4? match-5? L-shape? T-shape?), creating the appropriate special gem, and then triggering special gem effects when they're subsequently matched -- that's genuinely complex game logic, and it was right the first time.

### The Numbers

- **Total time:** ~90 minutes, single session
- **Lines of code:** ~950 lines of GDScript across 4 scripts
- **External assets:** 0 (everything is procedural)
- **Token usage:** ~80,000 input tokens, ~30,000 output tokens, ~110,000 total
- **Hand-written code:** 0 lines

For a 90-minute session, I'm pretty impressed with the result. A fully playable, polished game with special gems, animations, sound, music, and level progression. Choosing a simpler engine and taking a spec-first approach made a big difference.

### What Could Be Better

It's not perfect. The game doesn't have a pause menu. There's no high score persistence. The "no moves" detection just offers a restart rather than shuffling the board. The procedural music, while pleasant, is a single looping track. These are all things that could be added in another session, but for 90 minutes of work, I'm pretty happy with where it landed.

### Try It Yourself

The full source is on GitHub: [github.com/dylanmtaylor/gemmatch](https://github.com/dylanmtaylor/gemmatch)

You'll need Godot 4.2+ to run it. If you're on a Linux distro with Flatpak:

```bash
flatpak install flathub org.godotengine.Godot
```

Every line was AI-generated, and I think that's worth being transparent about. We're at a point where AI can build a complete, polished game from scratch in the time it takes to watch a movie. That's wild to me.
