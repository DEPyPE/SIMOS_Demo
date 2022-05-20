
//var UserData    = JSON.parse( localStorage.getItem("UserData") );
//var ProjectInfo = JSON.parse( localStorage.getItem("ProjectInfo") );

var 

function ShowInformationProject(){

    Read_ProjectData();
    Read_FTEvaluation();
    Read_OpinionGeneral();
    Read_Recomendaciones();
    Read_ProjectDocuments();

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
  
/*
    //$('#modal-upload-document').modal('open');
    $('body .btn-document-viewer').addClass('tooltipped');
    $('body .btn-document-viewer').attr('data-position', 'bottom');
    $('body .btn-document-viewer').attr('data-tooltip', 'Ver documento');
*/

    Read_ProjectData();
    Read_FTEvaluation();
    Read_OpinionGeneral();
    Read_Recomendaciones();
    Read_ProjectDocuments();
    Read_GeneralCommentRecomendation();
    
    console.log( 'Ready!' );
});

// *****   FICHA TÉCNICA DEL PROYECTO   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update

$('.ValidateInformationCheckbox').on('click', function(){
    console.log( $('.ValidateInformationProjectCheckbox').prop('checked') );
});

function UpdateView_FTProject(FichaTecnicaProyecto){
    //console.log( "Ficha técnica del proyecto => ",  FichaTecnicaProyecto );

    if( FichaTecnicaProyecto.Status == "Correct" ){
        $('.btn-add-project-information').hide();
        $('.btn-edit-project-information').show();
        $('.btn-save-project-information').hide();
        $('.btn-update-project-information').show();
        $('.table-ficha-tecnica-proyecto').show();
        $('.NoFTProjectInformation').hide();

        console.log(FichaTecnicaProyecto.ValidacionInfo);

        if( FichaTecnicaProyecto.ValidacionInfo == 0 ){
            $('.validation-ft-programa').hide();
            $('.btn-edit-project-information').show();
        }else{
            $('.validation-ft-programa').show();
            $('.btn-edit-project-information').hide();
        }

        $('.main-title-project').text( 'SIMOS / '+FichaTecnicaProyecto.ClaveProyecto);
        $('.NombreProyecto').text( FichaTecnicaProyecto.NombreProyecto );
        $('.ClaveProyecto').text( FichaTecnicaProyecto.ClaveProyecto );
        $('.DependenciaProyecto').text( FichaTecnicaProyecto.DependenciaDelProyecto );
        $('.SiglasDependencia').text( FichaTecnicaProyecto.SiglasDependenciaProyecto );
        $('.UnidadResponsable').text( FichaTecnicaProyecto.UnidadResponsable );
        $('.SiglasUnidadResponsable').text( FichaTecnicaProyecto.SiglasUnidadResponsable );
        $('.NombreResponsable').text( FichaTecnicaProyecto.NombreResponsable );
    }else if( FichaTecnicaProyecto.Status == "Sin resultados" ){
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
}

function Create_ProjectData(ProjectData){    
    var TypeQry = "InsertProjectInfo";

    $.post('Controller/HomeEPP_CreateController.php', {ProjectInfo: ProjectData, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            localStorage.setItem('FichaTecnicaProyecto', JSON.stringify(ProjectData));
            $('#ModalAddModifyTechnicalProjectInfo').modal('close');
            ProjectData.Status = "Correct";

            M.toast({html: 'Datos guardados correctamente', classes: 'green darken-2 rounded'});
            UpdateView_FTProject(ProjectData);
        }
    });
}

function Read_ProjectData(){
    var TypDat = "TechnicalInformationProject";
    var ID_Project = ProjectInfo.ID_ProgramaProyecto;

    $.post("Controller/HomeEPP_ReadController.php", {ID: ID_Project, TypeData: TypDat}, function( DataTechProject ){
        FichaTecnicaProyecto = JSON.parse( DataTechProject );
        localStorage.setItem("FichaTecnicaProyecto", JSON.stringify(FichaTecnicaProyecto) );

        UpdateView_FTProject(FichaTecnicaProyecto);
    });
}

