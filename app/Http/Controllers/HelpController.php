<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Candidate;
use App\Models\Post;
use App\Models\Winner;
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
        if (
            Winner::where('user_id', $user->id)
            ->where('type', 'department')
            ->exists()
        ) {
            return true;
        }
        return false;
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

    public static function calcPositions(array $candidates): array
    {
        if (Winner::count() <= 0) {
            foreach ($candidates as $c) {
                $c->position = null;
            }
            return $candidates;
        }

        $voteArray = [];
        $sortedVoteArray = [];
        $newCandidates = [];

        foreach ($candidates as $u) {
            $c = Candidate::find($u->candidate_id);
            $voteArray[] = [
                'c_id' => $c->id,
                'votes' => count(
                    $c->votes ? json_decode($c->votes->voters) : []
                ),
            ];
        }

        // Sorting the vote array
        $turns = count($voteArray);
        for ($i = 0; $i < $turns; $i++) {
            $maxVote = self::maxVote($voteArray);
            array_push($sortedVoteArray, $maxVote);
            $maxId = array_search($maxVote, $voteArray);
            unset($voteArray[$maxId]);
        }

        unset($voteArray); //Destroy the vote array.

        // Sorting the candidate users array.
        foreach ($sortedVoteArray as $s) {
            foreach ($candidates as $c) {
                if ($s['c_id'] == $c->candidate_id) {
                    $c->position = array_search($s, $sortedVoteArray) + 1;
                    array_push($newCandidates, $c);
                    break;
                }
            }
        }

        //Destroy the candidates and sortedVoteArray.
        unset($candidates, $sortedVoteArray);

        return $newCandidates;
    }

    protected static function maxVote(array $votes): array
    {
        $max = array_shift($votes);
        for ($i = 1; $i < count($votes); $i++) {
            if ($votes[$i]['votes'] > $max['votes'])
                $max = $votes[$i];
        }
        return $max;
    }

    public static function randomCampaignID(int $length): string
    {
        $take = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $output = '';

        for ($i = 0; $i < $length; $i++) {
            $index = rand(0, strlen($take) - 1);
            $output .= $take[$index];
        }

        $existingIDs = Campaign::pluck('campaign_id');

        if (in_array($output, $existingIDs->toArray()))
            self::randomCampaignID($length);

        return $output;
    }
}
