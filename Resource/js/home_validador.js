
var project = "";

$(function () {
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tabs').tabs();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider();

    $('.progress-per-project').css('width', '65%');
    $('.percentage-progress').text('65%');
    $('.progress-step-per-project-title').text('Validación de documentos');
});


$('.btn-open-project').on('click', function(){
    var ProyectoDirecciónURL = "vista_por_proyecto.html";
    localStorage.setItem('ProjectName', project);
    window.location.href = ProyectoDirecciónURL;
});

