import { useRef, useEffect } from 'react';
import { ResumeData } from '../../types';

interface CertificatesSectionProps {
  certificates: ResumeData['certificates'];
  onHeightChange: (height: number) => void;
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates, onHeightChange }) => {
  const certificatesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (certificatesRef.current) {
      const height = certificatesRef.current.offsetHeight;
      onHeightChange(height); // Pass the height to the parent
    }
  }, [onHeightChange]);

  return (
    <div className="pt-3 mb-3 border-t" ref={certificatesRef}>
      <h2 className="text-2xl font-semibold text-gray-900 ">Certificates</h2>
      {certificates.map((certificate, index) => (
        <p key={index} className="text-gray-700 mt-3">
          <strong>Certificate:</strong> {certificate.name}
        </p>
      ))}
    </div>
  );
};

export default CertificatesSection;
