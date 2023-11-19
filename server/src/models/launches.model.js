const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

let latesFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

async function getLatesFlightNumber() {
    const latesLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    
    if (!latesLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    } 

    return latesLaunch.flightNumber;
}

async function getAllLaunches () {
    return await launchesDatabase
    .find({}, {'_id': 0, '_v' : 0});
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planet found')
    }
    
    await launchesDatabase.updateOne({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function scheduleNewLaunch() {
    const newFlightNumber = await getLatesFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    })
}

// function addNewLaunch(launch) {
//     latesFlightNumber++;
//     launches.set(
//         latesFlightNumber, 
//         Object.assign(launch, {
//             success: true,
//             upcoming : true,
//             customers: ['Zero to Mastery', 'NASA'],
//             flightNumber: latesFlightNumber,
//         })
//     );
// }

function abortLaunchById(launchId) {

}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
    scheduleNewLaunch,
};