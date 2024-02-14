using DynaCodingChallenge.Model;

namespace DynaCodingChallenge.DbInitializer
{
    public class DbInitializer
    {
        internal static void Initialize(ApplicationContext dbContext)
        {
            ArgumentNullException.ThrowIfNull(dbContext, nameof(dbContext));
            dbContext.Database.EnsureCreated();
            if (dbContext.Customers.Any()) return;

            var customerList = new List<Customer>();

            for (int index = 0; index < 100; index++)
            {
                customerList.Add(new Customer
                {
                    FirstName = $"Customer{index}",
                    LastName = $"LastName{index}",
                    Email = $"LastName{index}@mail.com",
                    CreatedAt = DateTime.Now,
                    LastUpdatedAt = null
                });
            }

            foreach (var customer in customerList)
                dbContext.Customers.Add(customer);

            dbContext.SaveChanges();
        }
    }
}
