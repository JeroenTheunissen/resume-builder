import { useRef, useEffect } from 'react';
import { ResumeData } from '../../types';

interface EducationSectionProps {
  education: ResumeData['education'];
  onHeightChange: (height: number) => void;
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, onHeightChange }) => {
  const educationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (educationRef.current) {
      const height = educationRef.current.offsetHeight;
      onHeightChange(height); // Pass the height to the parent
    }
  }, [onHeightChange]);

  return (
    <div className="pb-3 mb-3 border-t" ref={educationRef}>
      <h2 className="text-2xl font-semibold text-gray-900 mt-3">Education</h2>
      {education.map((education, index) => (
        <div key={index} className="mt-3">
          <h3 className="text-lg font-semibold text-gray-800">{education.institution || 'Institution name'}</h3>
          <p className="text-sm text-gray-500">
            {education.startDate
              ? education.startDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })
              : 'N/A'}{' '}
            -{' '}
            {education.endDate
              ? education.endDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })
              : 'Present'}
          </p>
          <p className="text-gray-700 mt-2">{education.description || 'Education description'}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;
