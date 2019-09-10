! function(n) {
    "use strict";
    var t = function() {
        this.$body = n("body")
    };
    t.prototype.init = function() {
        Dropzone.autoDiscover = !1, n('[data-plugin="dropzone"]').each(function() {
            var t = n(this).attr("action"),
                i = n(this).data("previewsContainer"),
                e = {
                    url: t,
                    autoProcessQueue: false,
                };
            // var este = n(this).dropzone();
            // var este = mine;
            // let btnArchivo = document.querySelector("#enviarbtn");
            // btnArchivo.addEventListener("click", function(){
            //     console.log(este);
            //     este.processQueue();
            // });


            i && (e.previewsContainer = i);
            var o = n(this).data("uploadPreviewTemplate");
            o && (e.previewTemplate = n(o).html());
            n(this).dropzone(e)
        })
    }, n.FileUpload = new t, n.FileUpload.Constructor = t
}(window.jQuery),
function(t) {
    "use strict";
    window.jQuery.FileUpload.init()
}();
