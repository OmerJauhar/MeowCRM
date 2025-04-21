using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Settings> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure relationships and constraints
            builder.Entity<Activity>()
                .HasOne(a => a.User)
                .WithMany(u => u.Activities)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Report>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Settings>()
                .HasOne(s => s.User)
                .WithOne(u => u.Settings)
                .HasForeignKey<Settings>(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}