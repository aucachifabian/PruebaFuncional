function getJSONFilters(){
	var obj = {};
	var elements = [];
	var price = $("#maxPrice").val();
	var priceFormatted = price.replace("$","");
	
	var modeloId = $("#vehicleModel").val();
	var versionId = $("#vehicleVersion").val();
	
	priceFormatted = priceFormatted.replace(" ","");
	
	priceFormatted = priceFormatted.replace(/\,/g,"");
	
	priceFormatted = priceFormatted.replace(/\./g,"");
	
	
	//elements.push({name:"precio", value : priceFormatted});
	
	obj["precio"] = priceFormatted;
	
	
	obj["versionId"] = versionId;
	obj["modeloId"] = modeloId;			
	
	
	var marcasArray = new Array();
			
	$("#vehicleBrand").find('option').prop('disabled', false);
	if($("#vehicleBrand").val() == "0"){
		$.each($(".marca-checkbox:checked"), function( index, marca) {		
			marcasArray.push(marca.value);
		});
	}else{
		marcasArray.push($("#vehicleBrand").val());
	}
	
    obj["marcasId"] = marcasArray;
	
	var categoriasArray = new Array();
	
	$("#vehicleCategory").find('option').prop('disabled', false);
	if($("#vehicleCategory").val() == "0"){
		$.each($(".category-checkbox:checked"), function( index, categoria) {		
			categoriasArray.push(categoria.value);
		});
	}else{
		categoriasArray.push($("#vehicleCategory").val());		
	}
	
	
	obj["categoriasId"] = categoriasArray;
	
	return JSON.stringify( obj );
}

function buildModelSelect(data){
	$('#vehicleModel').empty();
	
	$('#vehicleModel').append($('<option>', { 
        value: '',
        text : '- Modelo -',
        selected: true
    }));
	
	$.each(data, function(index, item) {
		 $('#vehicleModel').append($('<option>', { 
	        value: item.codigo,
	        text : item.descripcion,
	        idConduciendo: item.idModeloConduciendo
	    }));
	});
}

function buildVersionSelect(data){
	$('#vehicleVersion').empty();
	
	$('#vehicleVersion').append($('<option>', { 
        value: '',
        text : '- Version -',
        selected: true
    }));
	
	
	$.each(data, function(index, item) {
		 $('#vehicleVersion').append($('<option>', {
			 value: item.codigoInfoAuto,
		     text : item.descripcionSubModelo + ' - ' + accounting.formatMoney(item.importe, "$", 0, ".", ","),
	    }));
	});
}

function loadModelSelect(asyncTask){
	$('.loader-container').show();
	$('#vehicleVersion').empty();
	$('marcaStr').val($("#vehicleBrand>option:selected").html());
	var idMarca = $('#vehicleBrand').val();
	$.ajax({
		type: "GET",
		url: "../market-rest/modelos.do",
		data: { 'id' : idMarca },
		success: function (data) {
			buildModelSelect(data);
			$('.loader-container').hide();
		},
		async: asyncTask
	});
}

function loadVersionSelect(asyncTask){
	$('.loader-container').show();
	var idModelo = $('#vehicleModel').val();
	var idMarca = $('#vehicleBrand').val();
	$.ajax({
		type: "GET",
		url: "../market-rest/versiones.do",
		data: { 'id' : idModelo, 'idMarca': idMarca },
		success: function (data) {
			buildVersionSelect(data);
			$('.loader-container').hide();
		},
		async: asyncTask
	});
}


(function($) {
	 $.fn.formSearchToJSONString = function () {
		 
			var obj = {};
			var elements = [];
			var price = $("#priceAmount").val();
			
			
			
			var priceFormatted;
			
			if(price != null){
				
				priceFormatted = price.replace("$","");
				
				priceFormatted = priceFormatted.replace(" ","");
				
				priceFormatted = priceFormatted.replace(/\,/g,"");
				
				priceFormatted = priceFormatted.replace(/\./g,"");
			}else{
				priceFormatted = 3500000;			
			}
			
			
			obj["precio"] = priceFormatted;
			
			
			
			for( var i = 0; i < elements.length; ++i ) {
				var element = elements[i];
				var name = element.name;
				var value = element.value;

				if( name ) {
					obj[ name ] = value;
				}
			}
			
			var marcasArray = new Array();
			$.each($(".marca-checkbox:checked"), function( index, marca) {		
				marcasArray.push(marca.value);
			});
		    obj["marcasId"] = marcasArray;
		    
		    
			
			var doorsArray = new Array();
			$.each($(".doors-checkbox:checked"), function( index, door) {		
				doorsArray.push(door.value);
			});
		    obj["cantidadPuertas"] = doorsArray;
			
			var categoriasArray = new Array();
			$.each($(".category-checkbox:checked"), function( index, categoria) {		
				categoriasArray.push(categoria.value);
			});
			obj["categoriasId"] = categoriasArray;
			
			return JSON.stringify( obj );
		};
})(jQuery);

