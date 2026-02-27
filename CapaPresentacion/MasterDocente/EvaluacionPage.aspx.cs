using CapaEntidad;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion.MasterDocente
{
    public partial class EvaluacionPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<bool> ValidarEvaluacion(int IdProyecto)
        {
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Su sesión ha expirado. Recargue la página."
                };
            }

            try
            {
                var resp = NEvaluacion.GetInstance().ListarNotasPorJurado(IdProyecto);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<bool>
                    {
                        Estado = false,
                        Mensaje = "Ocurrió un error al verificar la evaluación."
                    };
                }

                if (resp.Data.Count == 0)
                {
                    return new Respuesta<bool>
                    {
                        Estado = true,
                        Mensaje = "Sin Calificacion",
                        Data = false
                    };
                }
                //Obtener el ID del Docente de la sesión (Seguro)
                EDocente doce = (EDocente)HttpContext.Current.Session["UsuarioLogueado"];

                var item = resp.Data.FirstOrDefault(x => x.IdDocente == doce.IdDocente);

                if (item == null)
                {
                    return new Respuesta<bool> { Estado = true, Mensaje = "Sin Calificacion", Data = false };
                }

                // string resultado = item.NotaTotal.ToString("F2", CultureInfo.InvariantCulture);
                string resultado = item.NotaTotal.ToString("F2", CultureInfo.InvariantCulture);
                //string nota = item.NotaTotal.ToString("F2");
                return new Respuesta<bool> { Estado = true, Mensaje = $"Usted ya calificó este proyecto con una nota de {resultado}/100.", Data = true };
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }
    }
}