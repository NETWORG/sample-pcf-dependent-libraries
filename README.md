# Dependent libraries in PCF
* https://learn.microsoft.com/en-us/power-apps/developer/component-framework/dependent-libraries
* https://learn.microsoft.com/en-us/power-apps/developer/component-framework/tutorial-use-dependent-libraries?tabs=after

## Building the demo
Deploy using [pac](https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction?tabs=windows):

```pwsh
cd solution
dotnet build
pac solution import -env https://<env> -f -pc
```