using ConsumeMCC67API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ConsumeMCC67API.Base
{
    public class BaseController<TModel, TRepository> : Controller
        where TModel : class
        where TRepository : IGeneralRepository<TModel>
    {
        private readonly TRepository repository;

        public BaseController(TRepository repository)
        {
            this.repository = repository;
        }

        #region Get
        public IActionResult Index()
        {
            var result = repository.Get();
            return View(result);
        }
        #endregion Get

        #region Create
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(TModel model)
        {
            var post = repository.Post(model);
            string postString = post.ToString();

            if (postString == "OK")
            {
                return RedirectToAction("Index");
            }
            return View(model);
        }
        #endregion Create

        #region Edit
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var result = repository.Get(id);
            return View(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(TModel model)
        {
            var put = repository.Put(model);
            string putString = put.ToString();
            if (putString == "OK")
            {
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }
        #endregion Edit

        #region Delete
        public IActionResult Delete(int id)
        {
            var result = repository.Get(id);
            return View(result);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(TModel model)
        {
            var delete = repository.Delete(model);
            string deleteString = delete.ToString();
            if (deleteString == "OK")
            {
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }
        #endregion Delete
    }
}
