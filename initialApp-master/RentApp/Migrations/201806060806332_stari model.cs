namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class starimodel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Rents", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Impressions", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Rents", "BranchId", "dbo.Branches");
            DropForeignKey("dbo.Rents", "VehicleId", "dbo.Vehicles");
            DropForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes");
            DropForeignKey("dbo.Impressions", "ServiceId", "dbo.Services");
            DropIndex("dbo.Impressions", new[] { "AppUserId" });
            DropIndex("dbo.Impressions", new[] { "ServiceId" });
            DropIndex("dbo.Rents", new[] { "BranchId" });
            DropIndex("dbo.Rents", new[] { "VehicleId" });
            DropIndex("dbo.Rents", new[] { "AppUserId" });
            DropIndex("dbo.Vehicles", new[] { "VehicleTypeId" });
            RenameColumn(table: "dbo.Impressions", name: "AppUserId", newName: "AppUser_Id");
            RenameColumn(table: "dbo.Rents", name: "BranchId", newName: "Branch_Id");
            RenameColumn(table: "dbo.Rents", name: "VehicleId", newName: "Vehicle_Id");
            RenameColumn(table: "dbo.Vehicles", name: "VehicleTypeId", newName: "VehicleType_Id");
            RenameColumn(table: "dbo.Branches", name: "ServiceId", newName: "Service_Id");
            RenameColumn(table: "dbo.Impressions", name: "ServiceId", newName: "Service_Id");
            RenameIndex(table: "dbo.Branches", name: "IX_ServiceId", newName: "IX_Service_Id");
            AddColumn("dbo.AppUsers", "RentAccount_Id", c => c.Int());
            AddColumn("dbo.Vehicles", "Service_Id", c => c.Int());
            AlterColumn("dbo.Impressions", "AppUser_Id", c => c.Int());
            AlterColumn("dbo.Impressions", "Service_Id", c => c.Int());
            AlterColumn("dbo.Rents", "Branch_Id", c => c.Int());
            AlterColumn("dbo.Rents", "Vehicle_Id", c => c.Int());
            AlterColumn("dbo.Vehicles", "VehicleType_Id", c => c.Int());
            CreateIndex("dbo.AppUsers", "RentAccount_Id");
            CreateIndex("dbo.Rents", "Branch_Id");
            CreateIndex("dbo.Rents", "Vehicle_Id");
            CreateIndex("dbo.Vehicles", "VehicleType_Id");
            CreateIndex("dbo.Vehicles", "Service_Id");
            CreateIndex("dbo.Impressions", "AppUser_Id");
            CreateIndex("dbo.Impressions", "Service_Id");
            AddForeignKey("dbo.AppUsers", "RentAccount_Id", "dbo.Rents", "Id");
            AddForeignKey("dbo.Vehicles", "Service_Id", "dbo.Services", "Id");
            AddForeignKey("dbo.Impressions", "AppUser_Id", "dbo.AppUsers", "Id");
            AddForeignKey("dbo.Rents", "Branch_Id", "dbo.Branches", "Id");
            AddForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles", "Id");
            AddForeignKey("dbo.Vehicles", "VehicleType_Id", "dbo.VehicleTypes", "Id");
            AddForeignKey("dbo.Impressions", "Service_Id", "dbo.Services", "Id");
            DropColumn("dbo.Rents", "AppUserId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Rents", "AppUserId", c => c.Int(nullable: false));
            DropForeignKey("dbo.Impressions", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.Vehicles", "VehicleType_Id", "dbo.VehicleTypes");
            DropForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.Rents", "Branch_Id", "dbo.Branches");
            DropForeignKey("dbo.Impressions", "AppUser_Id", "dbo.AppUsers");
            DropForeignKey("dbo.Vehicles", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.AppUsers", "RentAccount_Id", "dbo.Rents");
            DropIndex("dbo.Impressions", new[] { "Service_Id" });
            DropIndex("dbo.Impressions", new[] { "AppUser_Id" });
            DropIndex("dbo.Vehicles", new[] { "Service_Id" });
            DropIndex("dbo.Vehicles", new[] { "VehicleType_Id" });
            DropIndex("dbo.Rents", new[] { "Vehicle_Id" });
            DropIndex("dbo.Rents", new[] { "Branch_Id" });
            DropIndex("dbo.AppUsers", new[] { "RentAccount_Id" });
            AlterColumn("dbo.Vehicles", "VehicleType_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Rents", "Vehicle_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Rents", "Branch_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Impressions", "Service_Id", c => c.Int(nullable: false));
            AlterColumn("dbo.Impressions", "AppUser_Id", c => c.Int(nullable: false));
            DropColumn("dbo.Vehicles", "Service_Id");
            DropColumn("dbo.AppUsers", "RentAccount_Id");
            RenameIndex(table: "dbo.Branches", name: "IX_Service_Id", newName: "IX_ServiceId");
            RenameColumn(table: "dbo.Impressions", name: "Service_Id", newName: "ServiceId");
            RenameColumn(table: "dbo.Branches", name: "Service_Id", newName: "ServiceId");
            RenameColumn(table: "dbo.Vehicles", name: "VehicleType_Id", newName: "VehicleTypeId");
            RenameColumn(table: "dbo.Rents", name: "Vehicle_Id", newName: "VehicleId");
            RenameColumn(table: "dbo.Rents", name: "Branch_Id", newName: "BranchId");
            RenameColumn(table: "dbo.Impressions", name: "AppUser_Id", newName: "AppUserId");
            CreateIndex("dbo.Vehicles", "VehicleTypeId");
            CreateIndex("dbo.Rents", "AppUserId");
            CreateIndex("dbo.Rents", "VehicleId");
            CreateIndex("dbo.Rents", "BranchId");
            CreateIndex("dbo.Impressions", "ServiceId");
            CreateIndex("dbo.Impressions", "AppUserId");
            AddForeignKey("dbo.Impressions", "ServiceId", "dbo.Services", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Rents", "VehicleId", "dbo.Vehicles", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Rents", "BranchId", "dbo.Branches", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Impressions", "AppUserId", "dbo.AppUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Rents", "AppUserId", "dbo.AppUsers", "Id", cascadeDelete: true);
        }
    }
}
