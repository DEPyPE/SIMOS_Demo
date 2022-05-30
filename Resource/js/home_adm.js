
var UserData                    = JSON.parse( localStorage.getItem("UserData")                  );
var ProjectInfo                 = JSON.parse( localStorage.getItem("ProjectInfo")               ); 
var FTProyecto                  = JSON.parse( localStorage.getItem("FTProyecto")                );
var FTEvaluacion                = JSON.parse( localStorage.getItem("FTEvaluacion")              );
var OpinionGeneral              = JSON.parse( localStorage.getItem("GeneralOpinion")            );
var ComentariosPorTema          = JSON.parse( localStorage.getItem("ComentariosPorTema")        );
var TemasComentariosPorTema     = JSON.parse( localStorage.getItem("TemasComentariosPorTema")   );
var PlanDeMejora                = JSON.parse( localStorage.getItem("PlanDeMejora")              );

function ShowInformationProject(){

    Read_ProjectData();
    Read_FTEvaluation();
    Read_OpinionGeneral();
    Read_Recomendaciones();
    //Read_ProjectDocuments();

    var FichaTecnicaProyecto    = JSON.parse( localStorage.getItem("FichaTecnicaProyecto"   ));
    var FichaTecnicaEvaluacion  = JSON.parse( localStorage.getItem("FichaTecnicaEvaluacion" ));
    var OpinionGeneral          = JSON.parse( localStorage.getItem("OpinionGeneral"         ));
    var Recomendaciones         = JSON.parse( localStorage.getItem("Recomendaciones"        ));
    var DocumentosProyecto      = JSON.parse( localStorage.getItem("DataDocuments"          ));

}

$(function(){
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tabs').tabs();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.tooltipped').tooltip();
    $('.datepicker').datepicker();
    $('select').formSelect();

    Read_ProjectData();
    Read_FTEvaluation();
    Read_OpinionGeneral();
    Read_ComentariosEspecificosPorTema();
    Read_TemasComentariosPorTema();
    Read_Recomendaciones();


});

// *****   FICHA TÉCNICA DEL PROYECTO   ******
// * * * * Funciones CRUD y eventos:
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateView_FTProject(){
    //console.log( "Ficha técnica del proyecto => ",  FichaTecnicaProyecto );

    if( FTProyecto.Status == "Correct" ){
        $('.btn-add-project-information').hide();
        $('.btn-edit-project-information').show();
        $('.btn-save-project-information').hide();
        $('.btn-update-project-information').show();
        $('.table-ficha-tecnica-proyecto').show();
        $('.NoFTProjectInformation').hide();

        if( FTProyecto.ValidacionInfo == 0 ){
            $('.validation-ft-programa').hide();
            $('.btn-edit-project-information').show();
        }else{
            $('.validation-ft-programa').show();
            $('.btn-edit-project-information').hide();
        }

        $('.main-title-project').text( 'SIMOS / '+FTProyecto.ClaveProyecto+' (Admin)');
        $('.NombreProyecto').text( FTProyecto.NombreProyecto );
        $('.ClaveProyecto').text( FTProyecto.ClaveProyecto );
        $('.DependenciaProyecto').text( FTProyecto.DependenciaDelProyecto );
        $('.SiglasDependencia').text( FTProyecto.SiglasDependenciaProyecto );
        $('.UnidadResponsable').text( FTProyecto.UnidadResponsable );
        $('.SiglasUnidadResponsable').text( FTProyecto.SiglasUnidadResponsable );
        $('.NombreResponsable').text( FTProyecto.NombreResponsable );
    }else if( FTProyecto.Status == "Sin resultados" ){
        $('.table-ficha-tecnica-proyecto').hide();
        $('.NoFTProjectInformation').show();
        $('.validation-ft-programa').hide();
        $('.main-title-project').text( 'SIMOS / Sin programa o proyecto');

        $('.btn-add-project-information').show();
        $('.btn-edit-project-information').hide();

        $('.btn-save-project-information').show();
        $('.btn-update-project-information').hide();
    }else{
        M.toast({html: 'Error al mostrar la ficha técnica \n del proyecto. Err. 0001', classes: 'red lighten-1 rounded'});
    }

    $('.ValidateInformationProjectCheckbox').prop('checked')
}

function Create_ProjectData(ProjectData){
    // ASIGNAR DATOS AL OBJETO
}

function Read_ProjectData(){
    UpdateView_FTProject();
}

function Update_ProjectData(){
    FTProyecto.NombreProyecto = $('#txtNombreProyecto').val();
    FTProyecto.ClaveProyecto = $('#txtClaveProyecto').val();
    FTProyecto.DependenciaDelProyecto = $('#txtDepen').val();
    FTProyecto.SiglasDependenciaProyecto = $('#txtSiglasDependencia').val();
    FTProyecto.UnidadResponsable = $('#txtUR').val();
    FTProyecto.SiglasUnidadResponsable = $('#txtSiglasUR').val();
    FTProyecto.NombreResponsable = $('#txtResponsable').val();
    FTProyecto.ValidacionInfo = $('.ValidateInformationProjectCheckbox').prop('checked');

    localStorage.setItem('FTProyecto', JSON.stringify(FTProyecto) );
    UpdateView_FTProject();
}

$('.btn-save-project-information').on('click', function(){
    var ProjectData = ReadForm_ProjectData();
    Create_ProjectData( ProjectData );
});

$('.btn-update-project-information').on('click', function(){
    Update_ProjectData();
    $('#ModalAddModifyTechnicalProjectInfo').modal('close');
});

$('.btn-edit-project-information').on('click', function(){
    $('#txtNombreProyecto').val( FTProyecto.NombreProyecto ),
    $('#txtClaveProyecto').val( FTProyecto.ClaveProyecto ),
    $('#txtDepen').val( FTProyecto.DependenciaDelProyecto ),
    $('#txtSiglasDependencia').val( FTProyecto.SiglasDependenciaProyecto ),
    $('#txtUR').val( FTProyecto.UnidadResponsable ),
    $('#txtSiglasUR').val( FTProyecto.SiglasUnidadResponsable ),
    $('#txtResponsable').val( FTProyecto.NombreResponsable )
});

