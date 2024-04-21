using Application.Entities.Domain.Enums;

namespace Application.Entities.Domain.User;

public class User
{
    public Guid Id { get; set; }
    public UserRole Role { get; set; }
    public string Name { get; set; } = string.Empty;
}
