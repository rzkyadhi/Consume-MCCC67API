using ConsumeMCC67API.Models;
using ConsumeMCC67API.Base;
using ConsumeMCC67API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace ConsumeMCC67API.Controllers
{
    [Authorize(Roles = "Manager")]
    public class SupplierController : BaseController<Supplier, SupplierRepository>
    {
        public SupplierController(SupplierRepository repository) : base(repository)
        {
        }
    }
}
