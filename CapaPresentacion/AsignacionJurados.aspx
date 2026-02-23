<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="AsignacionJurados.aspx.cs" Inherits="CapaPresentacion.AsignacionJurados" %>
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
                <div class="card-body">
                    <input type="hidden" value="0" id="txtIdProyecto">
                    <div class="row">
                        <div class="col-md-8 offset-md-2">
                            <div class="mb-4">
                                <h5 id="lblNombreProyecto" class="text-dark fw-medium">.....</h5>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-7">
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Evento. : </span><span id="lblFeria">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Area Inv. : </span><span id="lblArea">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Linea Inv. : </span><span id="lblLinea">Cargando...</span></p>
                            <p class="text-muted fw-medium fs-14 mb-1"><span class="text-dark">Categoria : </span><span id="lblCategoria">Cargando...</span></p>
                        </div>
                        <div class="col-md-5">
                            <h5 class="text-dark fw-medium text-center">Datos del Tutor</h5>
                            <input type="hidden" value="0" id="txtNroCiDo">

                            <div class="d-flex align-items-center gap-2">
                                <div class="d-flex align-items-center justify-content-center">
                                    <img src="Imagenes/sinimagen.png" id="imgDocente" alt="image" class="img-fluid rounded-circle doce-perfil">
                                </div>

                                <div>
                                    <p id="lblTutorNombre" class="text-dark fw-medium fs-16 mb-1">Cargando...</p>
                                    <p id="lblTutorCorreo" class="mb-0">Cargando...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-8">
            <div class="card" id="loadd">
                <div class="card-body">
                    <h5 id="tituloPagina" class="text-dark fw-medium text-center">Asignar</h5>

                    <div class="mb-3">
                        <label class="form-label">Buscar Jurados:</label>
                        <select id="cboBuscarDocente" class="form-control select2" style="width: 100%;">
                            <option value="">Escriba el nombre o CI del jurado...</option>
                        </select>
                    </div>

                    <div class="table-responsive">
                        <table id="tbGrupoJurado" class="table text-center table-nowrap align-middle mb-0">
                            <thead>
                                <tr class="bg-light bg-opacity-50">
                                    <th scope="col" class="border-0" style="width: 70px;">Opcion</th>
                                    <th scope="col" class="border-0" style="width: 140px">Nro CI</th>
                                    <th scope="col" class="border-0">Jurados</th>
                                    <th scope="col" class="border-0" style="width: 140px;">Foto</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer border-top border-dashed">
                    <div class="d-flex justify-content-center gap-2">
                        <button type="button" id="btnGuardar" class="btn btn-success gap-1"><i class="ti ti-device-floppy fs-16"></i>Registrar</button>
                        <button type="button" id="btnImprimirr" class="btn btn-primary gap-1"><i class="ti ti-printer fs-16"></i>Imprimir</button>
                        <a href="ProyectosFePage.aspx" class="btn btn-info gap-1"><i class="ti ti-arrow-badge-left fs-18"></i>Volver</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="text-dark fw-medium text-center mb-2">Integrantes</h5>

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

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/AsignacionJurados.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
