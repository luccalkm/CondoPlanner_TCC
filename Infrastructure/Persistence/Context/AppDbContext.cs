using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace Infrastructure.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Condominium> Condominiums => Set<Condominium>();
        public DbSet<Block> Blocks => Set<Block>();
        public DbSet<Unit> Units => Set<Unit>();
        public DbSet<UnitOccupation> UnitOccupations => Set<UnitOccupation>();
        public DbSet<CommonArea> CommonAreas => Set<CommonArea>();
        public DbSet<Reservation> Reservations => Set<Reservation>();
        public DbSet<Package> Packages => Set<Package>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
