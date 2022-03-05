var Configuration=
{
    "app_config_file":"./config-files/app.json",
    "file_config_type":'json',
    'class_for_configuration':"/karryngo_core/config/JsonFileConfigurationService",
    'path_for_module':"./karryngo_module",
    'path_for_bussiness_module':"./karryngo_modules/bussiness",
    'path_for_bussiness_service': "./karryngo_modules/services",
    'api_for_payement':'toupesu',
    'collections':{
        'notification':'Notifications',
        'user':'Users',
        'provider':'ProviderService',
        'requestservice':'RequestService',
        'chat':'Chats',
        'tokens':"Tokens"
    },
    'env_mode':"dev_mode"
    //  'env_mode':"prod_mode"
};
export default Configuration;