function getRandomType() {
  return `LayerGroup${Math.floor(Math.random() * 10) + 1}`
}

export let mockMessage = {
  DataSourceIDs: null,
  Type: getRandomType(),
  CorrelationGroupId: null,
  ID: '34721',
  DataSourceID: '226e3207-1d7f-11ed-ad56-00155d0a0d0d',
  ObjectPositionalDeclarationID: '3a092c28-11b0-7cc3-4512-83a846489223',
  Shape: {
    Points: [
      {
        LatInDegrees: 51.48233,
        LonInDegrees: -0.48347,
        AltFromSeaLevelInMetres: 0.0,
        LatErrorInDegrees: null,
        LonErrorInDegrees: null,
        AltErrorInMetres: null,
      },
    ],
  },
  Strobe: null,
  Classifications: [{ Classification: 'Vehicle', Confidence: 1.0 }],
  SpeedInMetresPerSecond: 0.0,
  HeadingFromTrueNorthInDegrees: null,
  DetectionDateTime: '2023-01-13T12:14:02',
  Cooperative: true,
  Known: false,
  ObjectOfInterest: 0,
  Pinned: false,
  ThreatScore: null,
  Images: null,
}