function Update_ProjectData( ProjectData ){
    var TypeQry = "UpdateProjectInfo";

    $.post('Controller/HomeEPP_UpdateController.php', {Data: ProjectData, TypeData: TypeQry}, function(DataRcv){
        console.log(DataRcv);
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            localStorage.setItem('FichaTecnicaProyecto', JSON.stringify(ProjectData));
            $('#ModalAddModifyTechnicalProjectInfo').modal('close');
            ProjectData.Status = "Correct";

            M.toast({html: 'Datos actualizados correctamente', classes: 'green darken-2 rounded'});
            UpdateView_FTProject(ProjectData);
        }else if( Data.Status == "Error" ){
            M.toast({html: 'Error en el servidor.', classes: 'red darken-2 rounded'});
        }else{
            M.toast({html: 'Error. Agregue los datos correctamente <br> en su respectivo campo.', classes: 'green darken-2 rounded'});
        }

    });
}

function ReadForm_ProjectData(){
    var ProjectData = { 
        ID_Project: ProjectInfo.ID_ProgramaProyecto,
        NombreProyecto: $('#txtNombreProyecto').val(),
        ClaveProyecto: $('#txtClaveProyecto').val(),
        DependenciaDelProyecto: $('#txtDepen').val(),
        SiglasDependenciaProyecto: $('#txtSiglasDependencia').val(),
        UnidadResponsable: $('#txtUR').val(),
        SiglasUnidadResponsable: $('#txtSiglasUR').val(),
        NombreResponsable: $('#txtResponsable').val(),
        ValidacionInfo: $('.ValidateInformationProjectCheckbox').prop('checked')
    }

    return ProjectData;
}

$('.btn-save-project-information').on('click', function(){
    var ProjectData = ReadForm_ProjectData();
    Create_ProjectData( ProjectData );
});

$('.btn-update-project-information').on('click', function(){
    var ProjectData = ReadForm_ProjectData();
    Update_ProjectData( ProjectData );
});

$('.btn-edit-project-information').on('click', function(){
    var FT_Project = JSON.parse( localStorage.getItem("FichaTecnicaProyecto"));

    $('#txtNombreProyecto').val( FT_Project.NombreProyecto ),
    $('#txtClaveProyecto').val( FT_Project.ClaveProyecto ),
    $('#txtDepen').val( FT_Project.DependenciaDelProyecto ),
    $('#txtSiglasDependencia').val( FT_Project.SiglasDependenciaProyecto ),
    $('#txtUR').val( FT_Project.UnidadResponsable ),
    $('#txtSiglasUR').val( FT_Project.SiglasUnidadResponsable ),
    $('#txtResponsable').val( FT_Project.NombreResponsable )
});


// *****   FICHA TÉCNICA DE LA EVALUACIÓN   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateView_FTEvaluation(FichaTecnicaEvaluacion){
    //console.log( "Ficha técnica de la evaluacion => ", FichaTecnicaEvaluacion );

    if( FichaTecnicaEvaluacion.Status == "Correct" ){
        $('.table-evaluation').show();
        $('.NoFTEvaluationInformation').hide();
        
        $('.btn-add-evaluation-information').hide();
        $('.btn-edit-evaluation-information').show();
        $('.btn-insert-evaluation-information').hide();
        $('.btn-update-evaluation-information').show();

        console.log(FichaTecnicaEvaluacion.ValidacionInfo);

        if( FichaTecnicaEvaluacion.ValidacionInfo == 0 ){
            $('.validation-ft-evaluation').hide();
            $('.btn-edit-evaluation-information').show();
        }else{
            $('.validation-ft-evaluation').show();
            $('.btn-edit-evaluation-information').hide();
        }
        
        $('.InstanciaEvaluadora').text( FichaTecnicaEvaluacion.InstanciaEvaluadora );
        $('.NombreDeEvaluacion').text( FichaTecnicaEvaluacion.NombreDeEvaluacion );
        $('.TipoEvaluacion').text( FichaTecnicaEvaluacion.TipoEvaluacion );
        $('.AñoDeEvaluacion').text( FichaTecnicaEvaluacion.AñoDeEvaluacion );
        $('.NombreDelInforme').text( FichaTecnicaEvaluacion.NombreDelInforme );
        $('.CostoEvaluacion').text( '$'+FichaTecnicaEvaluacion.CostoEvaluacion );
    }else if( FichaTecnicaEvaluacion.Status == "Sin resultados" ){
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

function Create_EvaluationData(EvaluationData){
    var TypeQry = "InsertEvaluationInfo";

    $.post('Controller/HomeEPP_CreateController.php', {EvalData: EvaluationData, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            localStorage.setItem('FichaTecnicaEvaluacion', JSON.stringify(EvaluationData) );
            $('#ModalAddModifyTechnicalEvaluationInfo').modal('close');
            EvaluationData.Status = "Correct";

            M.toast({html: 'Datos guardados correctamente', classes: 'green darken-2 rounded'});
            UpdateView_FTEvaluation(EvaluationData);
        }else{
            M.toast({html: 'Error al guardar los datos', classes: 'red rounded'});
        }
    });
}

