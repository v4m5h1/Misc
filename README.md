 #Misc

---

Here's a step-by-step guide to create the `SPOContentAPI` solution and `SPOContentAPI.Web` project with the specified requirements using Visual Studio 2022 Professional.

### Step 1: Create a New Solution

1. Open **Visual Studio 2022 Professional**.
2. Go to **File** > **New** > **Project**.
3. Select **ASP.NET Core Web API** and click **Next**.
4. Name your project `SPOContentAPI.Web` and choose a location. Click **Next**.
5. Choose the **.NET Core** and **ASP.NET Core 6.0 (or later)** framework. Click **Create**.

### Step 2: Create Folder Structure

1. In the **Solution Explorer**, right-click on the project name `SPOContentAPI.Web`.
2. Select **Add** > **New Folder** and create the following folders:
    - `Common`
    - `Models`
    - `Repositories`
    - `Resources`
    - `Services`

### Step 3: Add Program.cs and Startup.cs

1. By default, a new ASP.NET Core project comes with a `Program.cs` file.
2. Add a `Startup.cs` file manually:
   - Right-click on the project name in **Solution Explorer**.
   - Select **Add** > **New Item**.
   - Choose **Class**, name it `Startup.cs`, and click **Add**.

### Step 4: Configure Program.cs

Edit the `Program.cs` file to use `Startup.cs`:

```csharp
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace SPOContentAPI.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
```

### Step 5: Configure Startup.cs

Edit the `Startup.cs` file to include necessary services, logging, Swagger, and configurations:

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SPO.OD.Utilities; // Reference to external solution

namespace SPOContentAPI.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSingleton<IExampleService, ExampleService>(); // Example of AddSingleton service
            services.AddScoped<IValidateSiteUrlService, ValidateSiteUrlService>(); // Add scoped service
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "SPOContentAPI", Version = "v1" });
            });

            // Add logging
            services.AddLogging();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SPOContentAPI v1");
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    // Example service interface and implementation
    public interface IExampleService
    {
        string GetData();
    }

    public class ExampleService : IExampleService
    {
        public string GetData()
        {
            return "This is example data.";
        }
    }
}
```

### Step 6: Implement Logging and API Endpoint

1. Add a `Logger.cs` file in the `Common` folder for logging:

```csharp
namespace SPOContentAPI.Web.Common
{
    public static class Logger
    {
        public static void Info(string message)
        {
            // Log information
            Console.WriteLine($"Info: {message}");
        }
    }
}
```

2. Add a `ValidateSiteUrlService.cs` file in the `Services` folder:

```csharp
using SPO.OD.Utilities; // Reference to external solution
using SPOContentAPI.Web.Common;

namespace SPOContentAPI.Web.Services
{
    public interface IValidateSiteUrlService
    {
        bool ValidateSiteUrl(string url);
    }

    public class ValidateSiteUrlService : IValidateSiteUrlService
    {
        public bool ValidateSiteUrl(string url)
        {
            // Implement validation logic using GraphServiceClient
            var graphClient = utility.spohelper.GetGraphServiceClient();
            Logger.Info($"Validating site URL: {url}");
            // Perform validation
            return true; // Example result
        }
    }
}
```

3. Add a `ValidateSiteUrlController.cs` file in the `Controllers` folder:

```csharp
using Microsoft.AspNetCore.Mvc;
using SPOContentAPI.Web.Services;

namespace SPOContentAPI.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValidateSiteUrlController : ControllerBase
    {
        private readonly IValidateSiteUrlService _validateSiteUrlService;

        public ValidateSiteUrlController(IValidateSiteUrlService validateSiteUrlService)
        {
            _validateSiteUrlService = validateSiteUrlService;
        }

        [HttpGet("validatesiteurl")]
        public IActionResult ValidateSiteUrl(string url)
        {
            if (string.IsNullOrEmpty(url))
            {
                return BadRequest("URL is required.");
            }

            bool isValid = _validateSiteUrlService.ValidateSiteUrl(url);
            if (isValid)
            {
                return Ok("URL is valid.");
            }
            else
            {
                return BadRequest("Invalid URL.");
            }
        }
    }
}
```

### Step 7: Build and Run the Project

1. Right-click on the solution name `SPOContentAPI` in **Solution Explorer**.
2. Select **Add** > **Existing Project** and add the `SPO.OD.Utilities` project to the solution.
3. Ensure that `SPOContentAPI.Web` references `SPO.OD.Utilities`.
   - Right-click on `SPOContentAPI.Web` > **Add** > **Reference** > **Projects** > **SPO.OD.Utilities**.

4. Build the solution by selecting **Build** > **Build Solution**.
5. Run the project by pressing **F5** or selecting **Debug** > **Start Debugging**.

With these steps completed, your .NET Core API project should be set up with the required structure, logging, Swagger, and the specified API endpoint. The project should run without errors, and you can test the `/api/validatesiteurl` endpoint using Swagger or a tool like Postman.
