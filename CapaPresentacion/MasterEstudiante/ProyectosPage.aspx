<%@ Page Title="" Language="C#" MasterPageFile="~/MasterEstudiante/EstHome.Master" AutoEventWireup="true" CodeBehind="ProyectosPage.aspx.cs" Inherits="CapaPresentacion.MasterEstudiante.ProyectosPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/responsive.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/vendor/datatables/extensiones/css/buttons.dataTables.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <%--<div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="d-flex card-header justify-content-between align-items-center">
                    <h4 class="header-title">Mis Proyectos</h4>
                    <button type="button" id="btnImprimir" class="btn btn-info btn-sm">Reporte <i class="ti ti-printer ms-1"></i></button>
                </div>

                <div class="card-body">
                    <table class="table table-striped table-sm" id="tbProyect" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Feria</th>
                                <th>Proyecto</th>
                                <th>Fecha</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>--%>
    <h5 class="mb-3 text-center">Mis Proyectos</h5>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4" id="contenedorMisProyectos">
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="../assets/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/vendor/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/vendor/datatables/extensiones/js/dataTables.responsive.min.js"></script>

    <script src="../assets/vendor/datatables/extensiones/js/dataTables.buttons.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/jszip.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/buttons.html5.min.js"></script>
    <script src="../assets/vendor/datatables/extensiones/js/buttons.print.min.js"></script>

    <script src="jsEst/ProyectosPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
