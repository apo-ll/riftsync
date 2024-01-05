import Playlist from '@/components/Playlist'
import SearchResult from '@/components/SearchResults'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import SearchBar from '@/components/SearchBar'
import Spotify from '@/lib/Spotify'

export default function Home() {
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [searchResults, setSearchResults] = useState([])

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults)
  }, [])

  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return

      setPlaylistTracks((prevTracks) => [...prevTracks, track])
    },
    [playlistTracks]
  )

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    )
  }, [])

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name)
  }, [])

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri)
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist')
      setPlaylistTracks([])
    })
  }, [playlistName, playlistTracks])

  return (
    <>
    <div className="flex justify-between items-center container pt-9">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          RiftSync
        </h1>
        <Button onClick={savePlaylist} className="self-start">
          Save to Spotify
        </Button>
      </div>
    <main className="grid sm:container min-h-screen p-8 sm:gap-10 sm:p-12  dark:bg-gray-900">
      
      <SearchBar onSearch={search} />
      <SearchResult
        searchResults={searchResults}
        onAdd={addTrack}
        onSave={savePlaylist}
      />
      <Playlist
        playlistTracks={playlistTracks}
        onRemove={removeTrack}
        onNameChange={updatePlaylistName}
        playlistName={playlistName}
      />
    </main>
    </>
  )
}