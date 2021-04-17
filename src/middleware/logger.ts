import  fs from 'fs';
import os from 'os';

const logger = (req, res, next) => {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const { method, url } = req;
  const userAgent = req.get('user-agent');

  let data = `${hour}:${minutes}:${seconds} ${method}: ${url} user-agent: ${userAgent}`;
  fs.appendFile('server.log', data + os.EOL, (err) => {
    if (err) {
      throw err;
    }
  });
  next();
};

export default logger;
