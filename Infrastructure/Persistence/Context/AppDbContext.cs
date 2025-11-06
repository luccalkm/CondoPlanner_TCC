using Application.DTOs.Condominium;
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

            modelBuilder.Entity<Condominio>()
                .HasOne(c => c.Endereco)
                .WithMany()
                .HasForeignKey(c => c.EnderecoId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Bloco>()
                .Property(b => b.Nome)
                .HasMaxLength(100);

            modelBuilder.Entity<Apartamento>()
                .Property(a => a.Numero)
                .HasMaxLength(10);

            modelBuilder.Entity<UsuarioCondominio>()
                .HasKey(uc => uc.Id);

            modelBuilder.Entity<UsuarioCondominio>()
                .HasIndex(uc => new { uc.UsuarioId, uc.CondominioId })
                .IsUnique();

            modelBuilder.Entity<UsuarioCondominio>()
                .HasOne(uc => uc.Usuario)
                .WithMany(u => u.VinculosCondominios)
                .HasForeignKey(uc => uc.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UsuarioCondominio>()
                .HasOne(uc => uc.Condominio)
                .WithMany(c => c.VinculosUsuarios)
                .HasForeignKey(uc => uc.CondominioId)
                .OnDelete(DeleteBehavior.Cascade);
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
