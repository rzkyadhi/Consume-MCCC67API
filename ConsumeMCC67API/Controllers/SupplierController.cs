using ConsumeMCC67API.Models;
using ConsumeMCC67API.Repositories.Data;
using Microsoft.AspNetCore.Mvc;

namespace ConsumeMCC67API.Controllers
{
    public class SupplierController : Controller
    {
        private readonly SupplierRepository supplierRepository;

        public SupplierController(SupplierRepository supplierRepository)
        {
            this.supplierRepository = supplierRepository;
        }

        #region Get
        public IActionResult Index()
        {
            var result = supplierRepository.Get();
            if (result != null) return View(result);
            return View();
        }
        #endregion Get

        #region Create
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
                var result = supplierRepository.Post(supplier);
                if (result > 0) return RedirectToAction("Index", "Supplier");
                return View();
            }

            return View();
        }
        #endregion Create

        #region Edit
        public IActionResult Edit(int id)
        {
            var result = supplierRepository.Get(id);
            if (result != null) return View(result);
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Supplier supplier)
        {
            if (ModelState.IsValid)
            {
                var result = supplierRepository.Put(supplier);
                if (result > 0) return RedirectToAction("Index", "Supplier");
            }
            return View();
        }
        #endregion Edit

        #region Delete
        public IActionResult Delete(int id)
        {
            var result = supplierRepository.Get(id);
            if (result != null) return View(result);
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Supplier supplier)
        {
            var result = supplierRepository.Delete(supplier);
            if (result > 0) return RedirectToAction("Index", "Supplier");
            return View();
        }
        #endregion Delete
    }
}
