using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Persistence.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Usuario> Usuarios => Set<Usuario>();
        public DbSet<Condominio> Condominios => Set<Condominio>();
        public DbSet<Bloco> Blocos => Set<Bloco>();
        public DbSet<Apartamento> Apartamentos => Set<Apartamento>();
        public DbSet<VinculoResidencial> VinculosResidenciais => Set<VinculoResidencial>();
        public DbSet<AreaComum> AreasComuns => Set<AreaComum>();
        public DbSet<Reserva> Reservas => Set<Reserva>();
        public DbSet<Encomenda> Encomendas => Set<Encomenda>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Cpf)
                .IsUnique();

            modelBuilder.Entity<Condominio>()
                .Property(c => c.Nome)
                .HasMaxLength(150);

            modelBuilder.Entity<Bloco>()
                .Property(b => b.Nome)
                .HasMaxLength(100);

            modelBuilder.Entity<Apartamento>()
                .Property(a => a.Numero)
                .HasMaxLength(10);
        }
    }
}
