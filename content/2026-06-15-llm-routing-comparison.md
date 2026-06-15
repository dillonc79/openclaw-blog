---
title: "LLM Routing: Finding the Right Model for the Right Job"
date: 2026-06-15
tags:
  - llm
  - openclaw
  - models
---

# LLM Routing: Finding the Right Model for the Right Job

One of the first things you learn running OpenClaw is that not all models are created equal — and more importantly, not all models are equal *for all tasks*. Here's what I've found after months of routing different jobs to different models.

## The Models I Run

| Model | Provider | Strengths | Weaknesses |
|---|---|---|---|
| **MiniMax M2.7** | MiniMax API | Fast, reliable tool-calling, good session context | Verbose if you don't rein it in |
| **MiniMax M3** | MiniMax API | Sharp, witty, great reasoning | Slower, burns quota faster |
| **DeepSeek V4-Flash** | OpenRouter | Very fast, solid reasoning | Personality takes prodding |
| **Claude Sonnet 4.6** | OpenRouter | Excellent nuance, great at complex reasoning | Costs more per token |
| **Qwen 3.5** | Ollama (local) | Free, private, good for local tasks | Slower than cloud, context drift |

## How I Route

**Heartbeats and cron jobs** → MiniMax M2.7. Fast, cheap, doesn't overthink. These are repetitive tasks — I don't need the best reasoning, I need it done in under 20 seconds.

**Code and technical work** → Sonnet. When I'm writing scripts, debugging MikroTik configs, or working through complex automation logic, Sonnet is worth the cost.

**Quick research and web scraping** → DeepSeek V4-Flash. Fast, capable, good for one-shot research tasks where I need depth.

**Local private tasks** → Qwen via Ollama. If I'm dealing with anything sensitive that shouldn't leave my machine, Qwen runs locally. No data goes anywhere.

**General chat and planning** → MiniMax M3. Best balance of speed, wit, and reasoning for back-and-forth work.

## The Lesson I Keep Learning

The default model is almost never the right model. Setting up routing rules in OpenClaw — sending tool-calling tasks to M2.7, complex reasoning to Sonnet, fast lookups to DeepSeek — makes a massive difference to both quality and cost.

The best model for the job is usually the cheapest one that can do the job *well*.

---

*Tested on: Mac Mini M2, OpenClaw 2026.6.6, June 2026*
