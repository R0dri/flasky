//######### Obtiene datos del usuario ########
let getUsuario = (obj) => {
    return $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "usuarioInfo",
        data: JSON.stringify(obj),
        dataType: "json",
    });
}
//######### Obtiene las activdades ########
let getActividades = (obj) => {
    return $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "actividad",
        data: JSON.stringify(obj),
        dataType: "json",
    });
}
//######### Obtiene las activdades ########
let getLlam = (obj) => {
    return $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "historial",
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
                // alert(data);
                // alert('comoes');
                // console.log(data);
                // window.location.href = "http://stackoverflow.com";
                
            }
           }).then(function(){window.location.href = "http://agcsap.no-ip.org:4490/";});

    // window.location.href = "http://stackoverflow.com";
    // $(location).attr('href', 'http://stackoverflow.com');

           // }).then(function(data){
    //        }, handleError);
    // function handleError(xhr, status, err){
    //     alert(err.error + ' - ' + xhr + status);
    // };
};

//######### knockoutjs auto mapping ########
function vm() {
    var self = this;

    this.llamadas = ko.observableArray();
    this.actividad = ko.observableArray();

    this.mapHistorial = (datos) => {
        self.llamadas(datos);
    };
    self.grabarAct = function (con, children) {
        let actividad = {
            CntctSbjct:con.usuario,
            action:null,
            begintime:null,
            details:null,
            id:null,
            notes:con.newNotes,
            recontact:null,
            ticket:con.id
        };
        $.ajax({type: "PUT",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "actividad",
                data: ko.toJSON(actividad),
                success: function (data) {
                    // console.log(data);
                }
               }).then(refrescar.bind(this), handleError);

        function refrescar (data) {
            this.actividad.push(actividad);
        };
        function handleError(xhr, status, err){
            alert(err.valueError + ' status:' + status);
        };
    };
}
var vmv = new vm();
ko.applyBindings(vmv);
