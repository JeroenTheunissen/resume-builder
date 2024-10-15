import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ResumeData } from './types';
import PersonalDetailsForm from './components/FormComponents/PersonalDetailsForm';
import SummaryForm from './components/FormComponents/SummaryForm';
import WorkExperienceForm from './components/FormComponents/WorkExperienceForm';
import EducationForm from './components/FormComponents/EducationForm';
import CertificatesForm from './components/FormComponents/CertificatesForm';
import SkillsForm from './components/FormComponents/SkillsForm';
import LanguagesForm from './components/FormComponents/LanguagesForm';
import SimpleResume from './components/ResumeTemplates/SimpleResume';

const App: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const [isLoading, setIsLoading] = useState(true);
  const [showSimpleTemplate, setShowSimpleTemplate] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Arial');

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
  };

  const fontOptions = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Tahoma', 'Roboto'];

  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: { name: '', email: '', phone: '', website: '', linkedinHandle: '', city: '', professionalTitle: '' },
    summary: '',
    workExperience: [{ company: '', position: '', startDate: null, endDate: null, description: '' }],
    education: [{ institution: '', startDate: null, endDate: null, description: '' }],
    certificates: [{ name: '' }],
    skills: [{ name: '' }],
    languages: [{ name: '', proficiency: 'Basic' }],
  });

  const toggleTemplate = () => {
    setShowSimpleTemplate(!showSimpleTemplate);
  };

  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      personalDetails: { ...resumeData.personalDetails, [e.target.name]: e.target.value },
    });
  };

  const handleSummary = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData({
      ...resumeData,
      summary: e.target.value,
    });
  };

  const handleWorkExperienceDateChange = (date: Date | null, index: number, field: string) => {
    const updatedWorkExperience = resumeData.workExperience.map((experience, i) =>
      i === index ? { ...experience, [field]: date } : experience,
    );
    setResumeData({ ...resumeData, workExperience: updatedWorkExperience });
  };

  const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedWorkExperience = resumeData.workExperience.map((experience, i) =>
      i === index ? { ...experience, [name]: value } : experience,
    );
    setResumeData({ ...resumeData, workExperience: updatedWorkExperience });
  };

  const addWorkExperience = () => {
    setResumeData({
      ...resumeData,
      workExperience: [...resumeData.workExperience, { company: '', position: '', startDate: null, endDate: null, description: '' }],
    });
  };

  const handleEducationDateChange = (date: Date | null, index: number, field: string) => {
    const updatedEducation = resumeData.education.map((education, i) => (i === index ? { ...education, [field]: date } : education));
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const { name, value } = e.target;
    const updatedEducation = resumeData.education.map((education, i) => (i === index ? { ...education, [name]: value } : education));
    setResumeData({ ...resumeData, education: updatedEducation });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { institution: '', startDate: null, endDate: null, description: '' }],
    });
  };

  const handleCertificatesChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedSkills = resumeData.skills.map((skill, i) => (i === index ? { ...skill, name: e.target.value } : skill));
    setResumeData({ ...resumeData, skills: updatedSkills });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, { name: '' }],
    });
  };

  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updatedLanguages = resumeData.languages.map((language, i) => (i === index ? { ...language, [field]: value } : language));
    setResumeData({ ...resumeData, languages: updatedLanguages });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [...resumeData.languages, { name: '', proficiency: 'Basic' }],
    });
  };

  const validateForm = () => {
    if (!resumeData.personalDetails.name || !resumeData.personalDetails.email || !resumeData.personalDetails.phone) {
      alert('Please fill out the required personal details.');
      return false;
    }

    if (resumeData.workExperience.some((experience) => !experience.company || !experience.position)) {
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
    if (data.personalDetails.name || data.personalDetails.email || data.personalDetails.phone) {
      localStorage.setItem('resumeData', JSON.stringify(data));
    }
    if (data.workExperience.some((experience) => experience.company || experience.position)) {
      localStorage.setItem('resumeData', JSON.stringify(data));
    }
  };
  const loadFromLocalStorage = (): ResumeData | null => {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      const parsedData: ResumeData = JSON.parse(savedData);

      parsedData.workExperience = parsedData.workExperience.map((experience) => ({
        ...experience,
        startDate: experience.startDate ? new Date(experience.startDate) : null,
        endDate: experience.endDate ? new Date(experience.endDate) : null,
      }));

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
    if (!resumeData.personalDetails.name && !resumeData.personalDetails.email && !resumeData.personalDetails.phone) {
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
      <button type="button" className="bg-blue-500 text-white py-2 px-4 mb-3 rounded hover:bg-blue-600 transition" onClick={toggleTemplate}>
        {showSimpleTemplate ? 'Hide Resume Template' : 'Show Resume Template'}
      </button>

      <div className="flex justify-center">
        {!showSimpleTemplate && (
          <form className="bg-white p-6 rounded-lg shadow-md space-y-6 md:w-[850px]">
            <PersonalDetailsForm personalDetails={resumeData.personalDetails} onChange={handlePersonalDetailsChange} />
            <SummaryForm onChange={handleSummary} summary={resumeData.summary} />

            <WorkExperienceForm
              onChange={handleWorkExperienceChange}
              onDateChange={handleWorkExperienceDateChange}
              workExperience={resumeData.workExperience}
              addWorkExperience={addWorkExperience}
            />

            <EducationForm
              onChange={handleEducationChange}
              onDateChange={handleEducationDateChange}
              education={resumeData.education}
              addEducation={addEducation}
            />

            <CertificatesForm onChange={handleCertificatesChange} certificates={resumeData.certificates} addCertificate={addCertificate} />

            <SkillsForm onChange={handleSkillChange} addSkill={addSkill} skills={resumeData.skills} />

            <LanguagesForm onChange={handleLanguageChange} addLanguage={addLanguage} languages={resumeData.languages} />
          </form>
        )}

        {showSimpleTemplate && (
          <div>
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
            <div className="mb-4">
              <label htmlFor="font" className="mr-2 font-bold">
                Choose Font:
              </label>
              <select id="font" value={selectedFont} onChange={handleFontChange} className="p-2 border rounded">
                {fontOptions.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div ref={contentRef}>
              <SimpleResume selectedFont={selectedFont} resumeData={resumeData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
