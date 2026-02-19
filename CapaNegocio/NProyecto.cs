using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NProyecto
    {
        #region "PATRON SINGLETON"
        private static NProyecto instancia = null;
        private NProyecto() { }
        public static NProyecto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NProyecto();
            }
            return instancia;
        }
        #endregion
        public Respuesta<int> RegistrarProyecto(string ProyectoXml)
        {
            return DProyecto.GetInstance().RegistrarProyecto(ProyectoXml);
        }

        public Respuesta<ProyectoReportDTO> ObtenerDetalleReporteProyecto(int idProyecto)
        {
            return DProyecto.GetInstance().ObtenerDetalleReporteProyecto(idProyecto);
        }
    }
}
