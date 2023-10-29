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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches () {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latesFlightNumber++;
    launches.set(
        latesFlightNumber, 
        Object.assign(launch, {
            success: true,
            upcoming : true,
            customers: ['Zero to Mastery', 'NASA'],
            flightNumber: latesFlightNumber,
        })
    );
}

function abortLaunchById(launchId) {

}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};