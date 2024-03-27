const vscrollable = {
  updated: (el: any, binding: any) => {
    if (binding.value) {
      const currentElem = el as HTMLElement;

      currentElem.addEventListener("animationend", () => {
        const trackElem = currentElem.querySelector(
          ".scrollbar-track",
        ) as HTMLElement;

        const thumbElem = currentElem.querySelector(
          ".scrollbar-thumb",
        ) as HTMLElement;

        const scrollbarElem = currentElem.querySelector(
          ".scrollbar",
        ) as HTMLElement;

        const bodyElem = currentElem.querySelector(
          ".scrollbar-body",
        ) as HTMLElement;
        if (trackElem && thumbElem && scrollbarElem && bodyElem) {
          let scrollRatio = bodyElem.clientHeight / bodyElem.scrollHeight;
          thumbElem.style.height = `${scrollRatio * 100}%`;
          let pos = { top: bodyElem.scrollTop, y: 0 };
          const checkContentHeight = () => {
            if (
              bodyElem &&
              bodyElem.childElementCount &&
              bodyElem.childElementCount <= 5
            ) {
              currentElem.style.height = "fit-content";
              scrollbarElem?.classList.add("hidden");
              scrollRatio = bodyElem.clientHeight / bodyElem.scrollHeight;
              (thumbElem as HTMLElement).style.height = `${scrollRatio * 100}%`;
            } else {
              currentElem.style.height = "190px";
              scrollbarElem?.classList.remove("hidden");
              scrollRatio = bodyElem.clientHeight / bodyElem.scrollHeight;
              (thumbElem as HTMLElement).style.height = `${scrollRatio * 100}%`;
            }
          };

          checkContentHeight();

          const observer = new MutationObserver(checkContentHeight);
          const config = { childList: true };
          observer.observe(bodyElem, config);

          const mouseMoveHandler = (e: any) => {
            const dy = e.clientY - pos.y;
            bodyElem.scrollTop = pos.top + dy / scrollRatio;
          };

          const mouseUpHandler = () => {
            thumbElem.classList.remove("scrollbar-grabbing");
            document.body.classList.remove("scrollbar-grabbing");

            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
          };

          const mouseDownThumbHandler = (e: any) => {
            pos = {
              top: bodyElem.scrollTop,
              y: e.clientY,
            };

            thumbElem.classList.add("scrollbar-grabbing");
            document.body.classList.add("scrollbar-grabbing");

            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
          };

          const scrollContentHandler = () => {
            window.requestAnimationFrame(() => {
              thumbElem.style.top = `${(bodyElem.scrollTop * 100) / bodyElem.scrollHeight}%`;
            });
          };

          const trackClickHandler = (e: any) => {
            const bound = trackElem.getBoundingClientRect();
            const percentage = (e.clientY - bound.top) / bound.height;
            pos.top =
              percentage * (bodyElem.scrollHeight - bodyElem.clientHeight);
            bodyElem.scrollTop = pos.top;
          };
          const mouseWheelHandler = (e: any) => {
            pos.top = Math.sign(e.deltaY) === 1 ? pos.top + 20 : pos.top - 20;
            bodyElem.scrollTop = pos.top;
          };

          bodyElem.addEventListener("scroll", scrollContentHandler);
          bodyElem.addEventListener("wheel", mouseWheelHandler, {
            passive: true,
          });
          bodyElem.addEventListener("touchstart", (e) => {
            console.log("drag");
          });
          thumbElem.addEventListener("mousedown", mouseDownThumbHandler);
          trackElem.addEventListener("click", trackClickHandler);
        }
      });
    }
  },
  mounted: (el: any) => {
    const currentElem = el as HTMLElement;
    if (currentElem.firstElementChild) {
      if (!currentElem.firstElementChild.classList.contains("scrollbar-body"))
        currentElem.firstElementChild.classList.add("scrollbar-body");
      const trackElem = document.createElement("div");
      trackElem.classList.add("scrollbar-track");

      const thumbElem = document.createElement("div");
      thumbElem.classList.add("scrollbar-thumb");

      const scrollbarElem = document.createElement("div");
      scrollbarElem.classList.add("scrollbar");
      scrollbarElem.append(trackElem, thumbElem);
      currentElem.append(scrollbarElem);
    }
  },
};

export default vscrollable;
