using System.ComponentModel.DataAnnotations;

namespace TaskFlow.API.Models;

public class TaskItem
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required]
    [MaxLength(20)]
    public string Column { get; set; } = "todo"; // "todo", "doing", "done"

    [Required]
    [MaxLength(20)]
    public string Priority { get; set; } = "medium"; // "low", "medium", "high"

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
