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
        //console.log(this.con);
    }
}
  
  class Greeter2 {    
    @DBPersistence() proper:PersistenceManager;

    constructor() { this.test()}
    test()
    {
       // console.log("class_for_configuration",this.config.getInstance());
       console.log("property value",this.proper);

    }
  }
  

class Greeter {
    
  @DBPersistence()
    property;
    hello: string;
    protected db="klhjlhjpj";
    constructor(m: string) {
        this.hello = m;
    }
    test()
    {
      //console.log("persisz",this.db);
    }
}
  
  
  let g= new Greeter2();
  g.test();

