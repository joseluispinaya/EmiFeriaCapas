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
    public class DGradoAcademico
    {
        #region "PATRON SINGLETON"
        private static DGradoAcademico instancia = null;
        private DGradoAcademico() { }
        public static DGradoAcademico GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DGradoAcademico();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EGradoAcademico>> ListaGradosAcademicos()
        {
            try
            {
                List<EGradoAcademico> rptLista = new List<EGradoAcademico>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerGradoAcadConteo", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EGradoAcademico()
                                {
                                    IdGradoAcademico = Convert.ToInt32(dr["IdGradoAcademico"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    NroCarreras = Convert.ToInt32(dr["NroCarreras"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EGradoAcademico>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EGradoAcademico>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista de grados académicos: {ex.Message}"
                };
            }
        }

        public Respuesta<bool> RegistrarGrados(EGradoAcademico oGradoAcademico)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarGradoAcademicos", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oGradoAcademico.Nombre);

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
                    Mensaje = respuesta ? "Registrado Correctamente." : "El nombre ya existe, intente con otro."
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error al Registrar" };
            }
        }

        public Respuesta<bool> EditarGrados(EGradoAcademico oGradoAcademico)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarGradoAcademicos", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdGradoAcademico", oGradoAcademico.IdGradoAcademico);
                        cmd.Parameters.AddWithValue("@Nombre", oGradoAcademico.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", oGradoAcademico.Estado);

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
                    Mensaje = respuesta ? "Actualizado Correctamente." : "No se pudo actualizar. Verifique que el nombre no esté duplicado o que el registro exista."
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error al actualizar" };
            }
        }

    }
}
