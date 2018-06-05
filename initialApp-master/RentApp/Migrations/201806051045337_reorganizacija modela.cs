namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class reorganizacijamodela : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Rents", "Branch_Id", "dbo.Branches");
            DropForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles");
            DropForeignKey("dbo.Vehicles", "Type_Id", "dbo.VehicleTypes");
            DropIndex("dbo.Rents", new[] { "Branch_Id" });
            DropIndex("dbo.Rents", new[] { "Vehicle_Id" });
            DropIndex("dbo.Vehicles", new[] { "Type_Id" });
            RenameColumn(table: "dbo.Rents", name: "Branch_Id", newName: "BranchId");
            RenameColumn(table: "dbo.Rents", name: "Vehicle_Id", newName: "VehicleId");
            RenameColumn(table: "dbo.Vehicles", name: "Type_Id", newName: "VehicleTypeId");
            AddColumn("dbo.Rents", "AppUserId", c => c.Int(nullable: false));
            AlterColumn("dbo.Rents", "BranchId", c => c.Int(nullable: false));
            AlterColumn("dbo.Rents", "VehicleId", c => c.Int(nullable: false));
            AlterColumn("dbo.Vehicles", "VehicleTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Rents", "BranchId");
            CreateIndex("dbo.Rents", "VehicleId");
            CreateIndex("dbo.Rents", "AppUserId");
            CreateIndex("dbo.Vehicles", "VehicleTypeId");
            AddForeignKey("dbo.Rents", "AppUserId", "dbo.AppUsers", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Rents", "BranchId", "dbo.Branches", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Rents", "VehicleId", "dbo.Vehicles", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes");
            DropForeignKey("dbo.Rents", "VehicleId", "dbo.Vehicles");
            DropForeignKey("dbo.Rents", "BranchId", "dbo.Branches");
            DropForeignKey("dbo.Rents", "AppUserId", "dbo.AppUsers");
            DropIndex("dbo.Vehicles", new[] { "VehicleTypeId" });
            DropIndex("dbo.Rents", new[] { "AppUserId" });
            DropIndex("dbo.Rents", new[] { "VehicleId" });
            DropIndex("dbo.Rents", new[] { "BranchId" });
            AlterColumn("dbo.Vehicles", "VehicleTypeId", c => c.Int());
            AlterColumn("dbo.Rents", "VehicleId", c => c.Int());
            AlterColumn("dbo.Rents", "BranchId", c => c.Int());
            DropColumn("dbo.Rents", "AppUserId");
            RenameColumn(table: "dbo.Vehicles", name: "VehicleTypeId", newName: "Type_Id");
            RenameColumn(table: "dbo.Rents", name: "VehicleId", newName: "Vehicle_Id");
            RenameColumn(table: "dbo.Rents", name: "BranchId", newName: "Branch_Id");
            CreateIndex("dbo.Vehicles", "Type_Id");
            CreateIndex("dbo.Rents", "Vehicle_Id");
            CreateIndex("dbo.Rents", "Branch_Id");
            AddForeignKey("dbo.Vehicles", "Type_Id", "dbo.VehicleTypes", "Id");
            AddForeignKey("dbo.Rents", "Vehicle_Id", "dbo.Vehicles", "Id");
            AddForeignKey("dbo.Rents", "Branch_Id", "dbo.Branches", "Id");
        }
    }
}
