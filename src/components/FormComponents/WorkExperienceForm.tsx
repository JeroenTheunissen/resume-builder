import React from 'react';
import { WorkExperience } from '../../types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface WorkExperienceFormProps {
  workExperience: WorkExperience[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => void;
  onDateChange: (date: Date | null, index: number, field: string) => void;
  addWorkExperience: () => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  workExperience,
  onChange,
  onDateChange,
  addWorkExperience,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
      {workExperience.map((experience, index) => (
        <div key={index} className="space-y-2 mb-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="company"
            placeholder="Company"
            value={experience.company}
            onChange={(e) => onChange(e, index)}
          />
          <input
            className="w-full p-2 border rounded"
            type="text"
            name="position"
            placeholder="Position"
            value={experience.position}
            onChange={(e) => onChange(e, index)}
          />
          <div className="flex gap-4">
            <DatePicker
              selected={experience.startDate}
              onChange={(date) => onDateChange(date, index, 'startDate')}
              dateFormat="dd-MM-yyyy"
              placeholderText="Start Date"
              className="w-full p-2 border rounded"
              showYearDropdown
              scrollableYearDropdown
            />
            <DatePicker
              selected={experience.endDate}
              onChange={(date) => onDateChange(date, index, 'startDate')}
              dateFormat="dd-MM-yyyy"
              placeholderText="End Date"
              className="w-full p-2 border rounded"
              showYearDropdown
              scrollableYearDropdown
            />
          </div>
          <textarea
            className="w-full p-2 border rounded"
            name="description"
            placeholder="Job Description"
            value={experience.description}
            onChange={(e) => onChange(e, index)}
          ></textarea>
        </div>
      ))}

      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={addWorkExperience}
      >
        Add Work Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
