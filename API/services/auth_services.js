const sql = require('../mysqlConnect');
const locationServices = require('./route_services');
const jwt = require('jsonwebtoken');
// Function to insert signup details into the table
async function insertSignupDetails(ctx) {
    let localDetails;
    polyRoute = await locationServices.getRoute(ctx.request.body.location, 'Chennai One IT SEZ, Pallavaram, Chennai');
    console.log(polyRoute.overview_polyline.points); 
    let userDetails = {
        user_name: ctx.request.body.user_name,
        user_nt_id: ctx.request.body.user_nt_id,
        mobile_number: ctx.request.body.mobile_number,
        location: ctx.request.body.location,
        user_type_id: ctx.request.body.user_type_id
    }
    console.log(userDetails);
    let response = await sql.sqlConnection(`INSERT INTO user_details (user_name, user_nt_id, mobile_number, location, user_type_id, trip_route) VALUES (?, ?, ?, ?, ?, ?)`, [userDetails.user_name, userDetails.user_nt_id, userDetails.mobile_number, userDetails.location, userDetails.user_type_id, null]);
    if(response.affectedRows>0){
        console.log('User details inserted successfully, Adding credentials');
        let credentials = {
            user_id: ctx.request.body.user_nt_id,
            passphrase: ctx.request.body.passphrase
        }
        let credentialsResponse = await sql.sqlConnection(`INSERT INTO user_credentials (user_id, passphrase)
        VALUES ((SELECT id FROM user_details WHERE user_nt_id = ?), ?)`, [credentials.user_id, credentials.passphrase]);
        if(credentialsResponse.affectedRows>0){
            console.log('Credentials inserted successfully');
            if(userDetails.user_type_id == 1){
                polyRoute = await locationServices.getRoute(ctx.request.body.location, 'Chennai One IT SEZ, Pallavaram, Chennai');
                polyCode = polyRoute.overview_polyline.points;
                let polyResponse = await sql.sqlConnection(`UPDATE user_details SET trip_route = ? WHERE user_nt_id = ?`, [polyCode, userDetails.user_nt_id]);
                console.log(polyResponse);
                if(true){
                    console.log('Polyline code inserted successfully');
                    let vehicleDetails = {
                        vehicle_number: ctx.request.body.vehicle_number,
                        vehicle_type: ctx.request.body.vehicle_type,
                        vehicle_model: ctx.request.body.vehicle_model,
                        number_of_seats: ctx.request.body.number_of_seats,
                        user_nt_id: ctx.request.body.user_nt_id,
                        vehicle_color: ctx.request.body.vehicle_color,
                        vehicle_make: ctx.request.body.vehicle_make
                    }
                    console.log(vehicleDetails);
                    let vehicleResponse = await sql.sqlConnection(`INSERT INTO vehicle_details (vehicle_number, vehicle_type_id, model, color, make, number_of_seats, vehicle_owner)
                    VALUES (?, (SELECT id FROM vehicle_type WHERE LOWER(vehicle_type)=?), ?, ?, ?, ?, (SELECT id FROM user_details WHERE user_nt_id = ?))`,[vehicleDetails.vehicle_number, vehicleDetails.vehicle_type, vehicleDetails.vehicle_model, vehicleDetails.vehicle_color, vehicleDetails.vehicle_make, vehicleDetails.number_of_seats, userDetails.user_nt_id]);
                    if(vehicleResponse.affectedRows>0){
                        console.log('Vehicle details inserted successfully');
                    }
                    else{
                        console.log('Error in inserting vehicle details');
                    }
                }
        }}
    }
    else{
        console.log('Error in inserting user details');
    }   
    ctx.body = 'Sign up successful';
    ctx.status = 200;
    
}

