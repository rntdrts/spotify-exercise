import { UserAuthWrapper } from 'redux-auth-wrapper';

// We export a simple function which receives some options and return the wrapper
export default (options) => UserAuthWrapper(options);