export const checkingEnvVariables = () => {
  if(!process.env.JWT_KEY){
    throw new Error('JWT_KEY must be defined!');
  }
  if(!process.env.DB_HOST){
    throw new Error('DB_HOST must be defined!');
  }
  if(!process.env.DB_USERNAME){
    throw new Error('DB_USERNAME must be defined!');
  }
  if(!process.env.DB_NAME && !process.env.DB_TEST_NAME){
    // either of them should be defined
    throw new Error('DB_NAME must be defined!');
  }
};