async function authenticateUser(ctx) {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    const query = `SELECT passphrase FROM user_credentials WHERE user_id = (SELECT id FROM user_details WHERE user_nt_id = '${username}')`;
    // Execute the query
    let results = await sql.sqlConnection(query, []);
    if(results.length>0){
        if(results[0].passphrase === password){
            const query = `SELECT user_name, user_nt_id, mobile_number, location, user_type_id FROM user_details WHERE user_nt_id = '${username}'`;
            let results = await sql.sqlConnection(query, []);
            ctx.body = {
                message: 'Login successful',
                token: createJWT(results[0])
            };
            ctx.status = 200;
        }
        else{
            ctx.body = 'Login failed';
            ctx.status = 401;
        }
    }
}
async function startRide(ctx){
    //trip type 1 dentoes towards office
    //trip type 2 denotes towards home
    let userDetails;
    if(ctx.request.header['authorization']) {
        console.log('Authorization header found');
        let token = ctx.request.header['authorization'];
        console.log(token);
        let decoded = decryptJWT(token);
        userDetails = decoded;
        console.log(decoded);
        if(decoded){
            console.log('User is authorized to perform this operation');
        }
        else{
            console.log('User is not authorized to perform this operation');
            ctx.body = 'User is not authorized to perform this operation';
            ctx.status = 401;
            return;
        }
    }
    let rideDetails={
        user_nt_id: userDetails.user_nt_id,
        trip_type: ctx.request.query.trip_type,
    }

    let startRideResponse = await sql.sqlConnection(`INSERT INTO vehicle_trips   (pilot_id, vehicle_id, trip_start_location, trip_type, trip_status)
    VALUES ((SELECT id FROM user_details WHERE user_nt_id = ?),(SELECT id FROM vehicle_details WHERE vehicle_owner = (SELECT id FROM user_details where user_nt_id = ? )),(SELECT location FROM user_details WHERE user_nt_id = ?),?, 'IN_PROGRESS')`,[rideDetails.user_nt_id, rideDetails.user_nt_id, rideDetails.user_nt_id, rideDetails.trip_type]);
    if(startRideResponse.affectedRows>0){
        console.log('Ride started successfully');
        ctx.body = 'Ride started successfully';
        ctx.status = 200;
    }
}
async function endRide(ctx){
    let userDetails;
    if(ctx.request.header['authorization']) {
        console.log('Authorization header found');
        let token = ctx.request.header['authorization'];
        let decoded = decryptJWT(token);
        userDetails = decoded;
        if(decoded){
            console.log('User is authorized to perform this operation');
        }
        else{
            console.log('User is not authorized to perform this operation');
            ctx.body = 'User is not authorized to perform this operation';
            ctx.status = 401;
            return;
        }
    }
    let rideDetails={
        user_nt_id: userDetails.user_nt_id,
        trip_type: ctx.request.body.trip_type
    }
    let endRideResponse = await sql.sqlConnection(`INSERT INTO vehicle_trips   (pilot_id, vehicle_id, trip_start_location, trip_type, trip_status)
    VALUES ((SELECT id FROM user_details WHERE user_nt_id = ?),(SELECT id FROM vehicle_details WHERE vehicle_owner = ?),(SELECT location FROM user_details WHERE user_nt_id = ?),?, 'IN_PROGRESS')`, [rideDetails.user_nt_id, rideDetails.user_nt_id, rideDetails.user_nt_id, rideDetails.trip_type]);
    if(endRideResponse.affectedRows>0){
        console.log('Ride ended successfully');
        ctx.body = 'Ride ended successfully';
        ctx.status = 200;
    }
}
async function getAvailableRides(ctx){
    let userDetails;
    if(ctx.request.header['authorization']) {
        console.log('Authorization header found');
        let token = ctx.request.header['authorization'];
        let decoded = decryptJWT(token);
        userDetails = decoded;
        console.log(decoded);
        if(decoded){
            console.log('User is authorized to perform this operation');
        }
        else{
            console.log('User is not authorized to perform this operation');
            ctx.body = 'User is not authorized to perform this operation';
            ctx.status = 401;
            return;
        }
    }
    let user_nt_id = userDetails.user_nt_id;
    let userLocation = await sql.sqlConnection(`SELECT location FROM user_details WHERE user_nt_id = ?`,[user_nt_id]);
    let userLocationCoordinates = await locationServices.getGeolocation(userDetails.location);
    let trip_type = ctx.request.query.trip_type;
    let availableRides = await sql.sqlConnection(`SELECT vt.id, user_name, mobile_number,user_nt_id, vehicle_number, trip_route, make, color, model, available_seats
    FROM   vehicle_trips vt
    JOIN   current_available_vehicles cav
    ON     vt.id = cav.trip_id
    JOIN   user_details ud
    ON 	   ud.id = vt.pilot_id
    JOIN   vehicle_details vd
    ON     vd.id = vt.vehicle_id
    WHERE  vt.trip_status = 'IN_PROGRESS'
    AND    trip_type = ?
    AND    cav.available_seats > 0;`,[trip_type]);
    let Responseresult=[];
    console.log(availableRides);
    for(i in availableRides){
        let result = locationServices.getIsLocationOnEdge(availableRides[i].trip_route, userLocationCoordinates, 0.0001);
        console.log(result);
        for(j of Object.keys(result)){
            if(result[j]){
                console.log('Match found');
                Responseresult.push(availableRides[i]);
            }
        }
    }
    ctx.body = Responseresult;
    ctx.status = 200;

}

