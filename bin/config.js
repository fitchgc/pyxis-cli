export const promptTypeList = [
  {
    type: 'list',
    message: 'Please select the template type to pull:',
    name: 'type',
    choices: [
      {
        name: 'pyxis-base',
        value: {
          url: 'https://github.com/fitchgc/pyxis-base.git',
          gitName: 'pyxis-base',
          val: 'pyxis-base',
        },
      }
    ],
  },
];