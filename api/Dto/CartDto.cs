using System;

namespace api.Dto;

public class AddCartItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}


public class CartResponse
{
    public int Id { get; set; }

    public required string CartId { get; set; }

    public List<CartItemResponse> Items { get; set; } =  [];
}