function Read_FTEvaluation(){
    var TypDat = "TechnicalInformationEvaluation";
    var ID_Project = ProjectInfo.ID_ProgramaProyecto;

    $.post("Controller/HomeEPP_ReadController.php", {ID: ID_Project, TypeData: TypDat}, function( DataTechEvaluator ){
        FichaTecnicaEvaluacion = JSON.parse( DataTechEvaluator );
        localStorage.setItem("FichaTecnicaEvaluacion", JSON.stringify(FichaTecnicaEvaluacion) );

        UpdateView_FTEvaluation(FichaTecnicaEvaluacion);
    });
}

function Update_EvaluationData( EvaluationData ){
    var TypeQry = "UpdateEvaluationInfo";

    $.post('Controller/HomeEPP_UpdateController.php', {Data: EvaluationData, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            localStorage.setItem('FichaTecnicaEvaluacion', JSON.stringify(EvaluationData));
            $('#ModalAddModifyTechnicalEvaluationInfo').modal('close');
            EvaluationData.Status = "Correct";

            M.toast({html: 'Datos actualizados correctamente', classes: 'green darken-2 rounded'});
            UpdateView_FTEvaluation(EvaluationData);
        }else if( Data.Status == "Error" ){
            M.toast({html: 'Error en el servidor.', classes: 'red darken-2 rounded'});
        }else{
            M.toast({html: 'Error. Agregue los datos correctamente <br> en su respectivo campo.', classes: 'green darken-2 rounded'});
        }

    });    
}

function ReadForm_EvaluationData(){
    var EvaluationData = {
        ID_Project: ProjectInfo.ID_ProgramaProyecto,
        InstanciaEvaluadora: $("#txtInstanciaEvaluadora").val(),
        NombreDeEvaluacion: $("#txtNombreEvaluacion").val(),
        TipoEvaluacion: $("#txtTipoEvaluacion").val(),
        AñoDeEvaluacion: $("#txtYearEvaluation").val(),
        NombreDelInforme: $("#txtNombreInforme").val(),
        CostoEvaluacion: $("#txtCostoEvaluacion").val(),
        ValidacionInfo: $('.ValidateInformationEvaluationCheckbox').prop('checked')
    }

    return EvaluationData;
}

$('.btn-insert-evaluation-information').on('click', function(){
    var EvaluationData = ReadForm_EvaluationData();
    Create_EvaluationData( EvaluationData );
});

$('.btn-update-evaluation-information').on('click', function(){
    var EvaluationData = ReadForm_EvaluationData();
    Update_EvaluationData( EvaluationData );
});

$('.btn-edit-evaluation-information').on('click', function(){
    var FT_Evaluation = JSON.parse( localStorage.getItem("FichaTecnicaEvaluacion") );

    $("#txtInstanciaEvaluadora").val( FT_Evaluation.InstanciaEvaluadora );
    $("#txtNombreEvaluacion").val( FT_Evaluation.NombreDeEvaluacion );
    $("#txtTipoEvaluacion").val( FT_Evaluation.TipoEvaluacion );
    $("#txtYearEvaluation").val( FT_Evaluation.AñoDeEvaluacion );
    $("#txtNombreInforme").val( FT_Evaluation.NombreDelInforme );
    $("#txtCostoEvaluacion").val( FT_Evaluation.CostoEvaluacion );
});


