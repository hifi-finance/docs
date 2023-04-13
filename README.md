# Hifi Docs

Contributing to the Hifi docs is a great way to get involved in the dev community and help other people along the way.

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Prerequisites

- NVM
- Yarn package manager

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/hifi-finance/docs.git
$ cd docs
```

2. Set the version of Node to use locally within the project:

```bash
$ nvm use
```

3. Install the dependencies with Yarn:

```bash
$ yarn install
```

## Local Development

```bash
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
