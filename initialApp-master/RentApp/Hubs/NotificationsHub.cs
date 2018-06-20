using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using System.Timers;
using RentApp.Hubs;
using RentApp.Persistance;
using RentApp.Controllers;
using RentApp.Persistance.UnitOfWork;
using RentApp.Models.Entities;

namespace RentApp.Hubs
{
    //[Authorize(Roles = "Admin")]
    [HubName("notifications")]
    public class NotificationsHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<NotificationsHub>();

        private readonly IUnitOfWork unitOfWork;

        public NotificationsHub(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public void Hello()
        {
            string notActivated = AccountController.AccountCount.ToString();
            string notApproved = ServicesController.ServiceCount.ToString();

            string ret = String.Format(notActivated + ";" + notApproved);
            hubContext.Clients.Group("Admins").hello(ret);
        }

        public static void NotifyForUser(int accountNotifications)
        {
            hubContext.Clients.Group("Admins").receiveAccountNotification($"{accountNotifications}");
        }

        public static void NotifyForService(int serviceNotifications)
        {
            hubContext.Clients.Group("Admins").receiveServiceNotification($"{serviceNotifications}");
        }

        public override Task OnConnected()
        {
            //Ako vam treba pojedinacni User
            var identityName = Context.User.Identity.Name;

            Groups.Add(Context.ConnectionId, "Admins");

            //if (Context.User.IsInRole("Admin"))
            //{
            //    Groups.Add(Context.ConnectionId, "Admins");
            //}

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Groups.Remove(Context.ConnectionId, "Admins");

            //if (Context.User.IsInRole("Admin"))
            //{
            //    Groups.Remove(Context.ConnectionId, "Admins");
            //}

            return base.OnDisconnected(stopCalled);
        }
    }
}