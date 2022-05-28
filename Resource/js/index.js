
var UserData = {
    "ID_Usuario": "1",
    "Nombres": "Martha Fernanda",
    "Apellidos": "Guzman Huerta",
    "Contraseña": "Marta123",
    "TipoUsuario": "Capturista",
    "Correo": "mguzmanhu@guanajuato.gob.mx",
    "DireccionResponsable": "No disponible",
    "SiglasDR": "No disponible",
    "Departamento": "No disponible",
    "SiglasDepartamento": "No disponible",
    "Status": "Correct",
    "URL": "home_adm.html"
};

var ProjectInfo = {
    "ID_ProgramaProyecto": "1",
    "ID_Usuario": "1",
    "PorcentajeAvance": "0",
    "EtapaActualProyecto": "Captura de información",
    "EjercicioFiscal": "2019",
    "Status": "Correct"
};

var FTProyecto = {
    "ID_FichaTecnicaProyecto": "1",
    "ID_ProgramaProyecto": "1",
    "NombreProyecto": "Fondo de Aportaciones para la Educación Tecnológica y Adulta, Subfondo Educación de Adultos",
    "ClaveProyecto": "FAETA",
    "DependenciaDelProyecto": "Instituto de Alfabetización y Educación Básica del Estado de Guanajuato",
    "SiglasDependenciaProyecto": "INAEBA",
    "UnidadResponsable": "Sin información",
    "SiglasUnidadResponsable": "Sin información",
    "NombreResponsable": "Ing. Eusebio Vega Pérez",
    "ValidacionInfo": "0",
    "Status": "Correct"
}

var FTEvaluacion = {
    "ID_FichaTecnicaEvaluacion": "1",
    "ID_ProgramaProyecto": "1",
    "InstanciaEvaluadora": "Servicios Integrales en Educación y Tecnología",
    "NombreDeEvaluacion": "Evaluación de Desempeño, Ejercicio 2019-2020",
    "TipoEvaluacion": "Evaluación de Desempeño",
    "AñoDeEvaluacion": "2019",
    "NombreDelInforme": "Evaluación de Desempeño, Ejercicio 2019-2020",
    "URL_Informe": "docs/informe_FAETA.pdf",
    "CostoEvaluacion": "0",
    "ValidacionInfo": "0",
    "Status": "Correct"
}

var GeneralOpinion = {
    "ID_OpinionGeneral": "1",
    "ID_ProgramaProyecto": "1",
    "ComentariosObservacionesGenerales": "El instituto, atendió por primera vez una evaluación de desempeño específica a los recursos del FAETA. Dicho proceso permitió conocer y reafirmar que las acciones, procesos, controles, estructuras, infraestructura y actividades diarias se realizan en apego a la normativa y cumplimiento con los requisitos de operación del Fondo de Aportaciones para la Educación Tecnológica y de Adultos, sin embargo, se identifican áreas de oportunidad que requieren de acciones para fortalecer la operacion del mismo. \n        El INAEBA, cuenta con la aportación de recursos federal y estatal, lo que permite la operación de los servicios del instituto con la combinación de recurso, no obstante, se tienen registros contables-presupuestales y controles administrativos de manera particular por cada fuente de funcionamiento a nivel general de gasto.\n        Los apartados siguientes, son llenados con base en las posibilidades del INAEBA, derivado a que exiten recomendaciones en los que se involucra la participación de la SFIA o INEA.",
    "Status": "Correct",
    "Observaciones": {
        "Status": false,
        "ObservacionTexto": "",
        "IconState": "",
        "ObservationState": "Sin observaciones"
    }
}

var ComentariosPorTema = {
    "ID_OpinionGeneral": "1",
    "ID_ProgramaProyecto": "1",
    "ComentariosObservacionesPorTema": "Se emiten comentario por sección \"Tabla 9. Fortalezas, Retos y Recomendaciones del Subfondo Educación para Adultos\" del documento de evaluación.",
    "Status": "Correct"
}

