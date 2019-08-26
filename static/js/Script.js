$(document).ready(function () {
    // $('.tarjeta_eventos').perfectScrollbar({wheelSpeed: .5});
    let documento = document.URL;
    if (documento.indexOf("ticket") > -1) {
        let form = document.querySelector("#formSubmit1");
        let button = document.querySelector("#tproblema");
        form.addEventListener("click", function(o){
            o.preventDefault();
            grabarForm();
        });
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
    else if (documento.indexOf("actividades") > -1) {
        getAct();
        // let form = document.querySelector("#formSubmit1");
        // let button = document.querySelector("#tproblema");
        // form.addEventListener("click", function(o){
        //     o.preventDefault();
        //     grabarForm();
        // });
        // button.addEventListener("change", selectProblemas);
        let button = document.querySelector("btnActividad");
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

        let opromise = new Promise((resolve, reject) => {
            if(grabarF(obsesion)){
                resolve('bien');
            }
        });

        opromise.then((mensaje) => {
            window.location.href = "/";
        })
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
    let jsonObj = {
        usuario: document.querySelector("#oUser").innerText,
        bandera: 'tabla'
    };
    let llam = getLlam(jsonObj);

    llam.then((data) => {
        // vmv.mapHistorial(result);
        vmv.mapHistorial(data);
    });
}
// var getAct = (vticket) => {
var getAct = () => {
    // let vticket = document.querySelector("#ticketid").innerText;
    let ourl = this.document.URL;
    let url = new URL(ourl);
    var vticket = url.searchParams.get("tparam");
    // let usuarioDoc = document.querySelector("#oUser").innerText;
    let param = {"ticket":vticket};
    let actividades = getActividades(param);

    let llamada = new Promise((resolve, reject) => {
    //     if(window.location.href = "/actividades"){
    //         resolve('bien');
    //     }
    // });

        actividades.then((data) => {

            let newOb = [];
            newOb.newNotes = '';
            newOb.actividad = data;
            vmv.mapAct(newOb);

            return data;
        }).then((actob) => {

            let curUser = document.querySelector("#oUser").innerText; 

            let flag = actob.map((act, e) => {
                let index = e;
                let len = actob.length;
                // act.flag == "P
                // return actob.length == e+1 && act.CntctSbjct == "SAP" ? true : false;
                return actob.length == e+1 && act.CntctSbjct != curUser ? true : false;
            });

            let len = actob.length;

            let callb = [];
            callb.flag = flag[len-1];
            callb.newNotes = '';
            vmv.setflag(callb.flag);
            resolve('bien');
            return(actob);
        });
    });

    llamada.then(llamar.bind('', param));

    function llamar (parametro, msg){
        let jsonObj = {
            usuario: parametro.ticket,
            bandera: 'especifico'
        };
        let llam = getLlam(jsonObj);

        llam.then((data) => {
            let datos = data[0];
            console.log(datos);
            document.querySelector("#CntctSbjct").innerText = datos.usuario;
            document.querySelector("#subject").innerText = datos.subject;
            document.querySelector("#descripcion").innerText = datos.dscription;
            document.querySelector("#id").innerText = datos.id;

            // vmv.mapHistorial(result);
            // vmv.mapHistorial(data);
        });    
    }
}
//######### obtiene las llamadas y actividades ########
// var getHistoricoCOM_ant = () => {
//     let usuarioDoc = document.querySelector("#oUser").innerText;
//     let jsonObj = {
//         usuario: document.querySelector("#oUser").innerText,
//         bandera: 'tabla'
//     };
//     let param = {"usuario":usuarioDoc};

//     let actividades = getActividades(param);
//     let llam = getLlam(jsonObj);

//     actividades.then((data) => {
//         return data;
//     }).then((objtemp) => {
//         llam.then((data) => {

//             let result = data.map((callb) => {

//                 let actob = objtemp.filter((actividad) => {
//                     // actividad.newNotes = '';
//                     return actividad.ticket === callb.id;
//                 });

//                 // let mapFunc = (act, e) => {
//                 //     let index = e;
//                 //     let len = actob.length;
//                 //     act.nuevo = usuario;
//                 //     actob.length == e+1 && act.CntctSbjct == "SAP" ? act.flag = true : act.flag = false; 
//                 //     return act;
//                 // };
//                 // let usuario = callb.usuario;
//                 // actob = actob.map(mapFunc.bind(usuario));


//                 let flag = actob.map((act, e) => {
//                     let index = e;
//                     let len = actob.length;
//                     return actob.length == e+1 && act.CntctSbjct == "SAP" ? true : false;
//                 });

//                 let len = actob.length;

//                 callb.flag = flag[len-1];
//                 callb.newNotes = '';
//                 callb.actividad = actob;
//                 return callb;
//             }, []);
//             vmv.mapHistorial(result);
//         });
//     });
// }
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
        select.options[select.options.length] = new Option('SOLICITUD DE CAMBIO',	'S-CAMBIO');
        select.options[select.options.length] = new Option('OTROS',	'S-OTROS');
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
        select.options[select.options.length] = new Option('GESTION',	'A-GESTION');
        select.options[select.options.length] = new Option('TXT',	'A-TXT');
        select.options[select.options.length] = new Option('SOLICITUD DE CAMBIO',	'S-CAMBIO');
        select.options[select.options.length] = new Option('OTROS',	'S-OTROS');
        break;
    case "OTROS":
	      select.options.length = 0;
        select.options[select.options.length] = new Option('', '');
        select.options[select.options.length] = new Option('IVEND',	'O-IVEND');
        select.options[select.options.length] = new Option('BEAS',	'O-BEAS');
        select.options[select.options.length] = new Option('HANA Configuration',	'S-HANA');
        select.options[select.options.length] = new Option('LAYOUTS',	'S-LAYOUTS');
        select.options[select.options.length] = new Option('CRM FOR OUTLOOK',	'S-OUTLOOK');
        select.options[select.options.length] = new Option('SOLICITUD DE CAMBIO',	'S-CAMBIO');
        select.options[select.options.length] = new Option('OTROS',	'S-OTROS');
        break;
    }
    // function removeOption(){
	  //     var select = document.getElementById("dynamic-select");
	  //     select.options[select.options.length - 1] = null;
    // }
}
