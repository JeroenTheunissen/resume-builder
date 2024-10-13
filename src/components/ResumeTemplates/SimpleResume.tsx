import { ResumeData } from '../../types';

interface SimpleResumeProps {
  resumeData: ResumeData;
}

const SimpleResume: React.FC<SimpleResumeProps> = ({ resumeData }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Preview</h2>

      <div className="mb-4">
        <p>
          <strong>Name:</strong> {resumeData.personalDetails.name || 'Your name'}
        </p>
        <p>
          <strong>Email:</strong> {resumeData.personalDetails.email || 'Your email'}
        </p>
        <p>
          <strong>Phone:</strong> {resumeData.personalDetails.phone || 'Your phone number'}
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
          <p>Start Date: {experience.startDate ? experience.startDate.toLocaleDateString() : 'N/A'}</p>
          <p>End Date: {experience.endDate ? experience.endDate.toLocaleDateString() : 'N/A'}</p>
          <p>
            <strong>Description:</strong> {experience.description || 'Job description'}
          </p>
        </div>
      ))}

      <h3 className="text-xl font-semibold mb-2">Education</h3>
      {resumeData.education.map((education, index) => (
        <div key={index} className="mb-4">
          <p>
            <strong>Company:</strong> {education.institution || 'Institution name'}
          </p>

          <p>Start Date: {education.startDate ? education.startDate.toLocaleDateString() : 'N/A'}</p>
          <p>End Date: {education.endDate ? education.endDate.toLocaleDateString() : 'N/A'}</p>
          <p>
            <strong>Description:</strong> {education.description || 'Education description'}
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
    </>
  );
};

export default SimpleResume;
