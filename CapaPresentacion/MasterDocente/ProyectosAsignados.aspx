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
    <h5 class="mb-3 text-center">Proyectos Asignados para Evaluar</h5>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4" id="contenedorMisProyectos">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsDoce/ProyectosAsignados.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
