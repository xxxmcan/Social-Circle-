using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SocialCircle.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult Ana()
        {
            return PartialView();
        }

        public PartialViewResult Giris()
        {
            return PartialView();
        }
    }

}

[HubName("hubProxy")]
public class SocialCircleHub : Hub
{
    public override async System.Threading.Tasks.Task OnConnected()
    {
        await Clients.All.addMassage("Sistem", "Giriş");
    }

    public void SendMessage(string from, string message)
    {
        Clients.All.addMassage(from, message);
    }
}

