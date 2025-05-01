<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use App\Models\Like;
use Illuminate\Support\Str;

class PostController extends Controller
{
 
    public function store(Request $request)
    {
        try{
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'published_at' => now()->format('Y-m-d H:i:s'),
            'slug' =>Str::slug($request->title, "-"),
        ]);

        return back()->with([
            'success' => 'Post created successfully!',
            'newPost' => $post 
        ]);

        }catch(Exception $exception){
            return back()->withErrors([
                'error' => 'Failed to create post: ' . $exception->getMessage()
            ]);
        }
    }

    public function index(Request $request)
    {
        try{
            $posts = Post::withCount('likes')
            ->with(['likedByUsers' => function($query) {
                $query->where('user_id', Auth::id());
            }])->where('title', 'LIKE', '%' . $request->search . '%')
            ->orderBy('published_at', 'desc')
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'content' => $post->content,
                    'published_at' => $post->published_at->format('Y-m-d H:i:s'),
                    'likes_count' => $post->likes_count,
                    'is_liked' => $post->likedByUsers->isNotEmpty(),
                ];
            });

        return response($posts, 200);
       
        }catch(Exception $exception){
            return response($exception->getMessage(), 500);
        }
    }

    public function toggleLike(Request $request, Post $post)
{
    
    $existingLike = Like::where('user_id', Auth::id())
                       ->where('post_id', $post->id)
                       ->first();

    if ($existingLike) {
        $existingLike->delete();
        $liked = false;
    } else {
        Like::create([
            'user_id' => Auth::id(),
            'post_id' => $post->id
        ]);
        $liked = true;
    }

    return response()->json([
        'likes_count' => $post->likes()->count(),
        'liked' => $liked
    ]);
}

  
}
