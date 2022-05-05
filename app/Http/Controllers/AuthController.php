<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return [
                'validation_errors' => $validator->messages(),
            ];
        }
        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return [
            'status' => 200,
            'username' => $user->name,
            'email' => $user->email,
            'token' => $token,
            'message' => 'Registered successfully',
        ];
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return [
                'validation_errors' => $validator->messages(),
            ];
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'status' => 401,
                'message' => 'Incorrect email or password',
            ];
        }

        $token = $user->createToken($user->email.'_Token')->plainTextToken;

        return [
            'status' => 200,
            'username' => $user->name,
            'email' => $user->email,
            'token' => $token,
            'message' => 'Logged in successfully',
        ];
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        return [
            'status' => 200,
            'message' => 'Logged out successfully',
        ];
    }
}
