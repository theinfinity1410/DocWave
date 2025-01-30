import React, { useState, useEffect } from 'react';
import { fetchDocuments, createDocument } from '../services/api';
import DocumentCard from '../components/DocumentCard';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const [newDocTitle, setNewDocTitle] = useState('');

  useEffect(() => {
    const getDocuments = async () => {
      const docs = await fetchDocuments();
      setDocuments(docs);
    };
    getDocuments();
  }, []);

  const handleCreate = async () => {
    if (newDocTitle.trim() === '') return;
    const newDoc = await createDocument(newDocTitle);
    setDocuments([...documents, newDoc]);
    setNewDocTitle('');
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Documents</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <DocumentCard 
              key={doc._id} 
              title={doc.title} 
              lastModified={doc.lastModified} 
              onClick={() => alert(`Open document: ${doc._id}`)}
            />
          ))}
        </div>
        <div className="mt-4">
          <input 
            type="text" 
            className="border p-2 rounded-md" 
            placeholder="New document title" 
            value={newDocTitle} 
            onChange={(e) => setNewDocTitle(e.target.value)} 
          />
          <button 
            onClick={handleCreate} 
            className="bg-indigo-600 text-white p-2 rounded-md ml-2">
            Create Document
          </button>
        </div>
      </div>
    </>
  );
}