// *****   FICHA TÉCNICA DE LA EVALUACIÓN   ******
// * * * * Funciones CRUD y eventos:
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateView_FTEvaluation(){
    if( FTEvaluacion.Status == "Correct" ){
        $('.table-evaluation').show();
        $('.NoFTEvaluationInformation').hide();
        
        $('.btn-add-evaluation-information').hide();
        $('.btn-edit-evaluation-information').show();
        $('.btn-insert-evaluation-information').hide();
        $('.btn-update-evaluation-information').show();

        if( FTEvaluacion.ValidacionInfo == 0 ){
            $('.validation-ft-evaluation').hide();
            $('.btn-edit-evaluation-information').show();
        }else{
            $('.validation-ft-evaluation').show();
            $('.btn-edit-evaluation-information').hide();
        }
        
        $('.InstanciaEvaluadora').text( FTEvaluacion.InstanciaEvaluadora );
        $('.NombreDeEvaluacion').text( FTEvaluacion.NombreDeEvaluacion );
        $('.TipoEvaluacion').text( FTEvaluacion.TipoEvaluacion );
        $('.AñoDeEvaluacion').text( FTEvaluacion.AñoDeEvaluacion );
        $('.NombreDelInforme').text( FTEvaluacion.NombreDelInforme );
        $('.CostoEvaluacion').text( '$'+FTEvaluacion.CostoEvaluacion );
    }else if( FTEvaluacion.Status == "Sin resultados" ){
        $('.table-evaluation').hide();
        $('.NoFTEvaluationInformation').show();
        $('.validation-ft-evaluation').hide();

        $('.btn-add-evaluation-information').show();
        $('.btn-edit-evaluation-information').hide();
        $('.btn-insert-evaluation-information').show();
        $('.btn-update-evaluation-information').hide();
    }else{
        M.toast({html: 'Error al mostrar la ficha técnica \n de la evaluación. Err. 001', classes: 'red lighten-1 rounded'});
    }
}

function Create_EvaluationData(){
    // ASIGNAR A UN OBJETO LOS DATOS DEL FORMULARIO
}

function Read_FTEvaluation(){
    UpdateView_FTEvaluation();
}

function Update_EvaluationData(){
    FTEvaluacion.InstanciaEvaluadora = $("#txtInstanciaEvaluadora").val();
    FTEvaluacion.NombreDeEvaluacion = $("#txtNombreEvaluacion").val();
    FTEvaluacion.TipoEvaluacion = $("#txtTipoEvaluacion").val();
    FTEvaluacion.AñoDeEvaluacion = $("#txtYearEvaluation").val();
    FTEvaluacion.NombreDelInforme = $("#txtNombreInforme").val();
    FTEvaluacion.CostoEvaluacion = $("#txtCostoEvaluacion").val();
    FTEvaluacion.ValidacionInfo = $('.ValidateInformationEvaluationCheckbox').prop('checked');

    localStorage.setItem('FTEvaluacion', JSON.stringify(FTEvaluacion) );
    UpdateView_FTEvaluation();
}

$('.btn-insert-evaluation-information').on('click', function(){
    Create_EvaluationData();
});

$('.btn-update-evaluation-information').on('click', function(){
    Update_EvaluationData();
    $('#ModalAddModifyTechnicalEvaluationInfo').modal('close');
});

$('.btn-edit-evaluation-information').on('click', function(){
    $("#txtInstanciaEvaluadora").val( FTEvaluacion.InstanciaEvaluadora );
    $("#txtNombreEvaluacion").val( FTEvaluacion.NombreDeEvaluacion );
    $("#txtTipoEvaluacion").val( FTEvaluacion.TipoEvaluacion );
    $("#txtYearEvaluation").val( FTEvaluacion.AñoDeEvaluacion );
    $("#txtNombreInforme").val( FTEvaluacion.NombreDelInforme );
    $("#txtCostoEvaluacion").val( FTEvaluacion.CostoEvaluacion );
});


// *****   OPINIÓN GENERAL   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateView_OpinionGeneral(){

    if( OpinionGeneral.Status == "Correct" ){
        $('#ComentariosObservacionesGenerales').show();
        $('#ComentariosObservacionesGenerales').val( OpinionGeneral.ComentariosObservacionesGenerales );
        M.textareaAutoResize($('#ComentariosObservacionesGenerales'));
        
        $('.OG_SinInfo').css('display', 'none');

        console.log( OpinionGeneral.Observaciones.Status );
        if( OpinionGeneral.Observaciones.Status ){
            $('.ValidatorObservationContainer').show();
            $('.NoValidatorObservationContainer').hide();
            $('#ValidatorObservation_Text').val( OpinionGeneral.Observaciones.ObservacionTexto );
            $('.estatus-observacion-posicionamiento').text( OpinionGeneral.Observaciones.ObservationState );

        }else{
            $('.ValidatorObservationContainer').hide();
            $('.NoValidatorObservationContainer').show();            
            $('.estatus-observacion-posicionamiento').html( "<h5><strong>"+OpinionGeneral.Observaciones.ObservationState+"</strong></h5>" );
        }
        
        $('.btn-add-opinion-general').hide();
        $('.btn-edit-general-comments').show();
        $('.btn-edit-specific-comments').show();
        $('.btn-insert-opinion-general').hide()
    }else if( OpinionGeneral.Status == "Sin resultados" ){
        $('.OG_SinInfo').css('display', 'block');

        $('#ComentariosObservacionesGenerales').hide();
        $('.btn-add-opinion-general').show();
        $('.btn-edit-general-comments').hide();
        $('.btn-edit-specific-comments').hide();
        $('.btn-insert-opinion-general').show();
    }else{
        M.toast({html: 'Error al mostrar la opinión general. Err. 0001', classes: 'red rounded'});
    }
}

function Create_OpinionGeneral(OpinionForm){
    UpdateView_OpinionGeneral();
}

function Read_OpinionGeneral(){
    UpdateView_OpinionGeneral();
}

function Update_GeneralComments(){
    OpinionGeneral.ComentariosObservacionesGenerales = $('#txtComentariosGenerales').val();
    localStorage.setItem("GeneralOpinion", JSON.stringify(OpinionGeneral) );
    
    M.toast({html: 'Opinión general actualizada correctamente', classes: 'green rounded'});
    UpdateView_OpinionGeneral();
}

$('.btn-insert-opinion-general').on('click', function(){
    Create_OpinionGeneral();
});

$('.btn-modify-general-comments').on('click', function(){   
    $('#ModalModifyGeneralComments').modal('close');
    Update_GeneralComments();
});

$('.btn-edit-general-comments').on('click', function(){
     $('#txtComentariosGenerales').val( $('#ComentariosObservacionesGenerales').val() );
     M.textareaAutoResize($('#txtComentariosGenerales'));
});

// *****   COMENTARIOS Y OBSERVACIONES ESPECÍFICOS POR TEMA   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateView_ComPorTema(){

    if( ComentariosPorTema.Status == "Correct" ){
        $('#ComentariosObservacionesEspecificosPorTema_Titulo').show();

        $('#ComentariosObservacionesEspecificosPorTema_Titulo').val( ComentariosPorTema.ComentariosObservacionesPorTema );
        M.textareaAutoResize($('#ComentariosObservacionesEspecificosPorTema_Titulo'));
        
        $('.OG_SinInfo').css('display', 'none');
        
        $('.btn-add-opinion-general').hide();
        $('.btn-edit-general-comments').show();
        $('.btn-edit-specific-comments').show();
        $('.btn-insert-opinion-general').hide()
    }else if( ComentariosPorTema.Status == "Sin resultados" ){
        $('.OG_SinInfo').css('display', 'block');
        $('.ComentariosObservacionesEspecificosPorTema_Titulo').hide();

        $('.btn-add-opinion-general').show();
        $('.btn-edit-general-comments').hide();
        $('.btn-edit-specific-comments').hide();
        $('.btn-insert-opinion-general').show();
    }else{
        M.toast({html: 'Error al mostrar la opinión general. Err. 0001', classes: 'red rounded'});
    }
}

