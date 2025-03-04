using System;
using Microsoft.EntityFrameworkCore;

namespace api.Helper.Pagination;

public class PagedResponse<T> : List<T>
{
    public PagedResponse(List<T> items, int count, int pageNumber, int pageSize)
    {
        Metadata = new PaginationMeta
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };

        AddRange(items);
    }

    public PaginationMeta Metadata { get; set; }

    public static async Task<PagedResponse<T>> ToPagedResponse(
        IQueryable<T> query,
        int pageNumber,
        int pageSize)
    {
        var count = await query.CountAsync();
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        return new PagedResponse<T>(items, count, pageNumber, pageSize);
    }
}
