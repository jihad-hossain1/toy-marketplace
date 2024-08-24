const os = require("os");

const appLogs = async (req, res) => {
    //
    try {
      const osInfo = os.cpus();
      const memoryInfo = os.freemem();
  

      res.json({ osInfo, memoryInfo });
    } catch (error) {
      res.status(404).json({ message: `failed to fetch blog : ${error}` });
    }
  };


  module.exports = { appLogs }