function Read_ComentariosEspecificosPorTema(){
    UpdateView_ComPorTema();
}

function Update_ComentariosPorTema(){
    ComentariosPorTema.ComentariosObservacionesPorTema = $('#txtComentariosPorTemaTitulo').val()
    localStorage.setItem('ComentariosPorTema', ComentariosPorTema);
    $('#ModalModifyGeneralSpecificComments_Titulo').modal('close');

    UpdateView_ComPorTema();
}

$('.btn-edit-specific-comments-title').on('click', function(){
    $('#txtComentariosPorTemaTitulo').val( $('#ComentariosObservacionesEspecificosPorTema_Titulo').val() );
    M.textareaAutoResize($('#txtComentariosPorTemaTitulo'));
});

$('.btn-modify-portema-titulo').on('click', function(){
    Update_ComentariosPorTema();
});

// *****   TEMAS Y CONTENIDO DE LOS COMENTARIOS Y OBSERVACIONES ESPECÍFICOS POR TEMA   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateVIew_TemasComentariosPorTema(){

    if( TemasComentariosPorTema.Status == "Correct" ){
        
        var TextInner = "<tr>";

        for(var i=0; i<TemasComentariosPorTema.Length; i++ ){

            if( TemasComentariosPorTema[i].Observaciones.Status ){
                ObservationStatus = "<td class='center-align'><i class='material-icons'>"+TemasComentariosPorTema[i].Observaciones.IconState+"</i></td>";
            }else{
                ObservationStatus = "<td></td>";
            }

            TextInner = TextInner + "<tr class='rowtable'>"+
                                         "<td> <i class='hide-id-tema'>"+TemasComentariosPorTema[i].ID_TemaComentariosPorTema+"</i> <strong>"+TemasComentariosPorTema[i].TituloTema+"</strong></td>"+
                                         "<td>"+TemasComentariosPorTema[i].TextoTema+"</td>"+
                                         ObservationStatus+
                                    "</tr>";
        }

        $('.Table_TemasComentariosPorTema').html( TextInner )
        
        console.log(  );
        
    }else if( TemasComentariosPorTema.Status == "Sin resultados" ){
        
    }else{
        M.toast({html: 'Error al mostrar la opinión general. Err. 0001', classes: 'red rounded'});
    }
}

function Read_TemasComentariosPorTema(){
    UpdateVIew_TemasComentariosPorTema();
}

function Update_TemasComentariosPorTema(id_tema){    
    TemasComentariosPorTema[id_tema-1].TituloTema = $('#txtModalTituloTema').val();
    TemasComentariosPorTema[id_tema-1].TextoTema = $('#txtModalContenidoTema').val();
    TemasComentariosPorTema[id_tema-1].Observaciones.ObservationState = 'Enviado para validacion';

    localStorage.setItem('TemasComentariosPorTema', JSON.stringify(TemasComentariosPorTema));
    
    $('#ModalModifyDataTheme').modal('close');
    M.toast({html: 'Información actualizada correctamente', classes: 'green rounded'});

    UpdateVIew_TemasComentariosPorTema();
}

$('.table-observaciones-especificas').on('click', '.Table_TemasComentariosPorTema .rowtable', function(){
    var id_tema = $(this).find('.hide-id-tema')[0].innerText;

    $('.id_observacion_modal').text( id_tema );

    $('#ModalModifyDataTheme').modal('open');
    $('#txtModalTituloTema').val( TemasComentariosPorTema[id_tema-1].TituloTema );
    M.textareaAutoResize($('#txtModalTituloTema'));

    $('#txtModalContenidoTema').val( TemasComentariosPorTema[id_tema-1].TextoTema );
    M.textareaAutoResize( $('#txtModalContenidoTema') );

    if( TemasComentariosPorTema[id_tema-1].Observaciones.Status ){
        $('.title-ObservacionValidador').show();
        $('.NoValidatorComment').hide();

        $('#txtModalObservacionValidador').show();
        $('#txtModalObservacionValidador').val( TemasComentariosPorTema[id_tema-1].Observaciones.ObservacionTexto );
        $('.status-observacion-enviada').text( TemasComentariosPorTema[id_tema-1].Observaciones.ObservationState );

        if( TemasComentariosPorTema[id_tema-1].Observaciones.ObservationState == 'Con observaciones' ){
            $('.btn-send-for-validation').show();
            $('.btn-modify-tema-especifico').show();
        }else{
            $('.btn-send-for-validation').hide();
            $('.btn-modify-tema-especifico').hide();
            $('.estatus-observacion-enviada-container').show();
        }

        $('.estatus-observacion-enviada-container').show();
    }else{
        $('.NoValidatorComment').show();
        $('.title-ObservacionValidador').hide();
        $('.btn-send-for-validation').hide();
        $('#txtModalObservacionValidador').hide();
        $('.btn-modify-tema-especifico').hide();
        $('.estatus-observacion-enviada-container').hide();
    }
});

$('.btn-modify-tema-especifico').on('click', function(){
    var idtema = $('.id_observacion_modal').text();
    
    Update_TemasComentariosPorTema(idtema);
});

$('.btn-send-for-validation').on('click', function(){
    var idtema = $('.id_observacion_modal').text();

    $(this).attr('disabled', 'disabled');
    TemasComentariosPorTema[idtema - 1].Observaciones.IconState = 'unarchive';
});

// *****   PLAN DE MEJORA   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update
// * * (D) Delete

