'use client';

import { useState } from 'react';

const initialState = {
  name: '',
  phone: '',
  skill: 'Calisthenics',
  location: 'Warrior Fitflow Sector 141 Noida'
};

export default function EnquiryForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!/^\d{10,15}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Phone number must be 10 to 15 digits.';
    }

    if (!formData.skill) {
      nextErrors.skill = 'Please select a skill.';
    }

    if (!formData.location) {
      nextErrors.location = 'Please select a location.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('idle');

    if (!validate()) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
      setFormData(initialState);
      setErrors({});
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none ring-0 transition focus:border-ember"
          placeholder="Your full name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-ember"
          placeholder="10-15 digit number"
        />
        {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="skill" className="mb-2 block text-sm font-semibold">
          Skill
        </label>
        <select
          id="skill"
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-ember"
        >
          <option>Calisthenics</option>
          <option>MMA</option>
          <option>Both</option>
        </select>
      </div>

      <div>
        <label htmlFor="location" className="mb-2 block text-sm font-semibold">
          Location
        </label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-sm outline-none transition focus:border-ember"
        >
          <option>Warrior Fitflow Sector 141 Noida</option>
          <option>Warrior Fitflow Greater Noida</option>
          <option>Warrior Fitflow Noida Extension Greater Noida</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-ember px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Enquiry'}
      </button>

      {status === 'success' && (
        <p className="text-sm text-emerald-400">Thanks! Your enquiry has been received.</p>
      )}
      {status === 'error' && Object.keys(errors).length === 0 && (
        <p className="text-sm text-red-400">We could not submit your enquiry. Please try again.</p>
      )}
    </form>
  );
}
