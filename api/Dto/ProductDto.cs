using api.Helper.Pagination;

namespace api.Dto;

public class FilterProductRequest : Pagination
{
    public string? OrderBy { get; set; }

    public string? Search { get; set; }

    public string? Brand { get; set; }

    public string? Type { get; set; }
}