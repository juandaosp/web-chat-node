const serverConfig = {
  appName: "web-chat",
  port: 3000
};

const getAppName = () => {
  return serverConfig.appName;
};

const getPort = () => {
  return serverConfig.port;
};

exports.getAppName = getAppName;
exports.getPort = getPort;