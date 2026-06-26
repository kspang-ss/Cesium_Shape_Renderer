const viewer = new Cesium.Viewer('cesiumContainer');
let i = 0, j = 0;
let entities = {
    rectangles: [],
    spheres: [],
    squares: [],
    triangles: []
};

// rectangles
while (i < rectangles.length) {
    let r = rectangles[i];
    let west = r.lon - r.width / 2;
    let south = r.lat - r.height / 2;
    let east = r.lon + r.width / 2;
    let north = r.lat + r.height / 2;
    entities.rectangles.push(viewer.entities.add({
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(west, south, east, north),
            material: Cesium.Color.RED.withAlpha(0.6),
            extrudedHeight: r.elevation,
        },
    }));
    i++;
}

// spheres
i = 0;
while (i < spheres.length) {
    let s = spheres[i];
    entities.spheres.push(viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(s.lon, s.lat, s.radius),
        ellipsoid: {
            radii: new Cesium.Cartesian3(s.radius, s.radius, s.radius),
            material: Cesium.Color.BLUE.withAlpha(0.6),
        },
    }));
    i++;
}

// squares
i = 0;
while (i < squares.length) {
    let sq = squares[i];
    let half = sq.size / 2;
    entities.squares.push(viewer.entities.add({
        rectangle: {
            coordinates: Cesium.Rectangle.fromDegrees(
                sq.lon - half, sq.lat - half,
                sq.lon + half, sq.lat + half
            ),
            material: Cesium.Color.GREEN.withAlpha(0.6),
            extrudedHeight: sq.elevation,
        },
    }));
    i++;
}

// triangles
i = 0;
while (i < triangles.length) {
    let t = triangles[i];
    let offset = t.radius / 111000;
    entities.triangles.push(viewer.entities.add({
        polygon: {
            hierarchy: Cesium.Cartesian3.fromDegreesArray([
                t.lon, t.lat + offset,
                t.lon - offset, t.lat - offset,
                t.lon + offset, t.lat - offset,
            ]),
            material: Cesium.Color.YELLOW.withAlpha(0.6),
            extrudedHeight: t.elevation,
        },
    }));
    i++;
}

// toggle shape visiblity
function setGroupVisibility(entities, visible) {
    j = 0;
    while (j < entities.length) {
        entities[j].show = visible;
        j++;
    }
}

// toolbar event handlers
for (const key in entities) {
    if (!Object.hasOwn(entities, key)) continue; // safety first
    document.getElementById(key).addEventListener('change', function (e) {
        setGroupVisibility(entities[key], e.target.checked);
    });
}

viewer.zoomTo(viewer.entities);
