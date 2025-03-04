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

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? search)
    {
        if (string.IsNullOrEmpty(search)) return query;

        var lowerCaseSearch = search.Trim().ToLower();

        return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearch) ||
                            x.Description.ToLower().Contains(lowerCaseSearch) ||
                            x.Type.ToLower().Contains(lowerCaseSearch) ||
                            x.Brand.ToLower().Contains(lowerCaseSearch));
    }

    public static IQueryable<Product> Categorized(
        this IQueryable<Product> query,
        string? brand,
        string? type
    )
    {
        var brandList = new List<String>();
        var typeList = new List<String>();

        if (!string.IsNullOrEmpty(brand))
        {
            brandList.AddRange([.. brand.ToLower().Split(',')]);
        }

        if (!string.IsNullOrEmpty(type))
        {
            typeList.AddRange([.. type.ToLower().Split(',')]);
        }

        query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
        query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));

        return query;
    }
}
