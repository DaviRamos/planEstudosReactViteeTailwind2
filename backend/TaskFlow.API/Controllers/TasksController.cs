using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskFlow.API.Data;
using TaskFlow.API.DTOs;
using TaskFlow.API.Models;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<TasksController> _logger;

    public TasksController(AppDbContext context, ILogger<TasksController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetTasks()
    {
        var tasks = await _context.Tasks
            .OrderBy(t => t.CreatedAt)
            .Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Column = t.Column,
                Priority = t.Priority,
                CreatedAt = t.CreatedAt
            })
            .ToListAsync();

        return Ok(tasks);
    }

    // GET: api/tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TaskDto>> GetTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            return NotFound(new { message = "Tarefa não encontrada" });
        }

        var taskDto = new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Column = task.Column,
            Priority = task.Priority,
            CreatedAt = task.CreatedAt
        };

        return Ok(taskDto);
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto createDto)
    {
        if (string.IsNullOrWhiteSpace(createDto.Title))
        {
            return BadRequest(new { message = "O título é obrigatório" });
        }

        var task = new TaskItem
        {
            Title = createDto.Title.Trim(),
            Description = createDto.Description?.Trim(),
            Priority = createDto.Priority,
            Column = "todo",
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        var taskDto = new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Column = task.Column,
            Priority = task.Priority,
            CreatedAt = task.CreatedAt
        };

        return CreatedAtAction(nameof(GetTask), new { id = task.Id }, taskDto);
    }

    // PUT: api/tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto updateDto)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            return NotFound(new { message = "Tarefa não encontrada" });
        }

        if (!string.IsNullOrWhiteSpace(updateDto.Title))
        {
            task.Title = updateDto.Title.Trim();
        }

        if (updateDto.Description != null)
        {
            task.Description = updateDto.Description.Trim();
        }

        if (!string.IsNullOrWhiteSpace(updateDto.Priority))
        {
            task.Priority = updateDto.Priority;
        }

        if (!string.IsNullOrWhiteSpace(updateDto.Column))
        {
            task.Column = updateDto.Column;
        }

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await TaskExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            return NotFound(new { message = "Tarefa não encontrada" });
        }

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // PATCH: api/tasks/5/move
    [HttpPatch("{id}/move")]
    public async Task<IActionResult> MoveTask(int id, MoveTaskDto moveDto)
    {
        var task = await _context.Tasks.FindAsync(id);

        if (task == null)
        {
            return NotFound(new { message = "Tarefa não encontrada" });
        }

        if (string.IsNullOrWhiteSpace(moveDto.Column))
        {
            return BadRequest(new { message = "A coluna é obrigatória" });
        }

        task.Column = moveDto.Column;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> TaskExists(int id)
    {
        return await _context.Tasks.AnyAsync(e => e.Id == id);
    }
}
