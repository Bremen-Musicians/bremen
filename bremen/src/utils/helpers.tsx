const toTimeString = (sec: number, showMilliSeconds: boolean): string => {
  // const rsec = parseFloat(sec);
  let hours: number | string = Math.floor(sec / 3600); // get hours
  let minutes: number | string = Math.floor((sec - hours * 3600) / 60); // get minutes
  let seconds: number | string = sec - hours * 3600 - minutes * 60; // get seconds

  // add 0 if value < 10; Example: 2 => 02
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  const maltissaRegex = /\..*$/; // matches the decimal point and the digits after it e.g if the number is 4.567 it matches .567

  const millisec = String(seconds).match(maltissaRegex);
  return `${hours}:${minutes}:${String(seconds).replace(
    maltissaRegex,
    '',
  )}${showMilliSeconds && millisec ? millisec[0] : ''}`;
};

const readFileAsBase64 = async (
  file: File,
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const download = (url: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '');
  link.click();
};

const getVideoDuration = (videoUrl: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      resolve(video.duration);
    };

    video.onerror = error => {
      reject(error);
    };

    video.src = videoUrl;
  });
};
export {toTimeString, getVideoDuration, readFileAsBase64, download};
