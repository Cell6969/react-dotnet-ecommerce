namespace api.Entities;

public class CartItem
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    // navigation properties
    public int ProductId { get; set; }

    public required Product Product { get; set; }
}