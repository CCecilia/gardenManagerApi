<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CCecilia/gardenManagerApi">
    <img src="public/images/gardenManagerApiLogo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Garden Manager API</h3>

  <p align="center">
    Backend API repo for the Garden Manager PWA. Which is PWA for tracking garden data then eventually using the data for ai training models.
    <br />
    <a href="https://github.com/CCecilia/gardenManagerApi"><strong>Explore the docs »</strong></a>
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

### Built With

- [![React][react.js]][react-url]
- [![Bootstrap][bootstrap.com]][bootstrap-url]
- [![CreateReactApp][createreactapp.com]][createreactapp-url]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

1. [Node](https://nodejs.org/en/download/)
2. [NPM](https://nodejs.org/en/download/)
3. [Front End Repo](https://github.com/CCecilia/gardenManager)

### Installation

1. Clone the repo

```sh
git clone git@github.com:CCecilia/gardenManagerApi.git
```

2. Change Dir

```sh
cd gardenManagerApi/
```

3. Install Dependencies

```npm
npm install
```

4. Create .env file

```sh
touch .env
```

5. Add the following values for local dev change as needed.

```text
PORT=5000
DB_PASSWORD='somedbpw'
DB_URI='mongoDbUri'
SALT_ROUNDS='someNUMBER'
SESSION_SECRET='somesecret'
TOKEN_SECRET='somesecret'
```

6. Start server

```npm
npm start
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Feature 1

See the [open issues](https://github.com/CCecilia/gardenManagerApi/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Your Name - [@christian3489](https://twitter.com/christian3489) - christian.cecilia1@gmail.com

Project Link: [GardenManager](https://github.com/CCecilia/gardenManagerApi)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- []()
- []()
- []()

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/CCecilia/gardenManagerApi.svg?style=for-the-badge
[contributors-url]: https://github.com/CCecilia/gardenManagerApi/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CCecilia/gardenManagerApi.svg?style=for-the-badge
[forks-url]: https://github.com/CCecilia/gardenManagerApi/network/members
[stars-shield]: https://img.shields.io/github/stars/CCecilia/gardenManagerApi.svg?style=for-the-badge
[stars-url]: https://github.com/CCecilia/gardenManagerApi/stargazers
[issues-shield]: https://img.shields.io/github/issues/CCecilia/gardenManagerApi.svg?style=for-the-badge
[issues-url]: https://github.com/CCecilia/gardenManagerApi/issues
[license-shield]: https://img.shields.io/github/license/CCecilia/gardenManagerApi.svg?style=for-the-badge
[license-url]: https://github.com/CCecilia/gardenManagerApi/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[createreactapp.com]: https://img.shields.io/badge/CreateReactApp-FFF?style=for-the-badge&logo=react&logoColor=09D3AC
[createreactapp-url]: https://create-react-app.dev/
