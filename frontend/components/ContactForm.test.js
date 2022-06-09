import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  render(<ContactForm />);

  const headerElement = screen.queryByText(/contact form/i);

  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toBeTruthy();
  expect(headerElement).toHaveTextContent(/contact form/i);


});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />);

  const input = screen.getByLabelText(/First Name*/i);
  userEvent.type(input, "123");

  const errorMessage = await screen.findAllByTestId('error');
  expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole("button");
  userEvent.click(submitButton);

  await waitFor(() => {
    const errorMessage = screen.queryAllByTestId('error');
    expect(errorMessage).toHaveLength(3);
  });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);

  const firstNameField = screen.getByLabelText(/first name*/i);
  userEvent.type(firstNameField, 'justin');
  const lastNameField = screen.getByLabelText(/last name*/i);
  userEvent.type(lastNameField, 'rivera');

  const button = screen.getByRole('button');
  userEvent.click(button);

  const errorMessage = await screen.getAllByTestId("error");
  expect(errorMessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  //render the component you're testing
  render(<ContactForm />);

  //create a testing email button by grabbing the label
  const emailField = screen.getByLabelText(/email*/i);

  //have the user type something that is invalid
  userEvent.type(emailField, 'justin');

  //await error message
  const errorMessage = await screen.findByText(/email must be a valid email address./i);

  //expect error message to be in the document
  expect(errorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  //render component you're working on
  render(<ContactForm />);

  //create a submit button by placing it into a variable
  const submitButton = screen.getByRole("button");

  //have the user click the test button
  userEvent.click(submitButton);

  //await error message
  const errorMessage = await screen.findByText(/lastName is a required field/i);
  expect(errorMessage).toBeInTheDocument();
  
 });

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />);

  const firstName = screen.getByLabelText(/first name/i);
  const lastNameField = screen.getByLabelText(/last name*/i);
  const emailField = screen.getByLabelText(/email*/i);

  userEvent.type(firstName, 'justin');
  userEvent.type(lastNameField, 'rivera');
  userEvent.type(emailField, 'justinrivera47@gmail.com');

  
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  await waitFor(() => {
    const firstNameDisplay = screen.queryByText('justin');
    const lastNameDisplay = screen.queryByText('rivera');
    const emailDisplay = screen.queryByText('justinrivera47@gmail.com');
    const messageDisplay = screen.queryByTestId('messageDisplay');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();

    expect(messageDisplay).not.toBeInTheDocument();


  });
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />);

  const firstName = screen.getByLabelText(/first name/i);
  const lastNameField = screen.getByLabelText(/last name*/i);
  const emailField = screen.getByLabelText(/email*/i);
  const messageField = screen.getByLabelText(/message/i);


  userEvent.type(firstName, 'justin');
  userEvent.type(lastNameField, 'rivera');
  userEvent.type(emailField, 'justinrivera47@gmail.com');
  userEvent.type(messageField, 'messaging text');


  
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  await waitFor(() => {
    const firstNameDisplay = screen.queryByText('justin');
    const lastNameDisplay = screen.queryByText('rivera');
    const emailDisplay = screen.queryByText('justinrivera47@gmail.com');
    const messageDisplay = screen.queryByText('messaging text');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();


  });
});