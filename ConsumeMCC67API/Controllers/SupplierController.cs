using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ConsumeMCC67API.Models;
using System.Net.Http;
using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Linq;
using System.Text;

namespace ConsumeMCC67API.Controllers
{
    public class SupplierController : Controller
    {
        string BaseUrl = "https://localhost:44313/api/";

        #region Get
        public async Task<ActionResult> Index()
        {
            IEnumerable<Supplier> Supplier = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var responseTask = client.GetAsync("Supplier");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();
                    
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
        #endregion Get

        #region Post
        [HttpGet]
        public IActionResult Create() 
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Supplier supplier)
        {
            if (ModelState.IsValid)
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri($"{BaseUrl}");
                    var postTask = client.PostAsJsonAsync<Supplier>("Supplier", supplier);
                    postTask.Wait();

                    var result = postTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return RedirectToAction("Index", "Supplier");
                    }
                }
            }
            ModelState.AddModelError(string.Empty, "Server Error. Please Contact Administrator");

            return View(supplier);
        }
        #endregion Post

        #region Put
        [HttpGet]
        public IActionResult Edit(int id)
        {
            Supplier supplier = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var responseTask = client.GetAsync("Supplier/" + id.ToString());
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();

                    supplier = JsonConvert.DeserializeObject<Supplier>(dataOnly);
                }
            }
            return View(supplier);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Supplier supplier)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);

                var putTask = client.PutAsJsonAsync<Supplier>("Supplier", supplier);
                putTask.Wait();

                var result = putTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Supplier");
                }
            }
            return View(supplier);
        }
        #endregion Put

        #region Delete
        [HttpGet]
        public IActionResult Delete(int id)
        {

            Supplier supplier = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var responseTask = client.GetAsync("Supplier/" + id.ToString());
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();

                    supplier = JsonConvert.DeserializeObject<Supplier>(dataOnly);
                }
            }
            return View(supplier);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Supplier supplier)
		{
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Delete,
                    RequestUri = new Uri($"{BaseUrl}Supplier"),
                    Content = new StringContent(JsonConvert.SerializeObject(supplier), Encoding.UTF8, "application/json")
                };
                var response = client.SendAsync(request);
                response.Wait();
                var result = response.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Supplier");
                }
            }
            return RedirectToAction("Index", "Supplier");
		}
        #endregion Delete
    }
}
