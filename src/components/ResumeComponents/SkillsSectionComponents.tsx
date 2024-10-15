import { useRef, useEffect } from 'react';
import { ResumeData } from '../../types';

interface SkillsSectionProps {
  skills: ResumeData['skills'];
  onHeightChange: (height: number) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onHeightChange }) => {
  const skillsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (skillsRef.current) {
      const height = skillsRef.current.offsetHeight;
      onHeightChange(height); // Pass the height to the parent
    }
  }, [onHeightChange]);

  return (
    <div className="pt-3 mt-3 border-t" ref={skillsRef}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Skills</h2>
      <ul className="flex flex-wrap gap-4 mt-3 mb-3">
        {skills.map((skill, index) => (
          <li key={index} className="bg-gray-200 px-4 py-2 rounded-md text-gray-800">
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsSection;
