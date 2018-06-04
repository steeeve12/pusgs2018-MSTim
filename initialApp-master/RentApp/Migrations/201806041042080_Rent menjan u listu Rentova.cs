namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RentmenjanulistuRentova : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AppUsers", "RentAccount_Id", "dbo.Rents");
            DropIndex("dbo.AppUsers", new[] { "RentAccount_Id" });
            AddColumn("dbo.Rents", "AppUser_Id", c => c.Int());
            CreateIndex("dbo.Rents", "AppUser_Id");
            AddForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers", "Id");
            DropColumn("dbo.AppUsers", "RentAccount_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "RentAccount_Id", c => c.Int());
            DropForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers");
            DropIndex("dbo.Rents", new[] { "AppUser_Id" });
            DropColumn("dbo.Rents", "AppUser_Id");
            CreateIndex("dbo.AppUsers", "RentAccount_Id");
            AddForeignKey("dbo.AppUsers", "RentAccount_Id", "dbo.Rents", "Id");
        }
    }
}
