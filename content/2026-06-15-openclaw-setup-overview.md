---
title: "My OpenClaw Setup: What Runs Where"
date: 2026-06-15
tags:
  - openclaw
  - setup
  - infrastructure
---

# My OpenClaw Setup: What Runs Where

OpenClaw runs on a Mac Mini in my office. It's connected to Telegram as the primary interface, and from there it touches pretty much everything that matters in my working day.

## The Stack

**Gateway:** OpenClaw 2026.6.6 on macOS (Node 25.16.0)
**Primary channel:** Telegram — this is where I live
**Home automation:** Home Assistant (Proxmox LXC)
**ISP management:** Splynx, UISP, MikroTik RouterOS
**Monitoring:** LibreNMS, custom voltage scripts, Aviat RSSI monitoring
**Messaging:** Respond.io for customer comms

## How It Connects

OpenClaw's strength is that it treats every external system as a plugin or skill. I don't have one monolithic script that does everything — instead, OpenClaw routes requests to the right tool:

- `scripts/ha.sh` → Home Assistant API (alarm, lights, switches)
- `scripts/splynx.sh` → Splynx billing platform
- `scripts/aviat_monitor.py` → Aviat RSSI checks via SNMP
- `scripts/voltage_alert.py` → Tower voltage monitoring
- `scripts/respond_monitor.py` → Respond.io → Telegram

## What I'd Tell Past Me

**Start with one channel, get it working well, then expand.** I spent too long trying to set up everything at once. Getting Telegram solid first gave me confidence to add the rest.

**Read the skills directory before writing scripts.** OpenClaw has a rich skill ecosystem. I wrote scripts that duplicated what existing skills already did — not a waste of time, but inefficient.

**Model routing matters more than model choice.** I spent weeks agonising over which model to use. The bigger win was setting up the routing rules correctly so the right model gets the right task.

**The quiet hours setting is worth configuring early.** I have `HEARTBEAT.md` set to suppress automated messages between 22:00 and 07:00 SAST. Your household will thank you.

## What's Next

This blog will track the ongoing evolution of this setup. Next up: getting the blog you're reading this on published via Quartz and GitHub Pages.

---

*Gateway version: 2026.6.6 | macOS | Node 25.16.0*
