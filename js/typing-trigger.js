(() => {
  const init = () => {
    const nav = document.getElementById("js-next-navigation");
    const nextTextEl = document.getElementById("js-next-navigation__text");
    const nextNameEl = document.getElementById("js-next-navigation__name");
    const link = document.getElementById("js-next-navigation__link");

    if (!nav || !nextTextEl || !nextNameEl || !link) return;

    const nextText = nextTextEl.textContent;
    const nextNameText = nextNameEl.textContent;
    const speed = 45;
    const endDelay = 300;

    const timers = new WeakMap();
    let isClicked = false;
    let endTimer = null;

    nextTextEl.textContent = "";
    nextNameEl.textContent = "";
    nav.classList.remove("is-next-navigation-end");

    const clearTimer = (el) => {
      const timer = timers.get(el);
      if (timer) {
        clearInterval(timer);
        timers.delete(el);
      }
    };

    const clearEndTimer = () => {
      if (endTimer) {
        clearTimeout(endTimer);
        endTimer = null;
      }
    };

    const typeText = (el, text) => {
      clearTimer(el);
      let index = el.textContent.length;
      if (!text.startsWith(el.textContent)) {
        el.textContent = "";
        index = 0;
      }

      const timer = setInterval(() => {
        index += 1;
        el.textContent = text.slice(0, index);
        if (index >= text.length) clearTimer(el);
      }, speed);

      timers.set(el, timer);
    };

    const typeTextFromStart = (el, text, onComplete) => {
      clearTimer(el);
      el.textContent = "";
      let index = 0;

      const timer = setInterval(() => {
        index += 1;
        el.textContent = text.slice(0, index);
        if (index >= text.length) {
          clearTimer(el);
          if (typeof onComplete === "function") onComplete();
        }
      }, speed);

      timers.set(el, timer);
    };

    const deleteText = (el) => {
      clearTimer(el);
      let index = el.textContent.length;

      const timer = setInterval(() => {
        index -= 1;
        el.textContent = el.textContent.slice(0, index);
        if (index <= 0) {
          el.textContent = "";
          clearTimer(el);
        }
      }, speed);

      timers.set(el, timer);
    };

    const showNext = () => {
      if (isClicked) return;
      clearEndTimer();
      nav.classList.remove("is-next-navigation-end");
      nextNameEl.textContent = "";
      typeText(nextTextEl, nextText);
    };

    const hideNext = () => {
      if (isClicked) return;
      deleteText(nextTextEl);
    };

    const switchToNextName = () => {
      if (isClicked) return;
      isClicked = true;
      clearEndTimer();
      nav.classList.remove("is-next-navigation-end");
      deleteText(nextTextEl);

      typeTextFromStart(nextNameEl, nextNameText, () => {
        endTimer = setTimeout(() => {
          nav.classList.add("is-next-navigation-end");
        }, endDelay);
      });
    };

    link.addEventListener("mouseenter", showNext);
    link.addEventListener("mouseleave", hideNext);
    link.addEventListener("click", switchToNextName);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
