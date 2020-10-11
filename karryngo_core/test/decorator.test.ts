import { KarryngoConfigurationServiceFactory } from "../config/KarryngoConfigurationServiceFactory";
import { Controller,DBPersistence, Service } from "../decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../persistence/PersistenceManager.interface";

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
  class Greeter2 {    
    proper:PersistenceManager|any={};

    constructor(private config:KarryngoConfigurationServiceFactory,private man:any) { this.test()}
    test()
    {
       // console.log("class_for_configuration",this.config.getInstance());
        console.log("property value",this);

    }
  }
  

@DBPersistence()
class Greeter {
    
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
        //console.log("greeterdec",this);
    }
}
  
  
  console.log("gretter", new Greeter("mlkùmùmqlgk"));