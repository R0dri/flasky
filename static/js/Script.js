$(document).ready(function () {
    // $('.tarjeta_eventos').perfectScrollbar({wheelSpeed: .5});
    let documento = document.URL;
    if (documento.indexOf("ticket") > -1) {
        let form = document.querySelector("#formSubmit1");
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
        let button = document.querySelector("btnActividad");
        getHistoricoCOM();

    }

});

// let grabarForm = () => {
//######### obtiene datos del ticket.html y los envia para guardar ########
function grabarForm () {
    let a = document.querySelector("#prioridad").selectedIndex;
    let b = document.querySelector("#problema").selectedIndex;
    let c = document.querySelector("#tproblema").selectedIndex;
    var obsesion = {
        priority: document.querySelector("#prioridad")[a].value,
        problemTyp: document.querySelector("#problema")[b].value,
        callType: document.querySelector("#tproblema")[c].value,
        BPContact: document.querySelector("#Usuario").value,
        subject: document.querySelector("#asunto").value,
        usuario: document.querySelector("#oUser").innerText,
        ProSubType: '',
        estado: '',
        dscription: document.querySelector("#dscription").value
    };
    if(!obsesion['priority'] == ''
       & !obsesion['problemTyp'] == ''
       & !obsesion['callType'] == ''
       & !obsesion['subject'] == ''
       & !obsesion['usuario'] == ''
       & !obsesion['dscription'] == ''
      )
    {
        grabarF(obsesion);
        window.location.href = "http://agcsap.no-ip.org:4490/";
    }
    // let grabarBTN = document.querySelector("#formSubmit");
    // window.location.replace("http://stackoverflow.com");
    // $(location).attr('href', 'http://stackoverflow.com');
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

    let actividades = getActividades(param);
    let llam = getLlam(jsonObj);

    actividades.then((data) => {
        return data;
    }).then((objtemp) => {
        llam.then((data) => {

            let result = data.map((callb) => {

                let actob = objtemp.filter((actividad) => {
                    // actividad.newNotes = '';
                    return actividad.ticket === callb.id;
                });

                // let mapFunc = (act, e) => {
                //     let index = e;
                //     let len = actob.length;
                //     act.nuevo = usuario;
                //     actob.length == e+1 && act.CntctSbjct == "SAP" ? act.flag = true : act.flag = false; 
                //     return act;
                // };
                // let usuario = callb.usuario;
                // actob = actob.map(mapFunc.bind(usuario));


                let flag = actob.map((act, e) => {
                    let index = e;
                    let len = actob.length;
                    return actob.length == e+1 && act.CntctSbjct == "SAP" ? true : false;
                });

                let len = actob.length;

                callb.flag = flag[len-1];
                callb.newNotes = '';
                callb.actividad = actob;
                return callb;
            }, []);
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