async function requestRide(ctx){
    let userDetails;
    if(ctx.request.header['authorization']) {
        console.log('Authorization header found');
        let token = ctx.request.header['authorization'];
        let decoded = decryptJWT(token);
        userDetails = decoded;
        console.log(decoded);
        if(decoded){
            console.log('User is authorized to perform this operation');
        }
        else{
            console.log('User is not authorized to perform this operation');
            ctx.body = 'User is not authorized to perform this operation';
            ctx.status = 401;
            return;
        }
    }
    let requestDetails = {
        pilot_id: ctx.request.body.pilot_id,
        user_nt_id: userDetails.user_nt_id
    }
    let requestResponse = await sql.sqlConnection(`INSERT INTO trip_request_queue (trip_id, pilot_id, passenger_id)
    VALUES ((SELECT id FROM vehicle_trips WHERE trip_status = 'IN_PROGRESS' AND pilot_id = (SELECT id FROM user_details WHERE user_nt_id = ?)),
            (SELECT id FROM user_details WHERE user_nt_id = ?),
            (SELECT id FROM user_details WHERE user_nt_id = ?))`,[requestDetails.pilot_id, requestDetails.pilot_id, requestDetails.user_nt_id]);
    if(requestResponse.affectedRows>0){
        console.log('Request sent successfully');
        ctx.body = 'Request sent successfully';
        ctx.status = 200;
    }
}
async function acceptRide(ctx){
    let userDetails;
    if(ctx.request.header['authorization']) {
        console.log('Authorization header found');
        let token = ctx.request.header['authorization'];
        let decoded = decryptJWT(token);
        userDetails = decoded;
        console.log(decoded);
        if(decoded){
            console.log('User is authorized to perform this operation');
        }
        else{
            console.log('User is not authorized to perform this operation');
            ctx.body = 'User is not authorized to perform this operation';
            ctx.status = 401;
            return;
        }
    }
    let rideDetails = {
        pilot_id: userDetails.user_nt_id,
        passenger_id: ctx.request.query.passenger_id
    }
    console.log(rideDetails);
    let acceptResponse = await sql.sqlConnection(`INSERT INTO user_vehicle_txn (user_id, trip_id)
    VALUES                       ((SELECT id FROM user_details WHERE user_nt_id = ?),
                                  (SELECT id FROM vehicle_trips WHERE trip_status = 'IN_PROGRESS' AND pilot_id = (SELECT id from user_details WHERE user_nt_id = ?)));
    `,[rideDetails.passenger_id, rideDetails.pilot_id]);
    if(acceptResponse.affectedRows>0){
        console.log('Ride accepted successfully');
        ctx.body = 'Ride accepted successfully';
        ctx.status = 200;
    }
}
async function queryRideRequests(ctx){
    let userDetails;
    if(ctx.request.header['authorization']) {
        console.log('Authorization header found');
        let token = ctx.request.header['authorization'];
        let decoded = decryptJWT(token);
        userDetails = decoded;
        console.log(decoded);
        if(decoded){
            console.log('User is authorized to perform this operation');
        }
        else{
            console.log('User is not authorized to perform this operation');
            ctx.body = 'User is not authorized to perform this operation';
            ctx.status = 401;
            return;
        }
    }
    let rideDetails = {
        pilot_id: userDetails.user_nt_id
    }
    let queryResponse = await sql.sqlConnection(`SELECT ud.user_name, ud.user_nt_id, ud.mobile_number, ud.location
    FROM 	trip_request_queue trt
    JOIN	user_details ud
    ON 		trt.passenger_id = ud.id
    WHERE 	trt.pilot_id = (SELECT id FROM user_details WHERE user_nt_id = ?);`,[rideDetails.pilot_id]);
    console.log(queryResponse);
    if(queryResponse.length>0){
        console.log('Requests found');
        ctx.body = queryResponse;
        ctx.status = 200;
    }
    else{
        console.log('No requests found');
        ctx.body = [];
        ctx.status = 200;
    }
}

async function endRide(ctx){
    let userDetails;
    if(ctx.request.header['authorization']) {
        console.log('Authorization header found');
        let token = ctx.request.header['authorization'];
        let decoded = decryptJWT(token);
        userDetails = decoded;
        console.log(decoded);
        if(decoded){
            console.log('User is authorized to perform this operation');
        }
        else{
            console.log('User is not authorized to perform this operation');
            ctx.body = 'User is not authorized to perform this operation';
            ctx.status = 401;
            return;
        }
    }
    let endResponse = await sql.sqlConnection(`UPDATE vehicle_trips SET trip_status = 'COMPLETED',trip_end_date_time = CURRENT_TIMESTAMP WHERE pilot_id = (SELECT id FROM user_details WHERE user_nt_id = ?) AND trip_status = 'IN_PROGRESS'`,[userDetails.user_nt_id]);
    if(endResponse.affectedRows>0){
        console.log('Ride ended successfully');
        ctx.body = 'Ride ended successfully';
        ctx.status = 200;
    }
}



// Function to create JWT for each user after authentication
function createJWT(user) {
    const token = jwt.sign(user, 'your_secret_key');

    return token;
}
function decryptJWT(token){
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded;
}

async function getTables(){
    let response = await sql.sqlConnection(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'uladb'`,[]);
    console.log(response);
    return response;
}
module.exports = {
    insertSignupDetails,
    authenticateUser,
    createJWT,
    getTables,
    startRide,
    endRide,
    getAvailableRides,
    requestRide,
    acceptRide,
    endRide,
    queryRideRequests
};