import { useState } from 'react';

function useEmergencyContact() {
  const [emergencyExtraCount, setEmergencyExtraCount] = useState<string[]>([]);

  const addEmergencyExtra = () => {
    setEmergencyExtraCount((prev) => [...prev, `emerg-${Date.now()}`]);
  };

  const delEmergencyExtra = (id: string) => {
    if (emergencyExtraCount.includes(id)) {
      setEmergencyExtraCount((prev) => prev.filter((it) => it !== id));
    }
  };

  return {
    emergencyExtraCount,
    addEmergencyExtra,
    delEmergencyExtra,
  };
}

export default useEmergencyContact;
