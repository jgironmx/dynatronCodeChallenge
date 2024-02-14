using DynaCodingChallenge.Model;

namespace DynaCodingChallenge.DbInitializer
{
	public static class DbInitializerExtension
	{
		public static IApplicationBuilder UseItToSeedSqlServer(this IApplicationBuilder app)
		{
			ArgumentNullException.ThrowIfNull(app, nameof(app));

			using var scope = app.ApplicationServices.CreateScope();
			var services = scope.ServiceProvider;
			try
			{
				var context = services.GetRequiredService<ApplicationContext>();
				DbInitializer.Initialize(context);
			}
			catch (Exception ex)
			{

			}

			return app;
		}
	}
}
