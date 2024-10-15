import { useRef, useEffect } from 'react';
import { ResumeData } from '../../types';

interface LanguagesSectionProps {
  languages: ResumeData['languages'];
  onHeightChange: (height: number) => void;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages, onHeightChange }) => {
  const languagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (languagesRef.current) {
      const height = languagesRef.current.offsetHeight;
      onHeightChange(height); // Pass the height to the parent
    }
  }, [onHeightChange]);

  return (
    <div className="pt-3 mt-3 border-t break-inside-avoid" ref={languagesRef}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Languages</h2>
      {languages.map((language, index) => (
        <div key={index} className="mb-1">
          <p className="text-gray-700">
            {language.name} - {language.proficiency}{' '}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LanguagesSection;
