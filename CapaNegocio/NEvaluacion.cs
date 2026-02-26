using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NEvaluacion
    {
        #region "PATRON SINGLETON"
        private static NEvaluacion instancia = null;
        private NEvaluacion() { }
        public static NEvaluacion GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NEvaluacion();
            }
            return instancia;
        }
        #endregion
        public Respuesta<NotasJuradosDTO> ObtenerNotaFinalProyecto(int idProyecto)
        {
            return DEvaluacion.GetInstance().ObtenerNotaFinalProyecto(idProyecto);
        }

        public Respuesta<List<NotasJuradosDTO>> ListarNotasPorJurado(int idProyecto)
        {
            return DEvaluacion.GetInstance().ListarNotasPorJurado(idProyecto);
        }

        public Respuesta<List<PlanillaDTO>> VerDetalleEvaluacion(int idEvaluacion)
        {
            return DEvaluacion.GetInstance().VerDetalleEvaluacion(idEvaluacion);
        }
    }
}
