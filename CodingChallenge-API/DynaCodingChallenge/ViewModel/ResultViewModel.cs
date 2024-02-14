namespace DynaCodingChallenge.ViewModel
{
	public class ResultViewModel<T> where T : class
	{
		public IEnumerable<T> Entities { get; set; }
		public int TotalRecords { get; set; }
	}
}
