
type LakeProps = {
  canvasDimensions: { x: number, y: number }
  surface: number
}

const Lake: React.FC<LakeProps> = function ({ canvasDimensions, surface }) {
  return (
    <svg>
      <rect fill="#40808D" x="0" y={surface} width={canvasDimensions.x} height={canvasDimensions.y - surface} />
    </svg>
  )
}
export default Lake;