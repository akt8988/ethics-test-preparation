(() => {
  const root = document.documentElement;
  const defaultDelay = { ms: 500, cssValue: "500ms" };

  let isNavigating = false;
  let hasLoadedOnce = false;
  let enterFrameA = 0;
  let enterFrameB = 0;

  function normalizeDelay(value, fallback = defaultDelay) {
    if (typeof value === "number" && Number.isFinite(value)) {
      const ms = Math.max(0, value);
      return { ms, cssValue: `${ms}ms` };
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (/^\d+(\.\d+)?ms$/i.test(trimmed)) {
        const ms = Math.max(0, Number.parseFloat(trimmed));
        return { ms, cssValue: `${ms}ms` };
      }
      if (/^\d+(\.\d+)?s$/i.test(trimmed)) {
        const seconds = Math.max(0, Number.parseFloat(trimmed));
        return { ms: seconds * 1000, cssValue: `${seconds}s` };
      }
      if (/^\d+(\.\d+)?$/.test(trimmed)) {
        const ms = Math.max(0, Number.parseFloat(trimmed));
        return { ms, cssValue: `${ms}ms` };
      }
    }

    return fallback;
  }

  function setRootDuration(delay) {
    root.style.setProperty("--page-transition-duration", delay.cssValue);
  }

  function setDelayDuration(delay) {
    root.style.setProperty("--page-delay-duration", delay.cssValue);
  }

  function cancelQueuedEnter() {
    if (enterFrameA) {
      window.cancelAnimationFrame(enterFrameA);
      enterFrameA = 0;
    }
    if (enterFrameB) {
      window.cancelAnimationFrame(enterFrameB);
      enterFrameB = 0;
    }
  }

  function queueEnteredState() {
    cancelQueuedEnter();
    enterFrameA = window.requestAnimationFrame(() => {
      enterFrameA = 0;
      enterFrameB = window.requestAnimationFrame(() => {
        enterFrameB = 0;
        root.classList.add("is-transitioned");
      });
    });
  }

  function applyEnteredState({ replay = false } = {}) {
    cancelQueuedEnter();
    setRootDuration(defaultDelay);
    setDelayDuration(defaultDelay);
    root.classList.add("isLoaded");
    root.classList.remove("is-delay");

    if (replay) {
      root.classList.remove("is-transitioned");
      void root.offsetWidth;
    }

    queueEnteredState();
  }

  function isModifiedClick(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
  }

  function shouldHandleLink(link) {
    const rawHref = link.getAttribute("href");
    if (!rawHref || rawHref.startsWith("#")) return false;
    if (link.hasAttribute("download")) return false;
    if (link.target && link.target.toLowerCase() !== "_self") return false;

    const url = new URL(link.href, window.location.href);
    if (!/^(https?:|file:)$/i.test(url.protocol)) return false;
    if (url.protocol !== "file:" && url.origin !== window.location.origin) return false;
    if (
      url.pathname === window.location.pathname &&
      url.search === window.location.search
    ) {
      return false;
    }

    return true;
  }

  function resolveLinkBehavior(link) {
    if (link.dataset.pageTransition === "off") {
      return { mode: "immediate" };
    }

    const mode = link.getAttribute("data-page-transition-mode") || "standard";
    if (mode === "immediate") return { mode: "immediate" };

    return {
      mode,
      delay: normalizeDelay(link.getAttribute("data-page-transition-delay")),
      beforeExitDelay: normalizeDelay(link.getAttribute("data-page-transition-before-exit")),
      afterExitDelay: normalizeDelay(link.getAttribute("data-page-transition-after-exit"))
    };
  }

  function wait(delay) {
    return new Promise((resolve) => window.setTimeout(resolve, delay.ms));
  }

  async function runNavigation(link, behavior) {
    if (behavior.mode === "delayed") {
      setDelayDuration(behavior.beforeExitDelay);
      root.classList.add("is-delay");
      await wait(behavior.beforeExitDelay);
      setRootDuration(behavior.afterExitDelay);
    } else {
      root.classList.remove("is-delay");
      setRootDuration(behavior.delay);
    }

    root.classList.remove("is-transitioned");

    if (behavior.mode === "delayed") {
      await wait(behavior.afterExitDelay);
    } else {
      await wait(behavior.delay);
    }

    window.location.assign(link.href);
  }

  function handleLinkClick(event) {
    if (isNavigating || event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
      return;
    }

    if (!(event.target instanceof Element)) return;

    const link = event.target.closest("a[href]");
    if (!link || !shouldHandleLink(link)) return;

    const behavior = resolveLinkBehavior(link);
    if (behavior.mode === "immediate") return;

    event.preventDefault();
    isNavigating = true;
    runNavigation(link, behavior);
  }

  document.addEventListener("click", handleLinkClick);

  window.addEventListener("load", () => {
    hasLoadedOnce = true;
    if (root.classList.contains("is-intro")) {
      root.classList.add("isLoaded", "is-transitioned");
      root.classList.remove("is-delay");
      return;
    }
    applyEnteredState();
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted || !hasLoadedOnce) return;
    isNavigating = false;
    applyEnteredState({ replay: true });
  });
})();
