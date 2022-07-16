using ConsumeMCC67API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;

namespace ConsumeMCC67API.Controllers
{
    public class AccountController : Controller
    {
        string BaseUrl = "https://localhost:44313/api/";
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(Login login)
        {
            if (ModelState.IsValid)
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(BaseUrl);
                    var postTask = client.PostAsJsonAsync<Login>("Account", login);
                    postTask.Wait();

                    var result = postTask.Result;
                    if (result.IsSuccessStatusCode)
                    {
                        var readTask = result.Content.ReadAsStringAsync().Result;
                        var parsedObject = JObject.Parse(readTask);
                        var dataOnly = parsedObject["token"].ToString();

                        HttpContext.Session.SetString("Token", dataOnly);
                        return RedirectToAction("Index", "Supplier");
                    }
                }
            }
            return RedirectToAction("Index", "Product");
        }
    }
}
