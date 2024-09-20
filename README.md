# QuoLike
## Technology stack that was used
> **Backend:** ASP.NET Core Web API, C#, Entity Framework Core, ASP.NET Core Identity, SendGrid, Secret Manager tool.

> **Patterns:** Repository, Options, Dependency Injection.

> **Frontend:** React, React Router, react-paginate, JavaScript, Bootstrap, HTML, CSS.

## Publish steps
- Check docker-compose
- Set your SendGridKey and SendGridFromEmail
- Create or use existing SSL certs with the following names (u can change if you want to)
	- name for vite.config.js => quolike.client.pem, quolike.client.key
	- name for asp env variable => QuoLike.Server.pfx
		- if generated by VS => find pwd in user-secrets
		- set ASPNETCORE_Kestrel__Certificates__Default__Password
- docker-compose -f docker-compose.yml up

## Screenshots
![welcome][1]
![login][2]
![all][3]
![profile][4]
![profile_password][5]
![delete_account][6]

[1]: Screenshots/welcome.png "welcome"
[2]: Screenshots/login.png "login"
[3]: Screenshots/all.png "all"
[4]: Screenshots/profile.png "profile"
[5]: Screenshots/profile_password.png "profile_password"
[6]: Screenshots/delete_account.png "delete_account"