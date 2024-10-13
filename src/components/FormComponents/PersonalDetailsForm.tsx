import React from 'react';

interface PersonalDetailsFormProps {
  name: string;
  email: string;
  phone: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  name,
  email,
  phone,
  onChange,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <input
        className="w-full p-2 border rounded mb-4"
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        type="tel"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
    </div>
  );
};

export default PersonalDetailsForm;
