import { useState } from 'react';

const INITIAL_FORM = {
  name: '',
  category: '부서',
  description: '',
  recruitmentStartDate: '',
  recruitmentEndDate: '',
  memberLimit: 10,
};

export const useGroupCreateForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return { form, updateField };
};
