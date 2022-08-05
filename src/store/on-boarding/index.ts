import { getValueBykey } from '@/utils/storage-utils';
import { useEffect, useState } from 'react';

const KEY_USER = 'key_user';

function useOnBoarding(global: Record<string, any>) {
  const { setLoading } = global;
  const [hasSubmited, setHasSubmited] = useState<boolean>(false);
  const [setBoradingData] = useState<Record<string, any>>();

  useEffect(() => {
    const userValue = getValueBykey(KEY_USER);
    if (userValue) {
      setHasSubmited(true);
      setLoading(true);
    } else {
      setHasSubmited(false);
      setLoading(false);
    }
  }, []);

  const submitBoarding = (values) => {};

  return {
    submitBoarding,
    hasSubmited,
  };
}

export default useOnBoarding;
