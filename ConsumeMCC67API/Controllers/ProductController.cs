using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ConsumeMCC67API.Models;
using System.Net.Http;
using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text;

namespace ConsumeMCC67API.Controllers
{
	public class ProductController : Controller
	{
        string BaseUrl = "https://localhost:44313/api/";
        
        #region Get
        public async Task<ActionResult> Index()
        {
            IEnumerable<Product> Product = null;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var responseTask = client.GetAsync("Product");
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();

                    Product = JsonConvert.DeserializeObject<List<Product>>(dataOnly);
                }
                else
                {
                    Product = Enumerable.Empty<Product>();

                    ModelState.AddModelError(string.Empty, "Server error. please contact administrator yg.");
                }
            }

            return View(Product);
        }
        #endregion Get

        #region Post
        [HttpGet]
        public ActionResult Create()
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

                    var suppliers = new SelectList(Supplier, "Id", "Name");

                    if (suppliers.Count() > 0)
                    {
                        ViewBag.SupplierViewBag = suppliers;
                    }

                    return View();
                }
                else
                {
                    Supplier = Enumerable.Empty<Supplier>();

                    ModelState.AddModelError(string.Empty, "Server error. please contact administrator yg.");
                }
            }
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri($"{BaseUrl}");
                    var postTask = client.PostAsJsonAsync<Product>("Product", product);
                    postTask.Wait();

                    var result = postTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return RedirectToAction("Index", "Product");
                    }
                }
            }
            ModelState.AddModelError(string.Empty, "Server Error. Please Contact Administrator");

            return View(product);
        }
        #endregion Post

        #region Put
        [HttpGet]
        public ActionResult Edit(int id)
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

                    var suppliers = new SelectList(Supplier, "Id", "Name");

                    if (suppliers.Count() > 0)
                    {
                        ViewBag.SupplierViewBag = suppliers;
                    }
                }
            }

            Product product = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var responseTask = client.GetAsync("Product/" + id.ToString());
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();

                    product = JsonConvert.DeserializeObject<Product>(dataOnly);
                }
            }
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Product product)
        {
            if (ModelState.IsValid)
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri($"{BaseUrl}");
                    var putTask = client.PutAsJsonAsync<Product>("Product", product);
                    putTask.Wait();

                    var result = putTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        return RedirectToAction("Index", "Product");
                    }
                }
            }
            ModelState.AddModelError(string.Empty, "Server Error. Please Contact Administrator");

            return View(product);
        }
        #endregion Put

        #region Delete
        [HttpGet]
        public IActionResult Delete(int id)
        {

            Product product = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var responseTask = client.GetAsync("Product/" + id.ToString());
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();

                    product = JsonConvert.DeserializeObject<Product>(dataOnly);
                }
            }
            return View(product);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(Product product)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage
                {
                    Method = HttpMethod.Delete,
                    RequestUri = new Uri($"{BaseUrl}Product"),
                    Content = new StringContent(JsonConvert.SerializeObject(product), Encoding.UTF8, "application/json")
                };
                var response = client.SendAsync(request);
                response.Wait();
                var result = response.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("Index", "Product");
                }
            }
            return RedirectToAction("Index", "Product");
        }
        #endregion Delete
    }
}
