using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

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
        public DbSet<UsuarioCondominio> UsuarioCondominio => Set<UsuarioCondominio>();

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

            modelBuilder.Entity<UsuarioCondominio>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Usuario)
                    .WithMany(u => u.VinculosCondominios)
                    .HasForeignKey(e => e.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Condominio)
                    .WithMany(c => c.VinculosUsuarios)
                    .HasForeignKey(e => e.CondominioId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var entry in ChangeTracker.Entries<Domain.Common.EntidadeRastreadaComum>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.DataCriacao = DateTime.UtcNow;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
