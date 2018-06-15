namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class IdevikaopoljazareferencekodAppUseraiRente : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.AppUsers", name: "RentAccount_Id", newName: "RentAccountId");
            RenameColumn(table: "dbo.Rents", name: "Vehicle_Id", newName: "VehicleId");
            RenameColumn(table: "dbo.Rents", name: "Branch_Id", newName: "Branch1Id");
            RenameIndex(table: "dbo.AppUsers", name: "IX_RentAccount_Id", newName: "IX_RentAccountId");
            RenameIndex(table: "dbo.Rents", name: "IX_Branch_Id", newName: "IX_Branch1Id");
            RenameIndex(table: "dbo.Rents", name: "IX_Vehicle_Id", newName: "IX_VehicleId");
            AddColumn("dbo.Rents", "Branch2Id", c => c.Int());
            CreateIndex("dbo.Rents", "Branch2Id");
            AddForeignKey("dbo.Rents", "Branch2Id", "dbo.Branches", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rents", "Branch2Id", "dbo.Branches");
            DropIndex("dbo.Rents", new[] { "Branch2Id" });
            DropColumn("dbo.Rents", "Branch2Id");
            RenameIndex(table: "dbo.Rents", name: "IX_VehicleId", newName: "IX_Vehicle_Id");
            RenameIndex(table: "dbo.Rents", name: "IX_Branch1Id", newName: "IX_Branch_Id");
            RenameIndex(table: "dbo.AppUsers", name: "IX_RentAccountId", newName: "IX_RentAccount_Id");
            RenameColumn(table: "dbo.Rents", name: "Branch1Id", newName: "Branch_Id");
            RenameColumn(table: "dbo.Rents", name: "VehicleId", newName: "Vehicle_Id");
            RenameColumn(table: "dbo.AppUsers", name: "RentAccountId", newName: "RentAccount_Id");
        }
    }
}
