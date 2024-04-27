import { Style, Stroke, Circle, Fill } from "ol/style";
import Icon from "ol/style/Icon";
import trainIcon from "./train.png";

export const stationConnectlineStyle = (feature, trainLineColor) => {
    const BORDER_COLOR = "black";
    const LINE_RADIUS = 5;
    const LINE_BORDER_WIDTH = 9;

    const lineColor = feature.get("LINE");
    let borderColor = BORDER_COLOR;
    let fillColor;

    switch (lineColor) {
        case "BLUE":
            fillColor = "blue";
            break;
        case "RED":
            fillColor = "red";
            break;
        case "GREEN":
            fillColor = "green";
            break;
        case "ORANGE":
            fillColor = "orange";
            break;
        default:
            fillColor = "rgba(0, 0, 0, 0)";
    }

    const isSelectedTrainLineConnectLine =
        trainLineColor && trainLineColor === lineColor;

    if (!isSelectedTrainLineConnectLine) {
        fillColor = "rgba(0, 0, 0, 0)";
        borderColor = "rgba(0, 0, 0, 0)";
    }

    return [
        new Style({
            stroke: new Stroke({
                color: borderColor,
                width: LINE_BORDER_WIDTH,
            }),
        }),
        new Style({
            stroke: new Stroke({
                color: fillColor,
                width: LINE_RADIUS,
            }),
        }),
    ];
};

export const stationDotStyle = (feature, trainLineColor) => {
    const FILL_COLOR = "white";
    const BORDER_COLOR = "black";
    const STATION_DOT_RADIUS = 6;
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

export const trainIconStyle = (
    feature,
    selectedTrainLine,
    trainDirection,
    inboundChecked,
    outboundChecked,
    greenSubLine,
    mapZoomLevel
) => {
    const ICON_SIZE = mapZoomLevel / 250;

    const trainLineWithSubLine = feature.get("LINE").toUpperCase();
    const [trainLine, subLine] = trainLineWithSubLine.split("-");
    const direction = feature.get("DIRECTION");
    let isVisible = true;

    if (!inboundChecked && !outboundChecked) {
        return null;
    }

    if (selectedTrainLine && trainLine !== selectedTrainLine.toUpperCase()) {
        isVisible = false;
    }

    if (
        selectedTrainLine.toUpperCase() === "GREEN" &&
        greenSubLine &&
        trainLine === selectedTrainLine.toUpperCase()
    ) {
        if (subLine !== greenSubLine.toUpperCase()) {
            isVisible = false;
        }
    }

    if (trainDirection && direction !== trainDirection) {
        isVisible = false;
    }

    return new Style({
        image: new Icon({
            opacity: isVisible ? 1 : 0,
            src: trainIcon,
            scale: ICON_SIZE,
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
        }),
    });
};