// *****   OPINIÓN GENERAL   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update

function UpdateView_OpinionGeneral(OpinionGeneral){
    if( OpinionGeneral.Status == "Correct" ){
        $('#ComentariosObservacionesGenerales').show();
        $('.ComentariosObservacionesPorTema').show();

        $('#ComentariosObservacionesGenerales').val( OpinionGeneral.ComentariosObservacionesGenerales );
        M.textareaAutoResize($('#ComentariosObservacionesGenerales'));

        $('.ComentariosObservacionesPorTema').val( OpinionGeneral.ComentariosObservacionesPorTema );
        M.textareaAutoResize($('.ComentariosObservacionesPorTema'));
        
        $('.OG_SinInfo').css('display', 'none');
        
        $('.btn-add-opinion-general').hide();
        $('.btn-edit-general-comments').show();
        $('.btn-edit-specific-comments').show();
        $('.btn-insert-opinion-general').hide()
    }else if( OpinionGeneral.Status == "Sin resultados" ){
        $('.OG_SinInfo').css('display', 'block');

        $('#ComentariosObservacionesGenerales').hide();
        $('.ComentariosObservacionesPorTema').hide();

        $('.btn-add-opinion-general').show();
        $('.btn-edit-general-comments').hide();
        $('.btn-edit-specific-comments').hide();
        $('.btn-insert-opinion-general').show();
    }else{
        M.toast({html: 'Error al mostrar la opinión general. Err. 0001', classes: 'red rounded'});
    }
}

function ReadForm_OpinionGeneral(){
    var OpinionGeneral = {
        ID_Project: ProjectInfo.ID_ProgramaProyecto,
        ComentariosObservacionesGenerales: $('#txtObservacionesGenerales').val(),
        ComentariosObservacionesPorTema: $('#txtPorTema').val()
    }

    return OpinionGeneral;
}

function Create_OpinionGeneral(OpinionForm){
    var TypeQry = "InsertOpinionGeneral";

    $.post('Controller/HomeEPP_CreateController.php', {OpinionData: OpinionForm, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            localStorage.setItem('OpinionGeneral', JSON.stringify(OpinionForm) );
            $('#ModalAddOpinionGeneral').modal('close');
            OpinionForm.Status = "Correct";

            M.toast({html: 'Datos guardados correctamente', classes: 'green darken-2 rounded'});
            UpdateView_OpinionGeneral(OpinionForm);
        }else{
            M.toast({html: 'Error al guardar los datos', classes: 'red rounded'});
        }
    });
}

function Read_OpinionGeneral(){
    var TypDat = "OpinionGeneral";
    var ID_Project = ProjectInfo.ID_ProgramaProyecto;

    $.post("Controller/HomeEPP_ReadController.php", {ID: ID_Project, TypeData: TypDat}, function( DataOpinionGeneral ){
        OpinionGeneral = JSON.parse( DataOpinionGeneral );
//        OpinionGeneral.ComentariosObservacionesGenerales = OpinionGeneral.ComentariosObservacionesGenerales.replace(/\n/g, '<br>');
//        OpinionGeneral.ComentariosObservacionesPorTema = OpinionGeneral.ComentariosObservacionesPorTema.replace(/\n/g, '<br>');

        localStorage.setItem("OpinionGeneral", JSON.stringify(OpinionGeneral) );

        //console.log( "Opinión general => ", DataOG );
        UpdateView_OpinionGeneral(OpinionGeneral);
        UpdateView_GeneralCommentsRecomendation();
    });
}

