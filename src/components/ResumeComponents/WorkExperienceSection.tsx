import { useRef, useEffect } from 'react';
import { ResumeData } from '../../types';

interface WorkExperienceSectionProps {
  workExperience: ResumeData['workExperience'];
  onHeightChange: (height: number) => void;
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({ workExperience, onHeightChange }) => {
  const workExperienceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (workExperienceRef.current) {
      const height = workExperienceRef.current.offsetHeight;
      onHeightChange(height); // Pass the height to the parent
    }
  }, [onHeightChange]);

  return (
    <div className="pt-3 mt-3 border-t" ref={workExperienceRef}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Work Experience</h2>
      {workExperience.map((experience, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">{experience.position || 'Position'}</h3>
          <p className="text-sm text-gray-600">{experience.company || 'Company name'}</p>
          <p className="text-sm text-gray-500">
            {experience.startDate
              ? experience.startDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })
              : 'N/A'}{' '}
            -{' '}
            {experience.endDate
              ? experience.endDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })
              : 'Present'}
          </p>
          <p className="text-gray-700 mt-2">{experience.description || 'Job description'}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkExperienceSection;
