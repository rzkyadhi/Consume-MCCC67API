using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ConsumeMCC67API.Models;
using System.Net.Http;
using System;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using ConsumeMCC67API.Repositories.Data;
using Microsoft.AspNetCore.Authorization;

namespace ConsumeMCC67API.Controllers
{
    /*[Authorize(Roles = "Staff")]*/
    [Authorize(Roles = "Manager")]
	public class ProductController : Controller
    {
        private readonly ProductRepository productRepository;
        private readonly SupplierRepository supplierRepository;

        public ProductController(ProductRepository productRepository, SupplierRepository supplierRepository)
        {
            this.productRepository = productRepository;
            this.supplierRepository = supplierRepository;
        }

        #region Get
        public IActionResult Index()
        {
            /*var result = productRepository.Get();
            if (result != null) return View(result);*/
            return View();
        }
        #endregion Get

        #region Create
        public IActionResult Create()
        {
            var supplier = supplierRepository.Get();
            if (supplier != null)
            {
                var suppliers = new SelectList(supplier, "Id", "Name");
                if (suppliers.Count() > 0) ViewBag.SupplierViewBag = suppliers;
                return View();
            }
            return RedirectToAction("Index", "Product");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                var result = productRepository.Post(product);
                if (result > 0) return RedirectToAction("Index", "Product");
                return View();
            }
            return View();
        }
		#endregion Create

		#region Edit
		public IActionResult Edit(int id)
		{
			var supplier = supplierRepository.Get();

			if (supplier != null)
			{
				var suppliers = new SelectList(supplier, "Id", "Name");
                if (suppliers.Count() > 0) ViewBag.SupplierViewBag = suppliers;

                var product = productRepository.Get(id);
                if (product != null) return View(product);
                return View();
            }
            return RedirectToAction("Index", "Product");
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
        public IActionResult Edit(Product product)
		{
            if (ModelState.IsValid)
			{
                var result = productRepository.Put(product);
                if (result > 0) return RedirectToAction("Index", "Product");
                return View();
			}
            return Edit(product.Id);
		}
        #endregion Edit

        #region Delete
        public IActionResult Delete(int id)
		{
            var product = productRepository.Get(id);
            if (product != null) return View(product);
            return View();
		}

		[HttpPost]
		[ValidateAntiForgeryToken]
        public IActionResult Delete(Product product)
		{
            var result = productRepository.Delete(product);
            if (result > 0) return RedirectToAction("Index", "Product");
            return View();
		}
        #endregion Delete

        #region GetJSON
        public ActionResult GetJSON()
        {
            var result = productRepository.Get();
            if (result != null) return Ok(new
            {
                status = 200,
                message = "SUCCESS",
                data = result
            });
            return NotFound(new
            {
                status = 404,
                message = "NOT FOUND"
            });
        }
        #endregion

        #region PostJSON
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult PostJSON(Product product)
        {
            var result = productRepository.Post(product);
            if (result == System.Net.HttpStatusCode.Created) return Ok(new
            {
                status = result,
                message = "CREATED"
            });
            return BadRequest(new
            {
                status = 400,
                message = "Bad Request"
            });
        }
        #endregion

        #region EditJSON
        public ActionResult GetJSONById(int id)
        {
            var result = productRepository.Get(id);
            if (result != null) return Ok(new
            {
                status = 200,
                message = "SUCCESS",
                data = result
            });
            return BadRequest(new
            {
                status = 400,
                message = "Bad Request"
            });
        }

        [HttpPut]
        [ValidateAntiForgeryToken]
        public ActionResult EditJson(Product product)
        {
            var result = productRepository.Put(product);
            if (result == System.Net.HttpStatusCode.OK) return Ok(new
            {
                status = 200,
                message = "EDITED"
            });
            return BadRequest(new
            {
                status = 400,
                message = "Bad Request"
            });
        }
        #endregion EditJSON

        #region DeleteJSON
        [HttpDelete]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteJSON(Product product)
        {
            var result = productRepository.Delete(product);
            if (result == System.Net.HttpStatusCode.OK) return Ok(new
            {
                status = 200,
                message = "DELETED"
            });
            return BadRequest(new
            {
                status = 400,
                message = "Bad Request"
            });
        }
        #endregion
    }
}
