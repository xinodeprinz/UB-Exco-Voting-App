<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Http\Controllers\HelpController as Help;
use App\Models\Campaign;

class CampaignController extends Controller
{
    public function campaign()
    {
        $genID = Help::randomCampaignID(5);
        $user = Auth::user();
        $isCandidate = $user->candidates ? true : false;
        return Inertia::render('campaign', compact('genID', 'isCandidate'));
    }

    public function meeting(string $campaignID)
    {
        $user = Auth::user();
        $cIDs = Campaign::pluck('campaign_id');
        $exists = in_array($campaignID, $cIDs->toArray()) ? true : false;
        $campaign = $exists ? Campaign::where('campaign_id', $campaignID)->first() : null;
        return Inertia::render('meeting', compact(
            'campaignID',
            'user',
            'campaign'
        ));
    }

    public function uploadVideo(Request $request)
    {
        // This validation needs adjustments.
        $val = Validator::make($request->all(), [
            'video' => 'required|file|mimes:mp4,mkv,mov,avi,wmv,flv,webm,avchd|max:1048576', //1GB
        ]);

        if ($val->fails()) {
            return response()->json(['message' => Help::ValError($val)], 422);
        }

        $user = Auth::user();
        $candidate = Candidate::where('user_id', $user->id)->first();

        $videoPath = $request->file('video')->store('videos', 'public');

        Video::create([
            'candidate_id' => $candidate->id,
            'url' => $videoPath,
        ]);

        return response()->json(['message' => 'Video uploaded successfully!']);
    }

    public function createCampaign(Request $request)
    {
        $val = Validator::make($request->all(), [
            'campaign_id' => 'required|string',
            'scheduled_on' => 'required|date',
        ]);

        if ($val->fails()) {
            return response()->json(['message' => Help::ValError($val)], 422);
        }

        $data = $request->all();

        $data['scheduled_on'] = date('Y-m-d H:i:s', strtotime($request->scheduled_on));

        $user = Auth::user();
        $candidate = Candidate::where('user_id', $user->id)->first();

        $data['candidate_id'] = $candidate->id;

        Campaign::create($data);
        return response()->json(['message' => "Meeting scheduled successfully."], 201);
    }
}
