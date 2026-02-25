using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCriterio
    {
        #region "PATRON SINGLETON"
        private static NCriterio instancia = null;
        private NCriterio() { }
        public static NCriterio GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NCriterio();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ECriterio>> ListarCriterios()
        {
            return DCriterio.GetInstance().ListarCriterios();
        }

        public Respuesta<List<ECriterio>> ListarCriteriosPorAspecto(int idAspecto)
        {
            return DCriterio.GetInstance().ListarCriteriosPorAspecto(idAspecto);
        }

        public Respuesta<bool> RegistrarOrEditar(ECriterio oCriterio)
        {
            return DCriterio.GetInstance().RegistrarOrEditar(oCriterio);
        }
    }
}
