using System;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using PoolAppExercise.Repository;
using PoolAppExercise.Model;

namespace PoolAppExercise.Controllers
{
    [Produces("application/json")]
    [Route("players")]
    public class DataAPIController : Controller
    {
        #region Variables
        private DataRepository _dataRepo { get; set; }
        #endregion

        #region Constructor
        public DataAPIController(DataRepository dataRepo)
        {
            _dataRepo = dataRepo;
        }
        #endregion

        #region Route Methods
        [HttpGet]
        [Route("all", Name = "GetAllPlayers")]
        public JsonResult GetAllPlayers()
        {
            try
            {
                IEnumerable<PlayerData> playerDatasList = _dataRepo.GetAll();

                if (playerDatasList == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.NoContent;
                    return Json("The database is empty.");
                }

                return Json(playerDatasList);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpGet]
        [Route("{id}", Name = "GetPlayer")]
        public JsonResult GetPlayer(int id)
        {
            try
            {
                PlayerData player = _dataRepo.Get(id);

                if (player == null)
                {
                    Response.StatusCode = (int)HttpStatusCode.NotFound;
                    return Json(string.Format("User cannot be found with id: {0}", id));
                }

                return Json(player);
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpPost]
        [Route("add", Name = "AddPlayer")]
        public JsonResult AddPlayer(PlayerData player)
        {
            try
            {
                _dataRepo.Add(player);

                return Json("Player Added.");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpPost]
        [Route("add/fromBody", Name = "AddPlayerFromBody")]
        public JsonResult AddPlayerFromBody([FromBody] PlayerData player)
        {
            try
            {
                _dataRepo.Add(player);

                return Json("Player Added.");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpPut]
        [Route("update", Name = "UpdatePlayer")]
        public JsonResult UpdatePlayer(PlayerData player)
        {
            try
            {
                _dataRepo.Update(player);

                return Json("Player Updated.");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpPut]
        [Route("update/fromBody", Name = "UpdatePlayerFromBody")]
        public JsonResult UpdatePlayerFromBody([FromBody] PlayerData player)
        {
            try
            {
                _dataRepo.Update(player);

                return Json("Player Updated.");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpPut]
        [Route("update/multiple", Name = "UpdateMultiplePlayers")]
        public JsonResult UpdateMultiplePlayers([FromBody] PlayerData[] players)
        {
            try
            {
                foreach(PlayerData player in players)
                {
                    _dataRepo.Update(player);
                }

                return Json("Multiple Players Updated.");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpDelete]
        [Route("delete/{id}", Name = "DeletePlayer")]
        public JsonResult DeletePlayer(int id)
        {
            try
            {
                _dataRepo.Delete(id);

                return Json("Player Deleted.");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }


        [HttpDelete]
        [Route("delete/multiple", Name = "DeleteMultiplePlayers")]
        public JsonResult DeleteMultiplePlayers([FromBody] int[] selectedIds)
        {
            try
            {
                foreach (int id in selectedIds)
                {
                    _dataRepo.Delete(id);
                }
                
                return Json("Multiple players deleted.");
            }
            catch (Exception ex)
            {
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(ex.ToString());
            }
        }
        #endregion
    }
}
