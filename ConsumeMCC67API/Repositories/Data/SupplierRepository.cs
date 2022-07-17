using ConsumeMCC67API.Models;

namespace ConsumeMCC67API.Repositories.Data
{
    public class SupplierRepository : GenericRepository<Supplier>
    {
        public SupplierRepository(string request = "Supplier") : base(request)
        {
        }
    }
}