var TemasComentariosPorTema =
{
    "0": {
        "ID_TemaComentariosPorTema": "1",
        "ID_ProgramaProyecto": "1",
        "TituloTema": "Contribución y destino",
        "TextoTema": "Considerar la elaboración de un compendio normativo y acciones de Capacitación/difusión por parte de la SFIA al instituto y en lo particular al personal que interviene en los procesos de distribución de las aportaciones.- En la acción de mejora N°. 2, se plasma lo correspondiente al instituto.",
        "Observaciones":  {
            "Status": false,
            "ObservacionTexto": "",
            "IconState": "",
            "ObservationState": ""
        }
    },
    "1": {
        "ID_TemaComentariosPorTema": "2",
        "ID_ProgramaProyecto": "1",
        "TituloTema": "Procedimientos documentados de planeación de los recursos para la prestación de los servicios de educación tecnológica y de adultos",
        "TextoTema": "Documentr y/o actualizar y hacer énfasis en las cartas proceso, donde se registren las etapas, responsables, flujogramas, instructivos y formatos de planeación, haciendo referencia a la correspondiente de FAETA.- El instituto cuenta con un Sistema de Gestión de la Calidad, bajo la norma ISO 9001-2015, con la cual se certificó los diversos procesos de operación del INAEBA, dichos procesos consideran la operación de recursos estatal y federal, según aplique. Considerar la viabilidad de una estructura organizativa contable y presupuestal, que permita transitar a un esquema de registro y seguimiento sobre el destino de las aportaciones por tipo de servicio y/o distribución geográfico y/o operación de Coordinación Regional y sus Coordinaciones Zona.- La operación actual del fondo, no cuenta con el detalle del destino de las aportaciones por tipo de servicio o distribución geográfica en relación a la estructura financiera del Instituto, como se requería en la evaluación. Lo anterior, no ha impedido la toma de decisiones o la inoperatividad del Instituto, ya que dichos controles a registros del fondo, no se han requerido por los entes Coordinadores a nivel financiero (SFIA, INEA) o Fiscalizadores (ASF, ASEG, OIC) con dicho detalle y permite la identificación y revisión del fondo.",
        "Observaciones":  {
            "Status": true,
            "ObservacionTexto": "Revisar la ortografía",
            "IconState": "assignment",
            "ObservationState": "Con observaciones"
        }
    },
    "2": {
        "ID_TemaComentariosPorTema": "3",
        "ID_ProgramaProyecto": "1",
        "TituloTema": "Generación de Información y rendición de cuentas",
        "TextoTema": "Contar con mecanismos de desagregación de la información del ejercicio, destino y resultados del FAETA, de acuerdo con la Guía Sistema de la SHCP. Establecer un protocolo de verificación de la instancia normativa para control de calidad de la información. El Instituto reporta trimestralmente el ejercicio de los recursos del fondo, dichos reportes se realizan con la desagregación a nivel partida; por lo que se anexa al presente el reporte de la información trimestral reportada por la Instituto (Evidencia en Carpeta: Validado FAETA 2020-2021). Referente al \"protocolo de verificación de la instancia normativa\", se comparte el Oficio circular N° DGIP/1516/2020 donde la SFIA indica los periodos de captura en el Sistema de Recursos Federales Transferidos (SRFT) Portal SHCP, en lo particular, se establece en Numeral 4, la validación por SFIA: \"Gestión/validación por parte de esta Secretaría del 16 de diciembre de 2020 al 20 de enero del 2021.\": por lo que, en apego a las acciones. se sugiere la atención de dicha acción de mejora por la SFIA.",
        "Observaciones":  {
            "Status": false,
            "ObservacionTexto": "",
            "IconState": "",
            "ObservationState": ""
        }
    },
    "3": {
        "ID_TemaComentariosPorTema": "4",
        "ID_ProgramaProyecto": "1",
        "TituloTema": "Orientación y medición de resultados",
        "TextoTema": "A partir de lo contingencia Covid-15, generar esquemas de controles de riesgos que minimicen los impactos negativas en las metas iniciales. Asi como el replanteamiento de metas en dichos casos. - Se estableció un Comité y Subcomité de Seguridad Sanitaria, con el objetivo de regular y establecer los protocolos sanitarios a implementar en los diversos centros de trabajo del Instituto, con la finalidad de salvaguardar la salud de los colaboradores y de los jóvenes y adultos atendidos en los diversos servicios educativos del Inaeba. Todo esto, apegado a los criterios establecidos por la Secretaria de Salud del Estado (Evidencia en Carpeta: Contingencia Covid-19). Referente al replanteamiento de las metas Institucionales derivado de la contingencia sanitaria, se recibió por parte de Inea el oficio con el ajuste a las metas originales programadas para el ejercicio fiscal 2020, derivado de esto, se genera el POA apegado a los criterios que se establecen en dicho documento (Evidencia en Carpeta: METAS).",
        "Observaciones":  {
            "Status": true,
            "ObservacionTexto": "Agregar referencias a los datos citados",
            "IconState": "assignment",
            "ObservationState": "Con observaciones"
        }
    },
    "Status": "Correct",
    "Length": 4
}

