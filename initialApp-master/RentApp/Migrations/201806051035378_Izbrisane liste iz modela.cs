namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Izbrisanelisteizmodela : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers");
            DropForeignKey("dbo.Branches", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.Impressions", "User_Id", "dbo.AppUsers");
            DropForeignKey("dbo.Impressions", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.Vehicles", "Service_Id", "dbo.Services");
            DropIndex("dbo.Rents", new[] { "AppUser_Id" });
            DropIndex("dbo.Branches", new[] { "Service_Id" });
            DropIndex("dbo.Vehicles", new[] { "Service_Id" });
            DropIndex("dbo.Impressions", new[] { "User_Id" });
            DropIndex("dbo.Impressions", new[] { "Service_Id" });
            DropColumn("dbo.Rents", "AppUser_Id");
            DropColumn("dbo.Branches", "Service_Id");
            DropColumn("dbo.Vehicles", "Service_Id");
            DropTable("dbo.Impressions");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Impressions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        Grade = c.Int(nullable: false),
                        User_Id = c.Int(),
                        Service_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Vehicles", "Service_Id", c => c.Int());
            AddColumn("dbo.Branches", "Service_Id", c => c.Int());
            AddColumn("dbo.Rents", "AppUser_Id", c => c.Int());
            CreateIndex("dbo.Impressions", "Service_Id");
            CreateIndex("dbo.Impressions", "User_Id");
            CreateIndex("dbo.Vehicles", "Service_Id");
            CreateIndex("dbo.Branches", "Service_Id");
            CreateIndex("dbo.Rents", "AppUser_Id");
            AddForeignKey("dbo.Vehicles", "Service_Id", "dbo.Services", "Id");
            AddForeignKey("dbo.Impressions", "Service_Id", "dbo.Services", "Id");
            AddForeignKey("dbo.Impressions", "User_Id", "dbo.AppUsers", "Id");
            AddForeignKey("dbo.Branches", "Service_Id", "dbo.Services", "Id");
            AddForeignKey("dbo.Rents", "AppUser_Id", "dbo.AppUsers", "Id");
        }
    }
}
