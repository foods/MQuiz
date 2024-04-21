namespace Application.Configuration.Options;

public class AuthenticationOptions
{
    public Jwt Jwt { get; set; } = new Jwt();
}

public class Jwt
{
    public string Key { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public int ValidityInMinutes { get; set; }
}