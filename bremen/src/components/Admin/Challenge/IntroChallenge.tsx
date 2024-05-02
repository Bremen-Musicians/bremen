'use client';

import React, {useState} from 'react';
import QuillEditor from './QuillEditor';
// import styles from './IntroChallenge.module.scss';

const YourComponent: React.FC = () => {
  const [editorContent, setEditorContent] = useState<string>('');

  const handleEditorChange = (content: string): void => {
    setEditorContent(content);
  };

  return (
    <div>
      <QuillEditor onChange={handleEditorChange} />
      <p>Editor Content: {editorContent}</p>
    </div>
  );
};

export default YourComponent;
