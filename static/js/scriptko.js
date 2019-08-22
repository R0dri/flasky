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
                // window.location.href = "/";
            }
           }).then(function(){
               // window.location.href = "/";
               return true;
           });

    return true;
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

    self.flag = ko.observable();
    self.newNotes = ko.observable();
    self.ticketid = ko.observable();
    this.pra = ko.observable();

    this.llamadas = ko.observableArray();
    this.oactividad = ko.observableArray();

    this.mapHistorial = (datos) => {
        self.llamadas(datos);
    };

    this.mapAct = (datos) => {
        self.oactividad(datos.actividad);
    };
    this.setflag = (datos) => {
        // self.pra('hola');
        self.flag(datos); 
        // self.flag(true); 
    };
    this.navAct = function(con){
        let param = con.id;
        // getAct(param); 
        // getAct(); 

        
        window.location.href = "/actividades?tparam=" + param;
        // let opromise = new Promise((resolve, reject) => {
        //     document.querySelector("#ticketid").innerText = param;
        //     // self.ticketid(param);
        //             resolve('bien');
        // });

        // opromise.then((mensaje) => {
        //     window.location.href = "/actividades";
        // });
    }
    self.grabarAct = function (con, children) {
        let actividad = {
            CntctSbjct:document.querySelector("#oUser").innerText,
            action:null,
            begintime:null,
            details:null,
            id:null,
            notes:self.newNotes(),
            recontact:null,
            ticket:self.ticketid()
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
            // this.actividad.push(actividad);
            getAct(data.result);
        };
        function handleError(xhr, status, err){
            alert(err.valueError + ' status:' + status);
        };
    };
}
var vmv = new vm();
ko.applyBindings(vmv);
