<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HelpController as Help;
use App\Models\Video;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $video = Video::inRandomOrder()->limit(1)->first();
        return Inertia::render('home', compact('video'));
    }

    public function posts()
    {
        $user = Auth::user();
        $initPosts = Post::all();
        foreach ($initPosts as $post) {
            $post = Help::setPostInfo($post);
        }
        return Inertia::render('posts', compact('initPosts'));
    }

    public function authUser()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function createCandidate(Request $request)
    {
        $val = Validator::make($request->all(), [
            'postId' => 'required|integer',
            'type' => 'required|string',
        ]);

        if ($val->fails()) {
            return response()->json(['message' => Help::ValError($val)], 422);
        }

        $types = Help::types();

        if (!in_array($request->type, $types)) {
            return response()->json(['message' => "Invalid type"], 400);
        }

        // There is no error, Carryout the registration process
        $user = Auth::user();
        $candidate = $user->candidates()->where('type', $request->type)
            ->where('post_id', $request->postId)->first();

        if ($candidate) {
            $candidate->delete();
            $message = "You've successfully unregistered for this post";
        } else {
            $user->candidates()->create([
                'post_id' => $request->postId,
                'type' => $request->type,
            ]);
            $message = "You've successfully registered for this post";
        }

        $posts = Post::all();
        foreach ($posts as $post) {
            $post = Help::setPostInfo($post);
        }
        return response()->json([
            'message' => $message,
            'posts' => $posts,
        ]);
    }

    public function aboutPost(string $name)
    {
        $post = Post::where('name', str_replace('-', ' ', $name))->first();
        $post->description = explode('|', $post->description);
        return Inertia::render('about', compact('post'));
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // return to_route('login');
        return response()->json(['message' => 'Logout successful!']);
    }
}
