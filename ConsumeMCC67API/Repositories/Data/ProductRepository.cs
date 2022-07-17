using ConsumeMCC67API.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace ConsumeMCC67API.Repositories.Data
{
    public class ProductRepository : GenericRepository<Product>
    {
        public ProductRepository(string request = "Product", string joinRequest = "Supplier") : base(request, joinRequest)
        {
        }
    }
}
