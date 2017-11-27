const config = require('config');
const rdp = require('node-rdpjs');
const { MachinesModel, QueueModel, UsersModel } = require('../models');
const { emailService } = require('../services');
const { emails } = require('../mocks');

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

        MachinesModel.getAllMachinesByType(infos.machineType)
          .then((data) => {
            if (!data) return;

            const availableMachine = data[Object.keys(data).find((key) => data[key].available)];

            MachinesModel.updateMachine(infos.machineType, availableMachine.port, {
              available: false,
            });

            rdpClient = rdp
              .createClient({
                userName: availableMachine.user,
                password: availableMachine.pass,
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

                MachinesModel.updateMachine(infos.machineType, availableMachine.port, {
                  available: true,
                });
                QueueModel.getQueueByType(infos.machineType)
                  .then((queue) => {
                    if (!queue) return;

                    Object.keys(queue)
                      .forEach((userID) => {
                        UsersModel.getUserByID(userID)
                          .then((user) => {
                            if (!user) return;

                            emailService.sendEmail({
                              to: user.email,
                              subject: emails['available-machine'].subject,
                              viewName: emails['available-machine'].viewName,
                              data: {
                                title: emails['available-machine'].title,
                                linkHref: emails['available-machine'].linkHref,
                              },
                            });
                          })
                      });

                    return QueueModel.removeQueueByType(infos.machineType);
                  })
              })
              .on('error', function (err) {
                client.emit('rdp-error', err);

                MachinesModel.updateMachine(infos.machineType, availableMachine.port, {
                  available: true,
                });
                QueueModel.getQueueByType(infos.machineType)
                  .then((queue) => {
                    if (!queue) return;

                    Object.keys(queue)
                      .forEach((userID) => {
                        UsersModel.getUserByID(userID)
                          .then((user) => {
                            if (!user) return;

                            emailService.sendEmail({
                              to: user.email,
                              subject: emails['available-machine'].subject,
                              viewName: emails['available-machine'].viewName,
                              data: {
                                title: emails['available-machine'].title,
                                linkHref: emails['available-machine'].linkHref,
                              },
                            });
                          })
                      });

                    return QueueModel.removeQueueByType(infos.machineType);
                  })
              })
              .connect(availableMachine.ip, availableMachine.port);
          });

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
