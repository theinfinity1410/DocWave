import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DocumentCard({ docId, title, lastModified }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/editor/${docId}`);
  };

  return (
    <div onClick={handleClick} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-500 text-sm">Last modified: {lastModified}</p>
    </div>
  );
}