using System;
using api.Entities;

namespace api.Extensions;

public static class ProductExtension
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        query = orderBy switch
        {
            "priceLow" => query.OrderBy(x => x.Price),
            "priceHigh" => query.OrderByDescending(x => x.Price),
            _ => query.OrderBy(x => x.Name)
        };

        return query;
    }
}
