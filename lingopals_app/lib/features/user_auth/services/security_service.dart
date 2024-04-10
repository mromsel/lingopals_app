class SecurityService {
  var isLogged = false;

  bool isUserLogged() {
    // TODO: implement logic to verify if the user is logged
    return isLogged;
  }

  Future<bool> logUser(String email, String password) async {
    // TODO: implement logic to log the user
    await Future.delayed(const Duration(seconds: 2));
    isLogged = true;
    return true;
  }

  // Method to verify if the user has admin permissions
  bool isUserAdmin() {
    // TODO: implement logic to verify if the user is admin
    return true;
  }
}
