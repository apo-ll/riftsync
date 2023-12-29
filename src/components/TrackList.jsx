import Track from './Track'

const TrackList = ({ tracks, onAdd, isRemoval, onRemove }) => {
  return (
    <>
      {tracks.map((tracks) => (
        <Track
          key={tracks.id}
          tracks={tracks}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </>
  )
}

export default TrackList
