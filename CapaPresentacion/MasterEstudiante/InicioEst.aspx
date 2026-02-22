<%@ Page Title="" Language="C#" MasterPageFile="~/MasterEstudiante/EstHome.Master" AutoEventWireup="true" CodeBehind="InicioEst.aspx.cs" Inherits="CapaPresentacion.MasterEstudiante.InicioEst" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h5 class="mb-3 text-center">Convocatorias EMI 2026</h5>
    <div class="row" id="listaFerias">
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsEst/InicioEst.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
