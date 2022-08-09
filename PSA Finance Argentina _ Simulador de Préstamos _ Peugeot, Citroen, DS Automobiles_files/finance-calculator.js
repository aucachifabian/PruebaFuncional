function loadCampanias(plazo){
	$("#monthlypay").html("$");
	$("#campania option").each(function() {
		if($(this).val() != "-1"){
			$(this).remove();			
		}
	});

	var codCampaniasFiltradas = [];
	$.each( campanias, function( index, value) {
		  	if(value.cantCuotas == plazo){
		  		codCampaniasFiltradas.push(index);
		  		$("#campania").append("<option value='" + index + "'>" + value.descripcionCampania + " - TNA: " + accounting.formatMoney(value.tna,"", 2, ".", ",") + "%</option>");
		  	}
	});
	
	if(codCampaniasFiltradas.length == 1){
		$("#campania").val(codCampaniasFiltradas[0]);
		$('#campania').attr("title",$('#campania').find(":selected").text());
		$('#campania').trigger("change");
	}
}

function aplicarTasa(posicionMeses, monto) {
	
	var plazo = $("#months").text();
    var tasa = campanias[posicionMeses].tna;
    var iva = 0.21;
    if (tasa != null) {
    	var acum = 0;
    	for(var i=1; i <= plazo; i++) {
    		var ivaCuota = IPMT(tasa / (12 * 100), i, plazo, -monto, 0) * iva;
    		acum = acum + PMT(tasa / (12 * 100), plazo, -monto, 0) + ivaCuota;
    	}
    	return acum/plazo;
    } else {
        return 0;
    }
    return 0;
    
}
function setearCuota(posicionMeses, cuota) {
	
	$("#monthlypay").empty();
    $("#monthlypay").append(accounting.formatMoney(cuota, "$", 2, ".", ","));

    var plazo = valMap[posicionMeses];
    var tasa = campanias[posicionMeses].tna;
    
    var modelo_s = $("#modelo_slider").val();
    if (tasa != null) {
    	$("#tna").empty();
    	$("#tna").append(accounting.formatMoney(tasa,"", 2, ".", ",") + "%");
        
        $("#tea").empty();
        $("#tea").append(accounting.formatMoney(campanias[posicionMeses].tea,"", 2, ".", ",") + "%");
    }
}

//Campania
function validateCampania(){
	
	var valid = false;
	
	if($("#campania").val() == '-1'){
		$("#select-campania-div").addClass("has-error");
		$("#select-campania-div").addClass("no-margin-bottom");
		$("#help-block-campania").show();
		if(!$("#finCalculator").hasClass("disabled-psa")){
			$("#finCalculator").addClass("disabled-psa");			
		}
	}else{
		$("#select-campania-div").removeClass("has-error");
		$("#select-campania-div").removeClass("no-margin-bottom");
		$("#help-block-campania").hide();
		valid = true;
	}
	
	return valid;
	
}

function validateSeguroForm(){
	var formValid = true;
	
	if($("#campania").val() == '-1'){
		
		$("#select-campania-div").addClass("has-error");
		$("#select-campania-div").addClass("no-margin-bottom");
		$("#help-block-campania").show();
		$("#finCalculator").addClass("disabled-psa");
		formValid = false;
	}else{
		$("#select-campania-div").removeClass("has-error");
		$("#select-campania-div").removeClass("no-margin-bottom");
		$("#help-block-campania").hide();
	}
	
		
	if($("#provincia").val() == '0'){
		formValid = false;
		$("#finCalculator").addClass("disabled-psa");
		$("#div-select-provincia").addClass("has-error");
		$("#div-select-provincia").addClass("no-margin-bottom");
		$("#help-block-provincia").show();
	}else{
		$("#div-select-provincia").removeClass("has-error");
		$("#div-select-provincia").removeClass("no-margin-bottom");
		$("#help-block-provincia").hide();
	}
	
	if($("#usoVehiculo").val() == '0'){
		formValid = false;
		$("#finCalculator").addClass("disabled-psa");
		$("#div-select-uso").addClass("has-error");
		$("#div-select-uso").addClass("no-margin-bottom");
		$("#help-block-uso").show();
	}else{
		$("#div-select-uso").removeClass("has-error");
		$("#div-select-uso").removeClass("no-margin-bottom");
		$("#help-block-uso").hide();
	}
	
	
	if(!$("#codigoPostalInput").val()){
		formValid = false;
		$("#finCalculator").addClass("disabled-psa");
		$("#codPostalInputDiv").addClass("has-error");
		$("#codPostalInputDiv").addClass("no-margin-bottom");
		$("#codigoPostalInput").addClass("border-color-error");
		$("#help-block-codigo-postal").html("Campo Requerido");
		$("#help-block-codigo-postal").show();
	}else{
		if(isNaN($("#codigoPostalInput").val())){
			formValid = false;
			$("#finCalculator").addClass("disabled-psa");
			$("#codPostalInputDiv").addClass("has-error");
			$("#codigoPostalInput").addClass("border-color-error");
			$("#help-block-codigo-postal").html("Solo se pueden ingresar numeros");
			$("#help-block-codigo-postal").show();	
		}else{
			//Validar que sea codigo valido para provincia elegida
			$("#codPostalInputDiv").removeClass("has-error");
			$("#codPostalInputDiv").removeClass("no-margin-bottom");
			$("#codigoPostalInput").removeClass("border-color-error");
			$("#help-block-codigo-postal").hide();
		}
	}
	
	if($("#concesionario").val() == '0'){
		formValid = false;
		$("#finCalculator").addClass("disabled-psa");
		$("#div-select-concesionario").addClass("has-error");
		$("#div-select-concesionario").addClass("no-margin-bottom");
		$("#help-block-concesionario").show();
	}else{
		$("#div-select-concesionario").removeClass("has-error");
		$("#div-select-concesionario").removeClass("no-margin-bottom");
		$("#help-block-concesionario").hide();
	}
	
	return formValid;
}

