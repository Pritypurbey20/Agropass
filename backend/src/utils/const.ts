export const constVariable = {
    HTTP: {
        OK: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NOCONTENT: 204,
        MOVED: 301,
        BADREQUEST: 400,
        UNAUTHORIZED: 401,
        NOTFOUND: 404,
        FORBIDDEN:403,
        SERVERERROR: 500,
        HTTPS:"https",
        XFORWARDEDPROTO:"x-forwarded-proto",
        BEARER:"Bearer",
        METHOD:{
            PUT:"PUT",
            POST:"POST",
            PATCH:"PATCH",
            GET:"GET",
            DELETE:"DELETE"
        }
    },
    IMAGEQUALITY: 90,
    JSONLIMIT:"1000kb",
    USERIMAGEFILEPATH:"public/img/users/",
    GLOBALERRORHANDLER:{
        DEVELOPMENT:"development",
        PRODUCTION:"production",
        CASTERROR:"CastError",
        MONGODUPLICATEKEY:"MongoError",
        VALIDATIONERROR:"ValidationError",
        JSONWEBTOKENERROR:"JsonWebTokenError",
        TOKENEXPIREDERROR:"TokenExpiredError",
    },
    RATELIMIT:{
        MAX: 10000,
        WINDOWMS: 60 * 60 * 1000,
    },
    HPPWHITELIST:['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'],
    PORT:5000,
    JWTEXPIREDINTIME:24 * 60 * 60 * 1000,
    HASH:{
        SHA256:"sha256",
        HEX:"hex"
    },
    FORMAT :{
        DATE : 'YYYY-MM-DD HH:mm:ss',
        DATEPATTERN : 'YYYY-MM-DD',
        LEVEL_DEBUG : 'debug',
        LEVEL_ERROR : 'error',
        FILENAME : `%DATE%.log`,
        MAXFILESLENGTH : 30

    },
    EXCLUDEDFIELS : ['page', 'sort', 'limit', 'fields','search','modelName'],
    QUERYSTR : /\b(gte|gt|lte|lt)\b/g,

    PASSWORD_RESET_EXPIRATION: Date.now() + 10 * 60 * 1000,
    EXPIRETIME : '2d',
    EMAIL_SERVICE : 'gmail',
    MORGAN_LOG_FORMAT:'[:user|:remote-addr] ":method :url HTTP/:http-version" :status :response-time ms',
    FIRSTNAME : 'firstName',
    LASTNAME : 'lastName',
    TOKEN : 'EAAFPcCEAaP4BAGQGZCZA8oaJAJnmZAZABZA3zPc11f2Nhj10Cn2ItkRa0kDXaZCgKQCbXyDb2qGu4ft0V6Xjn6FPbDsJzz9ElX31bpyEZCoTZCdZCyDkufPwk6yPNzJzxq9Lz6E7ZAVtglo6p9qZBOrQIlNaEkiIY392flMuv4yN7fWTLVgngUa1r6ZASsro1782OXxBDAUvZAp13ulyR4oxynZAwT',
    WHATSAPP_API_URL : 'https://graph.facebook.com/v13.0/108504781896857/messages'
}