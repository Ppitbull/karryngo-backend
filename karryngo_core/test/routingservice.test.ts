import * as assert from 'assert';
import { KarryngoConfigurationServiceFactory } from '../config/KarryngoConfigurationServiceFactory';
import { RouterService } from '../routing/RouterService';
import * as express from 'express';
var chai=require('chai');

describe('Test du service de routage',()=>
{
    let jsonConfigFactory=new KarryngoConfigurationServiceFactory();
    let router=new RouterService(jsonConfigFactory.getInstance(),express.Router());
    it("test de la liste des routes",()=>
    {
        chai.expect(router.getRouteList()).to.be.a("array");
    });  
    it("test de la contenance de l'url de test",()=>
    {
        chai.expect(router.getRouteList()[0].url).to.equal("/api/truc");
    });
    it("test de la non existance d'un url: dois lancer une exception",()=>
    {
        chai.expect(()=>router.getRouteByUrl('/api/non_exist')).to.throw();
    });
    it("test de la contenance de la methode get dans l'url de test",()=>
    {
        chai.expect(()=>router.getRouteByUrl("/api/truc")).to.not.throw();
        chai.expect(router.getRouteByUrl("/api/truc").getMethodList()).to.contain("get");
    })
    it("test de la contenance de l'action associer a la methode get",()=>
    {
        chai.expect(()=>router.getRouteByUrl("/api/truc").getActionForMethod("get")).to.not.throw();
    });

    it("test de lancement d'instanciation et d'appel de fonction de la metode run",()=>
    {
        router.run();
        console.log("Router Service ",router);
    })
});;