import React, { forwardRef } from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/lib/switch';

interface IProps extends SwitchProps {
  value?: number | undefined;
  onChange?: (checked: boolean) => void;
}

export const SwitchNumber = forwardRef((props: IProps, ref: React.Ref<any>) => {
  return <Switch checked={Boolean(props.value)} onChange={props.onChange} {...props} ref={ref} />;
});
