using DynaCodingChallenge.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using System.Linq.Dynamic.Core;

namespace DynaCodingChallenge.Controllers
{
	public class BaseController: ControllerBase
	{
		protected  (int TotalRecords, IQueryable<T1> Entities) GetEntitiesResult<T1, TKey>(
				   RequestViewModel request,
				   IQueryable<T1> entities,
				   Expression<Func<T1, TKey>>? defaultOrderExpression = null,
				   bool defaultOrderAscending = true) where T1 : class
		{

			var totalRecords = entities.Count();

			var sortDescriptor = request.SortField;
			if (!string.IsNullOrEmpty(sortDescriptor) && typeof(T1).GetProperty(sortDescriptor, System.Reflection.BindingFlags.IgnoreCase) != null)
			{
				var orderBy = request.IsSortAscending ? $"{sortDescriptor}" : $"{sortDescriptor} desc";
				entities = entities.OrderBy(orderBy);
			}
			else if (defaultOrderExpression != null)
			{
				entities = defaultOrderAscending ? entities.OrderBy(defaultOrderExpression) : entities.OrderByDescending(defaultOrderExpression);
			}

			// Apply paging
			if (request.Offset.HasValue && request.Limit.HasValue)
			{
				entities = entities.Skip(request.Offset.Value).Take(request.Limit.Value);
			}

			return (totalRecords, entities);
		}
	}
}
