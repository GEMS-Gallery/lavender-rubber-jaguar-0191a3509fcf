import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type TaxPayer = {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
};

type TaxPayerFormProps = {
  onSubmit: (data: TaxPayer) => void;
};

const TaxPayerForm: React.FC<TaxPayerFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<TaxPayer>();

  const onSubmitForm = (data: TaxPayer) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Controller
          name="tid"
          control={control}
          defaultValue=""
          rules={{ required: 'TID is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="TID"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{ required: 'First Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="First Name"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: 'Last Name is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Last Name"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: 'Address is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Add TaxPayer
        </Button>
      </Box>
    </form>
  );
};

export default TaxPayerForm;
