<%@ Page Title="" Language="C#" MasterPageFile="~/PageHome.Master" AutoEventWireup="true" CodeBehind="DocentesPage.aspx.cs" Inherits="CapaPresentacion.DocentesPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center">
                    <h4 class="header-title">Docentes Registrados</h4>
                    <button type="button" id="btnNuevore" class="btn btn-info btn-sm">Agregar <i class="ti ti-plus ms-1"></i></button>
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbDocentes" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Imagen</th>
                                <th>Docentes</th>
                                <th>Nro CI</th>
                                <th>Correos</th>
                                <th>Celular</th>
                                <th>Estado</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div id="modalAdd" class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="modalLabeldetalle"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="modalLabeldetalle">Docentes</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="mb-1">
                                <label for="txtFoto" class="form-label">Seleccione imagen</label>
                                <input type="file" id="txtFoto" class="form-control form-control-sm" accept="image/*">
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-1">
                                        <label for="txtNombrees" class="form-label">Nombres</label>
                                        <input type="text" id="txtNombrees" name="Nombre" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-1">
                                        <label for="txtCorreo" class="form-label">Correo</label>
                                        <input type="text" id="txtCorreo" name="Correo" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-1">
                                        <label for="txtNroci" class="form-label">Nro C.I.</label>
                                        <input type="text" id="txtNroci" name="NroCI" class="form-control form-control-sm model">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-1">
                                        <label for="txtApellidos" class="form-label">Apellidos</label>
                                        <input type="text" id="txtApellidos" name="Apellidos" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-1">
                                        <label for="txtCelular" class="form-label">Celular</label>
                                        <input type="number" id="txtCelular" name="Celular" class="form-control form-control-sm model">
                                    </div>
                                    <div class="mb-1">
                                        <label for="txtProfesion" class="form-label">Profesion</label>
                                        <input type="text" id="txtProfesion" name="Profesion" class="form-control form-control-sm model">
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4">
                            <div class="text-center mb-2">
                                <img src="Imagenes/sinimagen.png" id="imgDocente" alt="image" class="img-fluid rounded-circle" width="125" />
                            </div>
                            <div class="mb-2">
                                <label for="cboEstado" class="form-label">Select Estado</label>
                                <select class="form-select form-select-sm" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>
                            <br>
                            <div class="text-center">
                                <button type="button" class="btn btn-sm btn-secondary me-2" data-bs-dismiss="modal"><i class="ti ti-square-rounded-x me-1 fs-20"></i>Salir</button>
                                <button type="button" id="btnGuardarReg" class="btn btn-sm btn-success"><i class="ti ti-device-floppy me-1 fs-20"></i>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="js/DocentesPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