function Update_GeneralComments( GeneralComments ){
    var TypeQry = "UpdateGeneralComments";
    
    $.post('Controller/HomeEPP_UpdateController.php', {Data: GeneralComments, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            localStorage.setItem('OpinionGeneral', JSON.stringify(GeneralComments));
            $('#ModalModifyGeneralSpecificComments').modal('close');
            GeneralComments.Status = "Correct";

            M.toast({html: 'Datos actualizados correctamente', classes: 'green darken-2 rounded'});
            UpdateView_OpinionGeneral(GeneralComments);
        }else if( Data.Status == "Error" ){
            M.toast({html: 'Error en el servidor.', classes: 'red darken-2 rounded'});
        }else{
            M.toast({html: 'Error. Agregue los datos correctamente <br> en su respectivo campo.', classes: 'green darken-2 rounded'});
        }

    });    
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   

function Update_SpecificComments( SpecificComments ){
    var TypeQry = "UpdateSpecificComments";
    
    $.post('Controller/HomeEPP_UpdateController.php', {Data: SpecificComments, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            localStorage.setItem('OpinionGeneral', JSON.stringify(SpecificComments));
            $('#ModalModifyGeneralSpecificComments').modal('close');
            SpecificComments.Status = "Correct";

            M.toast({html: 'Datos actualizados correctamente', classes: 'green darken-2 rounded'});
            UpdateView_OpinionGeneral(SpecificComments);
        }else if( Data.Status == "Error" ){
            M.toast({html: 'Error en el servidor.', classes: 'red darken-2 rounded'});
        }else{
            M.toast({html: 'Error. Agregue los datos correctamente <br> en su respectivo campo.', classes: 'green darken-2 rounded'});
        }

    });
}

$('.btn-insert-opinion-general').on('click', function(){
    var OpinionGeneral = ReadForm_OpinionGeneral();
    Create_OpinionGeneral( OpinionGeneral );
});

$('.btn-modify-general-comments').on('click', function(){
    var GeneralComments = {
        ID_Project: ProjectInfo.ID_ProgramaProyecto,
        ComentariosObservacionesGenerales: $('#txtComentarios').val(),
        ComentariosObservacionesPorTema:   $('.ComentariosObservacionesPorTema').val()
    }
    
    Update_GeneralComments(GeneralComments);
});

$('.btn-modify-specific-comments').on('click', function(){
    var GeneralComments = {
        ID_Project: ProjectInfo.ID_ProgramaProyecto,
        ComentariosObservacionesGenerales: $('#ComentariosObservacionesGenerales').val(),
        ComentariosObservacionesPorTema:   $('#txtComentarios').val()
    }
    
    Update_GeneralComments(GeneralComments);
});

$('.btn-edit-opinion-general').on('click', function(){

    $('#txtPorTema').val( OpinionGeneral.ComentariosObservacionesPorTema ) ;
    M.textareaAutoResize($('#txtPorTema'));
});

$('.btn-edit-general-comments').on('click', function(){
    var OpinionGeneral = JSON.parse( localStorage.getItem("OpinionGeneral") );

    $('#txtComentarios').val( OpinionGeneral.ComentariosObservacionesGenerales );
    M.textareaAutoResize($('#txtComentarios'));

    $('.btn-modify-specific-comments').hide();
    $('.btn-modify-general-comments').show();
});

$('.btn-edit-specific-comments').on('click', function(){
    var OpinionGeneral = JSON.parse( localStorage.getItem("OpinionGeneral") );

    $('#txtComentarios').val( OpinionGeneral.ComentariosObservacionesPorTema );
    M.textareaAutoResize($('#txtComentarios'));

    $('.btn-modify-specific-comments').show();
    $('.btn-modify-general-comments').hide();
});

// *****   COMENTARIOS A LA OPINIÓN GENERAL   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update
// * * (D) Delete

