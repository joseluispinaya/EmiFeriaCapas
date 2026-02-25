using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NAspecto
    {
        #region "PATRON SINGLETON"
        private static NAspecto instancia = null;
        private NAspecto() { }
        public static NAspecto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NAspecto();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EAspecto>> ListarAspectos()
        {
            return DAspecto.GetInstance().ListarAspectos();
        }

        public Respuesta<bool> GuardarOrEditarAspectos(EAspecto oAspecto)
        {
            return DAspecto.GetInstance().GuardarOrEditarAspectos(oAspecto);
        }
    }
}
