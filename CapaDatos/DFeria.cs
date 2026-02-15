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
    public class DFeria
    {
        #region "PATRON SINGLETON"
        private static DFeria instancia = null;
        private DFeria() { }
        public static DFeria GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DFeria();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<EFeria>> ListaFerias()
        {
            try
            {
                List<EFeria> rptLista = new List<EFeria>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerFerias", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EFeria()
                                {
                                    IdFeria = Convert.ToInt32(dr["IdFeria"]),
                                    Nombre = dr["Nombre"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaFeriaSt = Convert.ToDateTime(dr["FechaFeria"]).ToString("dd/MM/yyyy"),
                                    FechaFeria = Convert.ToDateTime(dr["FechaFeria"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EFeria>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenida correctamente"
                };
            }
            catch (Exception)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EFeria>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error",
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarFeria(EFeria oFeria)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarFerias", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oFeria.Nombre);
                        cmd.Parameters.AddWithValue("@FechaFeria", oFeria.FechaFeria);

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
                    Mensaje = respuesta ? "Registrado Correctamente." : "El nombre de la feria ya existe, intente con otro."
                };
            }
            catch (Exception)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error al Registrar" };
            }
        }

        public Respuesta<bool> EditarFeria(EFeria oFeria)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarFeria", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdFeria", oFeria.IdFeria);
                        cmd.Parameters.AddWithValue("@Nombre", oFeria.Nombre);
                        cmd.Parameters.AddWithValue("@FechaFeria", oFeria.FechaFeria);

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
