$(document).ready(function () {
    // $('.tarjeta_eventos').perfectScrollbar({wheelSpeed: .5});
    let documento = document.URL;
    if (documento.indexOf("ticket") > -1) {
        let form = document.querySelector("#formSubmit");
        let button = document.querySelector("#tproblema");
        form.addEventListener("click", grabarForm);
        button.addEventListener("change", selectProblemas);
    }
    else if (documento.indexOf("test") > -1) {
    }
    else if (documento.indexOf("usuario") > -1) {
        let usr = usuarioInfo();
        console.log(usr);
    }
    else if (documento.indexOf("about") > -1) {
    }
    else if (documento.indexOf("login") > -1) {
    }
    else {
        // getHistorico();
        getHistoricoCOM();
    }

});

// let grabarForm = () => {
//######### obtiene datos del ticket.html y los envia para guardar ########
function grabarForm () {
    let a = document.querySelector("#prioridad").selectedIndex;
    let b = document.querySelector("#problema").selectedIndex;
    let c = document.querySelector("#tllamada").selectedIndex;
    var obsesion = {
        priority: document.querySelector("#prioridad")[a].value,
        problemTyp: document.querySelector("#problema")[b].value,
        callType: document.querySelector("#tllamada")[c].value,
        BPContact: document.querySelector("#Usuario").value,
        subject: document.querySelector("#asunto").value,
        usuario: document.querySelector("#oUser").innerText,
        ProSubType: '',
        estado: '',
        dscription: document.querySelector("#dscription").value
    };
    vmv.grabarF(obsesion);
}

//######### obtener el historial.html ########
var getHistorico = () => {
    // let jsonObj = {
    //     usuario: document.querySelector("#oUser").innerText,
    //     bandera: 'tabla'
    // };
    // vmv.getLlamadas(jsonObj);
}

//######### llena el usuario.html ########
var usuarioInfo = () => {
    let usuarioDoc = document.querySelector("#oUser").innerText;
    let param = {"usuario":usuarioDoc};
    let usuario = getUsuario(param);
    usuario.then((data) => {
        document.querySelector("#ui_usuario").innerText = data.username;
        document.querySelector("#ui_nombre").innerText = data.first_name;
        document.querySelector("#ui_apellido").innerText = data.last_name;
        document.querySelector("#ui_telefono").innerText = data.telefono;
        document.querySelector("#ui_celular").innerText = data.celular;
        document.querySelector("#ui_email").innerText = data.email;
    });
}

//######### obtiene las llamadas y actividades ########
var getHistoricoCOM = () => {
    let usuarioDoc = document.querySelector("#oUser").innerText;
    let jsonObj = {
        usuario: document.querySelector("#oUser").innerText,
        bandera: 'tabla'
    };
    let param = {"usuario":usuarioDoc};

    let llam = getLlam(jsonObj);
    let actividades = getActividades(param);

    actividades.then((data) => {
        return data;
    }).then((objtemp) => {
        llam.then((data) => {

            let result = data.map((callb) => {

                let actob = objtemp.filter( (actividad) => {
                    return actividad.ticket === callb.id;
                });

                callb.actividad = actob;
                return callb;
            }, []);
            // console.log(result);
            vmv.mapHistorial(result);

        });
    });
}
//######### llena la lista de problemas en ticket.html ########
var selectProblemas = () => {
    let tipo = document.querySelector("#tproblema").value;
    let select = document.querySelector("#problema");

    switch(tipo){
    case "SAP": case "SAPHANA":
	      select.options.length = 0;
        select.options[select.options.length] = new Option('', '');
        select.options[select.options.length] = new Option('PROCESO DE COMPRAS',	'S-COMPRAS');
        select.options[select.options.length] = new Option('PROCESO DE VENTAS',	'S-VENTAS');
        select.options[select.options.length] = new Option('PROCESOS FINANZAS',	'S-FINANZAS');
        select.options[select.options.length] = new Option('OTROS PROCESOS',	'S-OTROS');
        break;
    case "ADDON":
	      select.options.length = 0;
        select.options[select.options.length] = new Option('', '');
        select.options[select.options.length] = new Option('NOMINA', 'A-NOMINA');
        select.options[select.options.length] = new Option('PROYECTOS',	'A-PROYECTOS');
        select.options[select.options.length] = new Option('CLINICA	HISTORIA CLINICA',	'A-HISTORIA');
        select.options[select.options.length] = new Option('ASEGURADORAS',	'A-ASEGURADORA');
        select.options[select.options.length] = new Option('CAJA	CUADRE CAJA',	'A-CUADRE');
        select.options[select.options.length] = new Option('FISCAL	IMPRESOR FISCAL',	'A-IMPRESOR'); 
        select.options[select.options.length] = new Option('HOSPITALIZACION',	'A-HOSPITALIZACION');
        select.options[select.options.length] = new Option('INTEGRADORES',	'A-INTEGRADORES');
        select.options[select.options.length] = new Option('TXT',	'A-TXT');
        break;
    case "OTROS":
	      select.options.length = 0;
        select.options[select.options.length] = new Option('', '');
        select.options[select.options.length] = new Option('IVEND',	'O-IVEND');
        select.options[select.options.length] = new Option('BEAS',	'O-BEAS');
        select.options[select.options.length] = new Option('HANA Configuration',	'S-HANA');
        select.options[select.options.length] = new Option('LAYOUTS',	'S-LAYOUTS');
        break;
    }
    // function removeOption(){
	  //     var select = document.getElementById("dynamic-select");
	  //     select.options[select.options.length - 1] = null;
    // }
}
