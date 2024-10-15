import { useRef, useEffect } from 'react';
import { ResumeData } from '../../types';

interface PersonalDetailsSectionProps {
  personalDetails: ResumeData['personalDetails'];
  onHeightChange: (height: number) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ personalDetails, onHeightChange }) => {
  const personalDetailsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (personalDetailsRef.current) {
      const height = personalDetailsRef.current.offsetHeight;
      onHeightChange(height);
    }
  }, [onHeightChange]);

  return (
    <div className="text-center" ref={personalDetailsRef}>
      <h1 className="text-4xl font-bold text-gray-900">{personalDetails.name}</h1>
      <p className="text-lg text-gray-600">{personalDetails.professionalTitle || 'Profession'}</p>
      <div className="flex justify-center gap-4 mt-4 text-gray-500">
        <p>Email: {personalDetails.email}</p>
        <p>Phone: {personalDetails.phone}</p>
      </div>
      <div className="flex justify-center gap-4 mt-2 text-gray-500">
        <p>Website: {personalDetails.website}</p>
        <p>LinkedIn: {personalDetails.linkedinHandle}</p>
        <p>City: {personalDetails.city}</p>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
