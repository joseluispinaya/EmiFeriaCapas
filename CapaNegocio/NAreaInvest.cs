using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NAreaInvest
    {
        #region "PATRON SINGLETON"
        private static NAreaInvest instancia = null;
        private NAreaInvest() { }
        public static NAreaInvest GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NAreaInvest();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EAreaInvest>> ListaAreasInvestigacion()
        {
            return DAreaInvest.GetInstance().ListaAreasInvestigacion();
        }

        public Respuesta<bool> RegistrarAreasInvest(EAreaInvest oAreaInvest)
        {
            return DAreaInvest.GetInstance().RegistrarAreasInvest(oAreaInvest);
        }

        public Respuesta<bool> EditarAreasInvest(EAreaInvest oAreaInvest)
        {
            return DAreaInvest.GetInstance().EditarAreasInvest(oAreaInvest);
        }
    }
}