function UpdateView_RecomendacionesAComprometer(){
    var table_recomendaciones = "";
    var asm_complete_flag;

    if( PlanDeMejora.Status == "Correct" ){
        $('.table-plan-de-mejora').show();

        for(var i=0; i<PlanDeMejora.Length; i++){

            if( PlanDeMejora[i].Propiedades.EstatusRecomendacion == "Atendido" )
                asm_complete_flag = "complete";
            else if( PlanDeMejora[i].Propiedades.EstatusRecomendacion == "En proceso" )
                asm_complete_flag = "in-process";
            else if( PlanDeMejora[i].Propiedades.EstatusRecomendacion == "Sin atender" )
                asm_complete_flag = "incomplete";

            if( PlanDeMejora[i].Propiedades.Observaciones.Status )
                RecomendationButton = "<a class='btn-floating btn-small btn-show-observation modal-trigger waves-effect light-blue darken-2 right' href='#ModalShowObservation'><i class='material-icons'>assignment</i></a>";
            else
                RecomendationButton = '';
            
            if( PlanDeMejora[i].Propiedades.TipoRecomendacion == "AComprometer" ){
                table_recomendaciones = table_recomendaciones +
                "<tr>"+ 
                    "<td class='center-align'> <div class='asm-status-style-"+asm_complete_flag+"'></div></td>"+
                    "<td class='NumASM center-align'>"+ String(i+1) +"</td>"+
                    "<td>"+ PlanDeMejora[i].ASM +"</td>"+
                    "<td>"+ PlanDeMejora[i].TipoDeActores +"</td>"+
                    "<td class='center-align'>"+ PlanDeMejora[i].Prioridad +"</td>"+
                    "<td>"+ PlanDeMejora[i].AccionDeMejora +"</td>"+
                    "<td>"+ PlanDeMejora[i].AreaResponsable +"</td>"+
                    "<td class='center-align'>"+ PlanDeMejora[i].FechaCompromiso +"</td>"+
                    "<td>"+ PlanDeMejora[i].ResultadosEsperados +"</td>"+
                    "<td>"+ PlanDeMejora[i].Evidencia +
                        "<div class='options-recomendation-container'>"+
                            "<a class='btn-floating btn-small btn-delete-recomendation  modal-trigger waves-effect red darken-2 right' href='#ModalDeleteRecomendation'><i class='material-icons'>delete</i></a>"+
                            "<a class='btn-floating btn-small btn-edit-recomendation    modal-trigger waves-effect yellow darken-2 right' href='#ModalAddModifyPlanMejora'><i class='material-icons'>edit</i></a>"+
                            RecomendationButton +
                        "</div>"+
                    "</td>"+
                "</tr>";
            }
        }

        $('.no-data-recomendaciones').css('display', 'none');
        $('.with-data-recomendaciones').css('display', 'block');

        $('.TableBody-RecomendacionesAComprometer').empty();
        $('.TableBody-RecomendacionesAComprometer').append( table_recomendaciones );
    }else if( PlanDeMejora.Status == "Sin resultados" ){
        $('.no-data-recomendaciones').css('display', 'block');
        $('.with-data-recomendaciones').css('display', 'none');
        $('.card-plan-de-mejora').css('display', 'none');
        $('.table-plan-de-mejora').hide();
    }else{
        M.toast({html: 'Error al mostrar el plan de mejora. Err. 0001', classes: 'red rounded'});
    }
}

function UpdateView_RecomendacionesAtendidas(){
    var table_recomendaciones = "";

    if( PlanDeMejora.Status == "Correct" ){
        $('.table-plan-de-mejora').show();

        for(var i=0; i<PlanDeMejora.Length; i++){
            if( PlanDeMejora[i].Propiedades.TipoRecomendacion == "Atendida" ){
                table_recomendaciones = table_recomendaciones +
                "<tr>"+ 
                    "<td> <p class='id_RecomendacionAtendida'>"+i+"</p><p>"+ PlanDeMejora[i].ASM +"</p></td>"+
                    "<td>"+ PlanDeMejora[i].Evidencia +"</td>"+
                    "<td>"+ PlanDeMejora[i].Propiedades.Observaciones.ObservacionTexto +"</td>"+
                "</tr>";
            }
        }

        $('.no-data-recomendaciones').css('display', 'none');
        $('.with-data-recomendaciones').css('display', 'block');

        $('.TableBody-RecomendacionesAtendidas').empty();
        $('.TableBody-RecomendacionesAtendidas').append( table_recomendaciones );
    }else if( PlanDeMejora.Status == "Sin resultados" ){
        $('.no-data-recomendaciones').css('display', 'block');
        $('.with-data-recomendaciones').css('display', 'none');
        $('.card-plan-de-mejora').css('display', 'none');
        $('.table-plan-de-mejora').hide();
    }else{
        M.toast({html: 'Error al mostrar el plan de mejora. Err. 0001', classes: 'red rounded'});
    }

}

function UpdateView_RecomendacionesRechazadas(){
    
    var table_recomendaciones = "";
    var asm_complete_flag;
    var PlanDeMejora = JSON.parse( localStorage.getItem( "PlanDeMejora" ) );

    if( PlanDeMejora.Status == "Correct" ){
        $('.table-plan-de-mejora').show();

        for(var i=0; i<PlanDeMejora.Length; i++){
            asm_complete_flag = "complete";
            
            if( PlanDeMejora[i].Propiedades.TipoRecomendacion == "Rechazada" ){
                table_recomendaciones = table_recomendaciones +
                "<tr>"+ 
                    "<td><p class='id_RecomendacionAtendida'>"+i+"</p>"+ PlanDeMejora[i].ASM +"</td>"+
                    "<td>"+ PlanDeMejora[i].Propiedades.Observaciones.ObservacionTexto +"</td>"+
                "</tr>";
            }
        }

        $('.no-data-recomendaciones').css('display', 'none');
        $('.with-data-recomendaciones').css('display', 'block');

        $('.TableBody-RecomendacionesRechazadas').empty();
        $('.TableBody-RecomendacionesRechazadas').append( table_recomendaciones );
    }else if( PlanDeMejora.Status == "Sin resultados" ){
        $('.no-data-recomendaciones').css('display', 'block');
        $('.with-data-recomendaciones').css('display', 'none');
        $('.card-plan-de-mejora').css('display', 'none');
        $('.table-plan-de-mejora').hide();
    }else{
        M.toast({html: 'Error al mostrar el plan de mejora. Err. 0001', classes: 'red rounded'});
    }

}

function Create_Recomendacion(PlanDeMejora){
    var TypeQry = "InsertRecomendacion";

    $.post('Controller/HomeEPP_CreateController.php', {Recomendacion: PlanDeMejora, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            var RecomendacionesObject = JSON.parse( localStorage.getItem("Recomendaciones") );
            var new_object_recomendation = {};
            var new_length;

            if( RecomendacionesObject.Status == "Sin resultados" ){
                new_length = 1;
            }else{
                new_length = RecomendacionesObject.Length + 1;
            }

            // Modificaciones al array principal
            new_object_recomendation.Status = "Correct";
            new_object_recomendation.Length = new_length;

            for(var i = 0; i < RecomendacionesObject.Length; i++)
                new_object_recomendation[i] = RecomendacionesObject[i];
            
            new_object_recomendation[new_length-1] = PlanDeMejora;

            localStorage.setItem('Recomendaciones', JSON.stringify(new_object_recomendation) ) ;            
            var TryObject = JSON.parse( localStorage.getItem("Recomendaciones") );
            
            $('#ModalAddModifyPlanMejora').modal('close');
            UpdateView_Recomendaciones( new_object_recomendation );

            M.toast({html: 'Datos guardados correctamente', classes: 'green darken-2 rounded'});
        }else{
            M.toast({html: 'Error al guardar los datos', classes: 'red rounded'});
        }
    });
}