function validateSeguroFormWithoutMarks(){
	var formValid = true;
	
	if($("#campania").val() == '-1'){
		$("#finCalculator").addClass("disabled-psa");
		$("#select-campania-div").addClass("has-error");
		$("#help-block-campania").show();
		formValid = false;
	}else{
		$("#select-campania-div").removeClass("has-error");
		$("#help-block-campania").hide();
	}
	
		
	if($("#provincia").val() == '0'){
		formValid = false;
		$("#finCalculator").addClass("disabled-psa");
	}else{
		$("#div-select-provincia").removeClass("has-error");
		$("#help-block-provincia").hide();
	}
	
	if($("#usoVehiculo").val() == '0'){
		formValid = false;
		$("#finCalculator").addClass("disabled-psa");

	}else{
		$("#div-select-uso").removeClass("has-error");
		$("#help-block-uso").hide();
	}
	
	if(!$("#codigoPostalInput").val()){
		formValid = false;
		$("#finCalculator").addClass("disabled-psa");
	}else{
		if(isNaN($("#codigoPostalInput").val())){
			formValid = false;
			$("#finCalculator").addClass("disabled-psa");
		}else{
			//Validar que sea codigo valido para provincia elegida
			$("#codPostalInputDiv").removeClass("has-error");
			$("#codigoPostalInput").removeClass("border-color-error");
			$("#help-block-codigo-postal").hide();
		}
	}
	
	return formValid;
}

function disableKeyboard(event){
	
	event.preventDefault();
	return false;
}

