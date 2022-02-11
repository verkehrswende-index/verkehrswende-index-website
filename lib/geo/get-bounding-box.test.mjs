import getBoundingBox from "./get-bounding-box.mjs";

test("Basic bounding box calculation", () => {
  var features = [
    {
      geometry: {
        type: "Point",
        coordinates: [1.5, 1.5],
      },
    },
    {
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2, -1],
            [4, 1],
            [3, 3],
            [2, 1],
            [2, -1],
          ],
        ],
      },
    },
    {
      geometry: {
        type: "LineString",
        coordinates: [
          [3, -1],
          [3, 5],
        ],
      },
    },
  ];
  expect(getBoundingBox(features)).toStrictEqual({
    xMin: 1.5,
    yMin: -1,
    xMax: 4,
    yMax: 5,
  });
});
