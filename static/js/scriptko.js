function vm() {
    var self = this;
    self.llamadas  = ko.observableArray();

    //######### Graba los datos del formulario ########
    this.grabarF = (obsesion) => {
        let ob2 = obsesion;
        $.ajax({type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "llamada",
                data: ko.toJSON(obsesion),
                success: function (data) {
                    var jsonText = JSON.stringify(data);
                    alert(jsonText);
                    // self.factura(ko.mapping.fromJSON(jsonText)());
                    return true;
                }
               }).then(function(data){
               }, handleError);
        function handleError(xhr, status, err){
            alert('error devuelto de ajax');
            alert(err);
        };
    };

    //######### Obtiene el historial de llamadas de servicio ########
    this.getLlamadas = (obsesion) => {
        $.ajax({type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "agcsap.no-ip.org:4489/llamadas",
                data: ko.toJSON(obsesion),
                success: function (data) {
                    var jsonText = JSON.stringify(data.d);
                    self.llamadas(ko.mapping.fromJSON(jsonText)());
                    return true;
                }
               }).then(function(data){
               }, handleError);
        function handleError(xhr, status, err){
            alert(err);
        };
    };

    this.getLlamadasJson = (jsonText) => {
        // self.llamadas(ko.mapping.fromJSON(jsonText)());
        self.llamadas(ko.mapping.fromJSON(jsonText));
    }

    //######### Obtiene datos del usuario ########
    this.getUsuario = (obsesion) => {
        $.ajax({type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "agcsap.no-ip.org:4489/usuario",
                data: ko.toJSON(obsesion),
                success: function (data) {
                    var jsonText = JSON.stringify(data.d);
                    self.llamadas(ko.mapping.fromJSON(jsonText)());
                    return true;
                }
               }).then(function(data){
               }, handleError);
        function handleError(xhr, status, err){
            alert(err);
        };
    };

    //######### Obtiene datos del consultor encargado ########
    this.getConsultor = (obsesion) => {
        $.ajax({type: "GET",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                url: "agcsap.no-ip.org:4489/consultor",
                data: ko.toJSON(obsesion),
                success: function (data) {
                    var jsonText = JSON.stringify(data.d);
                    self.llamadas(ko.mapping.fromJSON(jsonText)());
                    return true;
                }
               }).then(function(data){
               }, handleError);
        function handleError(xhr, status, err){
            alert(err);
        };
    };

}
var vmv = new vm();
ko.applyBindings(vmv);
