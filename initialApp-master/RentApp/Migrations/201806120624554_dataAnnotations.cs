namespace RentApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dataAnnotations : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.AppUsers", "FullName", c => c.String(nullable: false));
            AlterColumn("dbo.AppUsers", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Branches", "Picture", c => c.String(nullable: false));
            AlterColumn("dbo.Branches", "Address", c => c.String(nullable: false));
            AlterColumn("dbo.Vehicles", "Model", c => c.String(nullable: false));
            AlterColumn("dbo.Vehicles", "Manufactor", c => c.String(nullable: false));
            AlterColumn("dbo.Vehicles", "Description", c => c.String(nullable: false));
            AlterColumn("dbo.VehicleTypes", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Impressions", "Comment", c => c.String(nullable: false));
            AlterColumn("dbo.Services", "Name", c => c.String(nullable: false));
            AlterColumn("dbo.Services", "Logo", c => c.String(nullable: false));
            AlterColumn("dbo.Services", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Services", "Description", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Services", "Description", c => c.String());
            AlterColumn("dbo.Services", "Email", c => c.String());
            AlterColumn("dbo.Services", "Logo", c => c.String());
            AlterColumn("dbo.Services", "Name", c => c.String());
            AlterColumn("dbo.Impressions", "Comment", c => c.String());
            AlterColumn("dbo.VehicleTypes", "Name", c => c.String());
            AlterColumn("dbo.Vehicles", "Description", c => c.String());
            AlterColumn("dbo.Vehicles", "Manufactor", c => c.String());
            AlterColumn("dbo.Vehicles", "Model", c => c.String());
            AlterColumn("dbo.Branches", "Address", c => c.String());
            AlterColumn("dbo.Branches", "Picture", c => c.String());
            AlterColumn("dbo.AppUsers", "Email", c => c.String());
            AlterColumn("dbo.AppUsers", "FullName", c => c.String());
        }
    }
}
