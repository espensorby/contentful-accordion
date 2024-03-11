import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { GET_FAQDATA } from './pages/queries';
import App from './App';

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
      },
      delay: 1000,
    },
  },
];

it('renders FAQ text', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const linkElement = await screen.findByText(/FAQ/i);
  expect(linkElement).toBeVisible();
});

it('only one accordion item can be open at a time', async () => {
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

it('accordion item displays content when open and hides content when closed', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const accordionItem = await screen.findByRole('heading', { name: /Heading 1/i });
  const detailsElement = accordionItem.closest('details');

  // Initially, the item is closed and its content is hidden
  expect(detailsElement).toHaveProperty('open', false);
  expect(screen.queryByText(/Content 1/i)).toBeNull();

  // Open the item
  userEvent.click(accordionItem);
  await waitFor(() => expect(detailsElement).toHaveProperty('open', true));

  // The item's content is now visible
  expect(screen.getByText(/Content 1/i)).toBeVisible();

  // Close the item
  userEvent.click(accordionItem);
  await waitFor(() => expect(detailsElement).toHaveProperty('open', false));

  // The item's content is now hidden
  expect(screen.queryByText(/Content 1/i)).toBeNull();
});

it('displays a loading message while fetching data', async () => {
  
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  // Check that the loading message is displayed
  expect(screen.getByText(/loading/i)).toBeVisible();

  // Wait for the query to complete
  await screen.findByText(/FAQ/i);
});


it('displays an error message if the query fails', async () => {
  const errorMocks = [
    {
      request: {
        query: GET_FAQDATA,
      },
      error: new Error('An error occurred'),
    },
  ];

  render(
    <MockedProvider mocks={errorMocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  // Check that the error message is displayed
  expect(await screen.findByText(/error/i)).toBeVisible();
});
