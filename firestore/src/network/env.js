/* eslint-disable prettier/prettier */
class Environment {
  constructor() {
    this.setEnvironment('dev');   //http://40.79.64.69:85/api
    //this.setEnvironment('sandbox');
    // this.setEnvironment('production');
  }

  setEnvironment(env) {
    this.environment = env;

    if (env === 'dev') {
      // Base URL
      this.baseURI = 'http://sandbox.netaworld.org:3009/api/v1';
      //this.baseURI = 'https://internationalelectrical-qa.chetu.com/api/v1';

      // API URLs on Registeration screen
      this.registrationURL = '/registration';
      this.loginDataURL = '/login';
      this.verifyemailURL = '/verify/email';
      this.verifymobileURL = '/verify/mobile';
      this.resendotpURL = '/resend/otp';
      this.stateURL = '/state';
      this.customer_Filter = '/customer/data';
      this.forgotPassword = '/forget/password';
      this.resetPassword = '/reset/password';
      this.productOrder = '/order/data';
      this.searchOrder = '/search/order';
      this.cancelOrder = '/cancel/order';
      this.cancelitemOrder = '/cancel/item';
      this.addToCart = '/frontend/addToCart';
      this.getaddToCart = '/frontend/cart/item';
      this.deleteCartItem = '/frontend/delete/item';
      this.deleteCartItem = '/frontend/delete/item';
      this.notificationGet = '/get/notification';
      this.unreadnotification = '/frontend/update/notification';


      // this.forgotPasswordURL = '/Account/ForgotPassword?';

    }
  }
}

const Env = new Environment();

export default Env;
