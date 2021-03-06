﻿// jQuery.event.special.touchstart = 
//     {
//         setup: function( _, ns, handle )
//         {
//             if ( ns.includes("noPreventDefault") ) 
//             {
//                 this.addEventListener("touchstart", handle, { passive: false });
//             } 
//             else 
//             {
//                 this.addEventListener("touchstart", handle, { passive: true });
//             }
//         }
//     };

//import 'moment/locale/es'

//sube los los archivos
var oUpload = () =>{

    Dropzone.autoDiscover = false;
    var myDropzone = Dropzone.forElement(".dropzone");

    let ourl = document.URL;
    let url = new URL(ourl);
    let vticket = url.searchParams.get("tparam");

    let param = {"ticket":vticket};
    let actividades = getActividades(param);

    var idactid;
    let actid = actividades.then((data) => {
        let nuevoac = data.map((obj, e) => {
            if(data.length == e +1){
                return obj.id;
            }
        });
        // console.log(nuevoac);
        idactid = nuevoac[nuevoac.length -1];
        myDropzone.options['url'] =  '/archivo?ticket='+ vticket +'&actividad='+ idactid +'';

        myDropzone.processQueue();
        return nuevoac[nuevoac.length -1];
    });
    // let lastact = actividades.length -1;
    // let actividad = actividades[lastact].id;
    // actividades((oob) => { console.log(oob);});
    // console.log('no. actividad: ' +  actividad);
    // let elementos = document.querySelector("#actividades").children;
    // let actividad = elementos[0] ? elementos[elementos.length-1].id + 1 : 1;
}


var listaGlobal;
// $(document).ready(function () {
// $(window).load(function () {
    // window.onLoad = function () {
