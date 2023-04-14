<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class HelpController extends Controller
{
    public static function ValError(Validator $val)
    {
        return array_values($val->getMessageBag()->toArray())[0][0];
    }

    public static function facultyCandidates(int $id)
    {
        $result = [];
        $user = Auth::user();
        $post = Post::find($id);
        $fc = $post->candidates()->where('type', 'faculty')->get();
        foreach ($fc as $f) {
            if ($f->user->faculty === $user->faculty) {
                array_push($result, $f);
            }
        }
        return $result;
    }

    public static function departmentCandidates(int $id)
    {
        $result = [];
        $user = Auth::user();
        $post = Post::find($id);
        $dc = $post->candidates()->where('type', 'department')->get();
        foreach ($dc as $d) {
            if ($d->user->department === $user->department) {
                array_push($result, $d);
            }
        }

        return $result;
    }

    public static function isCandidate(string $type, int $postId): bool
    {
        $user = Auth::user();
        $exists = $user->candidates()
            ->where('type', $type)
            ->where('post_id', $postId)->first();
        if ($exists)
            return true;
        else
            return false;
    }

    public static function setPostInfo(Post $post)
    {
        $post->facultyCandidates = count(self::facultyCandidates($post->id));
        $post->departmentCandidates = count(self::departmentCandidates($post->id));
        // Is candidate?
        $post->isFacultyCandidate = self::isCandidate('faculty', $post->id);
        $post->isDepartmentCandidate = self::isCandidate('department', $post->id);
        $post->description = explode('|', $post->description)[0];
        return $post;
    }

    public static function candidates(string $type, string $postName): array
    {
        $user = Auth::user();
        $postName = str_replace('-', ' ', $postName);
        $post = Post::where('name', $postName)->first();
        $cc = Candidate::where('type', $type)
            ->where('post_id', $post->id)->get();

        $candidates = [];
        foreach ($cc as $c) {
            if ($type === 'faculty' && $c->user->faculty === $user->faculty) {
                array_push($candidates, $c->user);
            } elseif (
                $type === 'department' &&
                $c->user->faculty === $user->faculty &&
                $c->user->department === $user->department
            ) {
                array_push($candidates, $c->user);
            }
        }
        return [$candidates, $cc];
    }

    public static function votingCandidates(string $type, array $candidates): array
    {
        $user = Auth::user();
        // Checking if the user has voted.
        foreach ($candidates as $c) {
            $uc = $c->candidates()->where('user_id', $c->id)
                ->where('type', $type)->first();
            $c->candidate_id = $uc->id;

            $voters = [];

            if ($uc->votes) {
                $voters = json_decode($uc->votes->voters);
            }

            $c->votes = count($voters);
            $c->hasVoted = in_array($user->id, $voters) ? true : false;
        }
        return $candidates;
    }

    public static function types()
    {
        return ['faculty', 'department'];
    }

    public static function canVote(): bool
    {
        $user = Auth::user();
        // Did not even register for any departmental post.
        if (!$user->candidates()->where('type', 'department')->exists()) {
            return false;
        }

        $cc = Candidate::all();
        $neededCC = [];

        foreach ($cc as $c) {
            if (
                $c->user->faculty === $user->faculty
                && $c->user->department === $user->department
            ) {
                array_push($neededCC, $c);
            }
        }

        // Still needs to be worked on, but return true for now.
        return true;
    }

    public static function postWinnerId(array $results): int
    {
        $id = $results[0]['c_id'];
        $maxVote = $results[0]['votes'];
        for ($i = 1; $i < count($results); $i++) {
            if ($results[$i]['votes'] > $maxVote) {
                $maxVote = $results[$i]['votes'];
                $id = $results[$i]['c_id'];
            }
        }
        return $id;
    }
}
