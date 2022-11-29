using Microsoft.EntityFrameworkCore;
using WorldCup_Simulator;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<WorldCupContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ServerConnection")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.MapGet("/api/teams/group", async (WorldCupContext context) =>
{
    var teams = await context.Teams.ToListAsync();
    var groups = teams.GroupBy(p => p.Group)
        .OrderBy(p => p.Key)
        .Select(p => p.Select(p =>p));

    return Results.Ok(groups);
});

app.MapGet("/teams/{id}", async (WorldCupContext context, Guid id) =>
{
    var DbTeam = await context.Teams.FindAsync(id);
    if (DbTeam == null)
        return Results.NotFound();

    return Results.Ok(DbTeam);
});

app.MapGet("/teams", async (WorldCupContext context) =>
{
    var teams = await context.Teams.ToListAsync();
    return Results.Ok(teams);
});

app.MapPost("/teams", async (WorldCupContext context, Team team) =>
{
    await context.Teams.AddAsync(team);
    await context.SaveChangesAsync();

    return Results.Ok(team);
});

app.MapPut("/teams/{id}", async (WorldCupContext context, Team team) =>
{
    var DbTeam = await context.Teams.FindAsync(team.Id);
    if (DbTeam == null)
        return Results.NotFound();

    DbTeam.Name = team.Name;
    DbTeam.Img = team.Img;

    context.Teams.Update(DbTeam);
    await context.SaveChangesAsync();

    return Results.Ok(team);
});

app.MapDelete("/teams/{id}", async (WorldCupContext context, Guid id) =>
{
    var DbTeam = await context.Teams.FindAsync(id);
    if (DbTeam == null)
        return Results.NotFound();

    context.Teams.Remove(DbTeam);
    await context.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();

public class Team
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Img { get; set; }
    public int Group { get; set; }
}
