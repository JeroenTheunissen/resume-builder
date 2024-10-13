import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useReactToPrint } from 'react-to-print';
import { ResumeData } from './types';

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [isLoading, setIsLoading] = useState(true);

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: {
      name: '',
      email: '',
      phone: '',
    },
    summary: '',
    workExperience: [
      {
        company: '',
        position: '',
        startDate: null,
        endDate: null,
        description: '',
      },
    ],
    education: [
      {
        institution: '',
        startDate: null,
        endDate: null,
        description: '',
      },
    ],
    certificates: [
      {
        name: '',
      },
    ],
    skills: [
      {
        name: '',
      },
    ],
    languages: [
      {
        name: '',
        proficiency: 'Basic',
      },
    ],
  });

  const handlePersonalDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setResumeData({
      ...resumeData,
      personalDetails: {
        ...resumeData.personalDetails,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value,
    });
  };

  const handleWorkExperienceDateChange = (
    date: Date | null,
    index: number,
    field: string,
  ) => {
    const updatedWorkExperience = resumeData.workExperience.map(
      (experience, i) =>
        i === index ? { ...experience, [field]: date } : experience,
    );
    setResumeData({ ...resumeData, workExperience: updatedWorkExperience });
  };

  const handleWorkExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const updatedWorkExperience = resumeData.workExperience.map(
      (experience, i) =>
        i === index ? { ...experience, [name]: value } : experience,
    );
    setResumeData({ ...resumeData, workExperience: updatedWorkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [
        ...resumeData.workExperience,
        {
          company: '',
          position: '',
          startDate: null,
          endDate: null,
          description: '',
        },
      ],
    });
  };

  const handleEducationDateChange = (
    date: Date | null,
    index: number,
    field: string,
  ) => {
    const updatedEducation = resumeData.education.map((education, i) =>
      i === index ? { ...education, [field]: date } : education,
    );
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const handleEducationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const updatedEducation = resumeData.education.map((education, i) =>
      i === index ? { ...education, [name]: value } : education,
    );
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          institution: '',
          startDate: null,
          endDate: null,
          description: '',
        },
      ],
    });
  };

  const handleCertificatesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedCertificates = resumeData.certificates.map((certificate, i) =>
      i === index ? { ...certificate, name: e.target.value } : certificate,
    );
    setResumeData({ ...resumeData, certificates: updatedCertificates });
  };

  const addCertificate = () => {
    setResumeData({
      ...resumeData,
      certificates: [...resumeData.certificates, { name: '' }],
    });
  };

  const handleSkillChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const updatedSkills = resumeData.skills.map((skill, i) =>
      i === index ? { ...skill, name: e.target.value } : skill,
    );
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { name: '' }],
    });
  };

  const handleLanguageChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedLanguages = resumeData.languages.map((language, i) =>
      i === index ? { ...language, [field]: value } : language,
    );
    setResumeData({ ...resumeData, languages: updatedLanguages });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, { name: '', proficiency: 'Basic' }],
    });
  };

  const validateForm = () => {
    if (
      !resumeData.personalDetails.name ||
      !resumeData.personalDetails.email ||
      !resumeData.personalDetails.phone
    ) {
      alert('Please fill out the required personal details.');
      return false;
    }

    if (
      resumeData.workExperience.some(
        (experience) => !experience.company || !experience.position,
      )
    ) {
      alert('Please fill out all required fields for work experience.');
      return false;
    }

    if (resumeData.education.some((education) => !education.institution)) {
      alert('Please fill out all required fields for education.');
      return false;
    }

    return true;
  };

  const saveToLocalStorage = (data: ResumeData) => {
    if (
      data.personalDetails.name ||
      data.personalDetails.email ||
      data.personalDetails.phone
    ) {
      localStorage.setItem('resumeData', JSON.stringify(data));
    }
    if (
      data.workExperience.some(
        (experience) => experience.company || experience.position,
      )
    ) {
      localStorage.setItem('resumeData', JSON.stringify(data));
    }
  };
  const loadFromLocalStorage = (): ResumeData | null => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      const parsedData: ResumeData = JSON.parse(savedData);

      parsedData.workExperience = parsedData.workExperience.map(
        (experience) => ({
          ...experience,
          startDate: experience.startDate
            ? new Date(experience.startDate)
            : null,
          endDate: experience.endDate ? new Date(experience.endDate) : null,
        }),
      );

      parsedData.education = parsedData.education.map((education) => ({
        ...education,
        startDate: education.startDate ? new Date(education.startDate) : null,
        endDate: education.endDate ? new Date(education.endDate) : null,
      }));

      return parsedData;
    }
    return null;
  };

  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      setResumeData(savedData);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (
      !resumeData.personalDetails.name &&
      !resumeData.personalDetails.email &&
      !resumeData.personalDetails.phone
    ) {
      return;
    }

    saveToLocalStorage(resumeData);
  }, [resumeData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
          <input
            className="w-full p-2 border rounded mb-4"
            type="text"
            name="name"
            placeholder="Name"
            value={resumeData.personalDetails.name}
            onChange={handlePersonalDetailsChange}
          />
          <input
            className="w-full p-2 border rounded mb-4"
            type="email"
            name="email"
            placeholder="Email"
            value={resumeData.personalDetails.email}
            onChange={handlePersonalDetailsChange}
          />
          <input
            className="w-full p-2 border rounded mb-4"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={resumeData.personalDetails.phone}
            onChange={handlePersonalDetailsChange}
          />

          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <textarea
            className="w-full p-2 border rounded mb-4"
            name="summary"
            placeholder="Summary"
            value={resumeData.summary}
            onChange={handleSummary}
          />

          <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
          {resumeData.workExperience.map((experience, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                className="w-full p-2 border rounded"
                type="text"
                name="company"
                placeholder="Company"
                value={experience.company}
                onChange={(e) => handleWorkExperienceChange(e, index)}
              />
              <input
                className="w-full p-2 border rounded"
                type="text"
                name="position"
                placeholder="Position"
                value={experience.position}
                onChange={(e) => handleWorkExperienceChange(e, index)}
              />
              <div className="flex gap-4">
                <DatePicker
                  selected={experience.startDate}
                  onChange={(date) =>
                    handleWorkExperienceDateChange(date, index, 'startDate')
                  }
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Start Date"
                  className="w-full p-2 border rounded"
                  showYearDropdown
                  scrollableYearDropdown
                />
                <DatePicker
                  selected={experience.endDate}
                  onChange={(date) =>
                    handleWorkExperienceDateChange(date, index, 'endDate')
                  }
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
                onChange={(e) => handleWorkExperienceChange(e, index)}
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

          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          {resumeData.education.map((education, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                className="w-full p-2 border rounded"
                type="text"
                name="institution"
                placeholder="Institution"
                value={education.institution}
                onChange={(e) => handleEducationChange(e, index)}
              />

              <div className="flex gap-4">
                <DatePicker
                  selected={education.startDate}
                  onChange={(date) =>
                    handleEducationDateChange(date, index, 'startDate')
                  }
                  dateFormat="dd-MM-yyyy"
                  placeholderText="Start Date"
                  className="w-full p-2 border rounded"
                  showYearDropdown
                  scrollableYearDropdown
                />
                <DatePicker
                  selected={education.endDate}
                  onChange={(date) =>
                    handleEducationDateChange(date, index, 'endDate')
                  }
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
                placeholder="Education Description"
                value={education.description}
                onChange={(e) => handleEducationChange(e, index)}
              ></textarea>
            </div>
          ))}

          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={addEducation}
          >
            Add Education
          </button>

          <h2 className="text-2xl font-semibold mb-4">Certificates</h2>
          {resumeData.certificates.map((certificate, index) => (
            <input
              key={index}
              className="w-full p-2 border rounded mb-2"
              type="text"
              placeholder="Skill"
              value={certificate.name}
              onChange={(e) => handleCertificatesChange(e, index)}
            />
          ))}
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={addCertificate}
          >
            Add Certificate
          </button>

          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          {resumeData.skills.map((skill, index) => (
            <input
              key={index}
              className="w-full p-2 border rounded mb-2"
              type="text"
              placeholder="Skill"
              value={skill.name}
              onChange={(e) => handleSkillChange(e, index)}
            />
          ))}
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={addSkill}
          >
            Add Skill
          </button>

          <h2 className="text-2xl font-semibold mb-4">Languages</h2>
          {resumeData.languages.map((language, index) => (
            <div key={index} className="space-y-2 mb-4">
              <input
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Language"
                value={language.name}
                onChange={(e) =>
                  handleLanguageChange(index, 'name', e.target.value)
                }
              />
              <select
                className="w-full p-2 border rounded"
                value={language.proficiency}
                onChange={(e) =>
                  handleLanguageChange(index, 'proficiency', e.target.value)
                }
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
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={() => {
              if (validateForm()) {
                reactToPrintFn();
              }
            }}
          >
            Export as PDF
          </button>
        </form>

        <div ref={contentRef} className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>

          <div className="mb-4">
            <p>
              <strong>Name:</strong>{' '}
              {resumeData.personalDetails.name || 'Your name'}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              {resumeData.personalDetails.email || 'Your email'}
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              {resumeData.personalDetails.phone || 'Your phone number'}
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p>{resumeData.summary || 'No summary added yet.'}</p>

          <h3 className="text-xl font-semibold mb-2">Work Experience</h3>
          {resumeData.workExperience.map((experience, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Company:</strong> {experience.company || 'Company name'}
              </p>
              <p>
                <strong>Position:</strong> {experience.position || 'Position'}
              </p>
              <p>
                Start Date:{' '}
                {experience.startDate
                  ? experience.startDate.toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                End Date:{' '}
                {experience.endDate
                  ? experience.endDate.toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {experience.description || 'Job description'}
              </p>
            </div>
          ))}

          <h3 className="text-xl font-semibold mb-2">Education</h3>
          {resumeData.education.map((education, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Company:</strong>{' '}
                {education.institution || 'Institution name'}
              </p>

              <p>
                Start Date:{' '}
                {education.startDate
                  ? education.startDate.toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                End Date:{' '}
                {education.endDate
                  ? education.endDate.toLocaleDateString()
                  : 'N/A'}
              </p>
              <p>
                <strong>Description:</strong>{' '}
                {education.description || 'Education description'}
              </p>
            </div>
          ))}

          <h3 className="text-xl font-semibold mb-2">Certificates</h3>
          {resumeData.certificates.map((certificate, index) => (
            <p key={index}>
              <strong>Certificate:</strong> {certificate.name}
            </p>
          ))}

          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          {resumeData.skills.map((skill, index) => (
            <p key={index}>
              <strong>Skill:</strong> {skill.name}
            </p>
          ))}

          <h3 className="text-xl font-semibold mb-2">Languages</h3>
          {resumeData.languages.map((language, index) => (
            <div key={index} className="mb-4">
              <p>
                <strong>Language:</strong> {language.name}
              </p>
              <p>
                <strong>Proficiency:</strong> {language.proficiency}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
