import React from 'react';
import { Certificate } from '../../types';

interface CertificatesFormProps {
  certificates: Certificate[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  addCertificate: () => void;
}

const CertificatesForm: React.FC<CertificatesFormProps> = ({ certificates, onChange, addCertificate }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Certificates</h2>
      {certificates.map((certificate, index) => (
        <input
          key={index}
          className="w-full p-2 border rounded mb-2"
          type="text"
          placeholder="Skill"
          value={certificate.name}
          onChange={(e) => onChange(e, index)}
        />
      ))}
      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={addCertificate}
      >
        Add Certificate
      </button>
    </div>
  );
};

export default CertificatesForm;
