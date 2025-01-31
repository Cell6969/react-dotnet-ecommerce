using api.Data;
using api.Dto;
using api.Entities;
using api.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class CartController(StoreContext context) : BaseApiController
    {
        private readonly StoreContext context = context;

        [HttpGet]
        public async Task<ActionResult<CartResponse>> GetCart()
        {
            var cart = await FindCart();

            if (cart == null) return NoContent();

            return cart.ToDto();
        }

        [HttpPost]
        public async Task<ActionResult<CartResponse>> AddCartItem([FromBody] AddCartItemRequest cartItem)
        {
            // get cart
            var cart = await FindCart();

            // create cart
            cart ??= CreateCart();

            // get product
            var product = await context.Products.FindAsync(cartItem.ProductId);
            if (product == null) return BadRequest("Problem adding item to cart");

            // add item to cart
            cart.AddItem(product, cartItem.Quantity);

            // save changes
            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetCart), cart.ToDto());

            return BadRequest("Problem updating cart");
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            // get cart
            var cart = await FindCart();
            if (cart == null) return BadRequest("Failed to delete item from cart");

            // remove item or reduce its quantity
            cart.RemoveItem(productId, quantity);

            // save changes
            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Problem updating cart");
        }

        private async Task<Cart?> FindCart()
        {
            return await context.Carts
                .Include(item => item.Items)
                .ThenInclude(item => item.Product)
                .FirstOrDefaultAsync(item => item.CartId == Request.Cookies["_cartId"]);
        }

        private Cart CreateCart()
        {
            var cartId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.UtcNow.AddDays(30)

            };
            Response.Cookies.Append("_cartId", cartId, cookieOptions);
            var cart = new Cart
            {
                CartId = cartId

            };

            context.Carts.Add(cart);

            return cart;
        }
    }
}
