using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NDocente
    {
        #region "PATRON SINGLETON"
        private static NDocente instancia = null;
        private NDocente() { }
        public static NDocente GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NDocente();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EDocente>> ListaDocentes()
        {
            return DDocente.GetInstance().ListaDocentes();
        }

        public Respuesta<bool> RegistrarDocente(EDocente oDocente)
        {
            return DDocente.GetInstance().RegistrarDocente(oDocente);
        }

        public Respuesta<bool> EditarDocente(EDocente oDocente)
        {
            return DDocente.GetInstance().EditarDocente(oDocente);
        }
    }
}