function Read_Recomendaciones(){
    UpdateView_RecomendacionesAComprometer();
    UpdateView_RecomendacionesAtendidas();
    UpdateView_RecomendacionesRechazadas();
}

function Update_Recomendacion(){
    UpdateView_RecomendacionesAComprometer();
    $('#ModalAddModifyPlanMejora').modal('close');
}

function Delete_Recomendacion( idRecomendation ){
    TypeFun = 'DelRec';

    $.post('Controller/HomeEPP_DeleteController.php', {TypeData: TypeFun, idRec: idRecomendation}, function(DataRcv){
        ResponseController = JSON.parse( DataRcv );

        if( ResponseController.Status == "Correct" ){
            Read_Recomendaciones()
            $('#ModalDeleteRecomendation').modal('close');
        }
        
    });
}

$('.btn-delete-recomendation').on('click', function(){
    ID_Recomendation = $('.NumASM-delete').text();
    
    Delete_Recomendacion( ID_Recomendation );
});

$('.btn-add-plan-mejora').on('click', function(){
        $('#txtNumRecomendation').val("");
        $('#txtASM').val("");
        $('#txtActoresInvolucrados').val("");
        $('#select-nivel-prioridad').val("");
        $('#select-estatus').val("");
        $('#txtAccionMejora').val("");
        $('#txtResultadosEsperados').val("");
        $('#txtFecha').val("");
        $('#txtAreaResponsable').val("");
        $('#txtEvidenciasSolicitadas').val("");
        
        $(".btn-insert-recomendacion").show();
        $(".btn-update-recomendacion").hide();
});

$('.btn-insert-recomendacion').on('click', function(){
    
    var PrioridadVal = $('#select-nivel-prioridad').val(), Prioridad = "";
    var EstatusRecomendacion = $('#select-estatus').val(), Estatus = "";

    if( PrioridadVal == 1 )
        Prioridad = "Bajo";
    else if( PrioridadVal == 2 )
        Prioridad = "Medio";
    else if( PrioridadVal == 3 )
        Prioridad = "Alto";

    if( EstatusRecomendacion == 1 )
        Estatus = "Corregido";
    else if( EstatusRecomendacion == 2 )
        Estatus = "En proceso";
    else if( EstatusRecomendacion == 3 )
        Estatus = "Sin atender";

    var PlanDeMejora = {
        ID_Project: ProjectInfo.ID_ProgramaProyecto,
        IdentificadorRecomendacion: $('#txtNumRecomendation').val(),
        AspectoSusceptibleDeMejora: $('#txtASM').val(),
        TipoActoresInvolucradosEnSolucion: $('#txtActoresInvolucrados').val(),
        AccionDeMejora: $('#txtAccionMejora').val(),
        NivelDePrioridad: Prioridad,
        AreaResponsable: $('#txtAreaResponsable').val(),
        ResultadosEsperados: $('#txtResultadosEsperados').val(),
        EvidenciasSolicitadas: $('#txtEvidenciasSolicitadas').val(),
        FechaCompromisoDeCumplimiento: $('#txtFecha').val(),
        BanderaRecomendacionCompletada: Estatus
    }

    Create_Recomendacion( PlanDeMejora );
});

//  Actualización de una recomendación
$('.btn-update-recomendacion').on('click', function(){
    var PrioridadVal = $('#select-nivel-prioridad').val(), Prioridad = "";
    var EstatusRecomendacion = $('#select-estatus').val(), Estatus = "";
    var NumRecomendation = $('#txtNumRecomendation').val();

    if( PrioridadVal == 1 )
        Prioridad = "Bajo";
    else if( PrioridadVal == 2 )
        Prioridad = "Medio";
    else if( PrioridadVal == 3 )
        Prioridad = "Alto";

    if( EstatusRecomendacion == 1 )
        Estatus = "Atendido";
    else if( EstatusRecomendacion == 2 )
        Estatus = "En proceso";
    else if( EstatusRecomendacion == 3 )
        Estatus = "Sin atender";

    PlanDeMejora[NumRecomendation - 1].ASM                              =   $('#txtASM').val();
    PlanDeMejora[NumRecomendation - 1].TipoDeActores                    =   $('#txtActoresInvolucrados').val();
    PlanDeMejora[NumRecomendation - 1].Prioridad                        =   Prioridad;
    PlanDeMejora[NumRecomendation - 1].FechaCompromiso                  =   $('#txtFecha').val();
    PlanDeMejora[NumRecomendation - 1].AccionDeMejora                   =   $('#txtAccionMejora').val();
    PlanDeMejora[NumRecomendation - 1].AreaResponsable                  =   $('#txtAreaResponsable').val();
    PlanDeMejora[NumRecomendation - 1].ResultadosEsperados              =   $('#txtResultadosEsperados').val();
    PlanDeMejora[NumRecomendation - 1].Evidencia                        =   $('#txtEvidenciasSolicitadas').val();
    PlanDeMejora[NumRecomendation - 1].Propiedades.EstatusRecomendacion =   Estatus;

    localStorage.setItem('PlanDeMejora', JSON.stringify(PlanDeMejora) );
    
    M.toast({html: 'Información actualizada correctamente', classes: 'green rounded'});
    Update_Recomendacion();
});

$('.TableBody-RecomendacionesAComprometer').on('click', '.btn-edit-recomendation', function(){
    var PlanDeMejora = JSON.parse( localStorage.getItem( "PlanDeMejora" ) );
    var NumContainer = $(this).parent().parent().siblings()[1];
    var NumRecomendation = NumContainer.innerText;
    var PlanDeMejora;
    var Estatus;
    var val_select = 0;

    if( PlanDeMejora[NumRecomendation-1].Prioridad == "Bajo" ){
        val_select = '1';
    }else if( PlanDeMejora[NumRecomendation-1].Prioridad == "Medio" ){
        val_select = '2';
    }else if( PlanDeMejora[NumRecomendation-1].Prioridad == "Alto" ){
        val_select = '3';
    }

    if( PlanDeMejora[NumRecomendation-1].Propiedades.EstatusRecomendacion == "Atendido" )
        Estatus = '1';
    else if( PlanDeMejora[NumRecomendation-1].Propiedades.EstatusRecomendacion == "En proceso" )
        Estatus = '2';
    else if( PlanDeMejora[NumRecomendation-1].Propiedades.EstatusRecomendacion == "Sin atender" )
        Estatus = '3';

    $('#txtNumRecomendation').val( NumRecomendation );
    M.textareaAutoResize( $('#txtNumRecomendation') );

    $('#txtASM').css('height', 'auto');
    M.textareaAutoResize( $('#txtASM') );

    $('#txtASM').val( PlanDeMejora[NumRecomendation-1].ASM );
    M.textareaAutoResize( $('#txtASM') );

    $('#txtActoresInvolucrados').val( PlanDeMejora[NumRecomendation-1].TipoDeActores );
    M.textareaAutoResize( $('#txtActoresInvolucrados') );

    $('#select-nivel-prioridad').val( val_select );
    $('#select-estatus').val( Estatus );

    $('#txtAccionMejora').val( PlanDeMejora[NumRecomendation-1].AccionDeMejora );
    M.textareaAutoResize( $('#txtAccionMejora') );

    $('#txtResultadosEsperados').val( PlanDeMejora[NumRecomendation-1].ResultadosEsperados );
    M.textareaAutoResize( $('#txtResultadosEsperados') );

    $('#txtFecha').val( PlanDeMejora[NumRecomendation-1].FechaCompromiso );
    M.textareaAutoResize( $('#txtFecha') );

    $('#txtAreaResponsable').val( PlanDeMejora[NumRecomendation-1].AreaResponsable );
    M.textareaAutoResize( $('#txtAreaResponsable') );

    $('#txtEvidenciasSolicitadas').val( PlanDeMejora[NumRecomendation-1].Evidencia );
    M.textareaAutoResize( $('#txtEvidenciasSolicitadas') );

    $(".btn-insert-recomendacion").hide();
    $(".btn-update-recomendacion").show();

    $('#ModalAddModifyPlanMejora').modal('open');
});

