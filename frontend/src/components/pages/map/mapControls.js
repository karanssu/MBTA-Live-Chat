export const handleButtonClick = (color, setPressedButton) => {
    setPressedButton(color);
};

export const handleDirectionClick = (direction, setFilterDirection) => {
    setFilterDirection(direction);
};

export const resetMap = (
    map,
    fromLonLat,
    setFilterDirection,
    setPressedButton
) => {
    if (!map) {
        console.error("Map not initialized");
        return;
    }
    const bostonCords = fromLonLat([-71.07777, 42.35313]);
    map.getView().setCenter(bostonCords);
    map.getView().setZoom(12);
    map.getView().setRotation(0);
    setFilterDirection("");
    setPressedButton("");
};
