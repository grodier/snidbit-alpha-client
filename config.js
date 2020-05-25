export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: 'us-east-2',
    BUCKET: 'gr-snidbit-alpha-1',
  },
  apiGateway: {
    REGION: 'us-east-2',
    URL: 'https://gokci4tqt5.execute-api.us-east-2.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'us-east-2',
    USER_POOL_ID: 'us-east-2_A3NRFWwRy',
    APP_CLIENT_ID: '5p41c2636ii8q5mcjn8m23a0ft',
    IDENTITY_POOL_ID: 'us-east-2:ec2c1101-6c8d-41b9-a220-9246425793c8',
  },
};
