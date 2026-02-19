using System;
using System.Collections.Generic;

namespace CapaEntidad
{
    // Clase para el detalle
    public class EstudianteReportDTO
    {
        public int IdEstudiante { get; set; }
        public string NroCi { get; set; }
        public string Codigo { get; set; }
        public string EstudianteNombreCompleto { get; set; }
        public string ImagenEstUrl { get; set; }
    }

    // Clase principal (Cabecera)
    public class ProyectoReportDTO
    {
        public int IdProyecto { get; set; }
        public string NombreProyecto { get; set; }
        public string DocPdfUrl { get; set; }
        public string NombreFeria { get; set; }
        public string Categoria { get; set; }
        public string AreaInvestigacion { get; set; }
        public string LineaInvestigacion { get; set; }

        public string TutorNombreCompleto { get; set; }
        public string TutorCi { get; set; }
        public string TutorCorreo { get; set; }
        public string TutorImagen { get; set; }

        public DateTime FechaRegistro { get; set; }
        public string FechaRegistroSt { get; set; }
        public bool Estado { get; set; }

        public List<EstudianteReportDTO> Estudiantes { get; set; }

        public ProyectoReportDTO()
        {
            Estudiantes = new List<EstudianteReportDTO>();
        }
    }
}