function UpdateView_GeneralCommentsRecomendation(){
    var CommentsFormat = '', Commentarios = JSON.parse( localStorage.getItem('RecomendationsGeneralComments') );
//    console.log( Commentarios );

    if( Commentarios.Status == "Correct" ){
        for(var i = 0; i < 4; i++){
            CommentsFormat = CommentsFormat + "<a class='collection-item collection-item-reco-rg modal-trigger' href='#ModalRecomendacionComentariosGenerales'>"+
                                                    "<div class='reco-cg-title truncate'>"+Commentarios[i].RecomendacionTexto+"</div>" +
                                                    "<div class='reco-cg-options'>"+
                                                        "<a class='btn-floating btn-small waves-effect btn-delete-reco-cg yellow'><i class='material-icons'>delete</i></a>"+
                                                        "<a class='btn-floating btn-small waves-effect btn-modify-reco-cg red   '><i class='material-icons'>edit</i></a>"+
                                                    "</div>"+
                                              "</a>";
        }
    
        $('.collection-messages-general-comments').empty();
        $('.collection-messages-general-comments').html( CommentsFormat );
    }else
        console.log( 'No' );
}

function Create_GeneralCommentRecomendation(){ /* In construction */ }

function Read_GeneralCommentRecomendation  (){
    var ID_GeneralOpinion = 1;

    $.post('Controller/HomeEPP_ReadController.php', {ID: ID_GeneralOpinion, TypeData: "ReadRecomendationGeneralComments"}, function(ResponseServer){
        var CommentsOG = JSON.parse( ResponseServer );

        localStorage.setItem( 'RecomendationsGeneralComments', JSON.stringify( CommentsOG ) );
        UpdateView_GeneralCommentsRecomendation();
    });
}

function Update_GeneralCommentRecomendation(){ /* In construction */ }

function Delete_GeneralCommentRecomendation(){ /* In construction */ }


/*
    $('.collection-messages-general-comments')
    <a href="#ModalRecomendacionComentariosGenerales" class="collection-item truncate modal-trigger">Corregir ortografía de esta sección</a>
*/

// *****   PLAN DE MEJORA   ******
// * * * * Funciones CRUD y eventos
// * * (C) Create
// * * (R) Read
// * * (U) Update
// * * (D) Delete

function UpdateView_Recomendaciones(RecomendacionForm){

    var table_recomendaciones = "";
    var asm_complete_flag;

    if( RecomendacionForm.Status == "Correct" ){
        $('.table-plan-de-mejora').show();

        for(var i=0; i<RecomendacionForm.Length; i++){

            if( RecomendacionForm[i].BanderaRecomendacionCompletada == "Corregido" )
                asm_complete_flag = "complete";
            else if( RecomendacionForm[i].BanderaRecomendacionCompletada == "En proceso" )
                asm_complete_flag = "in-process";
            else
                asm_complete_flag = "incomplete";

            table_recomendaciones = table_recomendaciones +
                "<tr>"+ 
                    "<td class='center-align'> <div class='asm-status-style-"+asm_complete_flag+"'></div></td>"+
                    "<td class='NumASM center-align'>"+ RecomendacionForm[i].IdentificadorRecomendacion +"</td>"+
                    "<td>"+ RecomendacionForm[i].AspectoSusceptibleDeMejora +"</td>"+
                    "<td>"+ RecomendacionForm[i].TipoActoresInvolucradosEnSolucion +"</td>"+
                    "<td class='center-align'>"+ RecomendacionForm[i].NivelDePrioridad +"</td>"+
                    "<td>"+ RecomendacionForm[i].AccionDeMejora +"</td>"+
                    "<td>"+ RecomendacionForm[i].AreaResponsable +"</td>"+
                    "<td class='center-align'>"+ RecomendacionForm[i].FechaCompromisoDeCumplimiento +"</td>"+
                    "<td>"+ RecomendacionForm[i].ResultadosEsperados +"</td>"+
                    "<td>"+ RecomendacionForm[i].EvidenciasSolicitadas +
                        "<div class='options-recomendation-container'>"+
                            "<a class='btn-floating btn-small btn-delete-recomendation  modal-trigger waves-effect red darken-2 right' href='#ModalDeleteRecomendation'><i class='material-icons'>delete</i></a>"+
                            "<a class='btn-floating btn-small btn-edit-recomendation    modal-trigger waves-effect yellow darken-2 right' href='#ModalAddModifyPlanMejora'><i class='material-icons'>edit</i></a>"+
                        "</div>"+
                    "</td>"+
                "</tr>";
        }

        $('.no-data-recomendaciones').css('display', 'none');
        $('.with-data-recomendaciones').css('display', 'block');

        $('.table-body-content-mejoras').empty();
        $('.table-body-content-mejoras').append( table_recomendaciones );
    }else if( RecomendacionForm.Status == "Sin resultados" ){
        $('.no-data-recomendaciones').css('display', 'block');
        $('.with-data-recomendaciones').css('display', 'none');
        $('.card-plan-de-mejora').css('display', 'none');
        $('.table-plan-de-mejora').hide();
    }else{
        M.toast({html: 'Error al mostrar el plan de mejora. Err. 0001', classes: 'red rounded'});
    }

}