var PlanDeMejora = {
    "0": {
        "ASM": "Contribución y destino: Considerar en el diagnóstico los elementos que se atienden mediante las diferentes fuentes de financiamiento, para tener claridad que eel rezago educativo se ha disminuido con diferentes estrategias y recursos.",
        "TipoDeActores": "Institucional",
        "Prioridad": "Medio",
        "AccionDeMejora": "Revisión y actualización del diagnóstico del programa",
        "AreaResponsable": "Dirección de Planeación y Enlace Regional Coordinación de Planeación y Programación.",
        "FechaCompromiso": "30/11/2021",
        "ResultadosEsperados": "Diagnóstico actualizado",
        "Evidencias": "Documento de pdf",
    },
    "1": {
        "ASM": "Contribución y destino: Considerar la elaboración de un compendio normativo y acciones de capacitación/difusión por parte de la SFIA al instituto y en lo particular al personal que interviene en los procesos de distribución de las aportaciones.",
        "TipoDeActores": "Interinstitucional",
        "Prioridad": "Medio",
        "AccionDeMejora": "Elaboración de un repositorio de la Normativa correspondiente al Fondo y su difusión al personal del INAEBA, que interviene en los procesos de recepción, y ejercicio del mismo.",
        "AreaResponsable": "Dirección de Administración Coordinación de Recursos Financieros",
        "FechaCompromiso": "01/10/2021",
        "ResultadosEsperados": "Estructura normativa de consulta y presonal informado en relación al fondo.",
        "Evidencias": "Repositorio digital, lista de participantes/difusión",
    },
    "2": {
        "ASM": "Contribución y destino: Un planteamiento presupuestal atingente para finalizar con el rezago educativo en 2040 como lo indica el PED.",
        "TipoDeActores": "Interinstitucional",
        "Prioridad": "Bajo",
        "AccionDeMejora": "Reunión con personal de la SFIA, para conocer la viabilidad de asignar el presupuesto conforme a la necesidad de atención del rezago educativo.",
        "AreaResponsable": "Dirección General, Dirección de Planeación y Enlace Regional.",
        "FechaCompromiso": "30/11/2021",
        "ResultadosEsperados": "Análisis del resultado",
        "Evidencias": "Minuta de reunión",
    },
    "3": {
        "ASM": "Contribución y destino: Considerar la viabilidad de una estructura organizativa contable y presupuestal, que permita transitar a un esquema de registro y seguimiento sobre el destino de las aportaciones por tipo de servicio y/o distribución geográfica y/o por operación de Coordinación Regional y sus Coordinaciones Zona.",
        "TipoDeActores": "Interinstitucional",
        "Prioridad": "Baja",
        "AccionDeMejora": "Reunión con personal de la SFIA, para conocer la viabilidad e impacto de los ajustes en el Sistema Integral de Hacienda Pública, (SAP R3), y el beneficio de generar la información a ese nivel de detalle.",
        "AreaResponsable": "Dirección de Administración y Coordinación de Recursos Humanos.",
        "FechaCompromiso": "01/10/2021",
        "ResultadosEsperados": "Derivarán de la reunión con la SFIA y del análisis del costo-beneficio.",
        "Evidencias": "Minuta de reunión",
    },
    "4": {
        "ASM": "Gestión: Documentar y/o actualizar y hacer énfasis en las cartas proceso, donde se registren las etapas, responsables, flujogramas, instructivos y formatos de planeación, haciendo referencia a lo correspondiente de FAETA.",
        "TipoDeActores": "Institucional",
        "Prioridad": "Medio",
        "AccionDeMejora": "Identificar y/o modificar los procesimientos que aplique al fondo de los diferenets procesos del Sistema de Gestión de la Calidad.",
        "AreaResponsable": "Dirección de Planeacióny Enlace Regional, Coordinación de Recursos Financieros.",
        "FechaCompromiso": "01/20/2021",
        "ResultadosEsperados": "Procedimientos e instrucciones de trabjo en el SGC actualizado",
        "Evidencias": "Emisión de oficio circular a los directores/as de área para la identificación de documentos del Sistema de Gestión de la Calidad, que afecten exclusivamente la operación con recursos de FAETA y su atenció y seguimiento.",
    },
    "5": {
        "ASM": "Gestión: Se propone analizar la viabilidad de focalización del recurso, para llevar con precisión los procesos de planeación presupuestal, ejecución y seguimiento del recursos gastado por municipio y por tipo de alfabetización, primaria y secundaria o por operación de Coordinación Regional y sus Coordinadores Zona.",
        "TipoDeActores": "Interinstitucional",
        "Prioridad": "Medio",
        "AccionDeMejora": "Reunión con personal de SFIA, para conocer la viabilidad e impacto de los ajustes en el Sistema Integral de Hacenda Pública (SAP R3) ",
        "AreaResponsable": "Dirección de Administración, Coordinación de Recursos Financieros, Dirección de Planeación y Enlace Regional.",
        "FechaCompromiso": "01/10/2021",
        "ResultadosEsperados": "Derivarán de la reunión con la SFIA y del análisis del costo-beneficio.",
        "Evidencias": "Minuta de reunión",
    },
    "6": {
        "ASM": "Gestión: Considerando el abatimiento eventual del rezago educativo se puede hacer convenios con los ayuntamientos y empresas para habilitar espacios. Asimismo, considerar hacer gestiones con fondos internacionales para avanzar en los ODS.",
        "TipoDeActores": "Interinstitucional",
        "Prioridad": "Medio",
        "AccionDeMejora": "Incrementar las gestiones con diversos actores de la sociedad para establecer convenios y/o acuerdos para los espacios.",
        "AreaResponsable": "Dirección de Planeación y Enlace Regional, Coodinación de Enlace Institucional.",
        "FechaCompromiso": "30/11/2021",
        "ResultadosEsperados": "Espacios para la presetación de los servicios educativos.",
        "Evidencias": "Convenios, acuerdos, minutas.",
    }

}

