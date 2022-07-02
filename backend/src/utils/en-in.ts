export const en = {
    controllers: {
        auth: {
            passwordAndEmailRequire: 'Please provide email and password!',
            incorrectPasswordOrEmail: 'Incorrect email or password',
            success: 'success',
            youAreNotLoggedIn: 'You are not logged in! Please log in to get access.',
            userBelongToThisTokenDeleted: 'The user belonging to this token does no longer exist.',
            userRecentlyChangedPassword: 'User recently changed password. Please login again.',
            unauthorized: 'You do not have permission to perform this action',
            emailDoesNotExist: 'There is no user with email address.',
            tokenSentToEmail: 'Token sent to email!',
            errorInSendingEmail: 'There was an error sending the email. Try again later!',
            tokenIsInvalid: 'Token is invalid or expired',
            yourCurrentPasswordIsIncorrect: 'Your current password is incorrect',
            accessDenied:'access denied',
            emailAccountCreated:"Account Has Created"
        },
        error: {
            invalid: 'Invalid',
            duplicateField1: 'Duplicate field value',
            duplicateField2: 'Please use another value!',
            invalidInput: 'Invalid input data. ',
            invalidToken: 'Invalid token. Please log in again!',
            tokenExpired: 'Your token has expired! Please log in again.',
            someThingWentWrong: 'Something went wrong!',
            tryAgainLater: 'Please try again later!',
            error: 'error',
            emptyNodeEnv : 'Node environement variable is empty!',

        },
        handlerFactory: {
            noDocumentFound: 'No document found with that ID',
            documentDeleted: 'Document deleted successfully',
            success: 'success',
        },
        user: {
            notAnImage: 'Not an image! Please upload only images.',
            noPasswordUpdates: 'This route is not for password updates. Please use /updateMyPassword.',
            routeIsNotDefined: 'This route is not defined! Please use /signup instead',
            success: 'success',
        },
        role:{
            routeIsNotDefined: 'This route is not defined! Please use /signup instead',
            success: 'success',
            roleExistInUser : "THis role already asing with user , can not  delete this role",
            roleAlreadyExist : "Role already exist",
            roleIdRequired : 'roleId is required',
            roleIsAssignedToUser : "This role is assigned to user , can not  delete this role",
        },
        permission:{
            permissionAlreadyExist: 'Permission already exist',
            success: 'success',
            permissionIdRequired : 'PermissionId is required',
            permissionNotFound : "Permission data not found",
            permissionCanNotDelete : "Permission can not delete because it already assigned to a role",
        },
        utils: {
            duplicateValueFound: 'Duplicate value found',
            duplicateValueNotFound: 'Duplicate value not found',

        },
        crop : {
            plzSendImage : 'Please send image',
            imageUploaded : 'Image uploaded successfully',
        },
        whatsapp : {
            notFound : 'Not found',
            msgSent : 'Message sent successfully',
            msgRecieved : 'Message received successfully',
            webHookVerified : 'Webhook verified successfully',
            msgNotSent : 'Message not sent',
        },
        cropType: {
            cropTypeExistInCrop: 'This crop type is already assigned to a crop. Please use another crop type.',
            success: 'success',
        },
        distillery: {
            distilleryExistInPurchase: 'This distillery is already assigned to a purchase. Please use another distillery.',
            success: 'success',
        },
        area : {
            areaNumberExistInArea: 'This area number is already assigned to an area. Please use another area number.',
            success: 'success',
        },
        purchase: {
            purchaseExistInPayment: 'This purchase is already assigned to a payment. Please use another purchase.',
            success: 'success',
        }
    },
    middleware: {

    },
    Headers: {

    },
    module: {
        insertFirstName: 'Please insert first name',
        insertLastName: 'Please insert last name',
        insertEmail: 'Please insert email',
        insertValidEmail: 'Please insert valid email',
        insertRole: 'Please insert role',
        insertRoleUniqueName : 'Please insert unique name',
        insertPassword: 'Please insert password',
        confirmPassword: 'Please confirm password',
        passwordNotSame: 'Password does not same',
        insertRoleName:'Please insert name',
        insertRoleSlug:'Please insert slug',
        insertPermissionName:'Please insert name',
        insertPermissionUniqueName:'Please insert unique name',
        insertStateName:'Please insert state name',
        insertDistrictName:'Please insert district name',
        insertCropName:'Please insert crop name',
        insertCropType:'Please insert crop type',
        insertCropImage:'Please insert crop image',
        insertFarmOwner:'Please insert farm owner',
        insertFarmOwnerName:'Please insert farm owner name',
        insertSurveyName:'Please insert survey name',
        insertSurveyQuestion: 'Please insert survey question',
        insertSurveyAnswerOptions: 'Please insert survey answer options',
        insertCropTypeName : 'Please insert crop type name',
        insertAreaName : 'Please insert area name',
        cropNameExist : 'Crop name already exist',
        insertPurchaseId : 'Please insert purchase id',
        insertDispatchDate : 'Please insert dispatch date',
        insertUserName : 'Please insert user name',
        insertFarmer : 'Please insert farmer',
        insertQuantity : 'Please insert quantity',
        insertQuality : 'Please insert quality',
        insertPricePerUnit: 'Please insert price per unit',
        insertInceptionDate : 'Please insert inception date',
        insertInceptionResult : 'Please insert inception result',
        insertRevisedPrice : 'Please insert revised price',
        insertPaymentMode : 'Please insert payment mode',
        insertPaymentStatus : 'Please insert payment status',
        insertDistilleryBatch : 'Please insert distillery batch',
        insertDeliveryDateToDistillery : 'Please insert delivery date to distillery',
        insertdistilleryOwnerId : 'Please insert distillery owner id',
        insertdistilleryBatchFor : 'Please insert distillery batch for',
        insertdistilleryBatchId : 'Please insert distillery batch id',
        insertMobileNumber : 'Please insert mobile number',
        insertCountyCode : 'Please insert county code',
        insertAreaId : 'Please insert area id',
    },
    utils: {
        apiFeatures: {

        },
        appFeatures: {
            fail:"fail",
            error:'error',
        },
        emails: {
            welcomeFamily: 'Welcome to the abc Family!',
            welcome: 'welcome',
            passwordResetToken: 'Your password reset token (valid for only 10 minutes)',
            passwordReset: 'passwordReset'
        }
    },
    routes: {

    },

    rateLimit : {
        message: "Too many requests from this IP, please try again in an hour!",
    },

    uncaughtException:{
        processName:"uncaughtException",
        message:"UNCAUGHT EXCEPTION!  Shutting down..."
    },
    unhandledRejection:{
        processName:"unhandledRejection",
        message:"UNHANDLED REJECTION!  Shutting down..."
    },
    SIGTERM:{
        processName:"SIGTERM",
        receivedErrMsg:" SIGTERM RECEIVED. Shutting down gracefully",
        terminatedErrMsg:" Process terminated!"
    } ,
    dbConnSuccessMsg:"DB connection successful!",
    serverListenMsg:"App running on port",
    helloWorld:'<h1>Hello from Node Boiler-plate!</h1>',
}