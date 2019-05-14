
$(document).ready(function () {
    // $('.tarjeta_eventos').perfectScrollbar({wheelSpeed: .5});
    let documento = document.URL;
    if (documento.indexOf("llamada") > -1) {
        document.querySelector("#formSubmit").addEventListener("click", grabarForm);
    }
    else if (documento.indexOf("test") > -1) {
    }
    else if (documento.indexOf("user") > -1) {
    }
    else if (documento.indexOf("about") > -1) {
    }
    else if (documento.indexOf("login") > -1) {
    }
    else {
        getHistorico();
    }

});


document.body.addEventListener("change", function(e) {
    console.log(e.target);
    console.log('prueba');
});


// var sesion = {
//     user: 0,
//     hTipo: "",
//     rol: rolSelected
// };


// let grabarForm = () => {
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
        usuario: document.querySelector("#oUser").value,
        dscription: document.querySelector("#dscription").value
    };
    vmv.grabarF(obsesion);
}

var getHistorico = () => {
    let jsonObj  ='{"ProSubType":"Addon","createTime":"19 Jan 2019","usuario":"cheeky","priority":"2","problemTyp":"A-ASEGURADORA","callType":"CAPACITACION","BPContact":"nombre variable del usuario solicitante","subject":"asunto del problema","dscription":"Descripcion del problema detallado en texto de 100 caracteres...."}'; 
    // vmv.getLlamadas(jsonObj);
    vmv.getLlamadasJson(jsonObj);
}

// let BPContact;
// let createDate;
// let BPPhone1;
// let BPPhone2;
// let BPCellular;
// let BPE_Mail;
// let BPProjCode;
// let descrptioin;
// let trgtPath; //aun no estamos usando eso.
