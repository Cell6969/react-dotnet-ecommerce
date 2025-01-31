using System;

namespace api.Dto;

public class CartItemResponse
{
    public int ProductId { get; set; }

    public required string Name { get; set; }

    public long Price { get; set; }

    public required string Url { get; set; }

    public required string Brand { get; set; }

    public required string Type { get; set; }

    public int Quantity { get; set; }
}
