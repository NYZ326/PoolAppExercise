using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PoolAppExercise.Model
{
    public class PlayerData
    {
        #region Variables
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        #endregion

        #region Constructor
        public PlayerData()
        {
            Wins = 0;
            Losses = 0;
        }
        #endregion
    }
}
