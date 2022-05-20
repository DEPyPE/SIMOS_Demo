
$(function(){
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tabs').tabs();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider();
    $('select').formSelect();
});

function Get_ProjectData(UserID){
    var TypDat = "ProjectInfo";

    $.post("Controller/HomeEPP_ReadController.php", {ID: UserID, TypeData: TypDat}, function(DataProject){
        ProjectData = JSON.parse( DataProject );
        localStorage.setItem("ProjectInfo", JSON.stringify(ProjectData) );

        console.log( "Project information => " + ProjectData );
    });
}

$('.btn-login').on('click', function(){
    var user = $('#txt_user').val();
    var pass = $('#txt_password').val();
    console.log(pass);

    $.post("Controller/IndexController.php", {NameUser: user, Password: pass}, function( Data ) {
        var UserData = JSON.parse( Data );

        if( UserData.Status == "Correct" ){
            localStorage.setItem("UserData", JSON.stringify(UserData) );
            Get_ProjectData( UserData.ID_Usuario );
            
            M.toast({html: '¡Bienvenido!', classes: 'green rounded'});

            setTimeout( function(){
                window.location = UserData.URL;
            }, 1000 );

        }else if( UserData.Status == "More users" ){
            M.toast({html: 'Existen más de un usuario registrado <br> con el mismo correo', classes: 'red lighten-1 rounded center-align'});

        }else{
            M.toast({html: 'Correo o contraseña incorrectos', classes: 'red rounded'});
        }

        console.log( "User information => " + UserData );
    });

});


