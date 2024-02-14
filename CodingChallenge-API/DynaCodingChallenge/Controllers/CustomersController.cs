using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DynaCodingChallenge.Model;
using DynaCodingChallenge.ViewModel;

namespace DynaCodingChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : BaseController
	{
        private readonly ApplicationContext _context;

        public CustomersController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<ResultViewModel<Customer>>> GetCustomers([FromQuery]RequestViewModel request)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customersConsult = _context.Customers.AsQueryable();
            request = request ?? new RequestViewModel();
            if (!string.IsNullOrWhiteSpace(request.FilterParam))
            {
                customersConsult = customersConsult.Where( m=> 
                    m.FirstName.Contains(request.FilterParam) ||
	                m.LastName.Contains(request.FilterParam)
                );
            }
            var result = GetEntitiesResult(request, customersConsult, m=> m.CreatedAt);
            return new ResultViewModel<Customer>()
            {
               Entities = result.Entities.ToList(),
	            TotalRecords = result.TotalRecords
            };
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                var entry = _context.Entry(customer);
                entry.Property(m => m.CreatedAt).IsModified = false;
				customer.LastUpdatedAt = DateTime.Now;
				await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            if (_context.Customers == null)
            {
                return Problem("Entity set 'ApplicationContext.Customers'  is null.");
            }
            customer.CreatedAt = DateTime.Now;
			customer.LastUpdatedAt = DateTime.Now;
			_context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return (_context.Customers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
