# CS:GO Box Opening

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Notes

Stack: Angular 12, Apollo Client, GraphQL, Angular Material UI

The boxes are loaded onto a grid through the GraphQL playground/API. Unfortunately, I could not solve a CORS error regarding redirection to the Steam log-in page (seen in console on page load). I tried to enable CORS through proxy configuration (seen online) to no avail. I have in the past solved it server-side with node/express, but was unable to find a solution in time with this stack. Due to this, I created a "mock box open" with fake rewards alongside the real "open" button & mutation, which, as stated in the console once clicked, is blocked through authentication.

I also filtered the boxes to ones that contained proper loot box thumbnails purely for aesthetics (I hope this is ok). 



