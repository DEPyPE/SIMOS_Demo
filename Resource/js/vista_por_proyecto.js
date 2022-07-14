
var UserData                    = JSON.parse( localStorage.getItem("UserData")                  );
var ProjectInfo                 = JSON.parse( localStorage.getItem("ProjectInfo")               ); 
var FTProyecto                  = JSON.parse( localStorage.getItem("FTProyecto")                );
var FTEvaluacion                = JSON.parse( localStorage.getItem("FTEvaluacion")              );
var OpinionGeneral              = JSON.parse( localStorage.getItem("GeneralOpinion")            );
var ComentariosPorTema          = JSON.parse( localStorage.getItem("ComentariosPorTema")        );
var TemasComentariosPorTema     = JSON.parse( localStorage.getItem("TemasComentariosPorTema")   );
var PlanDeMejora                = JSON.parse( localStorage.getItem("PlanDeMejora")              );
var ProjectDocuments            = JSON.parse( localStorage.getItem("ProjectDocuments")          );

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
    Read_ProjectDocuments();

    $('.nombre-programa').text( FTProyecto.ClaveProyecto );

//  FECHA DE HOY PARA EL SELECTOR DE FECHA
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today_fmt1 = dd + '-' + mm + '-' + yyyy;
    today_fmt2 = yyyy + '-' + mm + '-' + dd;

    $('.datepicker-fecha-cumplimiento').val( today_fmt2 );
});

// *****   EVENTOS PARA FUNCIONES PRINCIPALES DE LA SESIÓN ******

$('.close-session').on('click', function(){
    localStorage.clear();
    M.toast({html: 'Hasta luego', classes: 'blue rounded'});

    setTimeout( function(){
        window.location = 'index.html';
    }, 500 );
});

// *****   FICHA TÉCNICA DEL PROYECTO   ******
// * * * * Funciones CRUD y eventos:
// * * (R) Read
// * * (U) Update

function UpdateView_FTProject(){
    //console.log( "Ficha técnica del proyecto => ",  FTProyecto );
    FTProyecto = JSON.parse( localStorage.getItem('FTProyecto') );

    if( FTProyecto.Status == "Correct" ){
        $('.btn-add-project-information').hide();
        $('.btn-validate-project-information').show();
        $('.btn-save-project-information').hide();
        $('.btn-validate-project-information').show();
        $('.table-ficha-tecnica-proyecto').show();
        $('.NoFTProjectInformation').hide();

        if( FTProyecto.ValidacionInfo == "Información_capturada" ){
            $('.validation-ft-programa').hide();
            $('.btn-validate-info-project').show();
        }else if( FTProyecto.ValidacionInfo == "En_validación" ){
            $('.validation-ft-programa').hide();
            $('.btn-validate-info-project').show();
        }else if( FTProyecto.ValidacionInfo == "Información_validada" ){
            $('.validation-ft-programa').show();
            $('.btn-validate-info-project').hide();
        }

        $('.main-title-project').text( 'SIMOS / '+FTProyecto.ClaveProyecto+' (Validador)');
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
        $('.btn-validate-project-information').hide();

        $('.btn-save-project-information').show();
        $('.btn-validate-project-information').hide();
    }else{
        M.toast({html: 'Error al mostrar la ficha técnica \n del proyecto. Err. 0001', classes: 'red lighten-1 rounded'});
    }

    $('.ValidateInformationProjectCheckbox').prop('checked')
}

function Read_ProjectData(){
    UpdateView_FTProject();
}

$('.btn-save-project-information').on('click', function(){
    var ProjectData = ReadForm_ProjectData();
    Create_ProjectData( ProjectData );
});

$('.btn-validate-project-information').on('click', function(){
    var FTProject = JSON.parse( localStorage.getItem('FTProyecto') );
    
    FTProject.ValidacionInfo = 'Información_validada';

    localStorage.setItem('FTProyecto', JSON.stringify(FTProject) );

    $('#ModalValidateTechnicalProjectInfo').modal('close');
    M.toast({html: 'Ficha técnica del proyecto validado correctamente', classes: 'teal darken-2 rounded'});
    UpdateView_FTProject();
});

