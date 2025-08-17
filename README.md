# Blackbird UAV Website

<div align="center">
   
![image](https://github.com/user-attachments/assets/53425d02-3118-4149-bd47-0a7f639d4f4b)

[![Release](https://img.shields.io/badge/v1.4.9-306998?style=for-the-badge&logo=Release&label=Release&labelColor=4D4D4D)](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/releases)
[![Deploy to FTP](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/actions/workflows/deployMain.yml/badge.svg)](https://github.com/Blackbird-UAV/BlackbirdUAV-Website/actions/workflows/deployMain.yml)

[![Website Status](https://img.shields.io/website?down_message=offline&label=Main%20Site&style=for-the-badge&up_message=online&url=https%3A%2F%2Fblackbirduav.ca)](https://blackbirduav.ca)
[![Website Status](https://img.shields.io/website?down_message=offline&label=Dev%20Site&style=for-the-badge&up_message=online&url=https%3A%2F%2Fdev.blackbirduav.ca)](https://dev.blackbirduav.ca)

</div>

**Start Date**: October 4, 2024
**Team Members / Developers**:

- [Edwin Ngui](https://github.com/EdwinNgui)
- [Daniel Lu](https://github.com/FinityFly)
- [Marc Vidal](https://github.com/MarcVidalCodes)
- [Jonah Pasquantonio](https://github.com/jonahp123)
- [Teddy Kurita]()

---

## Overview

Welcome to the official repository for the **Blackbird UAV** website! This project represents the 2024/2025 version of the organization's website, designed to showcase our work, attract sponsors, and engage with the community. The website serves as a central hub for information about our team, projects, events, and partnerships.

---

## Deployment

The website is deployed to an FTP server using **FTP Deploy Action** via GitHub Actions.

- **Development Environment**: [https://dev.blackbirduav.ca/](https://dev.blackbirduav.ca/)
- **Live Production Site**: [https://blackbirduav.ca/](https://blackbirduav.ca/)

---

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Dynamic Content**: Easily updatable content for news, events, and sponsor information.
- **Modern Tech Stack**: Built with cutting-edge tools for performance and scalability.

---

## Technologies Used

- **Frontend**: [React.js](https://reactjs.org/)
- **Deployment**: FTP, GitHub Actions

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher)
- [Git](https://git-scm.com/)

### How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Blackbird-UAV/BlackbirdUAV-Website.git
   ```

2. Navigate to the project folder:

   ```bash
   cd website
   ```

3. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### How to Build

1. Run the build command (if you're using unix/linux, replace `npm run copy-htaccess-win` with `npm run copy-htaccess` in the prod script in **package.json**):

   ```bash
   npm run prod
   ```

---

## Contributing

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message here"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request and describe your changes.

---

## License

This project is licensed under the **GNU GPL-3** license. See the [LICENSE](LICENSE) file for details.

---

**Blackbird UAV** – Soaring to New Heights! 🚀
