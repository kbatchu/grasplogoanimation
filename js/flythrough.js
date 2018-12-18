define(["jquery", "bootstrap","TweenMax","TimelineMax"], function($, bootstrap,TweenMax,TimelineMax) {
  function Flythrough() {
    var publicAPI = {};
    var zoomConfig = {
      elements: "#expo img",
      repeat: 1,
      fade: 0.7,
      duration: 6,
      direction: "in",
      useExpoEase: true
    };

    publicAPI.zoom = function() {
      var elements =
          typeof zoomConfig.elements === "string"
            ? document.querySelectorAll(zoomConfig.elements)
            : zoomConfig.elements || [],
        // tl = new TimelineMax({ repeat: config.repeat || 0 }),
        tl = new TimelineMax(),
        duration = 1,
        fade =
          Math.min(
            0.99,
            typeof zoomConfig.fade === "number" ? zoomConfig.fade : 0.5
          ) * duration,
        startScale = zoomConfig.startScale || 1,
        endScale = zoomConfig.endScale || 2,
        scaleDifference = endScale - startScale,
        extendedScale = endScale + scaleDifference * 2,
        templateEase = zoomConfig.ease || Linear.easeNone,
        useExpoEase = zoomConfig.useExpoEase !== false,
        ease = useExpoEase
          ? ExpoScaleEase.config(startScale, endScale, templateEase)
          : Linear.easeNone,
        extendedEase = useExpoEase
          ? ExpoScaleEase.config(endScale, extendedScale, templateEase)
          : Linear.easeNone,
        partialScale =
          endScale +
          extendedEase.getRatio(fade / duration) * (extendedScale - endScale),
        partialEase = useExpoEase
          ? ExpoScaleEase.config(endScale, partialScale, templateEase)
          : Linear.easeNone,
        i;
      tl.set(elements, { scale: startScale });
      for (i = 0; i < elements.length; i++) {
        if (i) {
          tl.to(elements[i - 1], fade, {
            scale: partialScale,
            ease: partialEase
          }).set(elements[i - 1], { visibility: "hidden" });
        }
        tl.to(elements[i], fade, { autoAlpha: 1 }, "-=" + fade).to(
          elements[i],
          duration,
          { scale: endScale, ease: ease },
          "-=" + fade
        );
      }
      if (zoomConfig.direction === "out") {
        tl = tl
          .pause()
          .tweenFromTo(tl.duration(), 0, { repeat: zoomConfig.repeat });
      }
      if (zoomConfig.duration) {
        tl.duration(zoomConfig.duration);
      }
      return tl.play(0);
    };

    return publicAPI;
  }

  return Flythrough();
});
