using System;
using System.Text.Json;
using api.Helper.Pagination;
using Microsoft.Net.Http.Headers;

namespace api.Extensions;

public static class HttpExtension
{
    public static void AddPaginationHeader(this HttpResponse response, PaginationMeta metdata)
    {
        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        response.Headers.Append("Pagination", JsonSerializer.Serialize(metdata, options));
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "Pagination");
    }
}