function UpdateView_DeleteRecomendacion(DeleteRecomendacionData){
    var table_recomendaciones = "";
    var asm_complete_flag;

    if( DeleteRecomendacionData.BanderaRecomendacionCompletada == "Corregido" )
    asm_complete_flag = "complete";
    else if( DeleteRecomendacionData.BanderaRecomendacionCompletada == "En proceso" )
        asm_complete_flag = "in-process";
    else
        asm_complete_flag = "incomplete";

    table_recomendaciones = table_recomendaciones +
        "<tr>"+ 
            "<td class='center-align'> <div class='asm-status-style-"+asm_complete_flag+"'></div></td>"+
            "<td class='NumASM-delete center-align'>"+ DeleteRecomendacionData.IdentificadorRecomendacion +"</td>"+
            "<td>"+ DeleteRecomendacionData.AspectoSusceptibleDeMejora +"</td>"+
            "<td>"+ DeleteRecomendacionData.TipoActoresInvolucradosEnSolucion +"</td>"+
            "<td class='center-align'>"+ DeleteRecomendacionData.NivelDePrioridad +"</td>"+
            "<td>"+ DeleteRecomendacionData.AccionDeMejora +"</td>"+
            "<td> ... </td>"+
        "</tr>";

    $('.table-body-content-mejoras-delete').empty();
    $('.table-body-content-mejoras-delete').append( table_recomendaciones );

}

