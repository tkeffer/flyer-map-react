/*
 * Configuration settings
 */

export const boatOptions = {
    defaultStatus: "If no position appears after a few seconds, it is because " +
        "power is off on the boat."
}

export const mqttOptions = {
    // The URL for the MQTT broker
    // brokerUrl : "ws://localhost:8080",
    // or for secure websockets:
    //   brokerUrl : "wss://mydomain.com:9001
    brokerUrl: "wss://projects.westernflyer.org:9001",

    // The client ID to be used for the MQTT connection
    clientId: "flyer-client-" + Math.floor(Math.random() * 10000),

    // The username and password as required by the broker, if any
    username: undefined,
    password: undefined,

    // Which SignalK ID to listen to. This is usually set to the vessel's MMSI
    // number. Use '+' to listen to all IDs.
    vesselId: "+",
};

export const tableOptions = {
    // What to present in the table, and in what order:
    order: [
        "navigation.position.latitude",
        "navigation.position.longitude",
        "navigation.speedOverGround",
        "navigation.courseOverGroundTrue",
        "navigation.speedThroughWater",
        "navigation.headingTrue",
        "navigation.log",
        "environment.depth.belowSurface",
        "environment.depth.belowTransducer",
        "environment.depth.belowKeel",
        "environment.wind.speedOverGround",
        "environment.wind.speedTrue",
        "environment.wind.directionTrue",
        "environment.wind.speedApparent",
        "environment.wind.angleApparent",
        "environment.water.temperature",
        "environment.outside.pressure",
        "environment.outside.temperature",
        "steering.rudderAngle",
    ],
};

export const markerOptions = {
    minCOGLength: 5,
};
