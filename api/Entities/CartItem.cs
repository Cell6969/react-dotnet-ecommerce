using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities;

[Table("CartItems")]
public class CartItem
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    // add relation into productr
    public int ProductId { get; set; }

    public required Product Product { get; set; }

    // add relation to cart
    public int CartId { get; set; }

    public Cart Cart { get; set; } = null!;
}