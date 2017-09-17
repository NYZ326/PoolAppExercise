using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using PoolAppExercise.Model;

namespace PoolAppExercise.Interfaces
{
    interface IDataRepository
    {
        IEnumerable<PlayerData> GetAll();
        PlayerData Get(int id);
        void Add(PlayerData player);
        void Update(PlayerData player);
        void Delete(int id);

    }
}
