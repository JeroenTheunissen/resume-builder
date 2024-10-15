import { useState } from 'react';
import { ResumeData } from '../../types';
import PersonalDetailsSection from '../ResumeComponents/PersonalDetailsSection';
import SummarySection from '../ResumeComponents/SummarySection';
import WorkExperienceSection from '../ResumeComponents/WorkExperienceSection';
import EducationSection from '../ResumeComponents/EducationSection';
import CertificatesSection from '../ResumeComponents/CertificatesSection';
import SkillsSection from '../ResumeComponents/SkillsSectionComponents';
import LanguagesSection from '../ResumeComponents/LanguagesSection';

interface SimpleResumeProps {
  resumeData: ResumeData;
  selectedFont: string;
}

const SimpleResume: React.FC<SimpleResumeProps> = ({ resumeData, selectedFont }) => {
  const A4_PAGE_HEIGHT = 1025;

  const [personalDetailsHeight, setPersonalDetailsHeight] = useState<number>(0);
  const [summaryHeight, setSummaryHeight] = useState<number>(0);
  const [workExperienceHeight, setWorkExperienceHeight] = useState<number>(0);
  const [educationHeight, setEducationHeight] = useState<number>(0);
  const [certificatesHeight, setCertificatesHeight] = useState<number>(0);
  const [skillsHeight, setSkillsHeight] = useState<number>(0);
  const [languagesHeight, setLanguagesHeight] = useState<number>(0);

  const handlePersonalDetailsHeight = (height: number) => setPersonalDetailsHeight(height);
  const handleSummaryHeight = (height: number) => setSummaryHeight(height);
  const handleWorkExperienceHeight = (height: number) => setWorkExperienceHeight(height);
  const handleEducationHeight = (height: number) => setEducationHeight(height);
  const handleCertificatesHeight = (height: number) => setCertificatesHeight(height);
  const handleSkillsHeight = (height: number) => setSkillsHeight(height);
  const handleLanguagesHeight = (height: number) => setLanguagesHeight(height);

  const sections = [
    {
      id: 'personalDetails',
      height: personalDetailsHeight,
      component: <PersonalDetailsSection personalDetails={resumeData.personalDetails} onHeightChange={handlePersonalDetailsHeight} />,
    },
    {
      id: 'summary',
      height: summaryHeight,
      component: <SummarySection summary={resumeData.summary} onHeightChange={handleSummaryHeight} />,
    },
    {
      id: 'workExperience',
      height: workExperienceHeight,
      component: <WorkExperienceSection workExperience={resumeData.workExperience} onHeightChange={handleWorkExperienceHeight} />,
    },
    {
      id: 'education',
      height: educationHeight,
      component: <EducationSection education={resumeData.education} onHeightChange={handleEducationHeight} />,
    },
    {
      id: 'certificates',
      height: certificatesHeight,
      component: <CertificatesSection certificates={resumeData.certificates} onHeightChange={handleCertificatesHeight} />,
    },
    { id: 'skills', height: skillsHeight, component: <SkillsSection skills={resumeData.skills} onHeightChange={handleSkillsHeight} /> },
    {
      id: 'languages',
      height: languagesHeight,
      component: <LanguagesSection languages={resumeData.languages} onHeightChange={handleLanguagesHeight} />,
    },
  ];

  let currentPage: JSX.Element[] = [];
  let currentPageHeight = 0;
  const pages: JSX.Element[][] = [];

  sections.forEach((section) => {
    if (currentPageHeight + section.height <= A4_PAGE_HEIGHT) {
      currentPage.push(section.component);
      currentPageHeight += section.height;
    } else {
      pages.push(currentPage);
      currentPage = [section.component];
      currentPageHeight = section.height;
    }
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return (
    <div style={{ fontFamily: selectedFont }}>
      {pages.map((pageSections, pageIndex) => (
        <div key={pageIndex} className="page bg-white p-6 w-[210mm] h-[297mm] mb-8 shadow-md">
          {pageSections.map((Component, index) => (
            <div key={index}>{Component}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SimpleResume;
