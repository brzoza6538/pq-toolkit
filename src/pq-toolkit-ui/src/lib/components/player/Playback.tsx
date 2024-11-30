'use client'
import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { IconButton, Typography, Box } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

const Playback = ({
  assetPath,
  name
}: {
  assetPath: string
  name: string
}): JSX.Element => {
  const playerRef = useRef<Howl>(new Howl({
    src: [assetPath],
    volume: 0.5,
    loop: true
  }))

  const [status, setStatus] = useState<'stopped' | 'playing' | 'paused'>('stopped')

  useEffect(() => {
    const player = playerRef.current

    switch (status) {
      case 'playing':
        player.play()
        break
      case 'paused':
        player.pause()
        break
      case 'stopped':
        player.stop()
        break
    }

    return () => {
      player.stop()
    }
  }, [status])

  const togglePlayPause = (): void => {
    if (status === 'playing') {
      setStatus('paused')
    } else {
      setStatus('playing')
    }
  }

  return (
    <IconButton
		  onClick={togglePlayPause}
          sx={{ color: '#3b82f6' }}
          data-testid="play-pause-button"
        >
          {status === 'playing' ? (
            <PauseIcon data-testid="pause-icon" />
          ) : (
            <PlayArrowIcon data-testid="play-icon" />
          )}
        </IconButton>
  )
}

export default Playback
