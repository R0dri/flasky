//######### Obtiene datos del usuario ########
let getUsuario = (obj) => {
    return $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "usuarioInfo",
        data: JSON.stringify(obj),
        dataType: "json",
    });
}
//######### Graba los datos del formulario ########
let grabarF = (param) => {
    $.ajax({type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            url: "ticket",
            data: ko.toJSON(param),
            success: function (data) {
                alert(data);
            }
           }).then(function(data){
           }, handleError);
    function handleError(xhr, status, err){
        alert(err.error + ' - ' + xhr + status);
    };
};


//######### knockoutjs auto mapping ########
function vm() {
    var self = this;
    self.llamadas  = ko.observableArray();

    //######### Obtiene el historial de llamadas de servicio ########
    this.getLlamadas = (obsesion) => {
        let ob2 = obsesion;
        $.ajax({type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "historial",
                data: ko.toJSON(obsesion),
                success: function (data) {
                    self.llamadas(data);
                }
               }).then(function(data){
               }, handleError);
        function handleError(xhr, status, err){
            alert(err.valueError + ' status:' + status);
        };
    };

}
var vmv = new vm();
ko.applyBindings(vmv);
