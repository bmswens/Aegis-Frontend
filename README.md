# Aegis-Frontend
[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://bmswens.github.io/Aegis-Frontend/)
[![Test](https://github.com/bmswens/Aegis-Frontend/actions/workflows/test.yml/badge.svg)](https://github.com/bmswens/Aegis-Frontend/actions/workflows/test.yml)
[![Coverage Status](https://coveralls.io/repos/github/bmswens/Aegis-Frontend/badge.svg?branch=main)](https://coveralls.io/github/bmswens/Aegis-Frontend?branch=main)
[![Deploy](https://github.com/bmswens/Aegis-Frontend/actions/workflows/deploy.yml/badge.svg)](https://github.com/bmswens/Aegis-Frontend/actions/workflows/deploy.yml)

---

## About

Aegis is a way to ensure the safety of your most important asset, people.

This application aims to provide a way to manage employee contact info, org charts, and initiate recalls to ensure the safety of your people.

It is designed to be crowd-sourced, meaning individuals have control over their own information.

## Live Demo

Play with the application [here](https://bmswens.github.io/Aegis-Frontend/).

## Deploying
*Coming soon*

## Built with

* [NodeJS](https://nodejs.org/)
* [React](https://reactjs.org/)
* [Material-UI](https://material-ui.com/)

## Authors

* **Brandon Swenson**- *Initial work* - [bmswens](https://github.com/bmswens)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Design Choices
- Why write a custom `<APIContextProvider>` over using [Dexie's `useLiveQuery()`](https://dexie.org/docs/dexie-react-hooks/useLiveQuery())?
  - It will provide an easier interface to integrate in with a custom backend, once that's built.