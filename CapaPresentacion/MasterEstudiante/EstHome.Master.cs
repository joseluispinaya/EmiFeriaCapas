using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion.MasterEstudiante
{
    public partial class EstHome : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
            // 1. Validar que exista sesión
            if (Session["UsuarioLogueado"] == null)
            {
                Response.Redirect("~/Login.aspx");
                return;
            }

            // 2. VALIDAR QUE SEA ESTUDIANTE
            if (Session["TipoUsuario"].ToString() != "Estudiante")
            {
                // Si es estudiante intentando entrar a zona docente, lo botamos
                Session.Clear();
                Session.Abandon();
                Response.Redirect("~/Login.aspx");
            }
        }
    }
}