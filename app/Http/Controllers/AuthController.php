<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\HelpController as Help;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if ($request->isMethod('GET')) {
            return Inertia::render('login');
        }

        // Validating data
        $val = Validator::make($request->all(), [
            'matricule' => 'required|string|size:8',
            'password' => 'required|string',
        ]);

        if ($val->fails()) {
            return response()->json(['message' => Help::ValError($val)], 422);
        }

        // Authenticating the user
        if (Auth::attempt($request->all())) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Login successful']);
        }

        return response()->json(['message' => 'Invalid matricule or password.'], 401);
    }

    public function register(Request $request)
    {
        // Validating data
        $val = Validator::make($request->all(), [
            'name' => 'required|string',
            'matricule' => 'required|string|size:8|unique:users',
            'faculty' => 'required|string',
            'department' => 'required|string',
            'option' => 'required|string',
            'level' => 'required|string',
            'photo' => 'required|image',
            'password' => 'required|string',
        ]);

        if ($val->fails()) {
            return response()->json(['message' => Help::ValError($val)], 422);
        }

        // Storing the user's photo
        $data = $request->all();
        $data['photo'] = $request->file('photo')->store('users', 'public');

        // Hashing the password and storing the hash
        $data['password'] = Hash::make($request->password);

        // Storing data in the database
        User::create($data);
        return response()->json(['message' => 'User created!'], 201);
    }
}
