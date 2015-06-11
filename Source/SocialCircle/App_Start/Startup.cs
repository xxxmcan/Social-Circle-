using Microsoft.Owin;
using Owin;

namespace SocialCircle
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
} 
