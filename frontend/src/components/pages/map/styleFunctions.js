import { Style, Stroke, Circle, Fill } from "ol/style";
import Icon from "ol/style/Icon";
import trainIcon from "./train.png";

export const lineStyle = (feature, filterColor) => {
    const lineColor = feature.get("LINE");
    let color;

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
    }

    return new Style({
        stroke: new Stroke({
            color: color,
            width: 5.5,
        }),
    });
};

export const nodeStyle = (feature, filterColor) => {
    const nodeColor = feature.get("LINE");
    let visibility = "white";

    if (filterColor && filterColor !== nodeColor) {
        visibility = "rgba(0, 0, 0, 0)";
    }

    return new Style({
        image: new Circle({
            radius: 3,
            fill: new Fill({
                color: visibility,
            }),
        }),
    });
};

export const trainStyle = (feature, filterColor, filterDirection) => {
    const trainLine = feature.get("LINE").toUpperCase();
    const direction = feature.get("DIRECTION");
    let isVisible = true;

    if (filterColor) {
        const isGreenFilter = filterColor.toUpperCase() === "GREEN";
        const isGreenLine = trainLine.includes("GREEN");

        if (
            (isGreenFilter && !isGreenLine) ||
            (!isGreenFilter && filterColor.toUpperCase() !== trainLine)
        ) {
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
