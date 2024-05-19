import {ChangeEvent} from 'react';

function VideoFilePicker({
  showVideo,
  handleChange,
  children,
}: {
  showVideo: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}) {
  const FileInput = () => (
    <label
      htmlFor="x"
      id={`${showVideo ? 'file_picker_small' : ''}`}
      className={`file_picker `}
    >
      <span>choose file</span>
      <input onChange={handleChange} type="file" id="x" accept="video/mp4" />
    </label>
  );

  return showVideo ? (
    <>
      {' '}
      {children} <FileInput />
    </>
  ) : (
    <FileInput />
  );
}

export default VideoFilePicker;
