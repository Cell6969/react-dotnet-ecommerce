using System;

namespace api.Dto;

public class FilterProductRequest
{
    public string? OrderBy { get; set; }

    public string? Search { get; set; }

    public string? Brand { get; set; }

    public string? Type { get; set; }
}