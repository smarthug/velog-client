import { useDispatch } from 'react-redux';
import { GET_VELOG_CONFIG, VelogConfig } from '../../../lib/graphql/user';
import { useQuery } from '@apollo/react-hooks';
import { useEffect } from 'react';
import {
  setCustom,
  setVelogUsername,
  setUserLogo,
} from '../../../modules/header';
import { ssrEnabled } from '../../../lib/utils';
import useNotFound from '../../../lib/hooks/useNotFound';

export default function useApplyVelogConfig(username: string) {
  const { showNotFound } = useNotFound();
  const dispatch = useDispatch();
  const { data, error } = useQuery<{ velog_config: VelogConfig }>(
    GET_VELOG_CONFIG,
    {
      variables: {
        username,
      },
    },
  );

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatch(setCustom(true));
    return () => {
      dispatch(setCustom(false));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(setVelogUsername(username));
  }, [dispatch, username]);

  useEffect(() => {
    if (data && data.velog_config === null) {
      showNotFound();
      return;
    }
    if (!data || !data.velog_config) return;
    dispatch(
      setUserLogo({
        title: data.velog_config.title,
        logo_image: data.velog_config.logo_image,
      }),
    );
  }, [data, dispatch, showNotFound]);

  if (data && ssrEnabled) {
    dispatch(setCustom(true));
    dispatch(setVelogUsername(username));
    dispatch(
      setUserLogo({
        title: data.velog_config.title,
        logo_image: data.velog_config.logo_image,
      }),
    );
  }

  if (ssrEnabled && data && data.velog_config === null) {
    showNotFound();
  }
}
