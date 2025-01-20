namespace api.Entities;

public class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public required string Description { get; set; }

    public required long Price { get; set; }

    public required string Url { get; set; }

    public required string Type { get; set; }

    public required string Brand { get; set; }

    public int Quantity { get; set; }
}
