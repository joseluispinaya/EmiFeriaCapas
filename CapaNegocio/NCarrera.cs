using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NCarrera
    {
        #region "PATRON SINGLETON"
        private static NCarrera instancia = null;
        private NCarrera() { }
        public static NCarrera GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NCarrera();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ECarrera>> ListaCarreras()
        {
            return DCarrera.GetInstance().ListaCarreras();
        }

        public Respuesta<List<ECarrera>> ObtenerCarrerasPorGrado(int idGradoAcademico)
        {
            return DCarrera.GetInstance().ObtenerCarrerasPorGrado(idGradoAcademico);
        }

        public Respuesta<bool> RegistrarCarrera(ECarrera oCarrera)
        {
            return DCarrera.GetInstance().RegistrarCarrera(oCarrera);
        }

        public Respuesta<bool> EditarCarreras(ECarrera oCarrera)
        {
            return DCarrera.GetInstance().EditarCarreras(oCarrera);
        }
    }
}
