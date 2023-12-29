
import { useCallback } from 'react'
import Image from 'next/image'

import {
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const Track = ({ tracks, onAdd, onRemove, isRemoval }) => {
  const addTrack = useCallback(
    (event) => {
      onAdd(tracks)
    },
    [onAdd, tracks]
  )

  const removeTrack = useCallback(
    (event) => {
      onRemove(tracks)
    },
    [onRemove, tracks]
  )

  const renderAction = () => {
    if (isRemoval) {
      return (
        <Button size="sm" variant="outline" onClick={removeTrack}>
          Remove From Playlist
        </Button>
      )
    }
    return (
      <Button size="sm" variant="outline" onClick={addTrack}>
        Add To Playlist
      </Button>
    )
  }

  return (
    <Card>
      <div className='justify-center flex sm:pt-6 pt-4'>
        <Image src={tracks.coverImage} alt={`Album image of ${tracks.artist}`} className='aspect-square rounded-lg justify-center' height={300} width={300} />
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {tracks.name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          {tracks.artist}, {tracks.album}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">{renderAction()}</CardContent>
    </Card>
  )
}

export default Track
