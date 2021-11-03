
type LakeProps = {
  canvasDimensions: { x: number, y: number }
  surface: number,
  seasonDuration: number,
}

const Lake: React.FC<LakeProps> = function ({ canvasDimensions, surface, seasonDuration }) {
  return (
    <svg>
      <defs>
        <linearGradient id="lakeGradient" gradientTransform="rotate(90)">
          <stop offset="5%" stop-color="gold" />
          <stop offset="95%" stop-color="red" />
        </linearGradient>
      </defs>
      <rect fill="url(#lakeGradient)" x="0" y={surface} width={canvasDimensions.x} height={canvasDimensions.y - surface} />
    </svg>
  )
}
export default Lake;