using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CapaDatos
{
    public class DProyecto
    {
        #region "PATRON SINGLETON"
        private static DProyecto instancia = null;
        private DProyecto() { }
        public static DProyecto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DProyecto();
            }
            return instancia;
        }
        #endregion

        public Respuesta<int> RegistrarProyecto(string ProyectoXml)
        {
            var respuesta = new Respuesta<int>();

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarProyecto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.Add("@ProyectoXml", SqlDbType.Xml).Value = ProyectoXml;
                        //cmd.Parameters.AddWithValue("@ProyectoXml", ProyectoXml);

                        var outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();

                        int resultado = Convert.ToInt32(outputParam.Value);

                        respuesta.Estado = resultado > 0;
                        //respuesta.Valor = resultado.ToString();
                        respuesta.Mensaje = resultado > 0 ? "Proyecto Registrado correctamente." : "Error al registrar, intente más tarde.";
                        respuesta.Data = resultado;
                    }
                }
            }
            catch (SqlException ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Ocurrió un error en la base de datos: {ex.Message}";
            }
            catch (Exception ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = $"Ocurrió un error: {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<ProyectoReportDTO> ObtenerDetalleReporteProyecto(int idProyecto)
        {
            ProyectoReportDTO reporte = null;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ObtenerDetalleProyecto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdProyecto", idProyecto);

                        con.Open();

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            // =========================================================
                            // 1. Leer el primer Result Set (Cabecera: Datos del Proyecto)
                            // =========================================================
                            if (reader.Read())
                            {
                                reporte = new ProyectoReportDTO
                                {
                                    IdProyecto = Convert.ToInt32(reader["IdProyecto"]),
                                    NombreProyecto = reader["NombreProyecto"].ToString(),
                                    DocPdfUrl = reader["DocPdfUrl"].ToString(),
                                    NombreFeria = reader["NombreFeria"].ToString(),
                                    Categoria = reader["Categoria"].ToString(),
                                    AreaInvestigacion = reader["AreaInvestigacion"].ToString(),
                                    LineaInvestigacion = reader["LineaInvestigacion"].ToString(),

                                    TutorNombreCompleto = reader["TutorNombreCompleto"].ToString(),
                                    TutorCi = reader["TutorCi"].ToString(),
                                    TutorCorreo = reader["TutorCorreo"] != DBNull.Value ? reader["TutorCorreo"].ToString() : string.Empty,
                                    TutorImagen = reader["TutorImagen"] != DBNull.Value ? reader["TutorImagen"].ToString() : string.Empty,

                                    FechaRegistroSt = Convert.ToDateTime(reader["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    FechaRegistro = Convert.ToDateTime(reader["FechaRegistro"]),
                                    Estado = Convert.ToBoolean(reader["Estado"])
                                };
                            }

                            // =========================================================
                            // 2. Pasar al segundo Result Set (Detalle: Estudiantes)
                            // =========================================================
                            if (reporte != null && reader.NextResult())
                            {
                                while (reader.Read())
                                {
                                    reporte.Estudiantes.Add(new EstudianteReportDTO
                                    {
                                        IdEstudiante = Convert.ToInt32(reader["IdEstudiante"]),
                                        NroCi = reader["NroCi"].ToString(),
                                        Codigo = reader["Codigo"].ToString(),
                                        EstudianteNombreCompleto = reader["EstudianteNombreCompleto"].ToString(),
                                        ImagenEstUrl = reader["ImagenEstUrl"] != DBNull.Value ? reader["ImagenEstUrl"].ToString() : string.Empty
                                    });
                                }
                            }
                        }
                    }
                }

                // Retorno exitoso (Si reporte es null significa que el ID no existe en la BD)
                return new Respuesta<ProyectoReportDTO>
                {
                    Estado = reporte != null,
                    Data = reporte,
                    Mensaje = reporte != null ? "Detalle obtenido correctamente" : "No se encontró el proyecto solicitado."
                };
            }
            catch (Exception ex)
            {
                // Retorno capturando la excepción
                return new Respuesta<ProyectoReportDTO>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Ocurrió un error al obtener el reporte: " + ex.Message
                };
            }
        }

        public Respuesta<List<ProyectoResumenDTO>> ListarProyectosPorEstudiante(int idEstudiante)
        {
            try
            {
                List<ProyectoResumenDTO> rptLista = new List<ProyectoResumenDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarProyectosPorEstudiante", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdEstudiante", idEstudiante);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ProyectoResumenDTO
                                {
                                    NombreFeria = dr["NombreFeria"].ToString(),
                                    IdProyecto = Convert.ToInt32(dr["IdProyecto"]),
                                    NombreProyecto = dr["NombreProyecto"].ToString(),
                                    FechaRegistroSt = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ProyectoResumenDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ProyectoResumenDTO>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<List<ProyectoResumenDTO>> ListarProyectosPorFeria(int idFeria)
        {
            try
            {
                List<ProyectoResumenDTO> rptLista = new List<ProyectoResumenDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarProyectosPorFeria", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdFeria", idFeria);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ProyectoResumenDTO
                                {
                                    IdProyecto = Convert.ToInt32(dr["IdProyecto"]),
                                    NombreProyecto = dr["NombreProyecto"].ToString(),
                                    Estado = Convert.ToBoolean(dr["TieneJurados"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ProyectoResumenDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidas correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ProyectoResumenDTO>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarJurados(int idProyecto, List<EJuradoRequest> listaJurados)
        {
            var respuesta = new Respuesta<bool>();

            try
            {
                // 1. Construir el XML
                // Formato esperado: <Jurados><Docente Id="1" /><Docente Id="5" /></Jurados>
                XElement juradosXml = new XElement("Jurados");

                foreach (var item in listaJurados)
                {
                    juradosXml.Add(new XElement("Docente",
                        new XAttribute("Id", item.IdDocente)
                    ));
                }

                // 2. Conexión a BD
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarJurados", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdProyecto", idProyecto);
                        cmd.Parameters.Add("@JuradosXml", SqlDbType.Xml).Value = juradosXml.ToString();

                        // Parámetro de salida
                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();

                        bool resultado = Convert.ToBoolean(outputParam.Value);

                        respuesta.Estado = resultado;
                        respuesta.Mensaje = resultado ? "Jurados asignados correctamente." : "No se pudo realizar la asignación.";
                        respuesta.Data = resultado;
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Estado = false;
                respuesta.Mensaje = "Error: " + ex.Message;
            }

            return respuesta;
        }

    }
}
