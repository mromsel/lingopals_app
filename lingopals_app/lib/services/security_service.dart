class SecurityService {
  Future<bool> isUserLogged() async {
    // TODO: implement logic to verify if the user is logged
    await Future.delayed(const Duration(seconds: 2));
    return true;
  }

  // Method to verify if the user has admin permissions
  bool isUserAdmin() {
    // TODO: implement logic to verify if the user is admin
    return true;
  }
}
