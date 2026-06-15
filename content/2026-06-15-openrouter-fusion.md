---
title: "OpenRouter Fusion: Run Multiple LLMs and Get One Better Answer"
date: 2026-06-15
tags:
  - llm
  - openrouter
  - models
  - fusion
---

# OpenRouter Fusion: Run Multiple LLMs and Get One Better Answer

[OpenRouter Fusion](https://openrouter.ai/labs/fusion) is one of the more interesting experiments to come out of the AI infrastructure space recently. The core idea: instead of picking one model, you dispatch your prompt to a panel of models simultaneously, a judge analyses their responses, and a synthesis model produces a single combined answer.

The results are genuinely impressive. OpenRouter's own testing showed every Deep Research agent preferred the fused result to its own output. I've been running it for a few days and I can see why.

## How It Works

Fusion runs a three-stage pipeline:

1. **Your prompt** goes to a panel of models in parallel — each gets `openrouter:web_search` and `openrouter:web_fetch` enabled so they can pull in real-time information
2. **A judge model** (defaults to Claude Opus in the Quality preset) analyses all the panel responses and produces a structured comparison
3. **A synthesis model** takes that analysis and writes your final answer — drawing on the best reasoning from each panellist

The panel models, judge, and synthesis model are all configurable. You can also pick presets:

| Preset | Panel | Judge | Best For |
|---|---|---|---|
| **Quality** | Claude Opus, GPT-4o, Gemini Pro, DeepSeek R1 | Claude Opus | Complex research, nuanced analysis |
| **Balanced** | Sonnet 4.5, GPT-4o-mini, Gemini Flash | Sonnet | General purpose, speed + quality |
| **Fast** | Haiku, GPT-4o-mini, Gemini Flash | Haiku | Quick lookups, metadata tasks |

## Using Fusion in OpenClaw

Since Fusion is available as `openrouter/fusion` in OpenRouter's model routing, you can point OpenClaw at it directly:

```yaml
model_routing:
  rules:
    - model: openrouter/fusion
      trigger: complex-research
```

Or in a session:

```
/model openrouter/fusion
```

Note that Fusion requires the `openrouter:fusion` server tool, which is enabled by default when you use the `openrouter/fusion` alias. If you're attaching the plugin to your own model instead, you'll need to explicitly enable the tool.

## What It's Good For

- **Multi-source research** — rather than manually running the same query across Sonnet, GPT, and Gemini and synthesising yourself, Fusion does it in one shot
- **Reducing model bias** — single models have predictable blind spots; the panel approach surfaces them
- **Complex technical decisions** — when you need thorough analysis without settling for the first model's answer

## Where It Falls Short

- **Cost** — you're burning multiple inference calls per query, so it's not cheap
- **Speed** — parallel execution helps, but the judge + synthesis stages add latency; expect 30-60s for a Quality preset run
- **Simple tasks** — don't use Fusion to ask "what's my IP address"; it's overkill

## The Bottom Line

Fusion is a genuinely new primitive. The "run one prompt through multiple models and get the best answer" workflow existed before, but you had to build it yourself. OpenRouter has packaged it cleanly and exposed it as a single model alias. Worth keeping in your back pocket for tasks where you need more confidence in the answer.

---

*Links: [OpenRouter Fusion](https://openrouter.ai/labs/fusion) · [Fusion Documentation](https://openrouter.ai/docs/guides/features/plugins/fusion)*
