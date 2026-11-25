import { mkdirSync, writeFileSync } from "node:fs";

// One emoji that stands for this AI agent: U+1F501 CLOCKWISE RIGHTWARDS
// AND LEFTWARDS OPEN CIRCLE ARROWS.
//
// An agent is a loop: sense, plan, act, observe, repeat until the goal
// is done. A chatbot answers once; an agent keeps going around the loop
// until the work is finished. The loop arrows say that at a glance, in a
// shape anyone recognises instantly at small size, and they say something
// specific about how the agent works instead of what it looks like.
// No robot, no smiley: the obvious picks are left to the rest of the field.
const EMOJI = "🔁";

// Gate: the bounty requires /output/entry.txt to hold 1-16 characters of
// UTF-8 text, not only whitespace. One glyph, nothing else: no caption,
// no trailing newline, no explanation.
if ([...EMOJI].length !== 1) {
  throw new Error(`entry must be exactly one emoji glyph, got ${[...EMOJI].length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EMOJI, "utf8");

// Verify what actually landed on disk: exactly the one glyph, byte for
// byte, so a stray newline or encoding slip can never ship instead.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EMOJI) {
  throw new Error(`entry.txt mismatch: ${JSON.stringify(written)}`);
}
if (Buffer.byteLength(written, "utf8") > 16) {
  throw new Error(`entry.txt over the 16-character gate`);
}
