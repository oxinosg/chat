module.exports = {
  name: 'proto',
  preset: '../../jest.config.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'proto'],
  coverageDirectory: '../../coverage/libs/proto',
}
