const config = require('config');
const rdp = require('node-rdpjs');
const { MachinesModel } = require('../models');

module.exports = function(server) {
  const io = require('socket.io')(server);

  io.on('connection', function(client) {
    let rdpClient = null;

    client
      .on('infos', function (infos) {
        if (rdpClient) {
          // clean older connection
          rdpClient.close();
        }

        rdpClient = rdp
          .createClient({
            // domain: infos.domain,
            // userName: infos.username,
            // password: infos.password,
            userName: config.get('tempRDPCredentials.user'),
            password: config.get('tempRDPCredentials.pass'),
            enablePerf: true,
            autoLogin: true,
            screen: infos.screen,
            locale: infos.locale,
            logLevel: process.argv[2] || 'INFO'
          })
          .on('connect', function () {
            client.emit('rdp-connect');
          })
          .on('bitmap', function (bitmap) {
            client.emit('rdp-bitmap', bitmap);
          })
          .on('close', function () {
            client.emit('rdp-close');
          })
          .on('error', function (err) {
            client.emit('rdp-error', err);
          })
          // .connect(infos.ip, infos.port);
          .connect('159.224.19.249', config.get('tempRDPCredentials.port'));

      })
      .on('mouse', function (x, y, button, isPressed) {
        if (!rdpClient) return;

        rdpClient.sendPointerEvent(x, y, button, isPressed);
      })
      .on('wheel', function (x, y, step, isNegative, isHorizontal) {
        if (!rdpClient) {
          return;
        }
        rdpClient.sendWheelEvent(x, y, step, isNegative, isHorizontal);
      })
      .on('scancode', function (code, isPressed) {
        if (!rdpClient) return;

        rdpClient.sendKeyEventScancode(code, isPressed);
      })
      .on('unicode', function (code, isPressed) {
        if (!rdpClient) return;

        rdpClient.sendKeyEventUnicode(code, isPressed);
      }).on('disconnect', function () {
        if (!rdpClient) return;

        rdpClient.close();
      });
  });
};
