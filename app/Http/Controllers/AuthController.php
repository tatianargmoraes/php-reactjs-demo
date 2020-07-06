<?php

namespace App\Http\Controllers;

use Google_Client;
use Google_Service_Oauth2;
use Illuminate\Http\Request;
use Cookie;
use Throwable;

class AuthController extends Controller
{
    public function completeAuth(Request $request)
    {
        $code = $request->request->get('code');
        $isSafe = !empty($request->headers->get('X-Requested-With'));

        if (!empty($code) && $isSafe) {
            $clientID = config('google.client_id');
            $clientSecret = config('google.client_secret');

            $client = new Google_Client();
            $client->setClientId($clientID);
            $client->setClientSecret($clientSecret);
            $client->addScope('email');
            $client->addScope('profile');

            // https://stackoverflow.com/questions/24750000/google-oauth-redirect-uri-mismatch/26826006#26826006
            $client->setRedirectUri('postmessage');

            try {
                $tokenData = $client->fetchAccessTokenWithAuthCode($code);
                $isAuthenticated = empty($tokenData['error']) && !empty($tokenData['access_token']);

                if ($isAuthenticated) {
                    $googleAuth = new Google_Service_Oauth2($client);
                    $accountInfo = $googleAuth->userinfo->get();
                    $payload = [ 'email' => $accountInfo->email, 'name' => $accountInfo->name ];

                    $token = $tokenData['access_token'];
                    $expiresIn = $tokenData['expires_in'] / 60;

                    $responseCookie = Cookie::make('account_token', $token, $expiresIn, '/', null, true, true);

                    return response()->json($payload)->cookie($responseCookie);
                
                } else {
                    // example: {error: "redirect_uri_mismatch", error_description: "Bad Request"}
                    return response('Error executing authentication process', 500);
                }
            } catch (Throwable $error) {
                return response('Unexpected error in authentication process', 500);
            }
        }
    }
}
