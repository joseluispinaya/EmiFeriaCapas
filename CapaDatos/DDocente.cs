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
    public class DDocente
    {
        #region "PATRON SINGLETON"
        private static DDocente instancia = null;
        private DDocente() { }
        public static DDocente GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DDocente();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EDocente>> ListaDocentes()
        {
            try
            {
                List<EDocente> rptLista = new List<EDocente>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerDocentes", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EDocente
                                {
                                    IdDocente = Convert.ToInt32(dr["IdDocente"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ImagenUrl = dr["ImagenUrl"].ToString(),
                                    Profesion = dr["Profesion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDocente>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDocente>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarDocente(EDocente oDocente)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarDocentes", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombres", oDocente.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oDocente.Apellidos);
                        cmd.Parameters.AddWithValue("@NroCi", oDocente.NroCi);
                        cmd.Parameters.AddWithValue("@Correo", oDocente.Correo);
                        cmd.Parameters.AddWithValue("@Celular", oDocente.Celular);
                        cmd.Parameters.AddWithValue("@ClaveHash", oDocente.ClaveHash);
                        cmd.Parameters.AddWithValue("@ImagenUrl", oDocente.ImagenUrl);
                        cmd.Parameters.AddWithValue("@Profesion", oDocente.Profesion);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar intente con otro nro ci o correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> EditarDocente(EDocente oDocente)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarDocente", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdDocente", oDocente.IdDocente);
                        cmd.Parameters.AddWithValue("@Nombres", oDocente.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oDocente.Apellidos);
                        cmd.Parameters.AddWithValue("@NroCi", oDocente.NroCi);
                        cmd.Parameters.AddWithValue("@Correo", oDocente.Correo);
                        cmd.Parameters.AddWithValue("@Celular", oDocente.Celular);
                        cmd.Parameters.AddWithValue("@ImagenUrl", oDocente.ImagenUrl);
                        cmd.Parameters.AddWithValue("@Profesion", oDocente.Profesion);
                        cmd.Parameters.AddWithValue("@Estado", oDocente.Estado);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se actualizo correctamente" : "Error al actualizar intente con otro nro ci o correo"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EDocente>> FiltroDocentes(string Busqueda)
        {
            try
            {
                List<EDocente> rptLista = new List<EDocente>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_FiltroDocentes", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@Busqueda", Busqueda);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EDocente()
                                {
                                    IdDocente = Convert.ToInt32(dr["IdDocente"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    NroCi = dr["NroCi"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    ImagenUrl = dr["ImagenUrl"].ToString()
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EDocente>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "EDocente obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EDocente>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }
    }
}
