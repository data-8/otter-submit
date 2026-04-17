const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 90000,
  use: {
    baseURL: 'http://localhost:8888',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  reporter: [['list'], ['html']],
  webServer: {
    command:
      'jupyter lab --config jupyter_server_test_config.py --no-browser --port 8888',
    url: 'http://localhost:8888/lab',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI
  }
});
