export class Email
{
    private sender:String="";
    private receiver:String="";
    private otherReceiver:String[]=[];
    private text:String="";
    private file:String="";
    private html:String="";
    private subject:String="";

    from(userFrom:String):Email
    {
        this.sender=userFrom;
        return this;
    }
    to(userTo:String):Email
    {
        this.receiver=userTo;
        return this;
    }
    cc(ccUser:String):Email
    {
        this.otherReceiver.push(ccUser);
        return this;
    }
    title(titleMail:String):Email
    {
        this.subject=titleMail;
        return this;
    }
    htmlContent(content:String):Email
    {
        this.html=content;
        return this;
    }
    textContent(content:String):Email
    {
        this.text=content;
        return this;
    }
    fileContent(file:any):Email
    {
        this.file=file;
        return this;
    }
    toString()
    {
        return {
            from:this.sender.toString(),
            to:this.receiver.toString(),
            subject:this.subject.toString(),
            text:this.text.toString(),
            file:this.file.toString(),
            html:this.html.toString(),
            cc:this.otherReceiver.join(";").toString()
        }
    }
    
}