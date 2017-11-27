const { modals } = require('../../mocks');
const { MachinesModel, QueueModel } = require('../../models');

module.exports = (req, res) => {
  const { userID, machineType } = req.body;

  MachinesModel.getAllMachinesByType(machineType)
    .then((machines) => {
      if (!machines) res.status(500).json({ message: 'Nothing was found' });

      const isAnyAvailable = !!Object.keys(machines)
        .map((machineKey) => machines[machineKey].available)
        .filter((available) => available)
        .length;

      if (isAnyAvailable) {
        res.status(200).json({ message: 'There are some available machines', available: true });
      } else {
        QueueModel.addUserToQueue(machineType, userID)
          .then((res) => {
            return QueueModel.getQueueByType(machineType);
          })
          .then((queue) => Object.keys(queue).length)
          .then((newQueueLength) => {
            res.status(200).json({
              message: 'There are no available machines',
              available: false,
              modal: Object.assign({}, modals['machines-are-busy'], {
                text: modals['machines-are-busy'].text[0] + newQueueLength + modals['machines-are-busy'].text[1],
              }),
            });
          });
      }
    }, (err) => {
      res.status(500).json(err);
    })
};
