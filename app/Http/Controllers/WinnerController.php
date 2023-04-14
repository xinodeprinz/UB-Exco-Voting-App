<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\HelpController as Help;
use App\Models\Candidate;
use App\Models\Post;
use App\Models\User;
use App\Models\Winner;

class WinnerController extends Controller
{
    public function store(string $type)
    {
        if (!in_array($type, Help::types())) {
            return response()->json(['message' => 'Invalid type!'], 400);
        }

        $facOrDept = User::groupBy($type)->pluck($type);
        $postIds = Post::pluck('id');

        foreach ($facOrDept as $spec) {
            foreach ($postIds as $pid) {
                $results = []; //Results per post per faculty or department.
                $cc = Candidate::where('post_id', $pid)
                    ->where('type', $type)->get();
                foreach ($cc as $c) {
                    if (
                        ($type === 'faculty' && $c->user->faculty === $spec) ||
                        ($type === 'department' && $c->user->department === $spec)
                    ) {
                        // People running for the same post under a faculty or department.
                        $votes = count(
                            $c->votes ? json_decode($c->votes->voters) : []
                        );

                        $results[] = [
                            'c_id' => $c->id,
                            'votes' => $votes,
                        ];
                    }
                }
                // Calculate the winner of the post under the department or faculty.
                if (count($results) > 0) {
                    // Store winner in database table
                    $winnerId = Help::postWinnerId($results);
                    $cWinner = Candidate::find($winnerId);
                    // Avoiding duplicate records
                    if (
                        !Winner::where('user_id', $cWinner->user_id)
                            ->where('post_id', $cWinner->post_id)
                            ->where('type', $cWinner->type)
                            ->exists()
                    ) {
                        Winner::create($cWinner->toArray());
                    }
                }
            }
        }
        return response()->json(['message' => 'Time up! Voting ended.']);
    }
}
