<%@ Page Title="" Language="C#" MasterPageFile="~/MasterDocente/DocenteHo.Master" AutoEventWireup="true" CodeBehind="ProyectosAsignados.aspx.cs" Inherits="CapaPresentacion.MasterDocente.ProyectosAsignados" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .doce-perfil {
            width: 70px;
            height: 70px;
            object-fit: cover; /* Evita que la imagen se estire o aplaste */
            object-position: center; /* Asegura que se vea el centro de la foto */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header border-0 border-bottom border-dashed">
                <h4 class="header-title">Evaluacion de Proyecto</h4>
            </div>
            <div class="card-body">

                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Detalle del Proyecto #1
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <input type="hidden" value="0" id="txtIdProyecto">

                                <div class="row">
                                    <div class="col-md-7">
                                        <h5 class="mb-3 text-center">Titulo del Proyecto</h5>
                                        <div class="mb-2">
                                            <h5 id="lblNombreProyecto" class="text-dark fw-medium">.....</h5>
                                        </div>

                                        <h5 class="mb-3 text-center">Informacion del Proyecto</h5>

                                        <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Evento. : </span><span id="lblFeria">Cargando...</span></p>
                                        <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Area Inv. : </span><span id="lblArea">Cargando...</span></p>
                                        <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Linea Inv. : </span><span id="lblLinea">Cargando...</span></p>
                                        <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Categoria : </span><span id="lblCategoria">Cargando...</span></p>
                                    </div>
                                    <div class="col-md-5">
                                        <h5 class="text-dark fw-medium text-center">Datos del Tutor e Integrantes</h5>

                                        <div class="d-flex align-items-center gap-2">
                                            <div class="d-flex align-items-center justify-content-center">
                                                <img src="../Imagenes/sinimagen.png" id="imgDocente" alt="image" class="img-fluid rounded-circle doce-perfil">
                                            </div>

                                            <div>
                                                <p id="lblTutorNombre" class="text-dark fw-medium fs-16 mb-1">Cargando...</p>
                                                <p id="lblTutorCorreo" class="mb-0">Cargando...</p>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="table-responsive">
                                            <table id="tbIntegrantes" class="table table-centered table-nowrap border-top mb-0">
                                                <thead class="bg-light bg-opacity-25">
                                                    <tr>
                                                        <th class="ps-3">Estudiantes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="contenedorAspectos"></div>
                </div>

                <div class="mt-4">
                    <label class="form-label" for="txtObservaciones">Observaciones</label>
                    <textarea class="form-control" id="txtObservaciones" placeholder="Observaciones del proyecto " rows="2"></textarea>
                </div>

                <div class="d-grid gap-2 mt-3">
                    <button id="btnFinalizarEvaluacion" class="btn btn-success btn-lg">
                        <i class="ti ti-check me-1"></i>Finalizar Evaluación
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsDoce/ProyectosAsignados.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
