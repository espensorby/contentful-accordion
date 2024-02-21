import React from 'react'; 
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';
import App from './App';
import { GET_FAQDATA } from './pages/queries';

const mocks = [
  {
    request: {
      query: GET_FAQDATA,
    },
    result: {
      data: {
        accordionCollection: {
          items: [
            {
              internalName: "FAQ",
              title: "Spørsmål og svar",
              accordionItemsCollection: {
                items: [
                  {
                    sys: {
                      id: "3A2f65SrmZ2fGvr0KA9ERY"
                    },
                    name: "Heading 1",
                    text: "Content 1"
                  },
                  {
                    sys: {
                      id: "2rTgZMaaOntSsC1c5owFgn"
                    },
                    name: "Heading 2",
                    text: "Content 2"
                  },
                ]
              }
            },
          ]
        }
      }
    },
  },
];

const errorMocks = [
  {
    request: {
      query: GET_FAQDATA,
    },
    error: new Error('Sorry, there seems to be a network issue. Please check your connection and try again'),
  },
];

test('renders FAQ text', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const linkElement = await screen.findByText(/FAQ/i);
  expect(linkElement).toBeInTheDocument();
});

test('only one accordion item can be open at a time', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const accordionItem1 = await screen.findByRole('heading', { name: /Heading 1/i });
  const detailsElement1 = accordionItem1.closest('details');

  const accordionItem2 = await screen.findByRole('heading', { name: /Heading 2/i });
  const detailsElement2 = accordionItem2.closest('details');

  // Initially, both items are closed
  expect(detailsElement1).toHaveProperty('open', false);
  expect(detailsElement2).toHaveProperty('open', false);

  // Open the first item
  userEvent.click(accordionItem1);
  await waitFor(() => expect(detailsElement1).toHaveProperty('open', true));

  // The second item is still closed
  expect(detailsElement2).toHaveProperty('open', false);

  // Open the second item
  userEvent.click(accordionItem2);
  await waitFor(() => expect(detailsElement2).toHaveProperty('open', true));

  // The first item is now closed
  expect(detailsElement1).toHaveProperty('open', false);
});

test('accordion item displays content when open and hides content when closed', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const accordionItem = await screen.findByRole('heading', { name: /Heading 1/i });
  const detailsElement = accordionItem.closest('details');
  
  // Check that content is not displayed when item is closed
  expect(screen.queryByText(/Content 1/i)).not.toBeInTheDocument();

  // Open the item
  userEvent.click(accordionItem);
  await waitFor(() => expect(detailsElement).toHaveProperty('open', true));

  // Check that content is displayed when item is open
  expect(screen.getByText(/Content 1/i)).toBeInTheDocument();

  // Close the item
  userEvent.click(accordionItem);
  await waitFor(() => expect(detailsElement).toHaveProperty('open', false));

  // Check that content is not displayed when item is closed
  expect(screen.queryByText(/Content 1/i)).not.toBeInTheDocument();
});

test('displays an error message on failed query', async () => {
  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  // Wait for the error message to be displayed
  const errorMessage = await screen.findByText(/Sorry, there seems to be a network issue. Please check your connection and try again./i);
  expect(errorMessage).toBeInTheDocument();
});
