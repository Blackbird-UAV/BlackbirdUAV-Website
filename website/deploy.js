require("dotenv").config();
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    host: process.env.FTP_HOST,
    port: parseInt(process.env.FTP_PORT, 10),
    localRoot: __dirname + "/" + process.env.FTP_LOCAL_ROOT,
    remoteRoot: process.env.FTP_REMOTE_ROOT,
    include: ["*", "**/*"],
    deleteRemote: false,
    forcePasv: true,
};

ftpDeploy.deploy(config)
    .then(() => console.log("Deployment completed successfully!"))
    .catch(err => console.error("Deployment failed:", err));