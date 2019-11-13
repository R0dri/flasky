﻿//######### Obtiene datos del usuario ########
var getUsuario = (obj) => {
    return $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: "usuarioInfo",
        data: JSON.stringify(obj),
        dataType: "json",
    });
}

//######### Obtiene las activdades ########
var getActividades = (obj) => {
    return $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "https://agcsap.com/actividad",
        data: JSON.stringify(obj),
        dataType: "json",
    });
}

//######### Obtiene los tickets ########
var getLlam = (obj) => {
    return $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "https://agcsap.com/historial",
        data: JSON.stringify(obj),
        dataType: "json",
    });
}
//######### Obtine lista de atachments ########
var getLista = (param) => {
    return $.ajax({type: "GET",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "https://agcsap.com/archivo/lista?ticket="+param,
        data: null,
        dataType: "json",
    });
};

//######### Graba los datos del formulario ########
var grabarF = (param) => {
    return $.ajax({type: "POST",
                   dataType: "json",
                   contentType: "application/json; charset=utf-8",
                   url: "https://agcsap.com/ticket",
                   data: ko.toJSON(param),
                  });

    // kkk.done((data) => {
    //        return 'ab';
    //    }).fail((data) => {
    //        return 0;
    //    });
    // }).then(function(){
    //     return true;
    // });
    //     return 0;
    //     data: ko.toJSON(actividad),
    //     success: function (data) {
    //         // console.log(data);
    //     }
    // }).then(refrescar.bind(this), handleError);
    // function refrescar (data) {
    //     let opromise = new Promise((resolve, reject) => {
    //         if(getAct(data.result)){
    //             resolve('bien');
    //         }
    //     });
    //     //Hace el upload del archivo de la actividad

};

//######### Graba los datos del formulario ########
var getCargar = (archivo) => {
    var formData = new FormData();
    formData.append('inputFile', archivo.files[0].Name);

    $.ajax({
        type:'POST',
        url:'https://agcsap.com/archivo',
        processData: false,
        contentType: false,
        async: false,
        cache: false,
        data : formData,
        success: function(response){
            console.log(response);

        }
    });
    return true;
};
//######### knockoutjs auto mapping ########
function vm() {
    var self = this;

    self.flag = ko.observable();
    self.newNotes = ko.observable();
    self.ticketid = ko.observable();
    self.disableDetails = ko.observable();
    self.enableDetails = ko.observable();
    self.estadollam = ko.observable();
    this.pra = ko.observable();

    this.llamadas = ko.observableArray();
    this.oactividad = ko.observableArray();
    this.oarchivo = ko.observableArray();

    this.mapHistorial = (datos) => {
        self.llamadas(datos);
    };

    this.mapAct = (datos) => {
        self.oactividad(datos.actividad);
    };
    this.mapArchivo = (datos) => {
        self.oarchivo(datos.archivo);
    };
    this.setEstado = (datos) => {
        self.estadollam(datos);
    };
    this.setflag = (datos) => {
        // self.pra('hola');
        self.flag(datos);
        // self.flag(true);
    };

    // Navega a la activiadd
    this.navAct = function(con){
        let param = con.id;

        // window.location.href = "/actividades?tparam=" + param;
        window.location.href = "https://agcsap.com/actividad?tparam=" + param;
    };

    //######### Descarga atachments ########
    self.getAtach = function (param) {
        window.location.href = "https://agcsap.com/archivo?filename=" + param.filename;
    };

    self.marcar = function (con, element) {
        let estado = con.action ? 'cerrado' : 'abierto';
        let actividad = {
            ticket:con.ticket,
            estado:estado,
            actividad:con.id
        };
        $.ajax({type: "PATCH",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "https://agcsap.com/actividad",
                data: ko.toJSON(actividad),
                success: function (data) {
                    // console.log(data);
                }
               }).then(refrescar.bind(this));

        function refrescar (data) {
            // this.actividad.push(actividad);
            getAct(data.result);
        };
    };

    // self.detailsEnabled = ko.observable(false);

    self.enableDetails = function(con, element) {
        // this.detailsEnabled(true);
        // return con.detailsEnabled = 1;
        // con.estado('visible');
        con.estado = 'visible';
        // alert('comoes');
    };

    self.disableDetails = function(con, element) {
        // this.detailsEnabled(false);
        // con.estado('oculto');
        con.estado = 'oculto';
        // con.detailsEnabled(false);
        // return con.detailsEnabled = 0;
    };

    self.grabarAct = function (con, children) {
        let ourl = document.URL;
        let url = new URL(ourl);
        var vticket = url.searchParams.get("tparam");

        self.flag(false);

        let actividad = {
            CntctSbjct:document.querySelector("#oUser").innerText,
            action:null,
            begintime:null,
            details:null,
            id:null,
            notes:self.newNotes(),
            recontact:null,
            ticket:vticket
        };

        $.ajax({type: "PUT",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "https://agcsap.com/actividad",
                data: ko.toJSON(actividad),
                success: function (data) {
                    // console.log(data);
                }
               }).then(refrescar.bind(this), handleError);

        function refrescar (data) {
            let opromise = new Promise((resolve, reject) => {
                if(getAct(data.result)){
                    resolve('bien');
                }
            });
            //Hace el upload del archivo de la actividad
            opromise.then(oUpload());
        };

        function handleError(xhr, status, err){
            alert(err.valueError + ' status:' + status);
        };

    };


}
var vmv = new vm();
ko.applyBindings(vmv);
