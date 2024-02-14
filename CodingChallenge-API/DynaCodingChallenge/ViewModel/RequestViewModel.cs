namespace DynaCodingChallenge.ViewModel
{
	public class RequestViewModel
	{
		public int? Offset { get; set; }

		public int? Limit { get; set; }

		public string SortField { get; set; }

		public Boolean IsSortAscending { get; set; }

		public string? FilterParam { get; set; }
	}
}
