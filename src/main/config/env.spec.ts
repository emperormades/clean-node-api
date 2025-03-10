describe('Environment variables', () => {
  beforeEach(() => {
    // Clear environment variables before each test
    jest.resetModules() // limpa cache de módulos do Jest
    delete process.env.MONGO_URL
    delete process.env.PORT
  })

  test('Should return default values when no environment variables are set', async () => {
    // Import the configuration file only after clearing the environment variables
    const config = (await import('./env')).default

    expect(config.mongoUrl).toBe('mongodb://localhost:27017/clean-node-api')
    expect(config.port).toBe('5050')
  })

  test('Should return the value of MONGO_URL defined in environment variables', async () => {
    // Set the environment variable before importing the configuration
    process.env.MONGO_URL = 'mongodb://localhost:27017/test-db'
    const config = (await import('./env')).default

    expect(config.mongoUrl).toBe('mongodb://localhost:27017/test-db')
    expect(config.port).toBe('5050') // Still the default value
  })

  test('Should return the value of PORT defined in environment variables', async () => {
    // Set the environment variable before importing the configuration
    process.env.PORT = '6060'
    const config = (await import('./env')).default

    expect(config.mongoUrl).toBe('mongodb://localhost:27017/clean-node-api')
    expect(config.port).toBe('6060')
  })
})
