using Microsoft.EntityFrameworkCore;

namespace DynaCodingChallenge.Model
{
	public class  ApplicationContext: DbContext
	{

		public DbSet<Customer> Customers { get; set; }

		public ApplicationContext(DbContextOptions<ApplicationContext> options)
		: base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);
		}

	}
}
