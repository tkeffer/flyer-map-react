/**
 * Copyright (c) 2024-present Tom Keffer <tkeffer@gmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from "prop-types";

import { conversionDict } from "./units.js";

const WIDTH = 40;       // The width of the SVG element
const HEIGHT = 80;      // Its height
const SPACE = 16;       // The space along the shaft between barbs
const FULLBARB = 14;    // The delta-x and delta-y of a full barb

/**
 * Component that generates a wind barb as an SVG element. The barb will be
 * vertical with the head of the shaft at the bottom and the barbs on the top.
 *
 * @param {number} windSpeed - The wind speed in meters per second
 * @returns {string}
 */
function SVGWindBarb(props) {

    // Convert from m/s to knots
    let remainingSpeed = conversionDict["meter_per_second"]["knot"](props.windSpeed);

    let svgParts = [];

    // Draw the shaft. It will be a vertical line, 80 units long, running from
    // y=20 at the top, to y=100 at the bottom. It will be centered at x=20 in
    // the box.
    svgParts.push("<line x1='20' y1='20' x2='20' y2='100'/>");

    // Start at the top of the shaft
    let yPos = 20;

    // Wind speeds between 5 and 10 kn traditionally have a little space between
    // the end of the shaft and the barb, so move down a bit.
    if (remainingSpeed >= 5 && remainingSpeed < 10)
        yPos += SPACE / 2;

    function addPennant() {
        // Use a closed path to draw a pennant
        svgParts.push(`<path d="M20 ${yPos} v ${-FULLBARB} h ${FULLBARB}z"/>`);
        yPos += SPACE;
    }

    function addBarb(length) {
        svgParts.push(`<line x1="20" y1="${yPos}" x2="${20 + length}" y2="${yPos - length}"/>`);
        yPos += SPACE;
    }

    while (remainingSpeed >= 50) {
        addPennant();
        remainingSpeed -= 50;
    }
    while (remainingSpeed >= 10) {
        addBarb(FULLBARB);
        remainingSpeed -= 10;
    }
    if (remainingSpeed >= 5) {
        addBarb(FULLBARB / 2);
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={WIDTH} height={HEIGHT}
            stroke="black"
            fill="black">
            {svgParts.join(" ")}
        </svg>
    );
}

SVGWindBarb.propTypes = {
    windSpeed: PropTypes.number,
};

/**
 * Component that generates a properly rotated wind barb
 *
 * @param {object} props
 * @param {number} props.windSpeed - Wind speed in m/s
 * @param {number} props.windDirection - Wind direction in radians. 0=N
 * @returns {JSX.Element} - An SVG with a wind barb
 * @constructor
 */
export const WindBarb = (props) => {
    const { windSpeed, windDirection } = props;

    return (
        <>
            {windSpeed && windDirection != null &&
                <div style={{
                    // Make sure we rotate around the base of the shaft.
                    transformOrigin: "center bottom",
                    transform: "rotate(" + windDirection + "rad)",
                }}>
                    <SVGWindBarb windSpeed={windSpeed} />
                </div>
            }
        </>
    );
};

WindBarb.propTypes = {
    windSpeed: PropTypes.number,
    windDirection: PropTypes.number,
};
