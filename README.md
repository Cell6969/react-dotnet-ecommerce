# Dotnet

## Step by step command:

### Initiate Project
1. Create sln file
```shell
dotnet new sln
```
2. create minimal api
```shell
dotnet new webapi -n api -controllers
```

3. add api to solution
```shell
dotnet sln add api
```

### Run Application
for run
```shell
cd api && dotnet run
```

for hot reload / development mode
```shell
dotnet watch
```

### Config for https
for make host trusted https from dotnet
```shell
dotnet dev-certs https --trust
```

### Dotnet ef tool
1. install ef tool
```shell
dotnet tool install --global dotnet-ef --version 9.0.1
```
2. create migration
```shell
dotnet ef migrations add InitialCreate -o Data/Migrations
```
3. run migration
```shell
dotnet ef database update
```