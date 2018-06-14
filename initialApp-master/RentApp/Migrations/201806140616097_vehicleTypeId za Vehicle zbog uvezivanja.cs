namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class vehicleTypeIdzaVehiclezboguvezivanja : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Vehicles", "VehicleType_Id", "dbo.VehicleTypes");
            DropIndex("dbo.Vehicles", new[] { "VehicleType_Id" });
            RenameColumn(table: "dbo.Vehicles", name: "VehicleType_Id", newName: "VehicleTypeId");
            AlterColumn("dbo.Vehicles", "VehicleTypeId", c => c.Int(nullable: false));
            CreateIndex("dbo.Vehicles", "VehicleTypeId");
            AddForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Vehicles", "VehicleTypeId", "dbo.VehicleTypes");
            DropIndex("dbo.Vehicles", new[] { "VehicleTypeId" });
            AlterColumn("dbo.Vehicles", "VehicleTypeId", c => c.Int());
            RenameColumn(table: "dbo.Vehicles", name: "VehicleTypeId", newName: "VehicleType_Id");
            CreateIndex("dbo.Vehicles", "VehicleType_Id");
            AddForeignKey("dbo.Vehicles", "VehicleType_Id", "dbo.VehicleTypes", "Id");
        }
    }
}
