//$(document).ready(function () {
//    //vmv.getEmployee();
//    document.getElementById("ASPxFormLayout2_E3").focus();
//});
// var rolSelected = '';

// function changeCSS(cssFile, cssLinkIndex) {
//     var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

//     var newlink = document.createElement("link");
//     newlink.setAttribute("rel", "stylesheet");
//     newlink.setAttribute("type", "text/css");
//     newlink.setAttribute("href", cssFile);

//     document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
// }

function vm() {
    // var self = this;
    // self.labReg = ko.observableArray();
    // self.Tipo = ko.observable('');
    // var curCardCode;
    // var sesion = {
    //     user: 0,
    //     hTipo: "",
    //     rol: rolSelected
    // };

    // //OBTIENE EL GUION
    // let getGuion = (transParam) => {
    //     let objTrans = {
    //         transNum:transParam,
    //         spBandeja:spBandeja
    //     };
    //     $.ajax({
    //         type: "POST",
    //         contentType: "application/json; charset=utf-8",
    //         url: "Hclinica.aspx/getGuion",
    //         data: JSON.stringify(objTrans),
    //         dataType: "json",
    //         success: function (data) {
    //             var jsonText = JSON.stringify(data.d);
    //             self.nodo(ko.mapping.fromJSON(jsonText)());
    //         }
    //     });
    // }

    // //######## AL SELECCIONAR FACTURAS
    // self.selectFactura = function (con) {
    //     self.factRow(con);
    //     sesion.CardCode = con.CardCode;
    //     sesion.DocNum = con.DocNum;
    //     sesion.DocEntry = con.DocEntry;
    //     sesion.ObjType = con.ObjType;
    //     vdocentry1 = con.DocEntry();
    //     sesion.CardName = con.CardName;
    //     sesion.Servicio = con.Servicio;
    //     sesion.ItemCode = con.ItemCode;
    //     sesion.lineNum = con.lineNum;
    //     sesion.empID = gempid;
    //     self.cDocNum(con.DocNum());
    //     // self.getdnEvent(); lo esta trayendo desde NEVENTSAP
    //     self.getdnHistorico();
    //     self.NEVENTSAP();
    // };

    // //OBTIENE EL GUION
    // self.postEvent = (con) => {
    //     let newEvent = {
    //         dtlCode: con.Codigo(),
    //         cardCode: sesion.CardCode(),
    //         empID: sesion.empID,
    //         docNum: sesion.DocNum(),
    //         descr: con.Descripcion(),
    //         docEntry: sesion.DocEntry()
    //     }
    //     $.ajax({
    //         type: "POST",
    //         contentType: "application/json; charset=utf-8",
    //         url: "Hclinica.aspx/crearEventoM",
    //         data: JSON.stringify(newEvent),
    //         dataType: "json",
    //         success: function (data) {
    //             // var jsonText = JSON.stringify(data.d);
    //             // self.nodo(ko.mapping.fromJSON(jsonText)());
    //             self.getdnEvent();
    //         }
    //     });
    // }

    // self.grabarTexto = (function(con){
    //     let cTexto = con.valor;
    //     let cValor = con.area_v();
    //     let cObj = {
    //         DtlCode: con.codigo(),
    //         TransNum: con.transnum(),
    //         cValor: cValor
    //     }
    //     let myFirstPromise = new Promise((resolve, reject) => {
    //         if(cTexto != cValor){
    //             $.ajax({type: "POST", dataType: "json",
    //                   contentType: "application/json; charset=utf-8",
    //                   url: "Hclinica.aspx/grabarTexto",
    //                   data: JSON.stringify(cObj),
    //                   success: (data) => {
    //                       var jsonText = JSON.stringify(data.d);
    //                       // console.log(jsonText);
    //                       resolve(data.d); // Yay! Everything went well!
    //                   }, error: (data) =>{
    //                       console.log(JSON.stringify(data.d));
    //                       reject(0);
    //                   }
    //                  });
    //         } else {
    //             con.toogle(false);
    //         }
    //     });
    //     myFirstPromise.then((successMessage) => {
    //         if (successMessage = 1){
    //             con.valor = cValor;
    //             if (con.toogle()){
    //                 con.toogle(false);
    //             } else {
    //                 con.toogle(true);
    //             }
    //         }
    //         // console.log(successMessage);
    //     });
    //     // con.toogleD(false);
    // }).bind(this);

    // //######### LLAMA A LAS FACTURAS ########
    // this.getF = function (parametro) {
    //     // var auxRol =  self.rolCode();
    //     if(!rolSelected){rolSelected = '';}
    //     labParam.vEmpID = parametro;
    //     labParam.rol = rolSelected;
    //     labParam.hTipo = hTipo;
    //     labParam.spBandeja = spBandeja;
    //     $.ajax({type: "POST", dataType: "json",
    //             contentType: "application/json; charset=utf-8",
    //             url: "Hclinica.aspx/getFacturas",
    //             data: ko.toJSON(labParam),
    //             success: function (data) {
    //                 var jsonText = JSON.stringify(data.d);
    //                 self.factura(ko.mapping.fromJSON(jsonText)());
    //                 return true;
    //             }
    //            }).then(function(data){
    //                // self.getPendientes();
    //            }).then(function(data){
    //                self.getE(); //poner en otra seccion, valido hast OCTubre//llama a la lista de Eventos
    //            }).then(function(data){
    //                //getC(); //llama a la lista de Clientes
    //            }, handleError);
    //     function handleError(xhr, status, err){
    //         alert(err);
    //     };
    // };

    // //############################ MOTOR GUION ########################### 
    // self.marcar = (con) => {
    //     let oestado = con.estado();
    //     let nodoInf = {
    //         dtlcode: con.codigo(),
    //         transnum: con.transnum()
    //     }

    //     if (oestado == 'False'){
    //         $.ajax({type: "POST", dataType: "json",
    //                 contentType: "application/json; charset=utf-8",
    //                 url: "Hclinica.aspx/marcar",
    //                 data: ko.toJSON(nodoInf),
    //                 success: (data) => {
    //                     var jsontext = JSON.stringify(data.d);
    //                     if (jsontext == '1'){
    //                         con.estado('True');
    //                     }
    //                     // console.log(jsontext);
    //                 }, error: (data) => {
    //                     console.log(JSON.stringify(data.d));
    //                 }
    //                });
    //     } else {
    //         con.toogleD() ? con.toogleD(false) : con.toogleD(true);
    //     }

    //     if(con.valType() == 'Texto'){
    //         con.toogle(true);
    //     } else if (con.valType() == 'Numero') {
    //         con.toogleN(true);
    //     }
    // }

}
var vmv = new vm();
ko.applyBindings(vmv);

// //MOSTRAR ITEMINFO
// function showItemInfo(){
//     $("#eventos").removeClass('hidden');
//     $("#eventos").removeClass('animated fadeOutDown');
//     $("#eventos").addClass('animated fadeInDown');
// }

// function closeListaEvent() {
//     $("#eventos").removeClass('animated fadeInDown');
//     $("#eventos").addClass('animated fadeOutDown');
//     setTimeout(function(){
//         $("#eventos").addClass('hidden');
//     }, 800)
// }