window.addEventListener('load', function() { 
                            // $('#sidebarCollapse').on('click', function () {
                            //     $('#sidebar').toggleClass('active');
                            // });

    // !function ($) {
    //     $.App.activateLightSidebarTheme();
    // };
    $('#light-check').prop('checked', true);

    let documento = document.URL;

    if (documento.indexOf("ticket") > -1) {
        let form = document.querySelector("#formSubmit1");
        let botonArchivo = document.querySelector("#archivo");
        let button = document.querySelector("#tproblema");

        form.addEventListener("click", function(o){
            o.preventDefault();
            grabarForm();
        });

        button.addEventListener("change", selectProblemas);

        // botonArchivo.addEventListener("change", () => {
        //     var i = $(this).prev('label').clone();
        //     var file = document.querySelector("#archivo").files[0].name;
        //     $(this).prev('label').text(file);
        // });
    }
    else if (documento.indexOf("test") > -1) {
        let datas = [
            {
                'usuario': 'rodri',
                'id': 1,
                'priority': 3,
                'subject': 'Arreglar campo de descripcion en tickets',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                // 'createTime': '10-10-2010',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'Cerrado'
            },{
                'usuario': 'rodri',
                'id': 4,
                'priority': 3,
                'subject': ' descipcion en tickets',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'AGC'
            },{
                'usuario': 'rodri',
                'id': 3,
                'priority': 3,
                'subject': 'Arreglar campo e descripcion en tickets',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'Cliente'
            },{
                'usuario': 'rodri',
                'id': 6,
                'priority': 3,
                'subject': 'Arreglar campo de descripcion en ticets',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'SAP'
            }
        ];

        let datas2 = [
            {
                'usuario': 'rodri',
                'id': 1,
                'priority': 3,
                'subject': 'TEST',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                // 'createTime': '10-10-2010',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'Cerrado'
            },{
                'usuario': 'rodri',
                'id': 4,
                'priority': 3,
                'subject': ' descipcion en tickets',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'AGC'
            },{
                'usuario': 'rodri',
                'id': 3,
                'priority': 3,
                'subject': 'TEST',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'Cliente'
            },{
                'usuario': 'rodri',
                'id': 6,
                'priority': 3,
                'subject': 'Arreglar campo e descripcion en tickets',
                'ProSubType': 'S-OTROS',
                'callType': '',
                'problemType': 'OTROS',
                'contactCode': '3',
                'CardName': 'AGC',
                'BPContact': 'maige',
                'BPPhone1': '123',
                'BPCellular': '124',
                'BPE_Mail': 'rodri.mendoza.t@gmail.com',
                'BPProjCode': 'P01',
                'dscription': 'Replica de problema de actividades, cambiar el limite de caracteres permitidos (actual 100) en descripción de nuevos tickets. Cambiar campo a tipo texto en base de datos.',
                'CntctSbjct': 'AGC',
                'estado': 'SAP'
            }
        ];
        let tablas =  [datas, datas2, datas];
        vmv.mapTest(tablas);
    }
    else if (documento.indexOf("usuario") > -1) {
        let usr = usuarioInfo();
        console.log(usr);
    }
    else if (documento.indexOf("about") > -1) {

    }
    else if (documento.indexOf("login") > -1) {
        // let btnLogin = document.querySelector("#archivo");
        // btnLogin.addEventListener("click", function(o){
            // let  wh
        // }
    }
    else if (documento.indexOf("actividad") > -1) {
        let btnArchivo = document.querySelector("#enviarbtn");

        // let mydr = document.querySelector("#myAwesomeDropzone");
        // mydr.setAttribute('action', '/archivo?ticket=8&actividad=12');

        // btnArchivo.addEventListener("click", function(o){

        // });
        getAct();
    }
    else if (documento.indexOf("historial") > -1) {

        let userCardCode = document.querySelector('#oCardCode').innerText;
        let uCard = userCardCode.toString().substring(0, 1);
        document.querySelector("#tusuario").style.color = uCard !== 'C' ?  '': 'transparent';
        document.querySelector("#tempresa").style.color = uCard !== 'C' ?  '': 'transparent';
        document.querySelector("#susuario").style.display = uCard !== 'C' ?  '': 'none';
        document.querySelector("#sempresa").style.display = uCard !== 'C' ?  '': 'none';

        let button = document.querySelector("btnActividad");
        getHistoricoCOM();

        let muyAlta = document.querySelector("#muyAlta");

        if(muyAlta){
            muyAlta.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.priority.toLowerCase().indexOf('muy alta') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });

            let alta = document.querySelector("#alta");
            alta.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.priority.toLowerCase().indexOf('alta') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });
            let media = document.querySelector("#media");
            media.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.priority.toLowerCase().indexOf('media') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });

            let baja = document.querySelector("#baja");
            baja.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.priority.toLowerCase().indexOf('baja') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });

            let abierto = document.querySelector("#abierto");
            abierto.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.estado.toLowerCase().indexOf('abierto') !== -1
                        || v.estado.toLowerCase().indexOf('cliente') !== -1
                        || v.estado.toLowerCase().indexOf('agc') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });

            let cerrado = document.querySelector("#cerrado");
            cerrado.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.estado.toLowerCase().indexOf('cerrado') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });

            let cliente = document.querySelector("#cliente");
            cliente.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.estado.toLowerCase().indexOf('cliente') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });

            let agc = document.querySelector("#agc");
            agc.addEventListener("click", () => {
                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.estado.toLowerCase().indexOf('agc') !== -1;
                });
                vmv.mapHistorial(found_tickets);
            });

            let todos = document.querySelector("#todos");
            todos.addEventListener("click", () => {
                vmv.mapHistorial(listaGlobal);
            });

            let todos2 = document.querySelector("#todos2");
            todos2.addEventListener("click", () => {
                vmv.mapHistorial(listaGlobal);
            });

            let buscador = document.querySelector("#buscador");
            buscador.addEventListener("keyup", () => {
                let filtro = document.querySelector("#buscador");

                let found_tickets = $.grep(listaGlobal, function(v) {
                    return v.CntctSbjct.toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1
                        || v.estado.toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1 
                        || v.problemType.toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1 
                        || v.BPContact.toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1 
                        || v.dscription.toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1 
                        || v.id.toString().indexOf(filtro.value.toLowerCase()) !== -1 
                        || v.priority.toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1 
                        || moment(v.createTime).locale('es').format('LL').toString().indexOf(filtro.value.toLowerCase())  !== -1 
                        || v.subject.toLowerCase().indexOf(filtro.value.toLowerCase()) !== -1 ;
                });
                vmv.mapHistorial(found_tickets);
            });
        }
    }
    else {
    }
}, false);

