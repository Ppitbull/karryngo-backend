import * as assert from 'assert';
import { JsonFileConfigurationService } from '../config/JsonFileConfigurationService';



var chai=require('chai');

describe('Test du service de configuration',()=>
{
    let jsonConfig=new JsonFileConfigurationService();
    describe('test des cles',()=>
    {
        it('app key should exist',()=>{
            chai.expect(jsonConfig.keyExist('app_name')).to.be.true;
        });
        it("app name is well defined",()=>
        {
            chai.expect(jsonConfig.getValueOf('app')).to.equal('karryngo');
        });
        it('app name change to kar',()=>
        {
            jsonConfig.setValueOf('app_name',"kar");
            chai.expect(jsonConfig.getValueOf('app')).to.equal('kar');
        });

        it('saving file without throw error',()=>
        {
            chai.expect(()=>jsonConfig.save()).to.not.throw();
        })
    });
    
});