
var project = "";

$(function () {
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tabs').tabs();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider();

    $('.collection-projects-registered .collection-item')[0].click();
});

$('.collection .collection-item').on('click', function () {
    $(this).siblings().removeClass('collection-active');
    $(this).addClass('collection-active');


})

$('.collection-projects-registered .collection-item').on('click', function(){
    var project_text = $(this).text().split('_');
    project = project_text[0];
    console.log('Conect correct!');
    
    $('.title-project-progress').text(project);

    if(project == '(Q9823) Prepa dual'){
        $('.progress-per-project').css('width', '95%');
        $('.percentage-progress').text('95%');
        $('.progress-step-per-project-title').text('Validación de documentos');
    }else if( project == '(Q3058) Horizonte de oportunidades' ){
        $('.progress-per-project').css('width', '15%');
        $('.percentage-progress').text('15%');
        $('.progress-step-per-project-title').text('Resolución de recomendaciones');
    }else if( project == '(Q2186) CiTeG GTO' ){
        $('.progress-per-project').css('width', '55%');
        $('.percentage-progress').text('55%');
        $('.progress-step-per-project-title').text('Revisión de evaluación');
    }else if( project == '(Q1109) Vivencia Educativa' ){
        $('.progress-per-project').css('width', '5%');
        $('.percentage-progress').text('5%');
        $('.progress-step-per-project-title').text('Validación del plan de mejora');
    }else if( project == '(Q1614) Vocación Docente' ){
        $('.progress-per-project').css('width', '67%');
        $('.percentage-progress').text('67%');
        $('.progress-step-per-project-title').text('Correción del documento de posicionamiento');
    }

});

$('.btn-open-project').on('click', function(){
    var ProyectoDirecciónURL = "Evaluacion_VistaPorProyecto.html";
    localStorage.setItem('ProjectName', project);
    window.location.href = ProyectoDirecciónURL;
});

