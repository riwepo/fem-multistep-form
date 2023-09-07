# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![](./screenshot/screenshot.png?raw=true)

### Links

- Solution URL: [https://github.com/riwepo/fem-multistep-form](https://github.com/riwepo/fem-multistep-form)
- Live Site URL: [https://riwepo.github.io/fem-multistep-form/](https://riwepo.github.io/fem-multistep-form/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React Testing Library](https://testing-library.com/docs/react-testing-library) - JS testing library

### What I learned

For this challenge I tried to once again to use the principles learned from Kevin Powel.
The trickiest part was to organise the state shared between the components as the user moved forward and back between the forms.
I used React Context for this.
In this challenge I created unit tests for all my components and helper functions. I learned a lot from doing this, creating the tests is often more difficult than writing the code itself.

## Author

- Frontend Mentor - [@riwepo](https://www.frontendmentor.io/profile/riwepo)
