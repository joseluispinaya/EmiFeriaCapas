using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NFeria
    {
        #region "PATRON SINGLETON"
        private static NFeria instancia = null;
        private NFeria() { }
        public static NFeria GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NFeria();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EFeria>> ListaFerias()
        {
            return DFeria.GetInstance().ListaFerias();
        }

        public Respuesta<bool> RegistrarFeria(EFeria oFeria)
        {
            return DFeria.GetInstance().RegistrarFeria(oFeria);
        }

        public Respuesta<bool> EditarFeria(EFeria oFeria)
        {
            return DFeria.GetInstance().EditarFeria(oFeria);
        }
    }
}
