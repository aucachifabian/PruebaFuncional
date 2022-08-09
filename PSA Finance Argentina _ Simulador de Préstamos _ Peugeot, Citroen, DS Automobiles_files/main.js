$(document).ready(function () {
    var isSignedIn = false;
    /* tooltip Initialization*/
    $('[data-toggle="tooltip"]').tooltip();
    /*Carousel Initialization*/
    $('#finance-carousel, #finance-carousel-mobile').carousel();
    /* Handle click of finance button to show and hide Finance Carousel and buttons */
    $('#f-option-btn,.loader-step3').on('click', function () {
        $('.loader-container').show();
        setTimeout(function() {
            $(this).hide();
            $('.js-finance-option').show();
            $('.loader-container').hide();
        }, 2000)
    });

//    $('.loader-step3').on('click',function(){
//        $('.loader-container').show();
//
//         setTimeout(function() {
//            /*$(this).hide();*/
//            $('.loader-container').hide();
//             goto('step3');
//        }, 2000)
//    });

    
    function openSelectModelSection(){
    	$('.loader-container').show();
    	
    	$('#first-model-panel').empty();
    	
    	$("#finance-calculator-panel").empty();
    	$("#person-panel").empty();
    	$("#summary-panel").empty();
    	$.ajax({
			type: "GET",
			url: "select-model.do",
			success: function (data) {
				$('#first-model-panel').empty().append(data);
				$('.loader-container').hide();
				$('html, body').animate({
			        scrollTop: $('#accordion1').offset().top
			    });
			}
		});
    }
    
    $('#select-model-button').on('click',function(){
    	openSelectModelSection();
    });
    
    $('#select-model-image').on('click',function(){
    	$('#select-model-button').trigger('click');
    });
    
    $('#find-model-image').on('click',function(){
    	$('#find-model-button').trigger('click');
    });
    
    
    function openFindModelSection(){
    	$('.loader-container').show();

    	$('#first-model-panel').empty();
    	
    	$("#finance-calculator-panel").empty();
    	$("#person-panel").empty();
    	$("#summary-panel").empty();
    	$.ajax({
			type: "GET",
			url: "find-model.do",
			success: function (data) {
				$('#first-model-panel').empty().append(data);
				$('.loader-container').hide();
				$('html, body').animate({
			        scrollTop: $('#accordion1').offset().top
			    });
			}
		});
    }
    
    $('#find-model-button').on('click',function(){
    	openFindModelSection();
    });
    
    $('#find-model-find').on('click',function(){
    	$('#find-model-button').trigger('click');
    });
    
    $('.upload-file-btn').on('click', function () {
        var uploadFileBtn = $(this)
            , uploadFileInput = uploadFileBtn.prev();
        uploadFileInput.click();
    });
    $('.drag-and-drop-area input:file').on('change', function () {
        var ele = $(this)
            , uploadedFileName = ele.val();
        ele.closest('div.row').next().removeClass('hidden');
        ele.closest('div.row').next().find('div').eq(1).text(uploadedFileName);
        ele.closest('div.row').addClass('hidden');
    });
    // Setup the Drag & Drop listeners.
    var dropZone = $('.js-upload-file');
    dropZone.on('dragover', handleDragOver);
    dropZone.on('drop', handleFileSelect);
    $('.continue').click(function () {
        $(this).parent().find();
        $('.nav-tabs > .active').next('li').find('a').trigger('click');
    });
    $('.back').click(function () {
        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });
    /* Close the my application status when you click on close button*/
    $('.js-my-application').on('click', function () {
        var ele = $(this);
        ele.parents('#top').siblings('.js-close-app').slideToggle();
    });
    $('.close-app').on('click', function () {
        var ele = $(this);
        ele.closest('.js-close-app').slideUp();
    });


    $('.js-signin-btn').on('click',function(){
        isSignedIn = true;
        $('ul.sidr-hidden>li.sign-in>a').toggleClass('closed');
    });
});

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var ele = $(this);
    var files = evt.originalEvent.dataTransfer.files; // FileList object.
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
        output.push(f.name);
    }
    ele.closest('div.row').next().removeClass('hidden');
    ele.closest('div.row').next().find('div').eq(1).text(output.join(', '));
    ele.closest('div.row').addClass('hidden');
}
/* Prevent browser default behaviour for drag and drop*/
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.originalEvent.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
/*Google Map Initialization*/
function initMap() {
    var pos = {
        lat: 40.4240942
        , lng: -3.599803100000031
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16
        , center: pos
    });
    // Defining the marker on google map
    var marker = new google.maps.Marker({
        position: pos
        , map: map
    , });
    // Add the info when click on the marker
    var infowindow = new google.maps.InfoWindow({
        content: '<div class="media"><div class="media-left media-middle"><a href="#"><img class="media-object" src="img/logo_volkswagen.png" alt="bbva logo"></a></div><div class="media-body auto-width"><h4 class="media-heading"></h4><h5 class="lead">VW Madrid</h5><address>Calle SofÃ­a, 18<br>28022 Madrid, Spain</br><abbr title="Phone">P:</abbr> (123) 456-7890</address></div></div>'
    });
    // Handle click of customer location info
    google.maps.event.addListener(marker, 'click', function () {
        // Calling the open method of the infoWindow
        infowindow.open(map, marker);
    });
}
/*End of Google Map Initialization*/
function goto(obj) {
	
    $('#' + obj).parent('div.panel').removeClass('hidden');
    $('#' + obj).trigger('click');
    $('html, body').animate({
        scrollTop: $('#accordion1').offset().top
    });
    if (obj === 'step4') {
        initMap();
    }
}
$('.js-tabs-content').on('click',function(){
$(this).parent().closest('.row').hide();
$(this).parent().closest('.panel-body').find('.info').hide();
$(this).closest('.panel-body').find('.tabs-wrap').show();
});


function colapsar(tag){
//	debugger;
	$(".in").click();
}

