import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';

type SearchFormProps = {
  onSearch: (tid: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { control, handleSubmit } = useForm<{ tid: string }>();

  const onSubmitForm = (data: { tid: string }) => {
    onSearch(data.tid);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="tid"
          control={control}
          defaultValue=""
          rules={{ required: 'TID is required' }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Search by TID"
              variant="outlined"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Box>
    </form>
  );
};

export default SearchForm;