$(function(){
    $('.collapsible').collapsible();
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.tabs').tabs();
    $('.modal').modal();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider();
    $('select').formSelect();


    console.log( UserData );
    console.log( ProjectInfo );
});

$('.btn-login').on('click', function(){
    var user = $('#txt_user').val();
    var pass = $('#txt_password').val();

    if( user == 'marta' && pass == 'Marta123' ){
        localStorage.setItem("UserData",                 JSON.stringify(UserData)                 );
        localStorage.setItem("ProjectInfo",              JSON.stringify(ProjectInfo)              );
        localStorage.setItem("FTProyecto",               JSON.stringify(FTProyecto)               );
        localStorage.setItem("FTEvaluacion",             JSON.stringify(FTEvaluacion)             );
        localStorage.setItem("GeneralOpinion",           JSON.stringify(GeneralOpinion)           );
        localStorage.setItem("ComentariosPorTema",       JSON.stringify(ComentariosPorTema)       );
        localStorage.setItem("TemasComentariosPorTema",  JSON.stringify(TemasComentariosPorTema)  );
        localStorage.setItem("PlanDeMejora",             JSON.stringify(PlanDeMejora)             );
        
        M.toast({html: '¡Bienvenido!', classes: 'green rounded'});
    
        setTimeout( function(){
            window.location = UserData.URL;
        }, 1000 );

    }else{
        M.toast({html: 'Correo o contraseña incorrectos', classes: 'red rounded'});
    }

});


