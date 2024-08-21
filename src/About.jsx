/**
 * Copyright (c) 2024-present Tom Keffer <tkeffer@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "./App.css";
export const About = () => {
    return (
        <div className="about">
            <h2>About</h2>
            <p>
                Data originates on an NMEA 2000 network, flows through a{" "}
                <a
                    href={
                        "https://yachtdevicesus.com/products/nmea-2000-ethernet-gateway-yden-02"
                    }
                >
                    YDEN-02 ethernet gateway
                </a>
                , then to a <a href={"https://signalk.org/"}>SignalK server</a>.
                From there, updates are published to an{" "}
                <a href={"https://mqtt.org/"}>MQTT broker</a>. The client
                browser receives the updates via a websocket connection.
            </p>
            <p>
                The Google Maps and "Current Values" table are updated using <a href={"https://react.dev/"}>React</a>.
            </p>
            <p>
                The source code can be found in the{" "}
                <a href={"https://github.com/tkeffer/flyer-map-react"}>
                    <span className={"tty"}>flyer-map-react</span>
                </a>{" "}
                repository.
            </p>
        </div>
    );
};
