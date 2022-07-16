using ConsumeMCC67API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace ConsumeMCC67API.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public async Task<ActionResult> Index()
        {
            IEnumerable<Supplier> Supplier = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://localhost:44313/api/");
                var responseTask = client.GetAsync("Supplier");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    //var readTask = result.Content.ReadAsAsync<IList<Produk>>();
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();
                    //readTask.Wait();

                    //produk = readTask.Result;
                    Supplier = JsonConvert.DeserializeObject<List<Supplier>>(dataOnly);
                }
                else
                {
                    Supplier = Enumerable.Empty<Supplier>();

                    ModelState.AddModelError(string.Empty, "Server error. please contact administrator yg.");
                }
            }

            return View(Supplier);
        }
    }
}
