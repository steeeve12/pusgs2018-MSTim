namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Creatoruservisu : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Services", "Creator_Id", c => c.Int());
            CreateIndex("dbo.Services", "Creator_Id");
            AddForeignKey("dbo.Services", "Creator_Id", "dbo.AppUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Services", "Creator_Id", "dbo.AppUsers");
            DropIndex("dbo.Services", new[] { "Creator_Id" });
            DropColumn("dbo.Services", "Creator_Id");
        }
    }
}
