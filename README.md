# Dependent libraries in PCF
* https://learn.microsoft.com/en-us/power-apps/developer/component-framework/dependent-libraries
* https://learn.microsoft.com/en-us/power-apps/developer/component-framework/tutorial-use-dependent-libraries?tabs=after

* **DEMO Environment**: https://hajekj.crm4.dynamics.com/main.aspx?appid=25ee6e64-ced3-4b7e-b70c-25c1f52c4495&pagetype=entityrecord&etn=hajekj_pcfdependentlibraries&formid=5b703b50-f315-f011-998a-7c1e5275cfe9

## Building the demo
```
cd solution
dotnet build
pac solution import -env https://hajekj.crm4.dynamics.com -f -pc
```