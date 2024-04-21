using Application.Interfaces.Authentication;
using Application.Services.Authentication;

namespace Api.Configuration.ServiceExtensions;

public static class ServiceDependencyInjectionExtension
{
    public static void AddServices(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddTransient<ITokenService, TokenService>();
    }
}
