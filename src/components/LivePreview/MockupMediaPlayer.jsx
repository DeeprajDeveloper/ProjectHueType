import { useCallback, useRef, useState } from 'react';
import {
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@phosphor-icons/react';
import Icon from '../Icon/Icon';
import { ICON_SIZE } from '../Icon/iconConfig';
import { MOCKUP_COPY } from '../../data/mockupCopy';
import './MockupMediaPlayer.scss';

function formatTime(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function MockupMediaPlayer({ parts = {} }) {
  const copy = MOCKUP_COPY['media-player'];
  const show = (id) => parts[id] !== false;
  const totalSeconds = copy.progress.totalSeconds;
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(38);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const currentSeconds = (progress / 100) * totalSeconds;

  const seekFromClientX = useCallback((clientX) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const next = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setProgress(next);
  }, []);

  const handleTrackPointerDown = (event) => {
    setIsDragging(true);
    trackRef.current?.setPointerCapture(event.pointerId);
    seekFromClientX(event.clientX);
  };

  const handleTrackPointerMove = (event) => {
    if (!isDragging) return;
    seekFromClientX(event.clientX);
  };

  const handleTrackPointerUp = (event) => {
    setIsDragging(false);
    trackRef.current?.releasePointerCapture(event.pointerId);
  };

  return (
    <div className="mockup-media-player">
      <div className="mockup-media-player__panel">
        {show('albumArt') && (
          <div className={`mockup-media-player__art ${isPlaying ? 'mockup-media-player__art--playing' : ''}`} aria-hidden="true">
            <div className="mockup-media-player__art-gradient" />
          </div>
        )}

        {show('trackInfo') && (
          <div className="mockup-media-player__track">
            <h1 className="mockup-media-player__title">{copy.track.title}</h1>
            <p className="mockup-media-player__artist">{copy.track.artist}</p>
            <p className="mockup-media-player__album">{copy.track.album}</p>
          </div>
        )}

        {show('progressBar') && (
          <div className="mockup-media-player__progress">
            <div
              ref={trackRef}
              className="mockup-media-player__progress-track"
              role="slider"
              aria-label="Playback position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-valuetext={`${formatTime(currentSeconds)} of ${formatTime(totalSeconds)}`}
              onPointerDown={handleTrackPointerDown}
              onPointerMove={handleTrackPointerMove}
              onPointerUp={handleTrackPointerUp}
              onPointerCancel={handleTrackPointerUp}
            >
              <div
                className="mockup-media-player__progress-fill"
                style={{ width: `${progress}%` }}
              />
              <span
                className={`mockup-media-player__progress-thumb ${isDragging ? 'mockup-media-player__progress-thumb--dragging' : ''}`}
                style={{ left: `${progress}%` }}
                aria-hidden="true"
              />
            </div>
            <div className="mockup-media-player__times">
              <span>{formatTime(currentSeconds)}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>
          </div>
        )}

        {show('playbackControls') && (
          <div className="mockup-media-player__controls">
            <button
              type="button"
              className={`mockup-media-player__control ${shuffle ? 'mockup-media-player__control--active' : ''}`}
              aria-label="Shuffle"
              aria-pressed={shuffle}
              onClick={() => setShuffle((v) => !v)}
            >
              <Icon icon={ShuffleIcon} size={ICON_SIZE} />
            </button>
            <button type="button" className="mockup-media-player__control" aria-label="Previous">
              <Icon icon={SkipBackIcon} size={ICON_SIZE} />
            </button>
            <button
              type="button"
              className="mockup-media-player__play"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              aria-pressed={isPlaying}
              onClick={() => setIsPlaying((v) => !v)}
            >
              <Icon icon={isPlaying ? PauseIcon : PlayIcon} size={ICON_SIZE} weight="fill" />
            </button>
            <button type="button" className="mockup-media-player__control" aria-label="Next">
              <Icon icon={SkipForwardIcon} size={ICON_SIZE} />
            </button>
            <button
              type="button"
              className={`mockup-media-player__control ${repeat ? 'mockup-media-player__control--active' : ''}`}
              aria-label="Repeat"
              aria-pressed={repeat}
              onClick={() => setRepeat((v) => !v)}
            >
              <Icon icon={RepeatIcon} size={ICON_SIZE} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MockupMediaPlayer;
