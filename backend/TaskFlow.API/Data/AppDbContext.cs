using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Models;

namespace TaskFlow.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<TaskItem> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TaskItem>(entity =>
        {
            entity.ToTable("tasks");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd();

            entity.Property(e => e.Title)
                .HasColumnName("title")
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Description)
                .HasColumnName("description")
                .HasMaxLength(1000);

            entity.Property(e => e.Column)
                .HasColumnName("column")
                .IsRequired()
                .HasMaxLength(20)
                .HasDefaultValue("todo");

            entity.Property(e => e.Priority)
                .HasColumnName("priority")
                .IsRequired()
                .HasMaxLength(20)
                .HasDefaultValue("medium");

            entity.Property(e => e.CreatedAt)
                .HasColumnName("created_at")
                .IsRequired()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Seed data
            entity.HasData(
                new TaskItem
                {
                    Id = 1,
                    Title = "Estudar React Hooks",
                    Description = "Aprender useState e useEffect",
                    Column = "todo",
                    Priority = "high",
                    CreatedAt = DateTime.UtcNow
                },
                new TaskItem
                {
                    Id = 2,
                    Title = "Configurar Tailwind",
                    Description = "Instalar e configurar Tailwind CSS",
                    Column = "doing",
                    Priority = "medium",
                    CreatedAt = DateTime.UtcNow
                },
                new TaskItem
                {
                    Id = 3,
                    Title = "Criar componentes",
                    Description = "Desenvolver componentes reutilizáveis",
                    Column = "todo",
                    Priority = "high",
                    CreatedAt = DateTime.UtcNow
                }
            );
        });
    }
}
