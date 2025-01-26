using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class ProductsController(StoreContext context) : BaseApiController
    {
        private readonly StoreContext context = context;

        [HttpGet]
        public async Task<ActionResult<List<Product>>> ListProducts()
        {
            return await context.Products.ToListAsync();
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