$('.btn-validate-project-information').on('click', function(){
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
// * * (R) Read
// * * (U) Update

function UpdateView_FTEvaluation(){
    var FTEvaluacion2UpdateView = JSON.parse( localStorage.getItem("FTEvaluacion") );
    
    if( FTEvaluacion2UpdateView.Status == "Correct" ){
        $('.table-evaluation').show();
        $('.NoFTEvaluationInformation').hide();
        
        $('.btn-add-evaluation-information').hide();
        $('.btn-validate-info-evaluation').show();
        $('.btn-insert-evaluation-information').hide();

        if( FTEvaluacion2UpdateView.ValidacionInfo == "Información_capturada" ){
            $('.validation-ft-evaluation').hide();
            $('.btn-validate-info-evaluation').show();
        }else if( FTEvaluacion2UpdateView.ValidacionInfo == "En_validación" ){
            $('.validation-ft-evaluation').hide();
            $('.btn-validate-info-evaluation').hide();
        }else if( FTEvaluacion2UpdateView.ValidacionInfo == "Información_validada" ){
            $('.validation-ft-evaluation').show();
            $('.btn-validate-info-evaluation').hide();
        }
        
        $('.InstanciaEvaluadora').text( FTEvaluacion2UpdateView.InstanciaEvaluadora );
        $('.NombreDeEvaluacion').text( FTEvaluacion2UpdateView.NombreDeEvaluacion );
        $('.TipoEvaluacion').text( FTEvaluacion2UpdateView.TipoEvaluacion );
        $('.AñoDeEvaluacion').text( FTEvaluacion2UpdateView.AñoDeEvaluacion );
        $('.NombreDelInforme').text( FTEvaluacion2UpdateView.NombreDelInforme );
        $('.CostoEvaluacion').text( '$'+FTEvaluacion2UpdateView.CostoEvaluacion );
    }else if( FTEvaluacion2UpdateView.Status == "Sin resultados" ){
        $('.table-evaluation').hide();
        $('.NoFTEvaluationInformation').show();
        $('.validation-ft-evaluation').hide();

        $('.btn-add-evaluation-information').show();
        $('.btn-validate-evaluation-information').hide();
        $('.btn-insert-evaluation-information').show();
        $('.btn-validate-evaluation-information').hide();
    }else{
        M.toast({html: 'Error al mostrar la ficha técnica \n de la evaluación. Err. 001', classes: 'red lighten-1 rounded'});
    }
}

function Read_FTEvaluation(){
    UpdateView_FTEvaluation();
}

$('.btn-insert-evaluation-information').on('click', function(){
    Create_EvaluationData();
});

$('.btn-validate-evaluation-information').on('click', function(){
    var FTEvaluacion = JSON.parse( localStorage.getItem('FTEvaluacion') );
    
    FTEvaluacion.ValidacionInfo = 'Información_validada';

    localStorage.setItem('FTEvaluacion', JSON.stringify(FTEvaluacion) );
    $('#ModalValidateTechnicalEvaluationInfo').modal('close');
    M.toast({html: 'Ficha técnica de la evaluación validada correctamente', classes: 'teal darken-2 rounded'});
    UpdateView_FTEvaluation();
});

$('.btn-validate-evaluation-information').on('click', function(){
    $("#txtInstanciaEvaluadora").val( FTEvaluacion.InstanciaEvaluadora );
    $("#txtNombreEvaluacion").val( FTEvaluacion.NombreDeEvaluacion );
    $("#txtTipoEvaluacion").val( FTEvaluacion.TipoEvaluacion );
    $("#txtYearEvaluation").val( FTEvaluacion.AñoDeEvaluacion );
    $("#txtNombreInforme").val( FTEvaluacion.NombreDelInforme );
    $("#txtCostoEvaluacion").val( FTEvaluacion.CostoEvaluacion );
});


// *****   OPINIÓN GENERAL   ******
// * * * * Funciones CRUD y eventos
// * * (R) Read
// * * (U) Update

function UpdateView_OpinionGeneral(){
    var OpinionGeneral2UpdateView = JSON.parse( localStorage.getItem('GeneralOpinion') );

    if( OpinionGeneral2UpdateView.Status == "Correct" ){
        $('#ComentariosObservacionesGenerales').show();
        $('#ComentariosObservacionesGenerales').text( OpinionGeneral2UpdateView.ComentariosObservacionesGenerales );
        M.textareaAutoResize($('#ComentariosObservacionesGenerales'));
        
        $('.OG_SinInfo').css('display', 'none');

        if( OpinionGeneral2UpdateView.Observaciones.Status ){
            if( OpinionGeneral2UpdateView.Observaciones.ObservationState == "Con observación" ){
                $('.OpinionGeneralObservaciones-Container').show();
                $('.OpinionGeneral-ObservacionesBody').show();
                $('.OpinionGeneral-NoObservacionesBody').hide();
                $('.btnOpinionGeneral-AddObservation').show();

                $('.validated-general-opinion').hide();
                $('.btn-wait-validation-general-opinion').hide();

                $('#txtOpinionGeneral-ValidatorObservation').text( OpinionGeneral2UpdateView.Observaciones.ObservacionTexto );
                M.textareaAutoResize($('#txtOpinionGeneral-ValidatorObservation'));
            }else if( OpinionGeneral2UpdateView.Observaciones.ObservationState == "Enviado para validación" ){
                $('.OpinionGeneralObservaciones-Container').show();
                $('.OpinionGeneral-ObservacionesBody').show();
                $('.OpinionGeneral-NoObservacionesBody').hide();

                $('.btnOpinionGeneral-AddObservation').hide();
                $('.validated-general-opinion').hide();

                $('.btn-wait-validation-general-opinion').show();

                $('#txtOpinionGeneral-ValidatorObservation').text( OpinionGeneral2UpdateView.Observaciones.ObservacionTexto );
                M.textareaAutoResize($('#txtOpinionGeneral-ValidatorObservation'));
                $('.estatus-observacion-posicionamiento').text( OpinionGeneral2UpdateView.Observaciones.ObservationState );
            }else if( OpinionGeneral2UpdateView.Observaciones.ObservationState == "Información validada" ){
                $('.OpinionGeneralObservaciones-Container').hide();
                $('.OpinionGeneral-ObservacionesBody').hide();
                $('.OpinionGeneral-NoObservacionesBody').hide();
                
                $('.validated-general-opinion').show();
                $('.btn-wait-validation-general-opinion').hide();
            }
        }else{
            $('.OpinionGeneralObservaciones-Container').show();
            $('.OpinionGeneral-ObservacionesBody').hide();
            $('.OpinionGeneral-NoObservacionesBody').show();
            $('.btnOpinionGeneral-AddObservation').show();

            $('.validated-general-opinion').hide();
            $('.btn-wait-validation-general-opinion').hide();
        }
        
        $('.btn-add-opinion-general').hide();
        $('.btn-edit-specific-comments').show();
        $('.btn-insert-opinion-general').hide()
    }else if( OpinionGeneral2UpdateView.Status == "Sin resultados" ){
        $('.OG_SinInfo').css('display', 'block');

        $('#ComentariosObservacionesGenerales').hide();
        $('.btn-add-opinion-general').show();
        $('.btnOpinionGeneral-AddObservation').hide();
        $('.btn-edit-specific-comments').hide();
        $('.btn-insert-opinion-general').show();
    }else{
        M.toast({html: 'Error al mostrar la opinión general. Err. 0001', classes: 'red rounded'});
    }
}

function Read_OpinionGeneral(){
    UpdateView_OpinionGeneral();
}

function Update_ObservationGeneralOpinion(){
    var OpinionGeneral2Update  = JSON.parse( localStorage.getItem( "GeneralOpinion" ) );
    OpinionGeneral2Update.Observaciones.Status = true;
    OpinionGeneral2Update.Observaciones.ObservacionTexto = $('#txtObservationValidator').val();
    OpinionGeneral2Update.Observaciones.ObservationState = 'Con observación';

    localStorage.setItem("GeneralOpinion", JSON.stringify(OpinionGeneral2Update) );
    
    M.toast({html: 'Observación a la opinión general guardada', classes: 'green rounded'});
    UpdateView_OpinionGeneral();
}

$('.btn-save-observation-validator').on('click', function(){   
    $('#ModalAddModifyObservationValidator').modal('close');
    Update_ObservationGeneralOpinion();
});

$('.btn-validate-general-opinion').on('click', function(){
    var OpinionGeneral2Validate  = JSON.parse( localStorage.getItem( "GeneralOpinion" ) );
    OpinionGeneral2Validate.Observaciones.Status = true;
    OpinionGeneral2Validate.Observaciones.ObservacionTexto = '';
    OpinionGeneral2Validate.Observaciones.ObservationState = 'Información validada';

    localStorage.setItem('GeneralOpinion', JSON.stringify( OpinionGeneral2Validate ) );

    UpdateView_OpinionGeneral();
    $('#ModalValidateGeneralOpinion').modal('close');
    M.toast({html: 'Opinión General validado correctamente', classes: 'green rounded'});
});

// *****   COMENTARIOS Y OBSERVACIONES ESPECÍFICOS POR TEMA   ******
// * * * * Funciones CRUD y eventos
// * * (R) Read

function UpdateView_ComPorTema(){

    if( ComentariosPorTema.Status == "Correct" ){
        $('#ComentariosObservacionesEspecificosPorTema_Titulo').show();

        $('#ComentariosObservacionesEspecificosPorTema_Titulo').val( ComentariosPorTema.ComentariosObservacionesPorTema );
        M.textareaAutoResize($('#ComentariosObservacionesEspecificosPorTema_Titulo'));
        
        $('.OG_SinInfo').css('display', 'none');
    }else if( ComentariosPorTema.Status == "Sin resultados" ){
        $('.OG_SinInfo').css('display', 'block');
        $('.ComentariosObservacionesEspecificosPorTema_Titulo').hide();
    }else{
        M.toast({html: 'Error al mostrar la opinión general. Err. 0001', classes: 'red rounded'});
    }
}

function Read_ComentariosEspecificosPorTema(){
    UpdateView_ComPorTema();
}

// *****   TEMAS Y CONTENIDO DE LOS COMENTARIOS Y OBSERVACIONES ESPECÍFICOS POR TEMA   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateVIew_TemasComentariosPorTema(){
    var TemasComentariosPorTema2UpdateView = JSON.parse( localStorage.getItem('TemasComentariosPorTema') );

    if( TemasComentariosPorTema2UpdateView.Status == "Correct" ){
        
        var TextInner = "";

        for(var i=0; i<TemasComentariosPorTema2UpdateView.Length; i++ ){

            TextInner = TextInner + "<tr class='rowtable'>"+
                                         "<td> <i class='hide-id-tema'>"+TemasComentariosPorTema2UpdateView[i].ID_TemaComentariosPorTema+"</i> <strong>"+TemasComentariosPorTema2UpdateView[i].TituloTema+"</strong></td>"+
                                         "<td>"+TemasComentariosPorTema2UpdateView[i].TextoTema+"</td>"+
                                         "<td class='center-align'><i class='material-icons'>"+TemasComentariosPorTema2UpdateView[i].Observaciones.IconState+"</i></td>"+
                                    "</tr>";
        }

        $('.Table_TemasComentariosPorTema').html( TextInner )
        
        console.log(  );
        
    }else if( TemasComentariosPorTema2UpdateView.Status == "Sin resultados" ){
        
    }else{
        M.toast({html: 'Error al mostrar la opinión general. Err. 0001', classes: 'red rounded'});
    }
}

function Read_TemasComentariosPorTema(){
    UpdateVIew_TemasComentariosPorTema();
}

function Validate_ObservacionEspecifica(id_tema){
    var TemasComentariosPorTema2Update = JSON.parse( localStorage.getItem('TemasComentariosPorTema') );

    TemasComentariosPorTema2Update[id_tema-1].Observaciones.IconState = 'assignment_turned_in';
    TemasComentariosPorTema2Update[id_tema-1].Observaciones.ObservationState = 'ObservacionEspecificaValidada';
    TemasComentariosPorTema2Update[id_tema-1].Observaciones.Status = true;

    localStorage.setItem('TemasComentariosPorTema', JSON.stringify(TemasComentariosPorTema2Update));
    
    $('#ModalModifyDataTheme').modal('close');
    M.toast({html: 'Información actualizada correctamente', classes: 'green rounded'});

    UpdateVIew_TemasComentariosPorTema();
}
//
$('.table-observaciones-especificas').on('click', '.Table_TemasComentariosPorTema .rowtable', function(){
    var TemasComentariosPorTema2UpdateModalModifyView = JSON.parse( localStorage.getItem( 'TemasComentariosPorTema' ) );
    var id_tema = $(this).find('.hide-id-tema')[0].innerText;

    $('.id_observacion_modal').text( id_tema );

    $('#ModalModifyDataTheme').modal('open');
    $('#txtModalTituloTema').val( TemasComentariosPorTema2UpdateModalModifyView[id_tema-1].TituloTema );
    M.textareaAutoResize($('#txtModalTituloTema'));

    $('#txtModalContenidoTema').val( TemasComentariosPorTema2UpdateModalModifyView[id_tema-1].TextoTema );
    M.textareaAutoResize( $('#txtModalContenidoTema') );

    if( TemasComentariosPorTema2UpdateModalModifyView[id_tema-1].Observaciones.Status ){
        $('.ObservacionesPorTema-Body').show();
        $('.NoObservacionesPorTema-Body').hide();

        $('#txtObservacionesPorTemaModal').val( TemasComentariosPorTema2UpdateModalModifyView[id_tema-1].Observaciones.ObservacionTexto );
        M.textareaAutoResize( $('#txtObservacionesPorTemaModal') );

        if( TemasComentariosPorTema2UpdateModalModifyView[id_tema-1].Observaciones.ObservationState == 'Con observación' ){
            $('.ObservacionesPorTema-Container').show();
            $('.btn-validar-observacion-especifica').show();
        }else if( TemasComentariosPorTema2UpdateModalModifyView[id_tema-1].Observaciones.ObservationState == 'ObservacionEspecificaValidada' ){
            $('.ObservacionesPorTema-Container').hide();
            $('.btn-validar-observacion-especifica').hide();
        }
    }else{
        $('.ObservacionesPorTema-Container').show();
        $('.ObservacionesPorTema-Body').hide();
        $('.NoObservacionesPorTema-Body').show();
    }
});

$('.btn-validar-observacion-especifica').on('click', function(){
    var idtema = $('.id_observacion_modal').text();
    console.log( idtema );
    
    Validate_ObservacionEspecifica(idtema);
});

$('.btn-save-observation-validator-por-tema').on('click', function(){
    var ComentariosPorTema = JSON.parse( localStorage.getItem('TemasComentariosPorTema') );
    var observation_text = $('#txtObservationValidatorPorTema').val();
    var id_tema = $('.id_observacion_modal').text();

    ComentariosPorTema[id_tema-1].Observaciones.Status = true;
    ComentariosPorTema[id_tema-1].Observaciones.ObservacionTexto = observation_text;
    ComentariosPorTema[id_tema-1].Observaciones.IconState = 'assignment';
    ComentariosPorTema[id_tema-1].Observaciones.ObservationState = 'Con observación';

    localStorage.setItem('TemasComentariosPorTema', JSON.stringify( ComentariosPorTema ) );

    UpdateVIew_TemasComentariosPorTema();
    $('#ModalAddModifyObservationPerTheme').modal('close');
    $('#ModalModifyDataTheme').modal('close');
    
    M.toast({html: 'Observación agregada correctamente', classes: 'green rounded'});

    console.log( observation_text );
});

/*
$('.btn-send-for-validation').on('click', function(){
    var idtema = $('.id_observacion_modal').text();

    $(this).attr('disabled', 'disabled');
    TemasComentariosPorTema[idtema - 1].Observaciones.IconState = 'unarchive';
});
*/

// *****   PLAN DE MEJORA   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update
// * * (D) Delete

function GetByRecomendation(TypeRecomendation){
    var PlanDeMejora2Split = JSON.parse( localStorage.getItem('PlanDeMejora') );
    var NewArray = {}, NewCounter = 0;

    for(var i = 0; i < PlanDeMejora2Split.Length; i++ ){
        if( PlanDeMejora2Split[i].Propiedades.TipoRecomendacion.Estado == TypeRecomendation ){
            NewArray[NewCounter] = PlanDeMejora2Split[i];
            
            NewCounter++;
        } 
    }

    if( NewCounter > 0 ){
        NewArray.Length = NewCounter;
        NewArray.Status = "Correct";
    }else{
        NewArray.Length = 0;
        NewArray.Status = "Sin resultados";
    }

    return NewArray;
} 

function UpdateView_RecomendacionesAComprometer(){
    var table_recomendaciones = "";
    var ButtonsOptions = "";
    var asm_complete_flag;
    var PlanDeMejora_AComprometer = GetByRecomendation( "AComprometer" );
    //console.log( '(f) UView - Plan de mejora => ', PlanDeMejora_AComprometer );

    if( PlanDeMejora_AComprometer.Status == "Correct" ){
        $('.table-plan-de-mejora').show();

        if( PlanDeMejora_AComprometer.Length >= 1 ){

            for(var i = 0; i < PlanDeMejora_AComprometer.Length; i++){

                if( PlanDeMejora_AComprometer[i].Propiedades.EstatusRecomendacion == "Atendido" )
                    asm_complete_flag = "complete";
                else if( PlanDeMejora_AComprometer[i].Propiedades.EstatusRecomendacion == "En proceso" )
                    asm_complete_flag = "in-process";
                else if( PlanDeMejora_AComprometer[i].Propiedades.EstatusRecomendacion == "Sin atender" )
                    asm_complete_flag = "incomplete";
    
                if( PlanDeMejora_AComprometer[i].Propiedades.Observaciones.Status )
                    RecomendationButton = "<a class='btn-floating btn-small btn-show-observation modal-trigger waves-effect light-blue darken-2 right' href='#ModalShowObservation'><i class='material-icons'>assignment</i></a>";
                else
                    RecomendationButton = '';

                if( PlanDeMejora_AComprometer[i].Propiedades.Observaciones.ObservationState == "Enviado para validación" ){
                    ButtonsOptions = RecomendationButton;
                }else if( PlanDeMejora_AComprometer[i].Propiedades.Observaciones.ObservationState == "Con observación" ) {
                    ButtonsOptions = ButtonsOptions + //"<a class='btn-floating btn-small btn-delete-recomendation  modal-trigger waves-effect red darken-2 right' href='#ModalDeleteRecomendation'><i class='material-icons'>delete</i></a>" +
                                                      "<a class='btn-floating btn-small btn-edit-recomendation    modal-trigger waves-effect green darken-2 right' href='#ModalAddModifyPlanMejora'><i class='material-icons'>remove_red_eye</i></a>"+
                                     RecomendationButton;
                }

                console.log( PlanDeMejora_AComprometer[i].FechaCompromiso );
                var FechaSplited = PlanDeMejora_AComprometer[i].FechaCompromiso.split('-');
                var FechaFormato = FechaSplited[0]+'/'+FechaSplited[1]+'/'+FechaSplited[2];
                
                table_recomendaciones = table_recomendaciones +
                "<tr>"+ 
                    "<td class='center-align'> <div class='asm-status-style-"+asm_complete_flag+"'></div></td>"+
                    "<td class='NumASM center-align'>"+ PlanDeMejora_AComprometer[i].NumRecomendacion +"</td>"+
                    "<td>"+ PlanDeMejora_AComprometer[i].ASM +"</td>"+
                    "<td>"+ PlanDeMejora_AComprometer[i].TipoDeActores +"</td>"+
                    "<td class='center-align'>"+ PlanDeMejora_AComprometer[i].Prioridad +"</td>"+
                    "<td>"+ PlanDeMejora_AComprometer[i].AccionDeMejora +"</td>"+
                    "<td>"+ PlanDeMejora_AComprometer[i].AreaResponsable +"</td>"+
                    "<td class='center-align'>"+ FechaFormato +"</td>"+
                    "<td>"+ PlanDeMejora_AComprometer[i].ResultadosEsperados +"</td>"+
                    "<td>"+ PlanDeMejora_AComprometer[i].Evidencia +
                        "<div class='options-recomendation-container'>"+
                            ButtonsOptions
                        "</div>"+
                    "</td>"+
                "</tr>";
            }

            $('.no-data-recomendaciones-a-comprometer').hide();
            $('.with-data-recomendaciones-a-comprometer').show();
            $('.TableAComprometer').show();
    
            $('.TableBody-RecomendacionesAComprometer').empty();
            $('.TableBody-RecomendacionesAComprometer').append( table_recomendaciones );
        }else{
            console.log('No hay');
            $('.no-data-recomendaciones-a-comprometer').show();
            $('.with-data-recomendaciones-a-comprometer').hide();
            
            $('.TableAComprometer').hide();
        }

    }else if( PlanDeMejora_AComprometer.Status == "Sin resultados" ){
        $('.no-data-recomendaciones-a-comprometer').show();
        $('.with-data-recomendaciones-a-comprometer').hide();
        $('.card-plan-de-mejora').hide();
        $('.TableAComprometer').hide();
    }else{
        M.toast({html: 'Error al mostrar el plan de mejora. Err. 0001', classes: 'red rounded'});
    }
}

function UpdateView_RecomendacionesAtendidas(){
    var table_recomendaciones = "";
    var PlanDeMejora_Atendidas = GetByRecomendation( "Atendida" );
    //console.log( '(f) UView - Plan de mejora => ', PlanDeMejora_Atendidas );

    if( PlanDeMejora_Atendidas.Status == "Correct" ){
        $('.TableAtendidas').show();

        for(var i=0; i<PlanDeMejora_Atendidas.Length; i++){
            table_recomendaciones = table_recomendaciones +
            "<tr>"+ 
                "<td class='center-align'>"+ PlanDeMejora_Atendidas[i].NumRecomendacion +"</td>"+
                "<td> <p class='id_RecomendacionAtendida'>"+PlanDeMejora_Atendidas[i].NumRecomendacion+"</p><p>"+ PlanDeMejora_Atendidas[i].ASM +"</p></td>"+
                "<td>"+ PlanDeMejora_Atendidas[i].Evidencia +"</td>"+
                //"<td>"+ PlanDeMejora_Atendidas[i].Propiedades.Observaciones.ObservacionTexto +"</td>"+
                "<td class='center-align'> <i class='material-icons'>"+ PlanDeMejora_Atendidas[i].Propiedades.Observaciones.IconState +"</i></td>"+
            "</tr>";
        }

        $('.no-data-recomendaciones-atendidas').css('display', 'none');
        $('.with-data-recomendaciones-atendidas').css('display', 'block');

        $('.TableBody-RecomendacionesAtendidas').empty();
        $('.TableBody-RecomendacionesAtendidas').append( table_recomendaciones );
    }else if( PlanDeMejora_Atendidas.Status == "Sin resultados" ){
        $('.no-data-recomendaciones-atendidas').css('display', 'block');
        $('.with-data-recomendaciones-atendidas').css('display', 'none');
        $('.card-plan-de-mejora').css('display', 'none');
        $('.TableAtendidas').hide();
    }else{
        M.toast({html: 'Error al mostrar el plan de mejora. Err. 0001', classes: 'red rounded'});
    }

}

function UpdateView_RecomendacionesRechazadas(){
    var table_recomendaciones = "";
    var asm_complete_flag;
    var PlanDeMejora_Rechazada = GetByRecomendation( "Rechazada" );
    //console.log( '(f) UView - Plan de mejora => ', PlanDeMejora_Rechazada );

    if( PlanDeMejora_Rechazada.Status == "Correct" ){
        $('.TableRechazadas').show();

        for(var i=0; i<PlanDeMejora_Rechazada.Length; i++){
            asm_complete_flag = "complete";

            table_recomendaciones = table_recomendaciones +
                                                    "<tr>"+ 
                                                        "<td class='center-align'>"+ PlanDeMejora_Rechazada[i].NumRecomendacion +"</td>"+
                                                        "<td><p class='id_RecomendacionRechazada'>"+PlanDeMejora_Rechazada[i].NumRecomendacion+"</p>"+ PlanDeMejora_Rechazada[i].ASM +"</td>"+
                                                        "<td>"+ PlanDeMejora_Rechazada[i].Propiedades.TipoRecomendacion.Justificacion +"</td>"+
                                                        "<td class='center-align'> <i class='material-icons'>"+ PlanDeMejora_Rechazada[i].Propiedades.Observaciones.IconState +"</i></td>"
                                                    "</tr>";
        }

        $('.no-data-recomendaciones-rechazadas').css('display', 'none');
        $('.with-data-recomendaciones-rechazadas').css('display', 'block');

        $('.TableBody-RecomendacionesRechazadas').empty();
        $('.TableBody-RecomendacionesRechazadas').append( table_recomendaciones );
    }else if( PlanDeMejora_Rechazada.Status == "Sin resultados" ){
        $('.no-data-recomendaciones-rechazadas').css('display', 'block');
        $('.with-data-recomendaciones-rechazadas').css('display', 'none');
        $('.card-plan-de-mejora').css('display', 'none');
        $('.TableRechazadas').hide();
    }else{
        M.toast({html: 'Error al mostrar el plan de mejora. Err. 0001', classes: 'red rounded'});
    }

}

function Create_Recomendacion(NuevoPlanDeMejora){
    var new_object_recomendation = {};
    var new_length;
    var PlanDeMejora2Create = JSON.parse( localStorage.getItem('PlanDeMejora') );

    if( PlanDeMejora2Create.Status == "Sin resultados" ){
        new_length = 0;
    }else{
        new_length = PlanDeMejora2Create.Length + 1;
    }

    // Modificaciones al array principal
    for(var i = 0; i < PlanDeMejora2Create.Length; i++)
        new_object_recomendation[i] = PlanDeMejora2Create[i];
    
    new_object_recomendation[new_length-1] = NuevoPlanDeMejora;
    new_object_recomendation.Status = "Correct";
    new_object_recomendation.Length = new_length;

    localStorage.setItem('PlanDeMejora', JSON.stringify(new_object_recomendation) ) ;
    
    $('#ModalAddModifyPlanMejora').modal('close');
    M.toast({html: 'Datos guardados correctamente', classes: 'green darken-2 rounded'});

    UpdateView_RecomendacionesAComprometer();
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

function Delete_Recomendacion(NumRecomendation){
    var NewObjRecomendation = {};
    var PlanDeMejora2Delete = JSON.parse( localStorage.getItem('PlanDeMejora') );

    if( PlanDeMejora2Delete.Length <= 1 ){
        NewObjRecomendation.Length = 0;
        NewObjRecomendation.Status = "Sin resultados";
        console.log( NewObjRecomendation );
    }else{        
        var NewCounter = 0;

        for(var i = 0; i < PlanDeMejora2Delete.Length; i++ ){
            console.log( '('+i+') => '+ PlanDeMejora2Delete[i].NumRecomendacion + ' ?= ' + NumRecomendation );

            if( PlanDeMejora2Delete[i].NumRecomendacion != NumRecomendation ){
                NewObjRecomendation[ NewCounter ] = PlanDeMejora2Delete[ i ];

                NewCounter = NewCounter + 1;
            }
        }

        NewObjRecomendation.Status = "Correct";
        NewObjRecomendation.Length = PlanDeMejora2Delete.Length - 1;
    
        console.log(NewObjRecomendation);
    }

    localStorage.setItem('PlanDeMejora', JSON.stringify(NewObjRecomendation) );
    UpdateView_RecomendacionesAComprometer();

    $('#ModalDeleteRecomendation').modal('close');
    M.toast({html: 'Se eliminó la recomendación correctamente', classes: 'green rounded'});
}

$('.btn-delete-recomendation').on('click', function(){
    NumRecomendation = $('.NumASM-delete').text();
    Delete_Recomendacion( NumRecomendation );
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
        "NumRecomendacion": $('#txtNumRecomendation').val(),
        "ASM": $('#txtASM').val(),
        "TipoDeActores": $('#txtActoresInvolucrados').val(),
        "Prioridad": Prioridad,
        "AccionDeMejora": $('#txtAccionMejora').val(),
        "AreaResponsable": $('#txtAreaResponsable').val(),
        "FechaCompromiso": $('#txtFecha').val(),
        "ResultadosEsperados": $('#txtResultadosEsperados').val(),
        "Evidencia": $('#txtEvidenciasSolicitadas').val(),
        "Propiedades": {
            "EstatusRecomendacion": Estatus,
            "TipoRecomendacion": "AComprometer",
            "Observaciones": {
                "Status": false,
                "IconState": "assignment",
                "ObservacionTexto": "",
                "ObservationState": "Sin observaciones"
            }
        }
    };

    Create_Recomendacion( PlanDeMejora );
});

//  Actualización de una recomendación
$('.btn-update-recomendacion').on('click', function(){
    var PlanDeMejora2Update = JSON.parse( localStorage.getItem("PlanDeMejora") );
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

    var FechaPartes = $('.datepicker-fecha-cumplimiento').val().split('-');
    var FechaCompromiso = FechaPartes[2] +'-'+ FechaPartes[1] +'-'+ FechaPartes[0];

    PlanDeMejora2Update[NumRecomendation - 1].ASM                              =   $('#txtASM').val();
    PlanDeMejora2Update[NumRecomendation - 1].TipoDeActores                    =   $('#txtActoresInvolucrados').val();
    PlanDeMejora2Update[NumRecomendation - 1].Prioridad                        =   Prioridad;
    PlanDeMejora2Update[NumRecomendation - 1].FechaCompromiso                  =   FechaCompromiso;
    PlanDeMejora2Update[NumRecomendation - 1].AccionDeMejora                   =   $('#txtAccionMejora').val();
    PlanDeMejora2Update[NumRecomendation - 1].AreaResponsable                  =   $('#txtAreaResponsable').val();
    PlanDeMejora2Update[NumRecomendation - 1].ResultadosEsperados              =   $('#txtResultadosEsperados').val();
    PlanDeMejora2Update[NumRecomendation - 1].Evidencia                        =   $('#txtEvidenciasSolicitadas').val();
    PlanDeMejora2Update[NumRecomendation - 1].Propiedades.EstatusRecomendacion =   Estatus;

    localStorage.setItem('PlanDeMejora', JSON.stringify(PlanDeMejora2Update) );
    
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

    var FechaPartes = PlanDeMejora[NumRecomendation-1].FechaCompromiso.split('-');
    var FechaCompromiso = FechaPartes[2] +'-'+ FechaPartes[1] +'-'+ FechaPartes[0];
    $('.datepicker-fecha-cumplimiento').val( FechaCompromiso )

    $('#txtAreaResponsable').val( PlanDeMejora[NumRecomendation-1].AreaResponsable );
    M.textareaAutoResize( $('#txtAreaResponsable') );

    $('#txtEvidenciasSolicitadas').val( PlanDeMejora[NumRecomendation-1].Evidencia );
    M.textareaAutoResize( $('#txtEvidenciasSolicitadas') );

    $(".btn-insert-recomendacion").hide();
    $(".btn-update-recomendacion").show();

    $('#ModalAddModifyPlanMejora').modal('open');
});

$('.TableBody-RecomendacionesAComprometer').on('click', '.btn-delete-recomendation', function(){
    var NumContainer = $(this).parent().parent().siblings()[1];
    var NumRecomendation = NumContainer.innerText;
    var PlanDeMejora2SelectDelete = JSON.parse( localStorage.getItem('PlanDeMejora') );
    var FormatDataTable = '', asm_complete_flag, index_recomendation_selected;

    for(var i = 0; i<PlanDeMejora2SelectDelete.Length; i++){
        if( PlanDeMejora2SelectDelete[i].NumRecomendacion == NumRecomendation ){
            index_recomendation_selected = i;
            break;
        }
    }

    var RecDelete = PlanDeMejora2SelectDelete[index_recomendation_selected];
    console.log( "NumRecomendation => ", NumRecomendation, " Object => ", RecDelete );
    
         if( RecDelete.Propiedades.EstatusRecomendacion == "Atendido" )
        asm_complete_flag = "complete";
    else if( RecDelete.Propiedades.EstatusRecomendacion == "En proceso" )
        asm_complete_flag = "in-process";
    else if( RecDelete.Propiedades.EstatusRecomendacion == "Sin atender" )
        asm_complete_flag = "incomplete";

    FormatDataTable = FormatDataTable + "<tr>" +
                                            "<td><div class='asm-status-style-"+asm_complete_flag+"'></div></td>"+
                                            "<td class='NumASM-delete'>"+NumRecomendation+"</td>"+
                                            "<td>"+RecDelete.ASM+"</td>" +
                                            "<td>"+RecDelete.TipoDeActores+"</td>" +
                                            "<td>"+RecDelete.Prioridad+"</td>" +
                                            "<td>"+RecDelete.AccionDeMejora+"</td>" +
                                            "<td> ... </td>" +
                                        "</tr>";

    $('.table-body-content-mejoras-delete').html( FormatDataTable );
});

$('.TableBody-RecomendacionesAComprometer').on('click', '.btn-show-observation', function(){
    var PlanDeMejora2Show = JSON.parse( localStorage.getItem("PlanDeMejora") );
    var NumContainer = $(this).parent().parent().siblings()[1];
    var NumRecomendation = NumContainer.innerText;
    $('.num_recomendation_a_comprometer').text( NumRecomendation );

    $('.ObservationInRecomendation').text( PlanDeMejora2Show[NumRecomendation-1].Propiedades.Observaciones.ObservacionTexto );
    $('.RecomendationObservation_StatusValue').text( PlanDeMejora2Show[NumRecomendation-1].Propiedades.Observaciones.ObservationState );

    if( PlanDeMejora2Show[NumRecomendation-1].Propiedades.Observaciones.ObservationState == "Enviado para validación" ){
        $('.btn-update-observation-a-comprometer').hide();
        $('.btn-update-observation-a-comprometer').attr('disabled', 'disabled');
    }else{
        $('.btn-update-observation-a-comprometer').removeAttr('disabled');
        $('.btn-update-observation-a-comprometer').show();
    }
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

$('.btn-update-observation-a-comprometer').on('click', function(){
    var PlanDeMejora2UpdateObservationState = JSON.parse( localStorage.getItem("PlanDeMejora") );
    console.log( PlanDeMejora2UpdateObservationState );
    
    var NumRecomendation = $('.num_recomendation_a_comprometer').text();
    console.log( NumRecomendation );

    PlanDeMejora2UpdateObservationState[NumRecomendation-1].Propiedades.Observaciones.ObservationState = "Enviado para validación";

    localStorage.setItem('PlanDeMejora', JSON.stringify(PlanDeMejora2UpdateObservationState) );
    $('#ModalShowObservation').modal('close');

    UpdateView_RecomendacionesAComprometer();
});

$('.TableBody-RecomendacionesAtendidas').on('click', 'tr', 'td', function(){
    console.log( localStorage.length );
    var PlanDeMejora2View = JSON.parse( localStorage.getItem('PlanDeMejora') );
    var IdAtendedRecomendation = $(this).children().children()[0].innerText;

    $('.num_recomendation_atendidas').text( IdAtendedRecomendation );
    $('.RecomendationObservation_StatusValue').text( PlanDeMejora2View[IdAtendedRecomendation-1].Propiedades.Observaciones.ObservationState );
    $('.txtEvidencia-AtendedRecomendation').val( PlanDeMejora2View[IdAtendedRecomendation-1].Evidencia );
    $('.txtASM-AtendedRecomendation').val( PlanDeMejora2View[IdAtendedRecomendation-1].ASM );
    M.textareaAutoResize( $('.txtASM-AtendedRecomendation') );

    if( PlanDeMejora2View[IdAtendedRecomendation-1].Propiedades.Observaciones.Status ){

        if( PlanDeMejora2View[IdAtendedRecomendation-1].Propiedades.Observaciones.ObservationState == 'Con observación' ){

            $('.txtValidatorObservation-AtendedRecomendation').val( PlanDeMejora2View[IdAtendedRecomendation-1].Propiedades.Observaciones.ObservacionTexto );
            M.textareaAutoResize( $('.txtValidatorObservation-AtendedRecomendation') );

            $('.ValidatorObservation-AtendedRecomendation-Container').show();
            $('.btn-update-recomendation-atended').show();

        }else if( PlanDeMejora2View[IdAtendedRecomendation-1].Propiedades.Observaciones.ObservationState == 'Enviado para validación' ){
            $('.ValidatorObservation-AtendedRecomendation-Container').show();
            $('.txtValidatorObservation-AtendedRecomendation').val( PlanDeMejora2View[IdAtendedRecomendation-1].Propiedades.Observaciones.ObservacionTexto );
            M.textareaAutoResize( $('.txtValidatorObservation-AtendedRecomendation') );

            $('.btn-update-recomendation-atended').hide();
        }

    }else{
        $('.ValidatorObservation-AtendedRecomendation-Container').hide();
        $('.btn-update-recomendation-atended').hide();
    }
    
    $('#ModalShowAtendedRecomendation').modal('open');
});

$('.btn-update-recomendation-atended').on('click', function(){
    var PlanDeMejora2UpdateObservationState = JSON.parse( localStorage.getItem("PlanDeMejora") );    
    var NumRecomendation = $('.num_recomendation_atendidas').text();
    $('.num_recomendation_atendidas').css('display', 'none');

    PlanDeMejora2UpdateObservationState[NumRecomendation-1].Propiedades.Observaciones.ObservationState = "Enviado para validación";
    PlanDeMejora2UpdateObservationState[NumRecomendation-1].Propiedades.Observaciones.IconState = "assignment_return";

    localStorage.setItem('PlanDeMejora', JSON.stringify(PlanDeMejora2UpdateObservationState) );
    $('#ModalShowAtendedRecomendation').modal('close');
    
    UpdateView_RecomendacionesAtendidas();
});

$('.TableBody-RecomendacionesRechazadas').on('click', 'tr', 'td', function(){
    var PlanDeMejora2ViewRecomendation = JSON.parse( localStorage.getItem('PlanDeMejora') );
    var IdRefusedRecomendation = $(this).children().children()[0].innerText - 1;
    $('.num_recomendation_refused').text( IdRefusedRecomendation );
    $('.txtASM-RefusedRecomendation').val( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].ASM );
    M.textareaAutoResize( $('.txtASM-RefusedRecomendation') );

    if( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.Observaciones.Status ){

        console.log( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.Observaciones.ObservationState );

        if( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.Observaciones.ObservationState == "Con observación" ){
            $('.ValidatorObservation-RefusedRecomendation-Container').show();
            $('.txtValidatorObservation-RefusedRecomendation').val( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.Observaciones.ObservacionTexto );

            $('.btn-update-observation-refused').show();
        }else if( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.Observaciones.ObservationState == "Enviado para validación" ){
            $('.ValidatorObservation-RefusedRecomendation-Container').show();
            $('.txtValidatorObservation-RefusedRecomendation').val( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.Observaciones.ObservacionTexto );

            $('.btn-update-observation-refused').hide();
        }

    }else{
        $('.ValidatorObservation-RefusedRecomendation-Container').hide();
    }

    $('.RecomendationObservation_StatusValue').text( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.Observaciones.ObservationState );
    $('.txtJustification-RefusedRecomendation').val( PlanDeMejora2ViewRecomendation[IdRefusedRecomendation].Propiedades.TipoRecomendacion.Justificacion );
    
    $('#ModalShowRefusedRecomendation').modal('open');
});

$('.btn-update-observation-refused').on('click', function(){
    var PlanDeMejora2UpdateObservationState = JSON.parse( localStorage.getItem("PlanDeMejora") );    
    var NumRecomendation = $('.num_recomendation_refused').text();

    console.log( 'Clicked => ', NumRecomendation );

    PlanDeMejora2UpdateObservationState[NumRecomendation].Propiedades.Observaciones.ObservationState = "Enviado para validación";
    PlanDeMejora2UpdateObservationState[NumRecomendation].Propiedades.Observaciones.IconState = "assignment_return";
    console.log( PlanDeMejora2UpdateObservationState );

    localStorage.setItem('PlanDeMejora', JSON.stringify(PlanDeMejora2UpdateObservationState) );
    $('#ModalShowRefusedRecomendation').modal('close');
    
    UpdateView_RecomendacionesRechazadas();
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
                            '<div class="title-document-container">'+
                                '<span class="title title-document truncate">'+
                                    '<span class="idoc">'+idoc+'</span>'+filename+'.'+frmt+
                                '</span>'+
                                '<span class="document-status document-'+styledocs+'">'+
                                    '<i class="material-icons left icon-status-document">'+iconstatus+'</i>'+filestatus+
                                '</span>'+
                            '</div>' +

                            '<div class="action-buttons-docs">'+
                                '<a class="btn-small btn-view-document modal-trigger waves-effect blue darken-4" href="#modal-show-document"> <i class="material-icons left">open_in_browser</i>Ver documento</a>'+
                            '</div>'+
                         '</li>';

    return DocumentFormat;
}

function UpdateView_DocumentosProyecto(){
    var DataDoc = JSON.parse( localStorage.getItem('ProjectDocuments') );

    //  DOCUMENTOS Y ASM POR DOCUMENTO
    if( DataDoc.Status === "Correct" ){
        $('.card-title-documents').text('Documentos a formalizar');
        $('.card-title-documents').css('margin-left', '20px');

        var doc_html = "";

        for( var doc_i = 0; doc_i < DataDoc.Length; doc_i++ ){
            Documento_i = DataDoc[doc_i];
            doc_html = doc_html + HTML_DocumentFormat( Documento_i.FormatoDocumento, Documento_i.NombreDocumento, Documento_i.EstadoRevision, doc_i );

            if( Documento_i.DocumentoFirmado.Status == "Sin documento" ){
                console.log( 'Formatting Sin Documento' );        

                $('.document-sign-container').hide();
                $('.document-evidence').show();
            }else if( Documento_i.DocumentoFirmado.Status == "Documento subido" ){
                console.log( 'Formatting Documento Subido' );
        
                $('.document-sign-container').show();
                $('.document-evidence').hide();

                $('.NombreDocumento').text(Documento_i.DocumentoFirmado.Nombre+'.'+Documento_i.DocumentoFirmado.Formato);
                $('.FechaSubida').text(Documento_i.DocumentoFirmado.FechaSubida);
                $('.HoraSubida').text(Documento_i.DocumentoFirmado.HoraSubida);
            }
        }
    
        $('.collection-documents').show();
        $('.btn-del-documents').hide();

        $('.collection-documents').empty();
        $('.collection-documents').append( doc_html );

        $('.collection-documents').children()[0].click();
    }else if( DataDoc.Status === "Sin resultados" ){
        $('.collection-documents').hide();
        $('.collection-document-recomendations').hide();
        $('.card-title-documents').text('Sin documentos');
        $('.btn-del-documents').hide();
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

    if( DocumentosProyecto.Status == 'Correct' ){
        $('.btn-generate-documents').hide();
        $('.btn-del-documents').hide();
    }else if( DocumentosProyecto.Status == 'Sin resultados' ){
        $('.btn-generate-documents').removeClass('disabled');
        $('.btn-generate-documents').show();
        $('.btn-del-documents').hide();
    }

    UpdateView_DocumentosProyecto(DocumentosProyecto);
}

$('.btn-del-documents').on('click', function(){
    $('.card-title-documents').text('Sin documentos');
    $('.card-title-documents').css('margin-left', '20px');

    $('.btn-del-documents').hide();
    $('.collection-documents').hide();
    $('.collection-document-evidence').hide();

    $('.btn-generate-documents').removeClass('disabled');
    $('.btn-generate-documents').show();
});

$('.btn-generate-documents').on('click', function(){
    var DataDocs = JSON.parse( localStorage.getItem('ProjectDocuments') );

    $('.card-title-documents').text('Documentos a formalizar');
    $('.card-title-documents').css('margin-left', '20px');

    $('.btn-del-documents').hide();
    $('.collection-documents').empty();
    $('.collection-documents').show();
    $('.collection-document-evidence').show();

    $('.btn-generate-documents').addClass('disabled');
    $('.btn-generate-documents').hide();

    UpdateView_DocumentosProyecto( DataDocs );
});

//  Eventos para mostrar y ocultar las opciones para los documentos

$('.collection-documents').on('click', '.collection-item', function(){
    $(this).addClass('collection-item-active');
    $(this).siblings().removeClass('collection-item-active');
    $(this).find('.document-status').css('background-color', 'white');
    $(this).siblings().find('.document-status').css('background-color', 'rgba(240, 240, 240, 0.8)');
    $('.txt-show-name-file').val('');

    var ProjectDocuments2ViewPDF = JSON.parse( localStorage.getItem("ProjectDocuments") );
    var id_doc = $(this).find('.idoc').text();
    var name_file = 'Resource\\files\\' + ProjectDocuments2ViewPDF[id_doc].NombreDocumento+'.'+ProjectDocuments2ViewPDF[id_doc].FormatoDocumento;
    var embed_pdf = "<embed class='docs-generated' src='"+name_file+"' type='application/pdf'/>";

    console.log( ProjectDocuments2ViewPDF[id_doc] );

    if( ProjectDocuments2ViewPDF[id_doc].DocumentoFirmado.Status == "Sin documento" ){
        console.log( 'Sin Documento' );

        $('.document-sign-container').hide();
        $('.document-evidence').show();
    }else if( ProjectDocuments2ViewPDF[id_doc].DocumentoFirmado.Status == "Documento subido" ){
        console.log( 'Documento Subido ' );

        $('.document-sign-container').show();
        $('.document-evidence').hide();

        $('.NombreDocumento').text( ProjectDocuments2ViewPDF[id_doc].DocumentoFirmado.Nombre+'.'+DocumentoFirmado.Formato);
        $('.FechaSubida').text( ProjectDocuments2ViewPDF[id_doc].DocumentoFirmado.FechaSubida);
        $('.HoraSubida').text( ProjectDocuments2ViewPDF[id_doc].DocumentoFirmado.HoraSubida);
    }
    
    $('.id_doc2sign').text(id_doc);
    $('.show-pdf-document').html(embed_pdf);
});

$('.btn-upload-doc-formalice').on('click', function(){
    var ProjectDocuments2update = JSON.parse( localStorage.getItem('ProjectDocuments') );
    var idoc                    = $(this).siblings()[1].innerText;
    var FileLoaded              = $('#fileDoc')[0].files[0];
    var NameSplited             = FileLoaded.name.split('.');
    var FileName                = NameSplited[0];
    var FileFormat              = NameSplited[1];

    console.log( idoc );

//  FECHA DE HOY PARA EL SELECTOR DE FECHA
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today_fmt1 = dd + '/' + mm + '/' + yyyy;

    var hours   = String(today.getHours()  ).padStart(2, '0');
    var minutes = String(today.getMinutes()).padStart(2, '0');
    today_hora  = hours+':'+minutes;

    ProjectDocuments2update[idoc].DocumentoFirmado.Status = "Documento subido";
    ProjectDocuments2update[idoc].DocumentoFirmado.Nombre = FileName;
    ProjectDocuments2update[idoc].DocumentoFirmado.Formato = FileFormat;
    ProjectDocuments2update[idoc].DocumentoFirmado.FechaSubida = today_fmt1;
    ProjectDocuments2update[idoc].DocumentoFirmado.HoraSubida = today_hora;

    $('.NombreDocumento').text(FileName+'.'+FileFormat);
    $('.FechaSubida').text(today_fmt1);
    $('.HoraSubida').text(today_hora);
    
    $('.document-evidence').hide();
    $('.document-sign-container').fadeIn('slow');

    localStorage.setItem( 'ProjectDocuments', JSON.stringify( ProjectDocuments2update ) );
});

$('.collection-documents').on('mouseenter', '.collection-item', function(){
    $(this).children('.action-buttons-docs').css('display', 'block');
});

$('.collection-documents').on('mouseleave', '.collection-item', function(){
    $(this).children('.action-buttons-docs').css('display', 'none');
});
