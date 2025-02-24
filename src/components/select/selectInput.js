import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';
import { AnimatePresence, motion } from 'framer-motion';
import { MdError } from 'react-icons/md';

import { findInputError, isFormInvalid } from '~/utils';
import classNames from 'classnames/bind';
import style from './input.module.scss';

const cx = classNames.bind(style);

export const SelectInput = ({ name, label, options, id, validation }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const inputErrors = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputErrors);

  return (
    <div className={cx('input-item')}>
      <div className={cx('input-header')}>
        <label htmlFor={id} className={cx('label')}>
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && <InputError message={inputErrors.error.message} key={inputErrors.error.message} />}
        </AnimatePresence>
      </div>
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => <Select {...field} options={options} className={cx('customSelect')} />}
      />
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p className={cx('input-error')} {...framer_error}>
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
