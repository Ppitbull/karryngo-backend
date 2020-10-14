export class Email
{
    private sender:String="";
    private receiver:String="";
    private cc:String[]=[];
    
    from(userFrom:String):Email
    {
        return this;
    }
    to(userTo:String):Email
    {
        return this;
    }
    cc(ccUser:String):Email
    {
        return this;
    }
    title(titleMail:String):Email
    {
        return this;
    }
    htmlContent(content:String):Email
    {
        return this;
    }
    textContent(content:String):Email
    {
        return this;
    }
    fileContent(file:any):Email
    {
        return this;
    }
    
}