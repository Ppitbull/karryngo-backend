import { KarryngoConfigurationServiceFactory } from "../config/KarryngoConfigurationServiceFactory";
import { Controller, Service } from "../decorator/dependecy_injector.decorator";

@Service()
class Personigir
{
    private con:String;
    constructor()
    {
        this.con="ésdqfqs";
        console.log(this.con);
    }
}
  
  @Controller()
  class Greeter {
    property = "property";
    constructor(private config:KarryngoConfigurationServiceFactory) { this.test()}
    test()
    {
        console.log("class_for_configuration",this.config.getInstance())
    }
  }
  
  //console.log("gretter", new Greeter());