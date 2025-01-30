import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({ docId }) {
  const [content, setContent] = useState('');
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000');
    socket.current.emit('join-document', docId);
    
    socket.current.on('document-update', (data) => {
      setContent(data.content);
    });

    return () => socket.current.disconnect();
  }, [docId]);

  const handleChange = (value) => {
    setContent(value);
    socket.current.emit('send-changes', { docId, content: value });
  };

  const handleSave = async () => {
    alert('Document saved!');
  };

  return (
    <div className="editor-container">
      <GrammarlyEditorPlugin clientId="your-grammarly-client-id">
        <ReactQuill value={content} onChange={handleChange} />
      </GrammarlyEditorPlugin>
      <button onClick={handleSave}>Save Document</button>
    </div>
  );
}
