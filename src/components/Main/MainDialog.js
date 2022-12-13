import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import countries from '../data/countries';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const MainDialog = (props) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={props.open}
      onClose={props.close}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>{props.formmode ? 'Add New' : 'Update'} User</DialogTitle>
      <ValidatorForm onSubmit={props.addUser}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="First name"
                onChange={props.changefirstname}
                name="firstname"
                value={props.firstname}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Last name"
                onChange={props.changelastname}
                name="lastname"
                value={props.lastname}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>

            {/* Can't convert autocomplete data into the expect value */}
            <Grid item xs={6}>
              <Autocomplete
                id="combo-box-demo"
                options={countries}
                getOptionLabel={(option) => option.label}
                onChange={props.changecountrynew}
                renderInput={(params) => (
                  <TextValidator
                    {...params}
                    value={props.countrynew}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Country"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Country"
                onChange={props.changecountry}
                name="country"
                value={props.country}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
            {/* Can't convert datepicker data into the expect value */}
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={props.datetimenew}
                  onChange={props.changedatetimenew}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Date"
                onChange={props.changedatetime}
                name="date"
                value={props.datetime}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
            {/* Can't convert timepicker data into the expect value */}
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Basic example"
                  value={props.timenew}
                  onChange={props.changetimenew}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      fullWidth
                      label="time"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextValidator
                variant="outlined"
                margin="normal"
                fullWidth
                label="Time"
                onChange={props.changetime}
                name="time"
                value={props.time}
                validators={['required']}
                errorMessages={['this field is required']}
                autoComplete="off"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="secondary">
            {props.formmode ? 'Add' : 'Update'}
          </Button>
          <Button onClick={props.close} color="primary">
            Close
          </Button>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
};

export default MainDialog;
