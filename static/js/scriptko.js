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

//######### Obtiene los tickets ########
let getLlam = (obj) => {
    return $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "historial",
        data: JSON.stringify(obj),
        dataType: "json",
    });
}
//######### Descarga atachments ########
let getLista = (param) => {
    return $.ajax({type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "archivo/lista",
        data: ko.toJSON(param),
        dataType: "json",
    });
};
//######### Descarga atachments ########
let getAtach = (obj) => {
    return $.ajax({type: "POST",
                   dataType: "json",
                   contentType: "application/json; charset=utf-8",
                   url: "archivo",
                   data: JSON.stringify(obj),
                   dataType: "json",
                  });
};

//######### Graba los datos del formulario ########
let grabarF = (param) => {
    $.ajax({type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            url: "ticket",
            data: ko.toJSON(param),
            success: function (data) {

            }
           }).then(function(){
               return true;
           });

    return true;
};

//######### Graba los datos del formulario ########
let getCargar = (archivo) => {
    var formData = new FormData();
    formData.append('inputFile', archivo.files[0].Name);

    $.ajax({
        type:'POST',
        url:'archivo',
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
    this.mapAtach = (datos) => {
        self.oarchivo(datos.archivo);
    };
    this.setEstado = (datos) => {
        self.estadollam(datos); 
    }
    this.setflag = (datos) => {
        // self.pra('hola');
        self.flag(datos); 
        // self.flag(true); 
    };

    // Navega a la activiadd
    this.navAct = function(con){
        let param = con.id;

        // window.location.href = "/actividades?tparam=" + param;
        window.location.href = "/actividad?tparam=" + param;
    }

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
                url: "actividad",
                data: ko.toJSON(actividad),
                success: function (data) {
                    // console.log(data);
                }
               }).then(refrescar.bind(this));

        function refrescar (data) {
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
                url: "actividad",
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
            opromise.then(oUpload());
        };

        function handleError(xhr, status, err){
            alert(err.valueError + ' status:' + status);
        };

    };


}
var vmv = new vm();
ko.applyBindings(vmv);
