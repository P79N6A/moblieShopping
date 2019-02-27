(function (doc, win) {
    console.dir(doc,win)
    var htmlFont = function () {
        var docEl = doc.documentElement,
            l = docEl.clientWidth,
            f;
        f = l / 7.5;
        l > 750 ? docEl.style.fontSize = 100 + "px" : docEl.style.fontSize = f + "px"
    };
    htmlFont();
    win.addEventListener("resize", htmlFont, false)
})(document, window);