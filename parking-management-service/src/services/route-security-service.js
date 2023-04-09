const JwtService = require('./jwt-service')
const UserRole = require('../constants/role-constant')
const ApiResponse = require('../utils/api-response')

function autherizeRouteForAdminUser(req, res, next){
    authUserRole(req, res, next, UserRole.ADMIN)    
}
function autherizeRouteForBusinessUser(req, res, next){
    authUserRole(req, res, next, [UserRole.BUSINESS_OWNER,UserRole.ADMIN])    
}

function autherizeRouteForAttendant(req, res, next){
    authUserRole(req, res, next, [UserRole.BUSINESS_OWNER,UserRole.ADMIN, UserRole.ATTENDANT])    
}

function authUserRole(req, res, next, ...roles){
    try {
        const jwt = (req.headers['AuthToken'] || req.headers['authtoken'])? (req.headers['AuthToken'] || req.headers['authtoken']).split(' ')[1] : null;
        if(!jwt){
            res.status(401)
            res.send(new ApiResponse(401, `Authentication failed!`, null, null))
            return
        }
        let userDetails = JwtService.decodeJWT(jwt);
        if(!roles.join().includes(userDetails.role)){
            res.status(403)
            res.send(new ApiResponse(403, `User not authorize!`, null, null))
            return
        }
        req['user'] = userDetails;
        next()    
    } catch (error) {
        res.status(401)
        res.send(new ApiResponse(401, `Authentication failed!`, null, null))
    }
}
module.exports={
    autherizeRouteForBusinessUser, autherizeRouteForAttendant, autherizeRouteForAdminUser
}