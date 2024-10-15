import { useRef, useEffect } from 'react';
import { ResumeData } from '../../types';

interface SummarySectionProps {
  summary: ResumeData['summary'];
  onHeightChange: (height: number) => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({ summary, onHeightChange }) => {
  const summaryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (summaryRef.current) {
      const height = summaryRef.current.offsetHeight;
      onHeightChange(height); // Pass the height to the parent
    }
  }, [onHeightChange]);

  return (
    <div className="pt-3 mt-3 border-t" ref={summaryRef}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Summary</h2>
      <p className="text-gray-700">{summary || 'No summary added yet.'}</p>
    </div>
  );
};

export default SummarySection;
