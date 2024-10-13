import { Language } from '../../types';

interface LanguagesFormProps {
  languages: Language[];
  onChange: (index: number, field: string, value: string) => void;
  addLanguage: () => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ languages, onChange, addLanguage }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Languages</h2>
      {languages.map((language, index) => (
        <div key={index} className="space-y-2 mb-4">
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="Language"
            value={language.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={language.proficiency}
            onChange={(e) => onChange(index, 'proficiency', e.target.value)}
          >
            <option value="Native">Native</option>
            <option value="Full Professional">Full Professional</option>
            <option value="Professional">Professional</option>
            <option value="Limited">Limited</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
      ))}
      <button
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={addLanguage}
      >
        Add Language
      </button>
    </div>
  );
};

export default LanguagesForm;
