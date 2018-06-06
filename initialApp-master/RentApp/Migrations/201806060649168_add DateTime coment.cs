namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addDateTimecoment : DbMigration
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
                        Time = c.DateTime(),
                        AppUserId = c.Int(nullable: false),
                        ServiceId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: true)
                .ForeignKey("dbo.Services", t => t.ServiceId, cascadeDelete: true)
                .Index(t => t.AppUserId)
                .Index(t => t.ServiceId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Impressions", "ServiceId", "dbo.Services");
            DropForeignKey("dbo.Impressions", "AppUserId", "dbo.AppUsers");
            DropIndex("dbo.Impressions", new[] { "ServiceId" });
            DropIndex("dbo.Impressions", new[] { "AppUserId" });
            DropTable("dbo.Impressions");
        }
    }
}
