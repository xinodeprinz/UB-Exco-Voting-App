<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('home');
    }

    public function posts()
    {
        $posts = Post::all();
        return Inertia::render('posts', compact('posts'));
    }

    public function authUser()
    {
        $user = Auth::user();
        return response()->json($user);
    }
}
