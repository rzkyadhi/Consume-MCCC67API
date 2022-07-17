using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ConsumeMCC67API.Models;
using System.Net.Http;
using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using ConsumeMCC67API.Base;
using ConsumeMCC67API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace ConsumeMCC67API.Controllers
{
    [Authorize(Roles = "Staff")]
	public class ProductController : BaseController<Product, ProductRepository>
	{
        string BaseUrl = "https://localhost:44313/api/";

        public ProductController(ProductRepository repository) : base(repository)
        {
        }

        #region Post
        [HttpGet]
        public override IActionResult Create()
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
        public override IActionResult Create(Product product)
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
        public override IActionResult Edit(int id)
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
        public override IActionResult Edit(Product product)
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
    }
}