function initializeComponents(){
	
	$('#codigoPostalInput').keypress(function (event) {
	    if (event.keyCode === 13) {
	    	$("#codigoPostalInput").focusout();
	        event.preventDefault();
	    }
	});
	
	
	$("#codigoPostalInput").focusout(function(event){
		var formValid = validateSeguroForm();
		if(formValid){
			if(validarCodigoPostal()){
				calcularSeguro();	
				
			}
		}else{
			
			if($("#provincia").val() != '0'){
				validarCodigoPostal();
			}
			$("#importeSeguro").html("$");
		}
		
	});
	
	
	$('#usoVehiculo').on('change', function() {
		
		$("#div-select-uso").removeClass("has-error");
		$("#help-block-uso").hide();
		
		if(!$(this).find(":selected").val() == '0'){
			$("#usoVehiculo option[value='0']").remove();
		}
		
		var formValid = validateSeguroForm();

		if(formValid){
			if(validarCodigoPostal()){
				calcularSeguro();
				
			}	
		}else{
			$("#importeSeguro").html("$");
		}
		
	});
	
	
	$('#campania').on('change', function() {
		
		if($(this).val() != "-1"){
			$('#campania').attr("title",$(this).find(":selected").text());
			
    		var montoFinancMax = campanias[$(this).val()].montoFinancMax;
    		
    		if ($('.downPaySlider').slider('value') > montoFinancMax) {
    			$('.downPaySlider').slider('value', montoFinancMax);
    			$("#minAmount").val(accounting.formatMoney(montoFinancMax, "$", 2, ".", ","));
    		    $("#totalLoan").text(accounting.formatMoney(montoFinancMax, "$", 2, ".", ","));
    		}
    		
    		$('.downPaySlider').slider("option", "max", montoFinancMax);
    		
			$("#minAmount").val(accounting.formatMoney($(".downPaySlider").slider("value"), "$", 2, ".", ","));
	    	$("#totalLoan").text(accounting.formatMoney($(".downPaySlider").slider("value"), "$", 2, ".", ","));
			var cuota = aplicarTasa($(this).val(), monto).toFixed(2);
		    setearCuota($(this).val(), cuota);
		    
		
			var formValid = validateSeguroFormWithoutMarks();
			
			if(formValid){
				if(validarCodigoPostal()){
					calcularSeguro();
					
				}
			}else{
				$("#importeSeguro").html("$");
			}
		    
		}else{
			$("#tna").empty();   
			$("#tea").empty();
			$("#monthlypay").html("$");
			$("#totalLoan").text("$");
			$("#minAmount").val("$");
			$('#campania').removeAttr("title");
	      }
		validateCampania();
	});
	
	$('#companiaDeSeguro').on('change', function() {
		$("#seguro-text").html($(this).find(":selected").text());
		
		$("#div-select-seguro").removeClass("has-error");
		$("#help-block-seguro").hide();
		
		if(!$(this).find(":selected").val() == '0'){
			$("#companiaDeSeguro option[value='0']").remove();
		}
		
		var formValid = validateSeguroForm();

		if(formValid){			
			if(validarCodigoPostal()){
				calcularSeguro();
				
			}
		}else{
			$("#importeSeguro").html("$");
		}

	});
	
	$('#provincia').on('change', function() {
		
		$("#div-select-provincia").removeClass("has-error");
		$("#help-block-provincia").hide();
		
		if(!$(this).find(":selected").val() == '0'){
			$("#provincia option[value='0']").remove();
		}

		concesionarios();
		var formValid = validateSeguroForm();
		
		if(formValid){
			if(validarCodigoPostal()){
				calcularSeguro();
				
				
			}
		}else{
			
			if($("#codigoPostalInput").val() && !isNaN($("#codigoPostalInput").val())){
				validarCodigoPostal();
				
			}
			
			$("#importeSeguro").html("$");
			
		}
		
	});
	
	$('#concesionario').on('change', function() {
		
		$("#div-select-concesionario").removeClass("has-error");
		$("#help-block-concesionario").hide();
		
		var formValid = validateSeguroForm();
		if(formValid){			
			if(validarCodigoPostal()){
				calcularSeguro();
			}
		}else{
			$("#importeSeguro").html("$");
		}
		
	});
	
	$.ajax({
		type: "GET",
		url: ctx + "/market-rest/regions.do",
		success: function (data) {
			$.each(data, function(index, item) {
	           $("#provincia").append("<option value='"+item.codigo+"'>"+item.descripcion+"</option>");
	        });
		}
	});
	
	$.ajax({
		type: "GET",
		url: ctx + "/market-rest/companiasSeguro.do",
		success: function (data) {
			$.each(data, function(index, item) {
	           $("#companiaDeSeguro").append("<option value='"+item.codCompania+"'>"+item.descripcion+"</option>");
	        });
		}
	});
	
	$.ajax({
		type: "GET",
		url: ctx + "/market-rest/tiposUsoVehiculo.do",
		success: function (data) {
			$.each(data, function(index, item) {
	           $("#usoVehiculo").append("<option value='"+item.codigo+"'>"+item.descripcion+"</option>");
	        });
		}
	});
	
	var marca = $("#marcaStr").val();
	var idLanding =  $("#idLanding").val();
	$.ajax({
		type: "GET",
		url: ctx + "/market-rest/legales.do",
		data: { 'marca' : marca,
				'idLanding': idLanding
			},
		success: function (data) {
			$("#legales").append(data);
			
		}
	});
	
	
	$("#collapseOne1").on('hidden.bs.collapse', function() {
		var $personPanel = $('#person-panel');
		if($personPanel.is(':visible')) {			
			$('html, body').animate({
		        scrollTop: $personPanel.offset().top
		    });
		}
	});
	
	$('#finCalculator').on('mousedown',function(event){
		
		if(!$(this).hasClass('disabled-psa')){
			
			var formValid = validateSeguroForm();
			if(formValid){
				
				$('.loader-container').show();
				
				var codInfoauto = $("#vehicleVersion option:selected").val();
				
				$.ajax({
					type: "GET",
					url: ctx +  "/market/persona.do",
					data: { 'codInfoauto' : codInfoauto },
					success: function (data) {
						$('#person-panel').html(data);
						
						var stepNumber  = parseInt($("#step-finance-calculator").val());
						stepNumber = stepNumber + 1;
						
						$("#header-person-panel").html(stepNumber + ". Datos Personales");
						$("#step-person-panel").val(stepNumber);
						
						$('#person-panel').show();
						$('#person-panel').removeClass('hidden');
						$('#collapseTwo1').show();
						
						if($("#collapseOne1").is(':visible')){
							$('#firstStep').click();							
						}else{
							$('html, body').animate({
								scrollTop: $('#person-panel').offset().top
							});
						}
						$('.loader-container').hide();
					}
				});
			}
			

		}else{
			var formValid = validateSeguroForm();

			if(formValid){
				
				var infoautoCod = $("#vehicleVersion option:selected").val();
				var coberturaCod = $("#tipoDeCobertura").val();
				var coberturaCod = 0;
				var codPostal = $("#codigoPostalInput").val();
				
				$.ajax({
					type: "GET",
					url: ctx +  "/market-rest/calcularSeguro.do?infoautoCod=" + infoautoCod + "&coberturaCod=" + coberturaCod + "&codPostal=" + codPostal,
					success: function (data) {
						$("#importeSeguro").html("$" + data);
						
						event.stopImmediatePropagation();
						$("#finCalculator").removeClass("disabled-psa");
					}
				});
			}else{
				
				if($("#campania").val() == '-1'){
					$([document.documentElement, document.body]).animate({
						scrollTop: $("#label-campania").offset().top
					}, 1000);
				}
			}
		}
    });
	
}

