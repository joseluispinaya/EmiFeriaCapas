using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NLineaInvest
    {
        #region "PATRON SINGLETON"
        private static NLineaInvest instancia = null;
        private NLineaInvest() { }
        public static NLineaInvest GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NLineaInvest();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<ELineaInvest>> ListaLineasInvestigacion()
        {
            return DLineaInvest.GetInstance().ListaLineasInvestigacion();
        }

        public Respuesta<List<ELineaInvest>> ObtenerLineasPorArea(int idArea)
        {
            return DLineaInvest.GetInstance().ObtenerLineasPorArea(idArea);
        }
        public Respuesta<bool> RegistrarLineaInvest(ELineaInvest oLineaInvest)
        {
            return DLineaInvest.GetInstance().RegistrarLineasInvest(oLineaInvest);
        }
        public Respuesta<bool> EditarLineaInvest(ELineaInvest oLineaInvest)
        {
            return DLineaInvest.GetInstance().EditarLineasInvest(oLineaInvest);
        }
    }
}
