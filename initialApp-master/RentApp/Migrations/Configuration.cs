namespace RentApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using RentApp.Models.Entities;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Validation;
    using System.Linq;
    using System.Text;

    internal sealed class Configuration : DbMigrationsConfiguration<RentApp.Persistance.RADBContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(RentApp.Persistance.RADBContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Manager"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Manager" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            context.AppUsers.AddOrUpdate(

                  u => u.FullName,

                  new AppUser() { FullName = "Admin Adminovic" }

            );

            context.AppUsers.AddOrUpdate(

                p => p.FullName,

                new AppUser() { FullName = "AppUser AppUserovic" }

            );

            SaveChanges(context);


            // -------------------------------------
            Service ser = new Service();
            VehicleType vt = new VehicleType();
            Branch br = new Branch();
            Vehicle v = new Vehicle();

            vt.Name = "Hatchback";

            v.Manufactor = "Peugeot";
            v.Model = "307";
            v.PricePerHour = (decimal)9.99;
            v.VehicleType = vt;
            v.Unavailable = false;
            v.Year = 2005;

            br.Address = "br_1_addr";
            br.Latitude = 555555;
            br.Longitude = 666666;
            br.Service = ser;

            ser.Name = "Service 1";
            ser.Email = "ser_1@gmail.com";
            ser.Description = "ser_1_decs";
            // -------------------------------------

            // -------------------------------------
            Service ser1 = new Service();
            VehicleType vt1 = new VehicleType();
            Branch br1 = new Branch();
            Vehicle v1 = new Vehicle();

            vt1.Name = "Limousine";

            v1.Manufactor = "Mercedes";
            v1.Model = "Benz C-Class";
            v1.PricePerHour = (decimal)32.49;
            v1.VehicleType = vt1;
            v1.Unavailable = false;
            v1.Year = 2014;

            br1.Address = "New Address";
            br1.Latitude = 45.257059;
            br1.Longitude = 19.840957;
            br1.Service = ser1;

            ser1.Name = "Service 2";
            ser1.Email = "ser_2@gmail.com";
            ser1.Description = "ser_2_desc";
            // -------------------------------------

            // -------------------------------------
            VehicleType vt2 = new VehicleType();
            Branch br2 = new Branch();
            Vehicle v2 = new Vehicle();

            vt2.Name = "Caravan";

            v2.Manufactor = "Renault";
            v2.Model = "Laguna";
            v2.PricePerHour = (decimal)14;
            v2.VehicleType = vt1;
            v2.Unavailable = false;
            v2.Year = 2010;

            br2.Address = "Bulevar Kralja Petra 38";
            br2.Latitude = 45.259687;
            br2.Longitude = 19.828179;
            br2.Service = ser1;
            // -------------------------------------

            Service[] services = { ser, ser1 };

            context.Services.AddOrUpdate(

                s => s.Name,

                services

            );

            SaveChanges(context);


            Branch[] branches = { br, br1, br2 };

            context.Branches.AddOrUpdate(

                b => b.Address,

                branches

            );

            SaveChanges(context);

            VehicleType[] types = { vt, vt1, vt2 };

            context.VehicleTypes.AddOrUpdate(

                veht => veht.Id,    // Name

                types

            );


            SaveChanges(context);

            
            Vehicle[] vehicles = { v, v1, v2 };

            context.Vehicles.AddOrUpdate(

                veh => veh.Id,  // Model

                vehicles

            );

            SaveChanges(context);

            var userStore = new UserStore<RAIdentityUser>(context);
            var userManager = new UserManager<RAIdentityUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin"))
            {
                var _appUser = context.AppUsers.FirstOrDefault(a => a.FullName == "Admin Adminovic");
                var user = new RAIdentityUser() { Id = "admin", UserName = "admin", Email = "admin@yahoo.com", PasswordHash = RAIdentityUser.HashPassword("admin"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu"))

            {

                var _appUser = context.AppUsers.FirstOrDefault(a => a.FullName == "AppUser AppUserovic");
                var user = new RAIdentityUser() { Id = "appu", UserName = "appu", Email = "appu@yahoo.com", PasswordHash = RAIdentityUser.HashPassword("appu"), AppUserId = _appUser.Id };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");

            }
        }

        private static void SaveChanges(DbContext context)
        {
            try
            {
                context.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                var sb = new StringBuilder();
                foreach (var failure in ex.EntityValidationErrors)
                {
                    sb.AppendFormat("{0} failed validation\n", failure.Entry.Entity.GetType());
                    foreach (var error in failure.ValidationErrors)
                    {
                        sb.AppendFormat("- {0} : {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine();
                    }
                }
                throw new DbEntityValidationException(
                    "Entity Validation Failed - errors follow:\n" +
                    sb.ToString(), ex
                );
            }
        }
    }
}
