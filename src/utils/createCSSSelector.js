export const createCSSSelector = (selector, style) => {
  if (!document.styleSheets) return;
  if (document.getElementsByTagName("head").length === 0) return;

  let styleSheet;
  let mediaType;

  if (document.styleSheets.length > 0) {
    for (let i = 0, l = document.styleSheets.length; i < l; i += 1) {
      if (document.styleSheets[i].disabled) return;
      const media = document.styleSheets[i].media;
      mediaType = typeof media;

      if (mediaType === "string") {
        if (media === "" || media.indexOf("screen") !== -1) {
          styleSheet = document.styleSheets[i];
        }
      } else if (mediaType === "object") {
        if (
          media.mediaText === "" ||
          media.mediaText.indexOf("screen") !== -1
        ) {
          styleSheet = document.styleSheets[i];
        }
      }

      if (typeof styleSheet !== "undefined") break;
    }
  }

  if (typeof styleSheet === "undefined") {
    const styleSheetElement = document.createElement("style");
    styleSheetElement.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(styleSheetElement);

    for (let i = 0; i < document.styleSheets.length; i += 1) {
      if (document.styleSheets[i].disabled) {
        return;
      }
      styleSheet = document.styleSheets[i];
    }

    mediaType = typeof styleSheet.media;
  }

  if (mediaType === "string") {
    for (let i = 0, l = styleSheet.rules.length; i < l; i += 1) {
      if (
        styleSheet.rules[i].selectorText &&
        styleSheet.rules[i].selectorText.toLowerCase() ===
          selector.toLowerCase()
      ) {
        styleSheet.rules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.addRule(selector, style);
  } else if (mediaType === "object") {
    const styleSheetLength = styleSheet.cssRules
      ? styleSheet.cssRules.length
      : 0;
    for (let i = 0; i < styleSheetLength; i += 1) {
      if (
        styleSheet.cssRules[i].selectorText &&
        styleSheet.cssRules[i].selectorText.toLowerCase() ===
          selector.toLowerCase()
      ) {
        styleSheet.cssRules[i].style.cssText = style;
        return;
      }
    }
    styleSheet.insertRule(`${selector}{${style}}`, styleSheetLength);
  }
};
