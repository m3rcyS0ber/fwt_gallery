const vScrollable = {
  updated: (el: any, binding: any) => {
    if (binding.value) {
      const currentElem = el as HTMLElement;

      currentElem.addEventListener("animationend", () => {
        const trackElem = document.querySelector(".scrollbar-track");

        const thumbElem = document.querySelector(".scrollbar-thumb");

        const scrollbarElem = document.querySelector(".scrollbar");

        const content = currentElem.querySelector(".scrollbar-body");

        if (content.childElementCount <= 5) {
          currentElem.style.height = `${36 * content.childElementCount}px`;
          scrollbarElem.classList.add("hidden");
        } else {
          currentElem.style.height = "190px";
          scrollbarElem.classList.remove("hidden");
        }

        const scrollRatio = content.clientHeight / content.scrollHeight;

        let pos = { top: 0, y: 0 };

        thumbElem.style.height = `${scrollRatio * 100}%`;

        const config = { childList: true };

        const callback = () => {
          if (content.childElementCount <= 5) {
            currentElem.style.height = "fit-content";
            scrollbarElem.classList.add("hidden");
          } else {
            currentElem.style.height = "190px";
            scrollbarElem.classList.remove("hidden");
          }
        };

        const observer = new MutationObserver(callback);
        observer.observe(content, config);

        const mouseMoveHandler = (e) => {
          const dy = e.clientY - pos.y;
          content.scrollTop = pos.top + dy / scrollRatio;
        };

        const mouseUpHandler = () => {
          thumbElem.classList.remove("scrollbar-grabbing");
          document.body.classList.remove("scrollbar-grabbing");

          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);
        };

        const mouseDownThumbHandler = (e: any) => {
          pos = {
            top: content.scrollTop,
            y: e.clientY,
          };

          thumbElem.classList.add("scrollbar-grabbing");
          document.body.classList.add("scrollbar-grabbing");

          document.addEventListener("mousemove", mouseMoveHandler);
          document.addEventListener("mouseup", mouseUpHandler);
        };

        const scrollContentHandler = () => {
          window.requestAnimationFrame(() => {
            thumbElem.style.top = `${(content.scrollTop * 100) / content.scrollHeight}%`;
          });
        };

        const trackClickHandler = (e: any) => {
          const bound = trackElem.getBoundingClientRect();
          const percentage = (e.clientY - bound.top) / bound.height;
          content.scrollTop =
            percentage * (content.scrollHeight - content.clientHeight);
        };
        const mouseWheelHandler = (e: any) => {
          const delta = e.deltaY;
          content.scrollTop += delta / 3;
        };

        content.addEventListener("scroll", scrollContentHandler);
        content.addEventListener("wheel", mouseWheelHandler, { passive: true });
        thumbElem.addEventListener("mousedown", mouseDownThumbHandler);
        trackElem.addEventListener("click", trackClickHandler);
      });
    }
  },
  mounted: (el: any) => {
    const currentElem = el as HTMLElement;

    const trackElem = document.createElement("div");
    trackElem.classList.add("scrollbar-track");

    const thumbElem = document.createElement("div");
    thumbElem.classList.add("scrollbar-thumb");

    const scrollbarElem = document.createElement("div");
    scrollbarElem.classList.add("scrollbar");
    scrollbarElem.append(trackElem, thumbElem);
    currentElem.append(scrollbarElem);
  },
};

export default vScrollable;
