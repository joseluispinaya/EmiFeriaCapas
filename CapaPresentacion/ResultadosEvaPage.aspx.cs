using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
    public partial class ResultadosEvaPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<NotasJuradosDTO> ObtenerNotaFinalProyecto(int IdProyecto)
        {
            return NEvaluacion.GetInstance().ObtenerNotaFinalProyecto(IdProyecto);
        }

        [WebMethod]
        public static Respuesta<List<NotasJuradosDTO>> ListarNotasPorJurado(int IdProyecto)
        {
            return NEvaluacion.GetInstance().ListarNotasPorJurado(IdProyecto);
        }

        [WebMethod]
        public static Respuesta<List<PlanillaDTO>> VerDetalleEvaluacion(int IdEvaluacion)
        {
            return NEvaluacion.GetInstance().VerDetalleEvaluacion(IdEvaluacion);
        }

    }
}