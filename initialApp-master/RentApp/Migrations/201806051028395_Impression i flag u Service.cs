namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ImpressioniflaguService : DbMigration
    {
        public override void Up()
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
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AppUsers", t => t.User_Id)
                .ForeignKey("dbo.Services", t => t.Service_Id)
                .Index(t => t.User_Id)
                .Index(t => t.Service_Id);
            
            AddColumn("dbo.Services", "Approved", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Impressions", "Service_Id", "dbo.Services");
            DropForeignKey("dbo.Impressions", "User_Id", "dbo.AppUsers");
            DropIndex("dbo.Impressions", new[] { "Service_Id" });
            DropIndex("dbo.Impressions", new[] { "User_Id" });
            DropColumn("dbo.Services", "Approved");
            DropTable("dbo.Impressions");
        }
    }
}