function Create_Recomendacion(RecomendacionForm){
    var TypeQry = "InsertRecomendacion";

    $.post('Controller/HomeEPP_CreateController.php', {Recomendacion: RecomendacionForm, TypeData: TypeQry}, function(DataRcv){
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
            
            new_object_recomendation[new_length-1] = RecomendacionForm;

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
    var TypDat = "Recomendaciones";
    var ID_Project = ProjectInfo.ID_ProgramaProyecto;

    $.post("Controller/HomeEPP_ReadController.php", {ID: ID_Project, TypeData: TypDat}, function( DataRecomendaciones ){
        Recomendaciones = JSON.parse( DataRecomendaciones );
        localStorage.setItem("Recomendaciones", JSON.stringify(Recomendaciones) );

        UpdateView_Recomendaciones(Recomendaciones);
    });
}

function Update_Recomendation( RecomendationForm ){
    var TypeQry = "UpdateRecomendaciones";
    
    $.post('Controller/HomeEPP_UpdateController.php', {Data: RecomendationForm, TypeData: TypeQry}, function(DataRcv){
        var Data = JSON.parse( DataRcv );

        if( Data.Status == "Correct" ){
            var DataRecomendaciones = JSON.parse( localStorage.getItem('Recomendaciones') );

            for(var i=0; i<DataRecomendaciones.Length; i++)
                if( DataRecomendaciones[i].IdentificadorRecomendacion == RecomendationForm.IdentificadorRecomendacion  )
                    DataRecomendaciones[i] = RecomendationForm;
            
            localStorage.setItem('Recomendaciones', JSON.stringify(DataRecomendaciones));            
            DataRecomendaciones.Status = "Correct";           
            UpdateView_Recomendaciones(DataRecomendaciones);

            $('#ModalAddModifyPlanMejora').modal('close');
            M.toast({html: 'Datos actualizados correctamente', classes: 'green darken-2 rounded'});
        }else if( Data.Status == "Error" ){
            M.toast({html: 'Error en el servidor.', classes: 'red darken-2 rounded'});
        }else{
            M.toast({html: 'Error. Agregue los datos correctamente <br> en su respectivo campo.', classes: 'green darken-2 rounded'});
        }

    });

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

    var RecomendacionForm = {
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

    Create_Recomendacion( RecomendacionForm );
});

$('.btn-update-recomendacion').on('click', function(){
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

    var RecomendacionForm = {
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

    Update_Recomendation( RecomendacionForm );
});

$('.table-body-content-mejoras').on('click', '.btn-edit-recomendation', function(){
    var RecomendacionesFind = JSON.parse( localStorage.getItem("Recomendaciones") );
    var NumContainer = $(this).parent().parent().siblings()[1];
    var NumRecomendation = NumContainer.innerText;
    var DataUpdate;
    var Estatus;
    var val_select = 0;

    for(var i = 0; i<RecomendacionesFind.Length; i++){
        console.log( RecomendacionesFind[i].IdentificadorRecomendacion, " < = > ", NumRecomendation );
        
        if( RecomendacionesFind[i].IdentificadorRecomendacion == NumRecomendation )
            DataUpdate = RecomendacionesFind[i];
    }

    if( DataUpdate.NivelDePrioridad == "Bajo" ){
        val_select = '1';
    }else if( DataUpdate.NivelDePrioridad == "Medio" ){
        val_select = '2';
    }else if( DataUpdate.NivelDePrioridad == "Alto" ){
        val_select = '3';
    }

    if( DataUpdate.BanderaRecomendacionCompletada == "Corregido" )
        Estatus = '1';
    else if( DataUpdate.BanderaRecomendacionCompletada == "En proceso" )
        Estatus = '2';
    else if( DataUpdate.BanderaRecomendacionCompletada == "Sin atender" )
        Estatus = '3';

    $('#txtNumRecomendation').val( DataUpdate.IdentificadorRecomendacion );
    M.textareaAutoResize( $('#txtNumRecomendation') );

    $('#txtASM').css('height', 'auto');
    M.textareaAutoResize( $('#txtASM') );

    $('#txtASM').val( DataUpdate.AspectoSusceptibleDeMejora );
    M.textareaAutoResize( $('#txtASM') );

    $('#txtActoresInvolucrados').val( DataUpdate.TipoActoresInvolucradosEnSolucion );
    M.textareaAutoResize( $('#txtActoresInvolucrados') );

    $('#select-nivel-prioridad').val( val_select );
    $('#select-estatus').val( Estatus );

    $('#txtAccionMejora').val( DataUpdate.AccionDeMejora );
    M.textareaAutoResize( $('#txtAccionMejora') );

    $('#txtResultadosEsperados').val( DataUpdate.ResultadosEsperados );
    M.textareaAutoResize( $('#txtResultadosEsperados') );

    $('#txtFecha').val( DataUpdate.FechaCompromisoDeCumplimiento );
    M.textareaAutoResize( $('#txtFecha') );

    $('#txtAreaResponsable').val( DataUpdate.AreaResponsable );
    M.textareaAutoResize( $('#txtAreaResponsable') );

    $('#txtEvidenciasSolicitadas').val( DataUpdate.EvidenciasSolicitadas );
    M.textareaAutoResize( $('#txtEvidenciasSolicitadas') );

    $(".btn-insert-recomendacion").hide();
    $(".btn-update-recomendacion").show();

    $('#ModalAddModifyPlanMejora').modal('open');
});

$('.table-body-content-mejoras').on('click', '.btn-delete-recomendation', function(){
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

$('.table-body-content-mejoras').on('mouseover', 'tr', 'td', function(){
    // $('.options-recomendation-container')
    $('.options-recomendation-container').css('display', 'flow-root');
    $(this).children().find('.options-recomendation-container').show();
    $(this).siblings().children().find('.options-recomendation-container').hide();
});

$('.table-body-content-mejoras').on('mouseout', 'tr', 'td', function(){
    $(this).children().find('.options-recomendation-container').hide();
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
                    
                    Read_ProjectDocuments();

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




