using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

using LiteDB;
using PoolAppExercise.Interfaces;
using PoolAppExercise.Model;


namespace PoolAppExercise.Repository
{
    public class DataRepository : IDataRepository
    {
        private readonly Database _db;

        #region Constructor
        public DataRepository(IOptions<Database> db)
        {
            _db = db.Value;
        }
        #endregion

        #region Interface Implementation
        /// <summary>
        /// Returns a list of PlayerData from database file
        /// </summary>
        /// <returns>List<PlayerData></returns>
        public IEnumerable<PlayerData> GetAll()
        {
            List<PlayerData> playersList = new List<PlayerData>();

            using (var db = new LiteDatabase(_db.ConnectionFileString))
            {
                var players = db.GetCollection<PlayerData>("players").FindAll();

                if (players == null)
                {
                    return null;
                }

                playersList = players.ToList();
            }

            return playersList;
        }

        /// <summary>
        /// Get single PlayerData information
        /// </summary>
        /// <param name="id">ID of PlayerData</param>
        /// <returns>PlayerData class object</returns>
        public PlayerData Get(int id)
        {
            PlayerData player = null;

            using (var db = new LiteDatabase(_db.ConnectionFileString))
            {
                var players = db.GetCollection<PlayerData>("users");
                var results = players.FindById(id);

                if (results == null)
                {
                    return null;
                }

                player = results;
            }

            return player;
        }

        /// <summary>
        /// Add a new UserData to database file
        /// </summary>
        /// <param name="PlayerData">PlayerData class information</param>
        public void Add(PlayerData player)
        {
            using (var db = new LiteDatabase(_db.ConnectionFileString))
            {
                var players = db.GetCollection<PlayerData>("players");
                players.Insert(player);
            }
        }

        /// <summary>
        /// Update an existing PlayerData with new information
        /// </summary>
        /// <param name="PlayerData">PlayerData class information</param>
        public void Update(PlayerData player)
        {
            using (var db = new LiteDatabase(_db.ConnectionFileString))
            {
                var players = db.GetCollection<PlayerData>("players");
                var playerInfo = players.FindById(player.ID);

                if (playerInfo == null)
                {
                    return;
                }

                playerInfo = player;
                players.Update(playerInfo);
            }
        }

        /// <summary>
        /// Delete a UserData from database file
        /// </summary>
        /// <param name="UserData">UserData class information</param>
        public void Delete(int id)
        {
            using (var db = new LiteDatabase(_db.ConnectionFileString))
            {
                var players = db.GetCollection<PlayerData>("players");
                players.Delete(id);
            }
        }
        #endregion
    }
}
