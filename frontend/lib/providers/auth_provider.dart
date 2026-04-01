import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/user_model.dart';

class AuthProvider with ChangeNotifier {
  String? _token;
  UserModel? _user;

  bool get isAuth => _token != null;
  String? get token => _token;
  UserModel? get user => _user;

  /// MOCK LOGIN: Bypasses the API so you can see the app now.
  Future<void> login(String email, String password) async {
    // Simulate a short network delay
    await Future.delayed(const Duration(milliseconds: 500));
    
    // Set dummy data
    _token = 'mock_token_abcdefg';
    _user = UserModel(
      id: 'u1',
      username: 'ReadingEnthusiast',
      email: email,
    );
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', _token!);
    notifyListeners();
  }

  /// MOCK REGISTER: Bypasses the API.
  Future<void> register(String username, String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 500));
    // No action needed, user can now go back and login with any credentials
  }

  Future<void> logout() async {
    _token = null;
    _user = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    notifyListeners();
  }

  Future<void> tryAutoLogin() async {
    final prefs = await SharedPreferences.getInstance();
    if (!prefs.containsKey('token')) return;
    _token = prefs.getString('token');
    _user = UserModel(
      id: 'u1', 
      username: 'ReadingEnthusiast', 
      email: 'user@example.com'
    );
    notifyListeners();
  }
}
