namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class listrentsAppUser : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AppUsers", "RentAccountId", "dbo.Rents");
            DropIndex("dbo.AppUsers", new[] { "RentAccountId" });
            AddColumn("dbo.AppUsers", "Forbidden", c => c.Boolean(nullable: false));
            AddColumn("dbo.Rents", "AppUser_Id", c => c.Int());
            CreateIndex("dbo.Rents", "AppUser_Id");
            AddForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers", "Id");
            DropColumn("dbo.AppUsers", "RentAccountId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "RentAccountId", c => c.Int());
            DropForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers");
            DropIndex("dbo.Rents", new[] { "AppUser_Id" });
            DropColumn("dbo.Rents", "AppUser_Id");
            DropColumn("dbo.AppUsers", "Forbidden");
            CreateIndex("dbo.AppUsers", "RentAccountId");
            AddForeignKey("dbo.AppUsers", "RentAccountId", "dbo.Rents", "Id");
        }
    }
}