function generateMarcaString(){
	
	
	var marcaString = "";
	
	
	$.each($(".marca-checkbox:checked"), function( index, marca) {
		marcaString = marcaString + $("#label-marca-" + marca.value).html() + ", ";
	});
	
	marcaString = marcaString.replace(/,\s*$/, "");
	
	return marcaString;
   
}

function generateCategoryString(){
	
	var categoryString = "";
	
	$.each($(".category-checkbox:checked"), function( index, categoria) {		
		categoryString = categoryString + $("#label-category-" + categoria.value).html() + ", ";
	});
	
	categoryString = categoryString.replace(/,\s*$/, "");
	
	return categoryString;
   
}

function markAllCategories(){
	
	$(".category-checkbox").prop("checked", true);
//	$('#checkIcon').unbind('click');
//	//$("#checkIcon").click(unmarkAllCategories());
//	
//	$("#checkIcon").on( "click", function() {
//		unmarkAllCategories()
//	});
	
	$("#checkCategoriesIcon").attr("onclick","unmarkAllCategories()");
	
	
	$("#checkCategoriesIcon span").removeClass("glyphicon-check")
	$("#checkCategoriesIcon span").addClass("glyphicon-unchecked");
	
	
	
	return false;
	//$("#checkIcon").prop("onclick", "unmarkAllCategories()");	
}

function unmarkAllCategories(){
	$(".category-checkbox").prop("checked", false);
//	$("#checkIcon").click(markAllCategories());
	$("#checkCategoriesIcon").attr("onclick","markAllCategories()");
	
	$("#checkCategoriesIcon span").removeClass("glyphicon-unchecked")
	$("#checkCategoriesIcon span").addClass("glyphicon-check");
	
	return false;
}

function markAllMarcas(){
	$(".marca-checkbox").prop("checked", true);
	
	$("#checkMarcasIcon").attr("onclick","unmarkAllMarcas()");
	
	$("#checkMarcasIcon span").removeClass("glyphicon-check")
	$("#checkMarcasIcon span").addClass("glyphicon-unchecked");

}

function unmarkAllMarcas(){
	$(".marca-checkbox").prop("checked", false);
	
	$("#checkMarcasIcon").attr("onclick","markAllMarcas()");
	
	$("#checkMarcasIcon span").removeClass("glyphicon-unchecked")
	$("#checkMarcasIcon span").addClass("glyphicon-check");

}

function markAllPuertas(){
	$(".doors-checkbox").prop("checked", true);
	
	$("#checkPuertasIcon").attr("onclick","unmarkAllPuertas()");
	
	$("#checkPuertasIcon span").removeClass("glyphicon-check")
	$("#checkPuertasIcon span").addClass("glyphicon-unchecked");
	
}

function unmarkAllPuertas(){
	$(".doors-checkbox").prop("checked", false);
	
	$("#checkPuertasIcon").attr("onclick","markAllPuertas()");
	$("#checkPuertasIcon span").removeClass("glyphicon-unchecked")
	$("#checkPuertasIcon span").addClass("glyphicon-check");
}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

function makeEqualRowHeight(){
    $(".page-active .row-search-result").each(function(){
        $(this).find(".titulo-modelo-busqueda").height('auto');
        var c = [];
        for(var i=0; i < $(this).find(".titulo-modelo-busqueda").length; i++){
            var height = $(this).find(".titulo-modelo-busqueda").eq(i).outerHeight();
            c.push(height)
        }
        $(this).find(".titulo-modelo-busqueda").outerHeight( Math.max.apply(Math,c));
    });
}
	