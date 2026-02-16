using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NGradoAcademico
    {
        #region "PATRON SINGLETON"
        private static NGradoAcademico instancia = null;
        private NGradoAcademico() { }
        public static NGradoAcademico GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NGradoAcademico();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EGradoAcademico>> ListaGradosAcademicos()
        {
            return DGradoAcademico.GetInstance().ListaGradosAcademicos();
        }

        public Respuesta<bool> RegistrarGrados(EGradoAcademico oGradoAcademico)
        {
            return DGradoAcademico.GetInstance().RegistrarGrados(oGradoAcademico);
        }

        public Respuesta<bool> EditarGrados(EGradoAcademico oGradoAcademico)
        {
            return DGradoAcademico.GetInstance().EditarGrados(oGradoAcademico);
        }
    }
}
