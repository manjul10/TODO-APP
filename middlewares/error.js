class ErrorHandler extends Error{


    constructor(message, statuscode){
        super(message);
        this.statuscode= statuscode;
    }
}

export const errorMiddleware = (err,req,res,next)=>{
  
err.message = err.message || "Internal server Error";
err.statuscode = err.statuscode || 500;



    res.status(err.statuscode).json({
        success:false,
        message:err.message,
    });
} 


export default ErrorHandler;