namespace DynaCodingChallenge.Model
{
	public abstract class AuditObject
	{
		public DateTime CreatedAt { get; set; }

		public DateTime? LastUpdatedAt { get; set; }
	}
}