function calcularSeguro(){

	var coberturaCod = 0;
	var codPostal = $("#codigoPostalInput").val();
	var usoVehiculo = $("#usoVehiculo").val();
	
	var anioVehiculo = $("#anioVehiculo").val();
	var subModeloCod = $("#subModeloCod").val();
	var modeloCod = $("#modeloCod").val();
	var marcaCod = $("#marcaCod").val();
	var valorAuto = $("#valorAuto").val();
	
	$.ajax({
		type: "GET",
		url: ctx + "/market-rest/calcularSeguro.do?codPostal=" + codPostal 
		+ "&coberturaCod=" + coberturaCod + "&usoVehiculo=" + usoVehiculo
		+ "&anioVehiculo=" + anioVehiculo + "&subModeloCod=" + subModeloCod
		+ "&modeloCod=" + modeloCod + "&marcaCod=" + marcaCod + "&valorAuto=" + valorAuto,
		success: function (data) {
			if(!data){
				$("#importeSeguroContainer").html('<span id="importeSeguro" style="color: rgb(169, 68, 66);font-size: 24.9px;" class="">Error</span>');
				$("#finCalculator").addClass("disabled-psa");
			}else{
				$("#importeSeguroContainer").html('<span id="importeSeguro" class="count text-psa">$' + data + '</span>');
				$("#finCalculator").removeClass("disabled-psa");				
			}
		}
	});
}

function validarCodigoPostal(){
	
	
	var codPostal = $("#codigoPostalInput").val();
	var codProvincia = $("#provincia").val();
	
	var codPostalIsValid = false; 
	
	$.ajax({
		type: "GET",
		url: ctx + "/market-rest/validarCodigoPostal.do?codPostal=" + codPostal + "&codProvincia=" + codProvincia,
		async: false,
		success: function (data) {
			
			if(data == false){
				$("#finCalculator").addClass("disabled-psa");
				if(!$("#codPostalInputDiv").hasClass()){
					$("#codPostalInputDiv").addClass("has-error");
					$("#codigoPostalInput").addClass("border-color-error");					
				}
				
				if($("#help-block-codigo-postal").html() != "Ingrese un codigo postal valido para la provincia elegida"){					
					$("#help-block-codigo-postal").html("Ingrese un codigo postal valido para la provincia elegida");
				}
				
				if(!$("#help-block-codigo-postal").is(":visible")){
					$("#help-block-codigo-postal").show();					
				}
				
			}else if(data == true){
				codPostalIsValid = true;
			
			}
		}
	});
	return codPostalIsValid;
}


function concesionarios(){
	
	var marca = $('#marcaCod').val();
	var provincia = $('#provincia').val();
	$('#concesionario').removeAttr("disabled");
	$('.loader-container').show();

$.ajax({
    type: "GET",
    async: false,
    url: ctx + "/market-rest/concesionarios.do",
    data: {
        'marca': marca,
        'provincia': provincia
    },
    success: function(data) {
    	$("#concesionario").empty()
	    			.append("<option value='0'>- CONCESIONARIOS -</option>");
    	$.each(data, function(index, item) {
	           $("#concesionario").append("<option value='"+item.codConcesionario + "_" + item.codConcPSA +"'>"+item.localidad+ " - " + item.direccion +" - " + item.nombre  +"</option>");
	        });
      $('.loader-container').hide();
    },
    error: function(data) {
        $('.loader-container').hide();
        alert("No se pudo obtener el listado de concesionarios disponibles. Por favor intente mas tarde.");
    }
});

}