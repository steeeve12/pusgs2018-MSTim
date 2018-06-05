namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class probasaupitnikom : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Branches", "ServiceId", "dbo.Services");
            DropIndex("dbo.Branches", new[] { "ServiceId" });
            AlterColumn("dbo.Branches", "ServiceId", c => c.Int());
            CreateIndex("dbo.Branches", "ServiceId");
            AddForeignKey("dbo.Branches", "ServiceId", "dbo.Services", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Branches", "ServiceId", "dbo.Services");
            DropIndex("dbo.Branches", new[] { "ServiceId" });
            AlterColumn("dbo.Branches", "ServiceId", c => c.Int(nullable: false));
            CreateIndex("dbo.Branches", "ServiceId");
            AddForeignKey("dbo.Branches", "ServiceId", "dbo.Services", "Id", cascadeDelete: true);
        }
    }
}
