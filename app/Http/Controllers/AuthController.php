<?php

namespace App\Http\Controllers;

use Google_Client;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function completeAuth(Request $request)
    {
        $code = $request->request->get('code');
        $isSafe = !empty($request->headers->get('X-Requested-With'));

        if (!empty($code) && $isSafe) {
            // Post to google using guzzle or use the google client as in here: https://code.tutsplus.com/tutorials/create-a-google-login-page-in-php--cms-33214
            // 'https://accounts.google.com/o/oauth2/token?grant_type=authorization_code&client_id='.urlencode($client_id).'&client_secret='.urlencode($client_secret).'&redirect_uri='.urlencode($redirect_‌​url).'code='.urlencode($code)
            // https://developers.google.com/identity/sign-in/web/server-side-flow#java
        }
    }
}
