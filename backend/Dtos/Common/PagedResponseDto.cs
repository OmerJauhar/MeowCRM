using System.Collections.Generic;

namespace backend.Dtos.Common
{
    public class PagedResponseDto<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int TotalRecords { get; set; }
        public bool HasPreviousPage => PageNumber > 1;
        public bool HasNextPage => PageNumber < TotalPages;
        public List<T> Items { get; set; }
    }
} 