$('.TableBody-RecomendacionesAComprometer').on('click', '.btn-delete-recomendation', function(){
    var RecomendacionesFind = JSON.parse( localStorage.getItem("Recomendaciones") );
    var NumContainer = $(this).parent().parent().siblings()[1];
    var NumRecomendation = NumContainer.innerText;
    var RecDelete;

    for(var i = 0; i<RecomendacionesFind.Length; i++){
        
        if( RecomendacionesFind[i].IdentificadorRecomendacion == NumRecomendation )
            RecDelete = RecomendacionesFind[i];
    }

    UpdateView_DeleteRecomendacion( RecDelete ) 
});

$('.TableBody-RecomendacionesAComprometer').on('mouseover', 'tr', 'td', function(){
    // $('.options-recomendation-container')
    $('.options-recomendation-container').css('display', 'flow-root');
    $(this).children().find('.options-recomendation-container').show();
    $(this).siblings().children().find('.options-recomendation-container').hide();
});

$('.TableBody-RecomendacionesAComprometer').on('mouseout', 'tr', 'td', function(){
    $(this).children().find('.options-recomendation-container').hide();
});

//  MOSTRAR LAS OBSERVACIONES DEL VALIDADOR
$('.TableBody-RecomendacionesAComprometer').on('click', '.btn-show-observation', function(){
    var NumContainer = $(this).parent().parent().siblings()[1];
    var NumRecomendation = NumContainer.innerText;

    $('.ObservationInRecomendation').text( PlanDeMejora[NumRecomendation-1].Propiedades.Observaciones.ObservacionTexto );
    $('.RecomendationObservation_StatusValue').text( PlanDeMejora[NumRecomendation-1].Propiedades.Observaciones.ObservationState );

    console.log('Clicked => ', NumRecomendation );
});

$('.TableBody-RecomendacionesAtendidas').on('click', 'tr', 'td', function(){
    var IdAtendedRecomendation = $(this).children().children()[0].innerText;

    $('.txtASM-AtendedRecomendation').val( PlanDeMejora[IdAtendedRecomendation].ASM );
    M.textareaAutoResize( $('.txtASM-AtendedRecomendation') );

    if( PlanDeMejora[IdAtendedRecomendation].Propiedades.Observaciones.Status ){
        $('.ValidatorObservation-AtendedRecomendation-Container').show();
        $('.txtValidatorObservation-AtendedRecomendation').val( PlanDeMejora[IdAtendedRecomendation].Propiedades.Observaciones.ObservacionTexto );
    }else{
        $('.ValidatorObservation-AtendedRecomendation-Container').hide();
    }

    $('.RecomendationObservation_StatusValue').text( PlanDeMejora[IdAtendedRecomendation].Propiedades.Observaciones.ObservationState );
    $('.txtEvidencia-AtendedRecomendation').val( PlanDeMejora[IdAtendedRecomendation].Evidencia );
    
    $('#ModalShowAtendedRecomendation').modal('open');
});

$('.TableBody-RecomendacionesRechazadas').on('click', 'tr', 'td', function(){
    var IdAtendedRecomendation = $(this).children().children()[0].innerText;

    $('.txtASM-RefusedRecomendation').val( PlanDeMejora[IdAtendedRecomendation].ASM );
    M.textareaAutoResize( $('.txtASM-RefusedRecomendation') );

    if( PlanDeMejora[IdAtendedRecomendation].Propiedades.Observaciones.Status ){
        $('.ValidatorObservation-RefusedRecomendation-Container').show();
        $('.txtValidatorObservation-RefusedRecomendation').val( PlanDeMejora[IdAtendedRecomendation].Propiedades.Observaciones.ObservacionTexto );
    }else{
        $('.ValidatorObservation-RefusedRecomendation-Container').hide();
    }

    $('.RecomendationObservation_StatusValue').text( PlanDeMejora[IdAtendedRecomendation].Propiedades.Observaciones.ObservationState );
    $('.txtEvidencia-RefusedRecomendation').val( PlanDeMejora[IdAtendedRecomendation].Evidencia );
    
    $('#ModalShowRefusedRecomendation').modal('open');
});

// *****   DOCUMENTOS DEL PROYECTO   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update
// * * (D) Delete

//  Mostrar documentos y recomendaciones de documentos del proyecto
function HTML_DocumentFormat(frmt, filename, filestatus, idoc){
    var typefile = '';

    if(frmt == "docx"){
        typefile = 'word';
        fileFormat = 'svg';
    }else if(frmt == "xlsx" || frmt == "xls"){
        typefile = 'excel';
        fileFormat = 'svg';
    }else if(frmt == "pptx"){
        typefile = 'powerpoint';
        fileFormat = 'svg';
    }else if(frmt == "pdf"){
        typefile = 'pdf';
        fileFormat = 'svg';
    }else{
        typefile = 'blank';
        fileFormat = 'svg';
    }

    var styledocs = '';
    var iconstatus = '';

    if( filestatus == 'Nuevo' ){
        styledocs = 'aprobed';
        iconstatus = 'new_releases';
    }else if( filestatus == 'Formalizado' ){
        styledocs = 'aprobed';
        iconstatus = 'assignment_turned_in';
    }else if( filestatus == 'En revisión' ){
        styledocs = 'send';
        iconstatus = 'find_in_page';
    }
    
    var DocumentFormat = '<li class="collection-item collection-item-document avatar"><img src="Resource/images/'+typefile+'.'+fileFormat+'" alt="" class="format-svg-avatar">' +
                            '<div class="title-document-container"><span class="title title-document truncate"><span class="idoc" style="display: none;">'+idoc+'</span>'+filename+'.'+frmt+'</span><span class="document-status document-'+styledocs+'"><i class="material-icons left icon-status-document">'+iconstatus+'</i>'+filestatus+'</span></div>' +
                            '<div class="action-buttons-docs">'+
                                '<a class="btn-floating btn-small btn-view-document modal-trigger waves-effect blue darken-4" href="#modal-show-document"> <i class="material-icons left">remove_red_eye</i></a>'+
                            '</div>'+
                         '</li>';

    return DocumentFormat;
}

