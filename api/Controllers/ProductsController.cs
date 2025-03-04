using api.Data;
using api.Dto;
using api.Entities;
using api.Extensions;
using api.Helper.Pagination;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class ProductsController(StoreContext context) : BaseApiController
    {
        private readonly StoreContext context = context;

        [HttpGet]
        public async Task<ActionResult<List<Product>>> ListProducts([FromQuery] FilterProductRequest filter)
        {
            var query = context.Products
                .Sort(filter.OrderBy)
                .Search(filter.Search)
                .Categorized(filter.Brand, filter.Type)
                .AsQueryable();

            var products = await PagedResponse<Product>.ToPagedResponse(query, filter.PageNumber, filter.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> FindProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }
    }
}
