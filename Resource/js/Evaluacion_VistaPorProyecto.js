
var ProjectName = localStorage.getItem('ProjectName');

$(function () {
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tabs').tabs();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider();

/*  Inicialización de elementos del proyecto*/
    $('.title-project').text(ProjectName);
    $('.collection-menu-documentos-items .type-document')[0].click();   
    $('.collection-step-menu .collection-item')[0].click();
    
    console.log('Ready');
});

$('.collection-step-menu .collection-item').on('click', function(){
    $(this).siblings().removeClass('collection-active');
    $(this).addClass('collection-active');

    var type_document = $(this).text().split("  ")[1];

    if( type_document == "Posicionamiento" ){
        $('.collapsible-posicionamiento-asm').slideDown(200);
        $('.collapsible-plan-de-trabajo-asm').slideUp(50);
    }else if( type_document == "Plan de trabajo" ){
        $('.collapsible-posicionamiento-asm').slideUp(50);
        $('.collapsible-plan-de-trabajo-asm').slideDown(200);
    }

    console.log( type_document );
});

$('.collapsible .collapsible-header').on('click', function(){
    $(this).addClass('collapsible-active');
    $(this).parent().siblings().children().removeClass('collapsible-active');
});

$('.collection-menu-documentos-items .type-document').on('click', function(){
    $(this).children().text('_chevron_right');
    $(this).siblings().children().text(' ');

    $(this).addClass('active-document');
    $(this).siblings().removeClass('active-document');

    var type_document = $(this).text().split('_')[0];
    var name_document = "Resource/files/";

    if( type_document == "Posicionamiento" ){
        name_document = name_document + "Formato de posicionamiento_2019.pdf";
        $('.document-viewer').slideDown(200);
        $('.others-documents').slideUp(50);
    }else if( type_document == "Plan de trabajo" ){
        name_document = name_document + "plan_de_trabajo.pdf";
        $('.document-viewer').slideDown(200);
        $('.others-documents').slideUp(50);
    }else if( type_document == "Otros documentos" ){
        $('.document-viewer').slideUp(50);
        $('.others-documents').slideDown(200);
    }

    $('.document-show').attr('src', name_document);
});

$('.collection .collection-item').on('click', function(){
    var texto_recomendacion = $(this).text().split('-');

    $('.modal_id_recomendation').text( texto_recomendacion[0] );
    $('.modal_recomendation_info').text( texto_recomendacion[1] );
});

$('.btn-recomendation-complete').on('click', function(){
    M.toast({html: 'Recomendación atendida', classes: 'rounded'});
    $(this).addClass('disabled');
});

$('.collection-documents-evidence .collection-documents-evidence-item').on('click', function(){
    console.log( $(this).children() );    
});

$('.collection-documents-evidence .collection-documents-evidence-item').hover(function(){    
    console.log( 'Item clicked' );

});

$('.btn-delete-document').on('click', function(){
    
});

$('.btn-confirm-delete').on('click', function(){
    M.toast({html: 'Documento eliminado', classes: 'rounded'});    
});
