// src/components/MusicBar/MusicBar.tsx
import React from "react";
import ReactPlayer from "react-player";
import "./musicBar.scss";
import repeatIcon from "../../assets/frontend_assets/repeat.png";
import repeatActiveIcon from "../../assets/frontend_assets/repeat-active.png";

interface MusicBarProps {
  isPlaying: boolean;
  currentSongIndex: number;
  volume: number;
  playedSeconds: number;
  duration: number;
  repeat: boolean;
  songs: { title: string; url: string }[];
  playerRef: React.RefObject<ReactPlayer>;
  togglePlay: () => void;
  playSong: (index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProgress: (state: { playedSeconds: number }) => void;
  handleDuration: (duration: number) => void;
  handleEnded: () => void;
  formatTime: (seconds: number) => string;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;
  setSongs: React.Dispatch<
    React.SetStateAction<{ title: string; url: string }[]>
  >;
  showFileInput: boolean;
  setShowFileInput: React.Dispatch<React.SetStateAction<boolean>>;
  showVolume: boolean;
  setShowVolume: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDropdownChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  getVolumeIcon: () => string;
}

const MusicBar: React.FC<MusicBarProps> = ({
  isPlaying,
  currentSongIndex,
  volume,
  playedSeconds,
  duration,
  repeat,
  songs,
  playerRef,
  togglePlay,
  playSong,
  playNext,
  playPrevious,
  handleVolumeChange,
  handleFileChange,
  handleProgress,
  handleDuration,
  handleEnded,
  formatTime,
  setRepeat,
  setSongs,
  showFileInput,
  setShowFileInput,
  showVolume,
  setShowVolume,
  isModalOpen,
  setIsModalOpen,
  handleDropdownChange,
  getVolumeIcon,
}) => (
  <div className='music-bar'>
    <button onClick={playPrevious}>&lt;</button>
    <button onClick={togglePlay}>{isPlaying ? "[ ]" : "O"}</button>
    <button onClick={playNext}>&gt;</button>
    <button onClick={() => setShowVolume(!showVolume)}>
      <div className={`volume-icon ${getVolumeIcon()}`} />
    </button>
    {showVolume && (
      <input
        type='range'
        min='0'
        max='1'
        step='0.01'
        value={volume}
        onChange={handleVolumeChange}
        className='volume-slider vertical'
      />
    )}
    <select
      className='select-music'
      onChange={handleDropdownChange}
      value={currentSongIndex}
    >
      {songs.map((song, index) => (
        <option key={index} value={index}>
          {song.title}
        </option>
      ))}
      <option value='upload'>Download</option>
      <option value='dragDrop'>Arrange music</option>
    </select>

    {showFileInput && (
      <input
        type='file'
        accept='video/*, audio/*'
        onChange={handleFileChange}
        className='file-upload'
      />
    )}
    <button
      onClick={() => setRepeat(!repeat)}
      className={`repeat-button ${
        repeat ? "repeat-active-icon" : "repeat-icon"
      }`}
    >
      <img src={repeat ? repeatActiveIcon : repeatIcon} alt='Repeat' />
    </button>
    <div className='time-display'>
      {formatTime(playedSeconds)} / {formatTime(duration)}
    </div>
    <ReactPlayer
      ref={playerRef}
      url={songs[currentSongIndex]?.url}
      playing={isPlaying}
      volume={volume}
      onProgress={handleProgress}
      onDuration={handleDuration}
      onEnded={handleEnded}
      width='0'
      height='0'
    />
  </div>
);

export default MusicBar;
