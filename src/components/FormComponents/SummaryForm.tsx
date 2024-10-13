import React from 'react';

interface SummaryFormProps {
  summary: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ summary, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Summary</h2>
      <textarea
        className="w-full p-2 border rounded mb-4"
        name="summary"
        placeholder="Summary"
        value={summary}
        onChange={onChange}
      />
    </div>
  );
};

export default SummaryForm;
