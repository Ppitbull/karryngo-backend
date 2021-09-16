import { Request, Response } from "express";
import Configuration from "../../../../config-files/constants";
import { Controller, DBPersistence } from "../../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { TransportServiceTypeState } from "../../service/entities/transportservicetype";

@Controller()
export class RapportService
{
    @DBPersistence()
    db:PersistenceManager; 

    getServiceListByTime(request:Request, response:Response)
    {
        let state = request.params.state || "all";
        let period = request.params.period || "all";
        let time = request.params.time || "all";

        let findQuery=[];
        if(state!="all")
        {
            findQuery.push(
                {
                    $unwind:"$transactions"
                },
                {
                    $match:
                    {
                        $or:
                        [
                            {state},
                            {
                                $expr:
                                {
                                    $eq:["$idSelectedTransaction","$transactions._id"]
                                },
                                "transactions.state":state
                            }
                        ]
                    }
                }
            )
        }
        if(period!="all" && time!="all")
        {
            findQuery.push(
                {
                    $addFields:
                    {
                        pubConvertDate:
                        {
                            $toDate:"$publicationDate"
                        }
                    }
                },
                {
                  $addFields:
                  {
                      dateValue:
                      [
                        {
                            value:{$year:"$pubConvertDate"},
                            period:"year"
                        },
                        {
                            value:{$month:"$pubConvertDate"},
                            period:"month"
                        },
                        {
                            value:{$dayOfMonth:"$pubConvertDate"},
                            period:"day"
                        },
                      ]
                  }  
                },
                {
                    $match:
                    {
                        "dateValue.period":period,
                        "dateValue.value":parseInt(time)
                    }
                },
                {
                    $unset:["dateValue","pubConvertDate"]
                }
            )
        }

        this.db.findDepthInCollection(Configuration.collections.requestservice,findQuery)
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"List of services",
                result:result.result.map((service)=>{
                    let ser=service;
                    ser.transactions=[service.transactions];
                    return ser;
                })
            })
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
        
    }
    getServicePriceByTime(request:Request, response:Response)
    {
        let state = request.params.state || "";
        let period = request.params.period || "all";
        let time = request.params.time || "all";

        let findQuery=[];
        if(state=="" || state==TransportServiceTypeState.SERVICE_INIT_STATE || state==TransportServiceTypeState.SERVICE_IN_DISCUSS_STATE)
        {
           return response.status(400).json({
               resultCode:ActionResult.INVALID_ARGUMENT,
               message:"Invalid service state parameter"
           })
        }
        
        findQuery.push(
            {
                $unwind:"$transactions"
            },
            {
                $match:
                {
                    $or:
                    [
                        {state},
                        {
                            $expr:
                            {
                                $eq:["$idSelectedTransaction","$transactions._id"]
                            },
                            "transactions.state":state
                        }
                    ]
                }
            }
        );

        if(period!="all" && time!="all")
        {
            findQuery.push(
                {
                    $addFields:
                    {
                        pubConvertDate:
                        {
                            $toDate:"$publicationDate"
                        }
                    }
                },
                {
                  $addFields:
                  {
                      dateValue:
                      [
                        {
                            value:{$year:"$pubConvertDate"},
                            period:"year"
                        },
                        {
                            value:{$month:"$pubConvertDate"},
                            period:"month"
                        },
                        {
                            value:{$dayOfMonth:"$pubConvertDate"},
                            period:"day"
                        },
                      ]
                  }  
                },
                {
                    $match:
                    {
                        "dateValue.period":period,
                        "dateValue.value":parseInt(time)
                    }
                },
                {
                    $unset:["dateValue","pubConvertDate"]
                },                
            )
        }

        findQuery.push(
            {
                $project:
                {
                    total:
                    {
                        $toInt:"$suggestedPrice"
                    }
                }
            },
            {
                $group:
                {
                    _id:null,
                    count:
                    {
                        $sum:1
                    },
                    total:
                    {
                        $sum:"$total"
                    }
                }
            }
        )

        this.db.findDepthInCollection(Configuration.collections.requestservice,findQuery)
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Price of services according to parameters",
                result:{
                    numberOfService:result.result[0].count,
                    price:result.result[0].total
                }
            })
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
        
    }

    getServices(request: Request, response: Response) 
    {
        let state = request.params.state || "all"
        let period = request.params.period || "all"
        let time = request.params.time || "all"
        let userid = request.params.idUser || ""
        let type = request.params.type || ""
        
        let findQuery = []

        if (userid == "")
        {
            return response.status(400).json({
                resultCode: ActionResult.INVALID_ARGUMENT,
                message: "Invalid User parameter"
            })
        }

        if (type == "provider")
        {
            findQuery.push(
                {
                    $match:
                    {
                        "idSelectedProvider": userid
                    }
                }
            )
        }

        else if (type == "requester")
        {
            findQuery.push(
                {
                    $match:
                    {
                        "idRequester": userid
                    }
                }
            )
        }

        else 
        {
            return response.status(400).json({
                resultCode: ActionResult.INVALID_ARGUMENT,
                message: "Invalid type parameter"
            })
        }

        if (state != "all")
        {
            findQuery.push(
                {
                    $match:
                    {
                        "state": state
                    }
                }
            )
        }
    
        if (period != "all" && time != "all")
        {
            findQuery.push(
                {
                    $addFields:
                    {
                        pubConvertDate:
                        {
                            $toDate: "$publicationDate"
                        }
                    }
                }, 
                {
                    $addFields:
                    {
                        dateValue:
                        [
                          {
                              value:{$year:"$pubConvertDate"},
                              period:"year"
                          },
                          {
                              value:{$month:"$pubConvertDate"},
                              period:"month"
                          },
                          {
                              value:{$dayOfMonth:"$pubConvertDate"},
                              period:"day"
                          },
                        ]
                    }
                }, 
                {
                    $match:
                    {
                        "dateValue.period": period,
                        "dateValue.value": parseInt(time) 
                    }
                }, 
                {
                    $unset: ["dateValue", "pubConvertDate"]
                }
            )
        }
        
        this.db.findDepthInCollection(Configuration.collections.requestservice,findQuery)
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message: type == "provider" ? "List of provided services" : "List of Requested services",
                result: result
            })
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
    }  
}