function UpdateView_DocumentosProyecto(){
    var DataDoc = JSON.parse( localStorage.getItem('ProjectDocuments') );
    console.log( DataDoc[0].Status   );

    //  DOCUMENTOS Y ASM POR DOCUMENTO
    if( DataDoc[0].Status === "Correct" ){
        $('.card-title-documents').text('Para formalización');

        var doc_html = "";

        for( var doc_i = 1; doc_i < DataDoc.length; doc_i++ ){
            Documento_i = DataDoc[doc_i];
            doc_html = doc_html + HTML_DocumentFormat( Documento_i.FormatoDocumento, Documento_i.NombreDocumento, Documento_i.EstadoRevision, Documento_i.ID_DocumentoProyecto );
        }
    
        $('.collection-documents').empty();
        $('.collection-documents').append( doc_html );
        $('.collection-documents').children()[0].click();
    }else if( DataDoc[0].Status === "Sin resultados" ){
        $('.collection-documents').empty();
        $('.collection-document-recomendations').empty();
        $('.card-title-documents').text('Sin documentos');
    }else{
        M.toast({html: 'Error al mostrar los documentos del proyecto. Err. 0001', classes: 'red rounded'});
    }
}

// Funciones CRUD para los Documentos
function Create_ProjectDocument(){
    var FT_Project = JSON.parse( localStorage.getItem("FichaTecnicaProyecto") );
    var formData = new FormData(), RevisionDoc = "Nuevo";
    var New_DocInfo = {ID_ProgramaProyecto: ProjectInfo.ID_ProgramaProyecto, NombreDocumento: $('#txtNameFile').val(), FormatoDocumento: $('#txtExtension').val(), URL_Documento: FT_Project.ClaveProyecto+"/", EstadoRevision: RevisionDoc };
    var FileLoaded = $('#fileDoc')[0].files[0];
    var TypData = 'UploadNewDocument';

    formData.append( 'file', FileLoaded );
    
    $.post('Controller/HomeEPP_CreateController.php', {TypeData: TypData, DataDoc: New_DocInfo}, function(DataRcv){
        SvrResponse = JSON.parse( DataRcv );
        
        if( SvrResponse.Status == "Correct" ){
            $('.btn-load-doc-server').addClass('disabled');

            $.ajax({
                url: 'Controller/HomeEPP_UploadFiles.php',
                type: 'POST',
                dataType: 'html',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                timeout: 5000,
                success: function(response){
                    M.toast({html: 'Archivo subido correctamente', classes: 'green darken-2 rounded'});
                    
                    //Read_ProjectDocuments();

                    $('#txtNameFile').val('');
                    $('#txtExtension').val('');
                    $('#modal-upload-document').modal('close');
                },error: function(response){
                    M.toast({html: 'Error al subir el archivo', classes: 'red darken-2 rounded'});
                },complete: function(response){
                    localStorage.setItem("ProjectDocuments", JSON.stringify(DocumentosProyecto) );
                }
            });
        }else{

        }


//$('#modal-upload-document').modal('close');
    })

}

function Read_ProjectDocuments(){
    console.log( JSON.parse( localStorage.getItem( 'ProjectDocuments' ) ) );
    var DocumentosProyecto = JSON.parse( localStorage.getItem( 'ProjectDocuments' ) );

    if( DocumentosProyecto[0].Status == 'Sin resultados' ){
        $('.btn-generate-documents').removeClass('disabled');
        $('.btn-generate-documents').show();
    }else if( DocumentosProyecto[0].Status == 'Correct' ){
        $('.btn-generate-documents').hide();
    }


    UpdateView_DocumentosProyecto(DocumentosProyecto);
}

$('.btn-del-documents').on('click', function(){
    var EmptyDoc = [
        {
            Status: 'Sin resultados'
        }
    ]

    $('.btn-generate-documents').removeClass('disabled');
    localStorage.setItem('ProjectDocuments', JSON.stringify(EmptyDoc) );
    UpdateView_DocumentosProyecto();

    $('.btn-del-documents').hide();
    $('.collection-document-evidence').hide();
    $('.btn-generate-documents').show();
});

$('.btn-generate-documents').on('click', function(){
    
    var DataDocs = [
        {
            Status: 'Correct',
            Length: 2
        },{
            FormatoDocumento: 'pdf',
            NombreDocumento: 'Informacion_y_Opinion_General.pdf',
            EstadoRevision: 'En revisión',
            ID_DocumentoProyecto: '1'
        },{
            FormatoDocumento: 'pdf',
            NombreDocumento: 'Informacion_y_plan_de_mejora.pdf',
            EstadoRevision: 'En revisión',
            ID_DocumentoProyecto: '1'
        },
    ];

    localStorage.setItem( 'ProjectDocuments', JSON.stringify( DataDocs ) );
    UpdateView_DocumentosProyecto( DataDocs );

    $('.btn-del-documents').show();
    $('.collection-document-evidence').show();
    $('.btn-generate-documents').addClass('disabled');
    $('.btn-generate-documents').hide();
    
    console.log( DataDocs );
});

//  Eventos para mostrar y ocultar las opciones para los documentos
$('.collection-documents').on('mouseenter', '.collection-item', function(){
    $(this).children('.action-buttons-docs').css('display', 'block');
});

$('.collection-documents').on('mouseleave', '.collection-item', function(){
    $(this).children('.action-buttons-docs').css('display', 'none');
});

// *****   RECOMENDACIONES POR DOCUMENTOS   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update
// * * (D) Delete

function HTML_RecomendationFormat(RecDoc){
    var FormatRec = "";

    if( RecDoc.Length > 0 ){
        for(var reci = 0; reci<RecDoc.Length; reci++){
            var CompleteASM = RecDoc[reci].BanderaRecomendacionCompletada, StyleCollItemRecom = "";

            if( CompleteASM == 1 )
                StyleCollItemRecom = "collection-item-recomendations-complete";
            else
                StyleCollItemRecom = "collection-item-recomendations-incomplete";

            FormatRec = FormatRec + '<li class="collection-item collection-item-recomendations '+StyleCollItemRecom+'">'+
                                        '<div class="btn-recomendation truncate">'+
                                            '<i class="id_doc_proyecto">'+RecDoc[reci].ID_DocumentoProyecto+'</i>'+
                                            '<i class="bandera_recomendacion_completada">'+RecDoc[reci].BanderaRecomendacionCompletada+'</i>'+
                                            '<i class="id_doc_recomendation">'+RecDoc[reci].ID_RecomendacionDocumento+'</i>'+
                                            '<i class="identifierRecomendation">'+RecDoc[reci].IdentificadorRecomendacion+': </i>'+
                                            '<i class="recomendation_preview">'+RecDoc[reci].AspectoSusceptibleDeMejora+'</i>'+
                                        '</div>'+
                                        '<div class="action-buttons-docs-recomendations">'+
                                            '<a class="btn-floating btn-small btn-modify-document-recomendation waves-effect orange modal-trigger" href="#modal-edit-asm-document"><i class="material-icons">edit</i></a>'+
                                            '<a class="btn-floating btn-small btn-delete-document-recomendation waves-effect red    modal-trigger" href="#modal-confirm-delete-document-recomendation"><i class="material-icons">delete</i></a>'+
                                        '</div>'+
                                    '</li>';
        }
    }else{
        FormatRec = '<h6>Sin recomendaciones registradas</h6>';
    }    

    return FormatRec;
}

