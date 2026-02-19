using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

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
    }
}
