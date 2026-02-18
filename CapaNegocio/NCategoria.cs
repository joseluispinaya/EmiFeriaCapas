using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCategoria
    {
        #region "PATRON SINGLETON"
        private static NCategoria instancia = null;
        private NCategoria() { }
        public static NCategoria GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NCategoria();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<ECategoria>> ListaCategorias()
        {
            return DCategoria.GetInstance().ListaCategorias();
        }
        public Respuesta<bool> RegistrarCategoria(ECategoria oCategoria)
        {
            return DCategoria.GetInstance().RegistrarCategoria(oCategoria);
        }

        public Respuesta<bool> EditarCategoria(ECategoria oCategoria)
        {
            return DCategoria.GetInstance().EditarCategoria(oCategoria);
        }
    }
}
