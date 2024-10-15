import React from 'react';
import { PersonalDetails } from '../../types';

interface PersonalDetailsFormProps {
  personalDetails: PersonalDetails;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  personalDetails: { name, email, phone, website, linkedinHandle, professionalTitle, city },
  onChange,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <input className="w-full p-2 border rounded mb-4" type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
      <input className="w-full p-2 border rounded mb-4" type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
      <input className="w-full p-2 border rounded mb-4" type="tel" name="phone" placeholder="Phone" value={phone} onChange={onChange} />
      <input
        className="w-full p-2 border rounded mb-4"
        type="text"
        name="website"
        placeholder="Website"
        value={website}
        onChange={onChange}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        type="text"
        name="linkedinHandle"
        placeholder="Linkedin"
        value={linkedinHandle}
        onChange={onChange}
      />
      <input className="w-full p-2 border rounded mb-4" type="text" name="city" placeholder="City" value={city} onChange={onChange} />
      <input
        className="w-full p-2 border rounded mb-4"
        type="text"
        name="profesionalTitle"
        placeholder="Profesional Title"
        value={professionalTitle}
        onChange={onChange}
      />
    </div>
  );
};

export default PersonalDetailsForm;
