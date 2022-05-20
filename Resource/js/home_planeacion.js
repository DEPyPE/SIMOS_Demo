
$(function(){
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tabs').tabs();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
});

$('.collection .collection-item').on('click', function(){
    $(this).siblings().removeClass('collection-active');
    $(this).addClass('collection-active');


})
