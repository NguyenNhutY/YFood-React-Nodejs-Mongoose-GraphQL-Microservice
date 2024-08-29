// src/components/ReactPullToRefresh.tsx
import { useEffect, useRef } from "react";

// src/pull-to-refresh/wptr.1.1.ts
import Hammer from "hammerjs";
function webPullToRefresh() {
  const defaults = {
    contentEl: "content",
    ptrEl: "ptr",
    bodyEl: document.body,
    distanceToRefresh: 70,
    loadingFunction: false,
    resistance: 2.5
  };
  let options = {};
  const pan = {
    enabled: false,
    distance: 0,
    startingPositionY: 0
  };
  let bodyClass = defaults.bodyEl.classList;
  const init = (params) => {
    var _a;
    options = {
      contentEl: params.contentEl ?? document.getElementById(defaults.contentEl),
      ptrEl: params.ptrEl || document.getElementById(defaults.ptrEl),
      bodyEl: params.bodyEl || defaults.bodyEl,
      distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
      loadingFunction: params.loadingFunction || defaults.loadingFunction,
      resistance: params.resistance || defaults.resistance,
      hammerOptions: params.hammerOptions ?? {}
    };
    if (!options.contentEl || !options.ptrEl) {
      return false;
    }
    bodyClass = (_a = options.bodyEl) == null ? void 0 : _a.classList;
    const h = new Hammer(options.contentEl, options.hammerOptions);
    h.get("pan").set({ direction: Hammer.DIRECTION_VERTICAL });
    h.on("panstart", _panStart);
    h.on("pandown", _panDown);
    h.on("panup", _panUp);
    h.on("panend", _panEnd);
  };
  const _panStart = () => {
    pan.startingPositionY = options.bodyEl.scrollTop;
    if (pan.startingPositionY === 0) {
      pan.enabled = true;
    }
  };
  const _panDown = (e) => {
    if (!pan.enabled) {
      return;
    }
    e.preventDefault();
    pan.distance = e.distance / options.resistance;
    _setContentPan();
    _setBodyClass();
  };
  const _panUp = (e) => {
    if (!pan.enabled || pan.distance === 0) {
      return;
    }
    e.preventDefault();
    if (pan.distance < e.distance / options.resistance) {
      pan.distance = 0;
    } else {
      pan.distance = e.distance / options.resistance;
    }
    _setContentPan();
    _setBodyClass();
  };
  const _setContentPan = () => {
    if (options.contentEl) {
      options.contentEl.style.transform = `translate3d( 0, ${pan.distance}px, 0 )`;
    }
    options.ptrEl.style.transform = `translate3d( 0, ${pan.distance - options.ptrEl.offsetHeight}px, 0 )`;
  };
  const _setBodyClass = () => {
    if (pan.distance > options.distanceToRefresh) {
      bodyClass.add("ptr-refresh");
    } else {
      bodyClass.remove("ptr-refresh");
    }
  };
  const _panEnd = (e) => {
    if (!pan.enabled) {
      return;
    }
    e.preventDefault();
    if (options.contentEl) {
      options.contentEl.style.transform = "";
    }
    options.ptrEl.style.transform = "";
    if (options.bodyEl.classList.contains("ptr-refresh")) {
      _doLoading();
    } else {
      _doReset();
    }
    pan.distance = 0;
    pan.enabled = false;
  };
  const _doLoading = () => {
    bodyClass.add("ptr-loading");
    if (!options.loadingFunction) {
      return _doReset();
    }
    const loadingPromise = options.loadingFunction();
    setTimeout(() => {
      loadingPromise.then(_doReset);
    }, 1e3);
  };
  const _doReset = () => {
    bodyClass.remove("ptr-loading");
    bodyClass.remove("ptr-refresh");
    bodyClass.add("ptr-reset");
    const bodyClassRemove = () => {
      bodyClass.remove("ptr-reset");
      options.bodyEl.removeEventListener("transitionend", bodyClassRemove, false);
    };
    options.bodyEl.addEventListener("transitionend", bodyClassRemove, false);
  };
  return {
    init
  };
}

// src/components/ReactPullToRefresh.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function ReactPullToRefresh(props) {
  const { onRefresh, disabled, distanceToRefresh, resistance, hammerOptions, children, icon, loading, ...rest } = props;
  async function handleRefresh() {
    await onRefresh();
  }
  const hasBeenInit = useRef(null);
  const refreshRef = useRef(null);
  const ptrRef = useRef(null);
  const bodyRef = useRef(null);
  useEffect(() => {
    if (!disabled) {
      if (hasBeenInit.current)
        return;
      webPullToRefresh().init({
        contentEl: refreshRef.current,
        ptrEl: ptrRef.current,
        bodyEl: document.body,
        distanceToRefresh,
        loadingFunction: handleRefresh,
        resistance,
        hammerOptions
      });
      hasBeenInit.current = true;
    }
  }, [disabled]);
  if (disabled) {
    return /* @__PURE__ */ jsx("div", {
      ...rest,
      children
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    ref: bodyRef,
    ...rest,
    children: [
      /* @__PURE__ */ jsxs("div", {
        className: "ptr-element",
        ref: ptrRef,
        children: [
          icon ?? /* @__PURE__ */ jsx("span", {
            className: "genericon genericon-next"
          }),
          loading ?? /* @__PURE__ */ jsxs("div", {
            className: "loading",
            children: [
              /* @__PURE__ */ jsx("span", {
                className: "loading-ptr-1"
              }),
              /* @__PURE__ */ jsx("span", {
                className: "loading-ptr-2"
              }),
              /* @__PURE__ */ jsx("span", {
                className: "loading-ptr-3"
              })
            ]
          })
        ]
      }),
      /* @__PURE__ */ jsx("div", {
        className: "refresh-view",
        ref: refreshRef,
        children
      })
    ]
  });
}
var ReactPullToRefresh_default = ReactPullToRefresh;

// src/index.ts
var src_default = ReactPullToRefresh_default;
export {
  src_default as default
};
