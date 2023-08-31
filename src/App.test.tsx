import React from 'react';
import {act, render, screen} from '@testing-library/react';
import App from "./App";
import {Simulate} from "react-dom/test-utils";
import click = Simulate.click;

test('when clicking on Bulbizarre redirects to /1 (Bulbizarre id)', async () => {
  render(<App/>);
  const linkElement = await screen.findByText("Bulbizarre");
  act(() => {
    linkElement.click();
  })
  expect(document.location.pathname).toEqual('/1')
});

test('when clicking on favorite icon should fill the icon', async () => {
  render(<App/>);
  const linkElement = await screen.findByText("Bulbizarre");
  act(() => {
    linkElement.click();
  })
  const favoriteBorderIcon = await screen.findByTestId("FavoriteBorderIcon");
  act(() => {
    click(favoriteBorderIcon)
  })
  const favoriteFilledIcon = await screen.findByTestId("FavoriteIcon");
  expect(favoriteFilledIcon).toBeInTheDocument();
});
