import React from 'react';
import DatePicker from 'react-datepicker';
import { Education } from '../../types';
import 'react-datepicker/dist/react-datepicker.css';

interface EducationFormProps {
  education: Education[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  onDateChange: (date: Date | null, index: number, field: string) => void;
  addEducation: () => void;
}

const WorkExperienceForm: React.FC<EducationFormProps> = ({ education, onChange, onDateChange, addEducation }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      {education.map((education, index) => (
        <div key={index} className="space-y-2 mb-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="institution"
            placeholder="Institution"
            value={education.institution}
            onChange={(e) => onChange(e, index)}
          />

          <div className="flex gap-4">
            <DatePicker
              selected={education.startDate}
              onChange={(date) => onDateChange(date, index, 'startDate')}
              dateFormat="MMMM-yyyy"
              placeholderText="Start Date"
              className="w-full p-2 border rounded"
              showYearDropdown
              scrollableYearDropdown
            />
            <DatePicker
              selected={education.endDate}
              onChange={(date) => onDateChange(date, index, 'startDate')}
              dateFormat="MMMM-yyyy"
              placeholderText="End Date"
              className="w-full p-2 border rounded"
              showYearDropdown
              scrollableYearDropdown
            />
          </div>
          <textarea
            className="w-full p-2 border rounded"
            name="description"
            placeholder="Education Description"
            value={education.description}
            onChange={(e) => onChange(e, index)}
          ></textarea>
        </div>
      ))}

      <button type="button" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" onClick={addEducation}>
        Add Education
      </button>
    </div>
  );
};

export default WorkExperienceForm;
