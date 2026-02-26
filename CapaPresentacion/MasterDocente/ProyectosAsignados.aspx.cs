using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion.MasterDocente
{
    public partial class ProyectosAsignados : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<PlanillaDTO>> ObtenerRubricaCompleta()
        {
            return NIndicador.GetInstance().ObtenerRubricaCompleta();
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<bool> RegistrarEvaluacion(EEvaluacionRequest Evaluacion)
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            // 2. Validar que lleguen datos (Evita error de referencia nula)
            if (Evaluacion == null || Evaluacion.Detalles == null || Evaluacion.Detalles.Count == 0)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "No se han recibido los detalles de la evaluación." };
            }

            try
            {
                // 3. Obtener el ID del Docente de la sesión (Seguro)
                EDocente doce = (EDocente)HttpContext.Current.Session["UsuarioLogueado"];

                // 4. Llamar a la Capa de Negocio
                return NIndicador.GetInstance().RegistrarEvaluacion(Evaluacion, doce.IdDocente);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }
    }
}