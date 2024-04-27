import { Style, Stroke, Circle, Fill } from "ol/style";
import Icon from "ol/style/Icon";
import trainIcon from "./train.png";

export const lineStyle = (feature, filterColor) => {
    const lineColor = feature.get("LINE");
    let color;
    let borderColor = "black";

    switch (lineColor) {
        case "BLUE":
            color = "blue";
            break;
        case "RED":
            color = "red";
            break;
        case "GREEN":
            color = "green";
            break;
        case "ORANGE":
            color = "orange";
            break;
        default:
            color = "rgba(0, 0, 0, 0)";
    }

    if (filterColor && filterColor !== lineColor) {
        color = "rgba(0, 0, 0, 0)";
        borderColor = "rgba(0, 0, 0, 0)";
    }

    return [
        new Style({
            stroke: new Stroke({
                color: borderColor,
                width: 7,
            }),
        }),
        new Style({
            stroke: new Stroke({
                color: color,
                width: 5,
            }),
        }),
    ];
};

export const stationDotStyle = (feature, trainLineColor) => {
    const FILL_COLOR = "white";
    const BORDER_COLOR = "black";
    const STATION_DOT_RADIUS = 4.7;
    const STATION_DOT_BORDER_WIDTH = 2;

    const stationDotColor = feature.get("LINE");
    let fillColor = FILL_COLOR;
    let borderColor = BORDER_COLOR;

    const isSelectedTrainLineStationDot =
        trainLineColor && trainLineColor === stationDotColor;

    if (!isSelectedTrainLineStationDot) {
        fillColor = "rgba(0, 0, 0, 0)";
        borderColor = "rgba(0, 0, 0, 0)";
    }

    return new Style({
        image: new Circle({
            radius: STATION_DOT_RADIUS,
            fill: new Fill({
                color: fillColor,
            }),
            stroke: new Stroke({
                color: borderColor,
                width: STATION_DOT_BORDER_WIDTH,
            }),
        }),
    });
};

export const trainStyle = (
    feature,
    filterColor,
    filterDirection,
    inboundChecked,
    outboundChecked,
    greenSubLine
) => {
    const trainLine = feature.get("LINE").toUpperCase();
    const [lineColor, lineSub] = trainLine.split("-");
    const direction = feature.get("DIRECTION");
    let isVisible = true;

    if (!inboundChecked && !outboundChecked) {
        return null;
    }

    if (filterColor && filterColor.toUpperCase() !== lineColor) {
        isVisible = false;
    }

    if (
        filterColor.toUpperCase() === "GREEN" &&
        greenSubLine &&
        lineColor === "GREEN"
    ) {
        if (greenSubLine.toUpperCase() !== lineSub) {
            isVisible = false;
        }
    }

    if (filterDirection && filterDirection !== direction) {
        isVisible = false;
    }

    return new Style({
        image: new Icon({
            opacity: isVisible ? 1 : 0,
            src: trainIcon,
            scale: 0.04,
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
        }),
    });
};
