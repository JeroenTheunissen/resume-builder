import React from 'react';
import { Skill } from '../../types';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  addSkill: () => void;
}

const CertificatesForm: React.FC<SkillsFormProps> = ({ skills, onChange, addSkill }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>
      {skills.map((skill, index) => (
        <input
          key={index}
          className="w-full p-2 border rounded mb-2"
          type="text"
          placeholder="Skill"
          value={skill.name}
          onChange={(e) => onChange(e, index)}
        />
      ))}
      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={addSkill}
      >
        Add Skill
      </button>
    </div>
  );
};

export default CertificatesForm;
