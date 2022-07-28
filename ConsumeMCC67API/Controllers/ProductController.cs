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
            var result = productRepository.Get();
            var supplier = supplierRepository.Get();
            if (supplier != null)
            {
                var suppliers = new SelectList(supplier, "Id", "Name");
                if (suppliers.Count() > 0) ViewBag.SupplierViewBag = suppliers;
                if (result != null) return View();
            }
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
    }
}
