const onClickedOutside = (el: any, binding?: any) => {
  return (e: any) => {
    if (!el.contains(e.target) && binding.isActive && binding.callback) {
      console.log(e.target);
      binding.callback();
    }
  };
};

const vClickOutside = {
  updated: (el: any, binding: any) => {
    if (binding?.value?.isActive) {
      document.addEventListener(
        "mousedown",
        onClickedOutside(el, binding.value || null),
        { once: true },
      );
    } else document.removeEventListener("mousedown", onClickedOutside);
  },
  mounted: (el: any, binding: any) => {
    document.addEventListener(
      "mousedown",
      onClickedOutside(el, binding.value || null),
      { once: true },
    );
  },
  beforeUnmount: (el: any, binding: any) => {
    document.removeEventListener("mousedown", onClickedOutside);
  },
};
export default vClickOutside;
