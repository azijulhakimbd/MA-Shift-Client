
import React, { useState } from 'react';
import CoverageMap from './CoverageMap';


const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h2>

      {/* Search box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by district name..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <CoverageMap searchTerm={searchTerm} />
    </div>
  );
};

export default Coverage;
