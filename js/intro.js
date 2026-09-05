(() => {
  const BLINK_ON = Math.round(480 * 1.3);
  const BLINK_OFF = Math.round(480 * 1.3);
  const BLINKS_BEFORE = 4;
  const BLINKS_AFTER = 3;
  const AFTER_QUESTION_MS = 2000;
  const AFTER_CLOUD_PAUSE = 1220;
  const CLOUD_MS = 2400;
  const HOLD_AFTER_BANG = 3000;
  const HOME_DISSOLVE_MS = 2000;

  const root = document.documentElement;
  const intro = document.getElementById("intro");
  const skip = document.getElementById("intro-skip");
  const glyph = document.getElementById("intro-glyph");
  const caret = document.getElementById("intro-caret");
  const canvas = document.getElementById("intro-clouds");

  if (!intro || !glyph || !caret || !canvas) return;
  if (!root.classList.contains("is-intro")) return;

  const ctx = canvas.getContext("2d");
  let cloudFrame = 0;
  let skipped = false;
  const timers = new Set();

  const wait = (ms) =>
    new Promise((resolve) => {
      const timer = setTimeout(() => {
        timers.delete(timer);
        resolve();
      }, ms);
      timers.add(timer);
    });

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sizeCanvas = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = intro.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const setCaret = (on) => {
    caret.classList.toggle("is-on", on);
  };

  const hideCaret = () => {
    setCaret(false);
    caret.classList.add("is-gone");
  };

  const blinkTimes = async (times) => {
    for (let i = 0; i < times; i += 1) {
      if (skipped) return;
      setCaret(true);
      await wait(BLINK_ON);
      if (skipped) return;
      setCaret(false);
      await wait(BLINK_OFF);
    }
    setCaret(false);
  };

  const typeGlyph = (char) => {
    glyph.classList.remove("is-hidden", "is-typed", "is-question", "is-bang");
    glyph.classList.add(char === "?" ? "is-question" : "is-bang");
    glyph.textContent = char;
    void glyph.offsetWidth;
    glyph.classList.add("is-typed");
  };

  const sampleGlyph = (char) => {
    const size = parseFloat(getComputedStyle(glyph).fontSize);
    const family = getComputedStyle(glyph).fontFamily;
    const w = Math.ceil(size * 1.15);
    const h = Math.ceil(size * 1.35);
    const scale = 2;
    const off = document.createElement("canvas");
    off.width = w * scale;
    off.height = h * scale;
    const octx = off.getContext("2d");
    octx.scale(scale, scale);
    octx.fillStyle = "#000";
    octx.font = `400 ${size}px ${family}`;
    octx.textAlign = "center";
    octx.textBaseline = "middle";
    octx.fillText(char, w / 2, h / 2 + size * 0.02);

    const { data } = octx.getImageData(0, 0, off.width, off.height);
    const points = [];
    const step = 5;
    for (let y = 0; y < off.height; y += step) {
      for (let x = 0; x < off.width; x += step) {
        if (data[(y * off.width + x) * 4 + 3] > 70) {
          points.push({
            x: x / scale - w / 2,
            y: y / scale - h / 2,
          });
        }
      }
    }
    return points;
  };

  const dissolveCloud = (char) =>
    new Promise((resolve) => {
      cancelAnimationFrame(cloudFrame);
      sizeCanvas();

      const origin = glyph.getBoundingClientRect();
      const stageBox = intro.getBoundingClientRect();
      const ox = origin.left - stageBox.left + origin.width / 2;
      const oy = origin.top - stageBox.top + origin.height / 2;
      const samples = sampleGlyph(char);

      const particles = samples.map((p, i) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.35 + Math.random() * 0.85;
        return {
          x: p.x + (Math.random() - 0.5) * 28,
          y: p.y + (Math.random() - 0.5) * 28,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.12,
          r: 1.1 + Math.random() * 1.6,
          a: 0.72 + Math.random() * 0.28,
          life: 0.15 + Math.random() * 0.55,
          seed: i * 1.7 + Math.random() * 6,
        };
      });

      glyph.classList.add("is-hidden");

      const start = performance.now();
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        const { width, height } = intro.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        resolve();
      };
      const watchdog = setTimeout(finish, CLOUD_MS + 80);

      const tick = (now) => {
        if (skipped || !intro.isConnected) {
          clearTimeout(watchdog);
          finish();
          return;
        }
        const t = Math.min(1, (now - start) / CLOUD_MS);
        const ease = 1 - (1 - t) ** 2;
        const { width, height } = intro.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
          const local = Math.min(1, Math.max(0, (t - p.life * 0.15) / (1 - p.life * 0.15)));
          const drift = Math.sin(p.seed + t * 3.4);
          const x = ox + p.x + (p.vx * 110 + drift * 8) * ease;
          const y = oy + p.y + (p.vy * 110 - t * 14) * ease;
          const a = p.a * (1 - local);
          if (a <= 0.02) continue;
          ctx.fillStyle = `rgba(0, 0, 0, ${a})`;
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        if (t < 1) {
          cloudFrame = requestAnimationFrame(tick);
        } else {
          clearTimeout(watchdog);
          finish();
        }
      };

      cloudFrame = requestAnimationFrame(tick);
    });

  const finishIntro = () => {
    cancelAnimationFrame(cloudFrame);
    for (const timer of timers) clearTimeout(timer);
    timers.clear();
    root.classList.add("isLoaded", "is-transitioned");
    root.classList.remove("is-intro", "is-intro-leaving", "is-delay");
    if (intro.isConnected) intro.remove();
  };

  const skipToHome = () => {
    if (skipped) return;
    skipped = true;
    finishIntro();
  };

  const goHome = async () => {
    if (skipped) return;
    root.classList.add("is-intro-leaving");
    await wait(HOME_DISSOLVE_MS);
    if (skipped) return;
    finishIntro();
  };

  const play = async () => {
    sizeCanvas();

    try {
      await document.fonts.load('400 10rem "機械彫刻用標準書体"');
      await document.fonts.load('400 10rem "鉄瓶ゴシック"');
      await document.fonts.ready;
    } catch {
      // Fall back to system fonts if a face does not load.
    }

    if (reduced()) {
      await goHome();
      return;
    }

    await blinkTimes(BLINKS_BEFORE);
    if (skipped) return;
    typeGlyph("?");
    await wait(AFTER_QUESTION_MS);
    if (skipped) return;
    await blinkTimes(BLINKS_AFTER);
    if (skipped) return;
    hideCaret();
    await dissolveCloud("?");
    if (skipped) return;
    await wait(AFTER_CLOUD_PAUSE);
    if (skipped) return;
    typeGlyph("!");
    await wait(HOLD_AFTER_BANG);
    if (skipped) return;
    await goHome();
  };

  if (skip) {
    skip.addEventListener("click", skipToHome);
  }

  window.addEventListener("resize", () => {
    if (root.classList.contains("is-intro")) sizeCanvas();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", play);
  } else {
    play();
  }
})();
