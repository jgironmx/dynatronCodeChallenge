using System.ComponentModel.DataAnnotations;

namespace DynaCodingChallenge.Model
{
	public class Customer: AuditObject
	{
		[Key]
		public int Id { get; set; }

		[StringLength(100)]
		public string FirstName { get; set; }

		[StringLength(100)]
		public string LastName { get; set; }

		[StringLength(50)]
		public string Email { get; set; }
	}
}
