import React from 'react';
import * as helpers from '@/utils/helpers';

interface RangeInputProps {
  thumbNails: string[];
  rEnd: number;
  rStart: number;
  handleUpdaterStart: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdaterEnd: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  control: React.ReactNode;
  duration: number;
}

const RANGE_MAX = 100;

const RangeInput: React.FC<RangeInputProps> = ({
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
  loading,
  control,
  duration,
}) => {
  if (!thumbNails && !loading) {
    return null;
  }

  return (
    <>
      <div className="range_pack">
        <div className="image_box">
          {thumbNails.map((imgURL, id) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgURL} alt={`sample_video_thumbnail_${id}`} key={id} />
          ))}
          <div
            className="clip_box"
            style={{
              width: `calc(${rEnd - rStart}%)`,
              left: `${rStart}%`,
            }}
            data-start={helpers.toTimeString(
              (rStart / RANGE_MAX) * duration,
              false,
            )}
            data-end={helpers.toTimeString(
              (rEnd / RANGE_MAX) * duration,
              false,
            )}
          >
            <span className="clip_box_des"></span>
            <span className="clip_box_des"></span>
          </div>
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterStart}
            value={rStart}
          />
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterEnd}
            value={rEnd}
          />
        </div>
      </div>
      {control}
    </>
  );
};

export default RangeInput;
