using ConsumeMCC67API.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace ConsumeMCC67API.Repositories
{
    public class GenericRepository<TModel> : IGeneralRepository<TModel>
        where TModel : class
    {
        string request;
        string joinRequest;
        IHttpContextAccessor _contextAccessor;
        HttpClient httpClient;
        string baseUrl = "https://localhost:44313/api/";
        public GenericRepository(string request, string joinRequest)
        {
            this.request = request;
            this.joinRequest = joinRequest;
            this._contextAccessor = new HttpContextAccessor();
            this.httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _contextAccessor.HttpContext.Session.GetString("JWToken"));
        }
        #region Get
        public List<TModel> Get()
        {
            List<TModel> results = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                var responseTask = client.GetAsync($"{request}/");
                responseTask.Wait();

                var result = responseTask.Result;

                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();

                    results = JsonConvert.DeserializeObject<List<TModel>>(dataOnly);
                    return results;
                }
            }
            return results;
        }

        #endregion Get

        #region Get By An Id
        public virtual TModel Get(int id)
        {
            TModel model = null;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                var responseTask = client.GetAsync($"{request}/" + id.ToString());
                responseTask.Wait();

                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsStringAsync().Result;
                    var parsedObject = JObject.Parse(readTask);
                    var dataOnly = parsedObject["data"].ToString();

                    model = JsonConvert.DeserializeObject<TModel>(dataOnly);
                    return model;
                }
            }
            return model;
        }
        #endregion

        #region Put
        public HttpStatusCode Put(TModel model)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                var postTask = client.PutAsJsonAsync<TModel>($"{request}", model);
                postTask.Wait();

                var result = postTask.Result.StatusCode;
                return result;
            }
        }
        #endregion Put

        #region Post
        public HttpStatusCode Post(TModel model)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                var postTask = client.PostAsJsonAsync<TModel>($"{request}", model);
                postTask.Wait();

                var result = postTask.Result.StatusCode;
                return result;
            }
        }
        #endregion Post

        #region Delete
        public HttpStatusCode Delete(TModel model)
        {
            using (var client = new HttpClient())
            {
                var requestDelete = new HttpRequestMessage
                {
                    Method = HttpMethod.Delete,
                    RequestUri = new Uri($"{baseUrl}{request}"),
                    Content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json")
                };
                var response = client.SendAsync(requestDelete);
                response.Wait();
                var result = response.Result.StatusCode;
                return result;
            }
        }
        #endregion Delete

    }
}
