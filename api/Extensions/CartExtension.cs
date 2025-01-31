using System;
using api.Dto;
using api.Entities;

namespace api.Extensions;

public static class CartExtension
{
    public static CartResponse ToDto(this Cart cart)
    {
        return new CartResponse
        {
            CartId = cart.CartId,
            Items = [.. cart.Items.Select(item => new CartItemResponse
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Url = item.Product.Url,
                    Quantity = item.Quantity
                })]
        };
    }
}
