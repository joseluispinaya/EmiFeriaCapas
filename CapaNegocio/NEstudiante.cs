using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NEstudiante
    {
        #region "PATRON SINGLETON"
        private static NEstudiante instancia = null;
        private NEstudiante() { }
        public static NEstudiante GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NEstudiante();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EEstudiantesDTO>> ListaEstudiantes(int IdGradoAcademico, int IdCarrera)
        {
            return DEstudiante.GetInstance().ListaEstudiantes(IdGradoAcademico, IdCarrera);
        }

        public Respuesta<bool> RegistrarEstudiante(EEstudiante oEstudiante)
        {
            return DEstudiante.GetInstance().RegistrarEstudiante(oEstudiante);
        }

        public Respuesta<bool> EditarEstudiante(EEstudiante oEstudiante)
        {
            return DEstudiante.GetInstance().EditarEstudiante(oEstudiante);
        }
        public Respuesta<List<EEstudiante>> FiltroEstudiantes(string Busqueda)
        {
            return DEstudiante.GetInstance().FiltroEstudiantes(Busqueda);
        }

        public Respuesta<EEstudiante> LoginEstudiante(string Correo)
        {
            return DEstudiante.GetInstance().LoginEstudiante(Correo);
        }
    }
}
