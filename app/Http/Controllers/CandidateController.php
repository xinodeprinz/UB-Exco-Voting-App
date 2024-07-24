<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\HelpController as Help;
use Illuminate\Support\Facades\Validator;

class CandidateController extends Controller
{
    public function index(string $type, string $postName)
    {
        [$candidates] = Help::candidates($type, $postName);
        $postNames = Post::pluck('name');
        return Inertia::render('candidates', compact(
            'candidates',
            'postNames',
            'postName',
            'type',
        ));
    }

    public function elections(string $type, string $postName)
    {
        $postName = str_replace('-', ' ', $postName);
        [$candidates, $cc] = Help::candidates($type, $postName);
        $postNames = Post::pluck('name');

        // Calculate positions
        $initalCandidates = Help::calcPositions(
            Help::votingCandidates($type, $candidates)
        );

        // Checking if the user is eligible to vote for a faculty elections.
        $canVoteForFaculty = Help::canVote();

        // Elections data
        $electionsData = [
            "deptStartTime" => "2024-07-24 12:15:00",
            "facultyStartTime" => "2024-07-24 15:30:00",
            "duration" => 90, //In minutes
            "positionDuration" => 1, //In minutes
        ];

        return Inertia::render('elections', compact(
            'initalCandidates',
            'postNames',
            'postName',
            'type',
            'canVoteForFaculty',
            'electionsData',
        ));
    }

    public function vote(Request $request, int $candidateId)
    {
        try {
            $candidate = Candidate::findOrFail($candidateId);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'An error occured. Please try again.']);
        }
        $val = Validator::make($request->all(), [
            'type' => 'required|string',
            'postName' => 'required|string',
        ]);

        if ($val->fails()) {
            return response()->json(['message' => Help::ValError($val)], 422);
        }

        $types = Help::types();

        if (!in_array($request->type, $types)) {
            return response()->json(['message' => "Invalid type"], 400);
        }

        // All is good.
        $user = Auth::user();
        $voters = [];

        if ($candidate->votes) {
            $voters = json_decode($candidate->votes->voters);
            if (in_array($user->id, $voters)) {
                // Filter out the user's id by creating a new array of values.
                $newVoters = [];
                foreach ($voters as $v) {
                    if ($v != $user->id)
                        array_push($newVoters, $v);
                }
                $voters = $newVoters;
            } else {
                array_push($voters, $user->id);
            }
            $candidate->votes()->update(['voters' => json_encode($voters)]);
        } else {
            $voters = [$user->id];
            $candidate->votes()->create(['voters' => json_encode($voters)]);
        }

        // Refetch candidates to update the DOM.
        $postName = str_replace('-', ' ', $request->postName);
        [$candidates] = Help::candidates($request->type, $postName);

        $candidates = Help::votingCandidates($request->type, $candidates);

        return response()->json([
            'message' => "Operation successful",
            'candidates' => $candidates,
        ]);
    }

    public function fetchCandidates(string $postName, string $type)
    {
        $postName = str_replace('-', ' ', $postName);
        [$candidates] = Help::candidates($type, $postName);

        $candidates = Help::votingCandidates($type, $candidates);

        return response()->json($candidates);
    }
}
