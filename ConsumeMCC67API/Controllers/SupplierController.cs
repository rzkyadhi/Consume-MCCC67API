using ConsumeMCC67API.Models;
using ConsumeMCC67API.Base;
using ConsumeMCC67API.Repositories.Data;

namespace ConsumeMCC67API.Controllers
{
    public class SupplierController : BaseController<Supplier, SupplierRepository>
    {
        public SupplierController(SupplierRepository repository) : base(repository)
        {
        }
    }
}