var filtrar = () => {
    let inbuscador = document.querySelector("#buscador");
    alert(inbuscador.value);
        // var dataC = d3.selectAll(".dataC");
    // //Filtra seleccion
        // var found_names = $.grep(clientList, function(v) {
        //     return v.CardCode.toLowerCase().indexOf(filtro.toLowerCase()) !== -1
        //         || v.CardName.toLowerCase().indexOf(filtro.toLowerCase()) !== -1 ;
        // });
        // //Ordena seleccion
        // found_names.sort(SortByName);
        // //Ejecuta
        // filtro.length  > 0 ? dibClientes(found_names) : dataC.selectAll("div").remove();
        // //funcion para ordenar
        // function SortByName(a, b){
        //     var aName = a.CardName.toLowerCase();
        //     var bName = b.CardName.toLowerCase(); 
        //     return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        // }
}
//######### Busqueda de clientes ############



//######### obtiene datos del ticket.html y los envia para guardar ########
function grabarForm () {
    let a = document.querySelector("#prioridad").selectedIndex;
    let b = document.querySelector("#problema").selectedIndex;
    let c = document.querySelector("#tproblema").selectedIndex;
    var obsesion = {
        priority: document.querySelector("#prioridad")[a].value,
        ProSubType: document.querySelector("#problema")[b].value,
        problemType: document.querySelector("#tproblema")[c].value,
        BPContact: document.querySelector("#usuario").value,
        subject: document.querySelector("#asunto").value,
        usuario: document.querySelector("#oUser").innerText,
        callType: '',
        estado: '',
        dscription: document.querySelector("#dscription").value
    };
    //valida que todos los campos obligatorios esten llenos
    if(!obsesion['priority'] == ''
       & !obsesion['ProSubType'] == ''
       & !obsesion['problemType'] == ''
       & !obsesion['subject'] == ''
       & !obsesion['usuario'] == ''
       & !obsesion['dscription'] == ''
      )
    {

        //graba el nuevo ticket y obtiene su id
        let opromise = new Promise((resolve, reject) => {

            let respuesta = grabarF(obsesion);
            respuesta.done((datos) => {
                    resolve(datos);
            });
            // if(respuesta != 0){
            //     resolve(respuesta);
            // }
        });

        // opromise.then((mensaje) => {
        //     let archivo = document.querySelector("#archivo");
        //     archivo.map((param, e) => {
        //         if(getCargar(param[e]) && param.length == e){
        //             resolve('bien');
        //         };
        //     });
        // });

        let tick = null;
        //llama a la funcion que sube los archivos
        opromise.then((mensaje) => {
            console.log(mensaje);
            return mensaje.ticket;
            //Navega a la pantalla historial
        }).then((vTick) => {
            let newVar = tUpload(vTick);
            return newVar;
        }).then((redirect) => {
            window.location.href = "/";
        }).catch(fail => {
            console.log("failing haard");
        });
    }
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

// var usario = () => {
//     return document.querySelector("#oUser").innerText;
// }

//######### obtiene los tickets ########
var getHistoricoCOM = () => {
    let jsonObj = {
        usuario: document.querySelector("#oUser").innerText,
        bandera: 'tabla'
    };
    let llam = getLlam(jsonObj);

    llam.then((data) => {
        // vmv.mapHistorial(result);
        // data.sort(function(a, b){return a.priority-b.priority});
        data.sort(function(a, b){

            return a.priority > b.priority ? 1 : -1 && a.estado == 'Cerrado' ? 1 : -1 && a.estado == 'AGC' ? -1 : 1;
        });

        let newData = data.map((dat, e) => {
            switch (dat.priority){
            case 1:
                dat.priority = 'Muy Alta';
                break;
            case 2:
                dat.priority = 'Alta';
                break;
            case 3:
                dat.priority = 'Media';
                break;
            case 4:
                dat.priority = 'Baja';
                break;
            }
            return dat;
        });
        listaGlobal = newData;
        let found_tickets = $.grep(listaGlobal, function(v) {
            return v.estado.toLowerCase().indexOf('abierto') !== -1
                || v.estado.toLowerCase().indexOf('cliente') !== -1
                || v.estado.toLowerCase().indexOf('agc') !== -1;
        });
        vmv.mapHistorial(found_tickets);
    });
}

// Obtiene las activiades
 var getAct = () => {
    // let vticket = document.querySelector("#ticketid").innerText;
    let ourl = this.document.URL;
    let url = new URL(ourl);
    var vticket = url.searchParams.get("tparam");
    // let usuarioDoc = document.querySelector("#oUser").innerText;
    let param = {"ticket":vticket};
    let actividades = getActividades(param);

    let archivos = getLista(param.ticket);
    let techis = getTech();

    let llamada = new Promise((resolve, reject) => {
        archivos.then((data) => {
            let neOb = [];
            neOb.newNotes = '';
            neOb.archivo = data;
            vmv.mapArchivo(neOb);

            return data;
        });
        techis.then((data)=>{
            vmv.mapTechs(data);
        });
        actividades.then((data) => {
            let newOb = [];
            newOb.newNotes = '';
            newOb.actividad = data;
            data.forEach(function(atr){
                atr.recontact = moment(atr.recontact).format('LL').toString();
            });

            vmv.mapAct(newOb);

            return data;

        }).then((actob) => {

            let rmensaje = document.querySelector(".divUltima");
            let rmensaje2 = document.querySelector(".divPenUltima");
            // let rmensaje3 = document.querySelector(".divRespuesta");
            rmensaje.style.display = 'hidden';
            rmensaje2.style.display = 'hidden';
            // rmensaje3.style.display = 'none';

            let curUser = document.querySelector("#oUser").innerText;

            for(var e = 0; e < actob.length; e++){
                let index = e;
                let len = actob.length;
                let rmensaje2 = document.querySelector(".divPenUltima");
                rmensaje2.style.display = 'visible';
                // act.flag == "P
                // return actob.length == e+1 && act.CntctSbjct == "SAP" ? true : false;
                // if(len == 1){
                //     let rmensaje = document.querySelector(".divUltima");
                //     rmensaje.style.display = 'none';
                // } else {
                //     let rmensaje = document.querySelector(".divUltima");
                //     rmensaje.style.display = 'inline';
                // }
                // if(e == len -1 && actob[e].action == 1){
                //     let rmensaje = document.querySelector(".divUltima");
                //     rmensaje.style.display = 'none';
                // }
                // if(e == len -2 && actob[e].action == 1){
                //     let rmensaje = document.querySelector(".divUltima");
                //     rmensaje.style.display = 'none';
                // }

                //Penultimo, 1ra linea
                if(len == 1 || e == len -2 || actob[e].action == true){
                    let usuario = document.querySelector("#penUltima");
                    let texto = document.querySelector("#penultimaText");
                    // let fecha = document.querySelector("#penultimaRecontact");
                    let respuesta = document.querySelector("#penUltimaR");
                    let mensaje = document.querySelector(".divUltima");

                    actob[e].action == true ? respuesta.style.display = 'visible' : respuesta.style.display = 'hidden';
                    actob[e].action == null || actob[e].action == false ? mensaje.style.display = 'visible' : mensaje.style.display = 'hidden';

                    // mensaje.style.display = 'inline';

                    usuario.innerText = actob[e].usuario;
                    texto.innerText = actob[e].notes;
                    // fecha.innerText = moment(actob[e].recontact).locale('es').calendar();
                }

               //Ultimo 2da linea 
                if(len > 1 && e == len -1 || e == len -1 && len > 1 && actob[e].action == true){
                    let usuario = document.querySelector("#Ultima");
                    let texto = document.querySelector("#ultimaText");
                    let respuesta = document.querySelector("#penUltimaR");
                    let mensaje = document.querySelector(".divUltima");

                    actob[e].action == true ? respuesta.style.display = 'visible' : respuesta.style.display = 'hidden';
                    actob[e].action == null || actob[e].action == false ? mensaje.style.display = 'visible' : mensaje.style.display = 'hidden';
                    // mensaje2.style.display = 'inline';

                    usuario.innerText = actob[e].usuario;
                    texto.innerText = actob[e].notes;
                    // break;
                }
                if(actob[e].action == 1) { break; }

                // if((e != len -2 || e != len -1) && actob[e].action == 1){
                //     let usuario = document.querySelector("#Respuesta");
                //     let texto = document.querySelector("#respuestaText");
                //     let mensaje = document.querySelector(".divRespuesta");

                //     actob[e].action == 1 ? mensaje.style.display = 'inline' : mensaje.style.display = 'none';

                //     usuario.innerText = actob[e].CntctSbjct;
                //     texto.innerText = actob[e].notes;
                // }
                // return;
            };

            var resp = true;
            let flag = actob.map((act, e) => {
                let index = e;
                let len = actob.length;
                if (actob[e].action == 1) resp = false;
                return actob.length == e+1 && act.CntctSbjct != curUser && resp ? true : false;
            });

            let len = actob.length;
            let problemTypeb = [];

            if (len == 0){
                problemTypeb.flag = true;
            }else {
                problemTypeb.flag = flag[len -1];
            }

            problemTypeb.newNotes = '';
            vmv.setflag(problemTypeb.flag);
            resolve('bien');
            return(actob);
        });

    });

    llamada.then(llamar.bind('', param));

    function llamar (parametro, msg){
        let jsonObj = {
            ids: parametro.ticket,
            bandera: 'especifico'
        };
        let llam = getLlam(jsonObj);

        llam.then((data) => {
            let datos = data[0];
            let userCardCode = document.querySelector('#oCardCode').innerText;
            let uCard = userCardCode.toString().substring(0, 1);
            // console.log(datos);
            document.querySelector("#btnDelegar").style.display = uCard !== 'C' ?  'inline': 'none';
            document.querySelector("#CntctSbjct").innerText = datos.usuario;
            document.querySelector("#BPContact").innerText = datos.usuario;
            document.querySelector("#subject").innerText = datos.subject;
            document.querySelector("#descripcion").innerText = datos.dscription;
            document.querySelector("#problemTyp").innerText = datos.problemTyp;
            document.querySelector("#ProSubType").innerText = datos.ProSubType;
            document.querySelector("#callType").innerText = datos.callType;
            document.querySelector("#owner").innerText = datos.OWNER;
            document.querySelector("#aowner").style.display = uCard !== 'C' ?  'inline': 'none';
            moment.locale('es');
            document.querySelector("#createDate").innerText = moment(datos.createTime).format('LL').toString();
            //document.querySelector("#createTime").innerText = datos.createTime;
            document.querySelector("#id").innerText = datos.id;
            if(datos.estado == 'cerrado'){
                document.querySelector("#actAbierto").style.display = 'none';
                document.querySelector("#actCerrado").style.display = 'inline';
            }else{
                document.querySelector("#actAbierto").style.display = 'inline';
                document.querySelector("#actCerrado").style.display = 'none';
            }

            if(datos.priority == '1'){
                document.querySelector("#actBaja").style.display = 'none';
                document.querySelector("#actMedia").style.display = 'none';
                document.querySelector("#actAlta").style.display = 'none';
                document.querySelector("#actMuyAlta").style.display = 'inline';
            }else if(datos.priority == '2'){
                document.querySelector("#actBaja").style.display = 'none';
                document.querySelector("#actMedia").style.display = 'none';
                document.querySelector("#actAlta").style.display = 'inline';
                document.querySelector("#actMuyAlta").style.display = 'none';
            }else if(datos.priority == '3'){
                document.querySelector("#actBaja").style.display = 'none';
                document.querySelector("#actMedia").style.display = 'inline';
                document.querySelector("#actAlta").style.display = 'none';
                document.querySelector("#actMuyAlta").style.display = 'none';
            }else{
                document.querySelector("#actBaja").style.display = 'inline';
                document.querySelector("#actMedia").style.display = 'none';
                document.querySelector("#actAlta").style.display = 'none';
                document.querySelector("#actMuyAlta").style.display = 'none';
            }
            // vmv.setEstado(datos.estado);
            // vmv.mapHistorial(result);
            // vmv.mapHistorial(data);
        });
    }
}

//sube los los archivos
var oUpload = () =>{

    Dropzone.autoDiscover = false;
    var myDropzone = Dropzone.forElement(".dropzone");

    let ourl = document.URL;
    let url = new URL(ourl);
    let vticket = url.searchParams.get("tparam");

    let param = {"ticket":vticket};
    let actividades = getActividades(param);

    var idactid;
    let actid = actividades.then((data) => {
        let nuevoac = data.map((obj, e) => {
            if(data.length == e +1){
                return obj.id;
            }
        });
        // console.log(nuevoac);
        idactid = nuevoac[nuevoac.length -1];
        myDropzone.options['url'] =  '/archivo?ticket='+ vticket +'&actividad='+ idactid +'';

        myDropzone.processQueue();
        return nuevoac[nuevoac.length -1];
    });
    // let lastact = actividades.length -1;
    // let actividad = actividades[lastact].id;
    // actividades((oob) => { console.log(oob);});
    // console.log('no. actividad: ' +  actividad);
    // let elementos = document.querySelector("#actividades").children;
    // let actividad = elementos[0] ? elementos[elementos.length-1].id + 1 : 1;
}

//sube los los archivos
var tUpload = (vticket) =>{

    console.log(vticket);
    Dropzone.autoDiscover = false;
    var myDropzone = Dropzone.forElement(".dropzone");

    let ourl = document.URL;
    let url = new URL(ourl);

    myDropzone.options['url'] =  '/archivo?ticket='+ vticket +'&actividad='+ 0 +'';

    myDropzone.processQueue();
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

//             let result = data.map((problemTypeb) => {

//                 let actob = objtemp.filter((actividad) => {
//                     // actividad.newNotes = '';
//                     return actividad.ticket === problemTypeb.id;
//                 });

//                 // let mapFunc = (act, e) => {
//                 //     let index = e;
//                 //     let len = actob.length;
//                 //     act.nuevo = usuario;
//                 //     actob.length == e+1 && act.CntctSbjct == "SAP" ? act.flag = true : act.flag = false; 
//                 //     return act;
//                 // };
//                 // let usuario = problemTypeb.usuario;
//                 // actob = actob.map(mapFunc.bind(usuario));


//                 let flag = actob.map((act, e) => {
//                     let index = e;
//                     let len = actob.length;
//                     return actob.length == e+1 && act.CntctSbjct == "SAP" ? true : false;
//                 });

//                 let len = actob.length;

//                 problemTypeb.flag = flag[len-1];
//                 problemTypeb.newNotes = '';
//                 problemTypeb.actividad = actob;
//                 return problemTypeb;
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
    case "SAPHANA":
	      select.options.length = 0;
        select.options[select.options.length] = new Option('', '');
        select.options[select.options.length] = new Option('HANA Configuration',	'S-HANA');
        select.options[select.options.length] = new Option('PROCESO DE COMPRAS',	'S-COMPRAS');
        select.options[select.options.length] = new Option('PROCESO DE VENTAS',	'S-VENTAS');
        select.options[select.options.length] = new Option('PROCESOS FINANZAS',	'S-FINANZAS');
        select.options[select.options.length] = new Option('SOLICITUD DE CAMBIO',	'S-CAMBIO');
        select.options[select.options.length] = new Option('OTROS',	'S-OTROS');
        break;
    case "SAP":
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
        select.options[select.options.length] = new Option('ASEGURADORAS',	'A-ASEGURADORA');
        select.options[select.options.length] = new Option('CUADRE DE CAJA',	'A-CUADRE');
        select.options[select.options.length] = new Option('GESTION',	'A-GESTION');
        select.options[select.options.length] = new Option('HISTORIA CLINICA',	'A-HISTORIA');
        select.options[select.options.length] = new Option('HOSPITALIZACION',	'A-HOSPITALIZACION');
        select.options[select.options.length] = new Option('IMPRESOR FISCAL',	'A-IMPRESOR'); 
        select.options[select.options.length] = new Option('INTEGRADORES',	'A-INTEGRADORES');
        select.options[select.options.length] = new Option('NOMINA', 'A-NOMINA');
        select.options[select.options.length] = new Option('PROYECTOS',	'A-PROYECTOS');
        select.options[select.options.length] = new Option('REPLICACIÓN',	'A-REPLICACION');
        //select.options[select.options.length] = new Option('SOLICITUD DE CAMBIO',	'S-CAMBIO');
        select.options[select.options.length] = new Option('TXT',	'A-TXT');
        select.options[select.options.length] = new Option('OTROS',	'S-OTROS');
        break;
    case "OTROS":
	      select.options.length = 0;
        select.options[select.options.length] = new Option('', '');
        select.options[select.options.length] = new Option('IVEND',	'O-IVEND');
        select.options[select.options.length] = new Option('BEAS',	'O-BEAS');
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
