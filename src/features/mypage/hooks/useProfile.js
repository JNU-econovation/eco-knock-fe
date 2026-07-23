import { useEffect, useState } from 'react';
import { getMyProfile } from '../api/profileApi';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadProfile = async () => {
      try {
        const response = await getMyProfile(controller.signal);

        if (isActive) setProfile(response.data.result ?? null);
      } catch {
        // The shared API client handles request errors.
      }
    };

    loadProfile();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  return profile;
};
