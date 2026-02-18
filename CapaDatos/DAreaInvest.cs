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
    public class DAreaInvest
    {
        #region "PATRON SINGLETON"
        private static DAreaInvest instancia = null;
        private DAreaInvest() { }
        public static DAreaInvest GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DAreaInvest();
            }
            return instancia;
        }
        #endregion
        public Respuesta<List<EAreaInvest>> ListaAreasInvestigacion()
        {
            try
            {
                List<EAreaInvest> rptLista = new List<EAreaInvest>();
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerAreasInvest", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EAreaInvest()
                                {
                                    IdArea = Convert.ToInt32(dr["IdArea"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    NroLineasInv = Convert.ToInt32(dr["NroLineasInv"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EAreaInvest>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<List<EAreaInvest>>()
                {
                    Estado = false,
                    Data = null,
                    Mensaje = $"Error al obtener la lista: {ex.Message}"
                };
            }
        }

        public Respuesta<bool> RegistrarAreasInvest(EAreaInvest oAreaInvest)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarAreasInvest", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oAreaInvest.Nombre);

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

        public Respuesta<bool> EditarAreasInvest(EAreaInvest oAreaInvest)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarAreasInvest", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdArea", oAreaInvest.IdArea);
                        cmd.Parameters.AddWithValue("@Nombre", oAreaInvest.Nombre);
                        cmd.Parameters.AddWithValue("@Estado", oAreaInvest.Estado);

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