function Create_DocumentRecomendation(DataRecomendation){
    var TDat = 'NewDocRecomendation';

    $.post('Controller/HomeEPP_CreateController.php', {TypeData: TDat, Data: DataRecomendation}, function(Response){
        var SvrResponse = JSON.parse( Response );

        if( SvrResponse.Status == "Correct" ){
            $('#modal-new-asm-document').modal('close');
            M.toast({html: 'Recomendación creada correctamente', classes: 'green darken-2 rounded'});

            Read_DocumentsRecomendations( DataRecomendation.ID_DocumentoProyecto );
        }else{
            M.toast({html: 'Error al crear la recomendación', classes: 'red darken-2 rounded'});
        }
    });
}

function Read_DocumentsRecomendations(ID_Documento){
/*
    DataRecomendDocuments = {};
    FormatRec = HTML_RecomendationFormat(DataRecomendDocuments);

    $('.collection-document-recomendations').empty();
    $('.collection-document-recomendations').html( FormatRec );
*/
}


//  Eventos para la edición de recomendaciones a los documentos

// * * * SHOW RECOMENDATION WHEN CLICK IN DOCUMENT

$('.collection-documents').on('click', '.collection-item', function(){
    var idoc = $(this).children('.title-document-container').children().find('.idoc').text();
    Read_DocumentsRecomendations(idoc);
    
    $(this).addClass('document-selected');
    $(this).siblings().removeClass('document-selected');

    $(this).siblings().find('.title-document').css('font-weight', '400');
    $(this).siblings().find('.icon-status-document').css('color', 'rgba(0, 0, 0, 0.2)');
    $(this).siblings().find('.document-status').css('font-weight', '400');
    
    $(this).find('.title-document').css('font-weight', '600');
    $(this).find('.icon-status-document').css('color', 'rgba(0, 0, 0, 0.4)');
    $(this).find('.document-status').css('font-weight', '500');
});

// * * * CREATE NEW DOCUMENT RECOMENDATION
$('.collection-documents').on('click', 'a.btn-add-document-recomendation', function(){
    var id_doc = $(this).parent().siblings('.title-document-container').find('.idoc').text();
    $('#iddoc_modal-newasm').text( id_doc );
    $('#txt-NumDocRecomendation').val('');
    $('#txt-doc-ASM').val('');
});

$('.btn-create-document-recomendation').on('click', function(){
    var RecomendationDoc = {
        ID_DocumentoProyecto: $('#iddoc_modal-newasm').text(),
        IdentificadorRecomendacion: $('#txt-NumDocRecomendation').val(),
        AspectoSusceptibleDeMejora: $('#txt-doc-ASM').val(),
        BanderaRecomendacionCompletada: false
    }

    Create_DocumentRecomendation( RecomendationDoc );
});

// * * * DELETE DOCUMENT RECOMENDATION

$('.collection-document-recomendations').on('click', '.btn-delete-document-recomendation', function(){
    $('.idDocumentProject').text( $(this).parent().siblings().find('.id_doc_proyecto').text() );
    $('.idRecomendationDocumentProject').text( parseInt($(this).parent().siblings().find('.id_doc_recomendation').text() ) );
});

$('.btn-confirm-delete-doc-recomendation').on('click', function(){
    var RecomendationDoc = {
        ID_DocumentoProyecto: $('.idDocumentProject').text(),
        idDocRec: $('.idRecomendationDocumentProject').text(),
    }

    Delete_DocumentRecomendation( RecomendationDoc );
});

// * * * UDPATE DOCUMENT RECOMENDATION

$('.collection-document-recomendations').on('click', '.btn-modify-document-recomendation', function(){
    var num_docreco = $(this).parent().siblings().find('.identifierRecomendation').text().split(':');
    var banderacompletada = $(this).parent().siblings().find('.bandera_recomendacion_completada').text();

    if( banderacompletada == 1 )
        $('#CBoxRecomendacionAtendida').prop('checked', true);
    else
        $('#CBoxRecomendacionAtendida').prop('checked', false);
    
    $('#txt-NumDocRecomendation_modify').val( num_docreco[0] );
    $('#txt-doc-ASM_modify').val(  $(this).parent().siblings().find('.recomendation_preview').text() );
    M.textareaAutoResize($('#txt-doc-ASM_modify'));

    $('.idDocumentProject_Modify').text( $(this).parent().siblings().find('.id_doc_proyecto').text() );
    $('.idRecomendationDocumentProject_Modify').text( $(this).parent().siblings().find('.id_doc_recomendation').text() );
    
});

$('#CBoxRecomendacionAtendida').on('click', function(){
    console.log( $(this).prop('checked') );
});

$('.btn-modify-document-recomendation').on('click', function(){
    var NewDataRecomendation = {
        ID_DocumentoProyecto: $('.idDocumentProject_Modify').text(),
        ID_RecomendacionDocumento: $('.idRecomendationDocumentProject_Modify').text(),
        AspectoSusceptibleDeMejora: $('#txt-doc-ASM_modify').val(),
        BanderaRecomendacionCompletada: $('#CBoxRecomendacionAtendida').prop('checked')
    }

    Update_DocumentRecomendation( NewDataRecomendation );
});

/*
//  Botones para los documentos
$('.card-content-mejoras').on('mouseenter', '.card-recomendation', function(){
    $(this).find('.button-options-recomendation-container').css('display', 'block');
});

$('.card-content-mejoras').on('mouseleave', '.card-recomendation', function(){
    $(this).find('.button-options-recomendation-container').css('display', 'none');
});
*/

//  Botones para las recomendaciones de los documentos
$('.collection').on('mouseenter', '.collection-item-recomendations', function(){
    $(this).children('.action-buttons-docs-recomendations').css('display', 'block');
});

$('.collection').on('mouseleave', '.collection-item-recomendations', function(){
    $(this).children('.action-buttons-docs-recomendations').css('display', 'none');
});

$('.btn-recomendation-complete').on('click', function(){
    M.toast({html: 'Recomendación atendida', classes: 'rounded'});
    $(this).addClass('disabled');
});




