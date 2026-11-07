
/* =========================================
   JEMAL SEID PORTFOLIO
   SECURE SHARED-PASSWORD AUTHENTICATION
========================================= */

const COOKIE_NAME = "__Host-jemal_portfolio_session";
const LOGIN_PATH = "/__auth/login";
const LOGOUT_PATH = "/__auth/logout";

const SESSION_LIFETIME = 8 * 60 * 60; // 8 hours
const SESSION_MESSAGE = "jemal-portfolio-authenticated-v1";

/* =========================================
   HTML LOGIN PAGE
========================================= */


function loginPage(showError = false) {
    const errorMessage = showError
        ? '<p class="error" role="alert">Incorrect username or password. Please try again.</p>'
        : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">

    <title>Portfolio Login | Jemal Seid</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            color: #ffffff;
            background: #0a0f1a;
        }

        .login-container {
            width: 100%;
            max-width: 420px;
            padding: 38px 30px;
            background: #111827;
            border: 1px solid rgba(59, 130, 246, 0.3);
            border-radius: 18px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);
            text-align: center;
        }

        .logo {
            color: #3b82f6;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 3px;
            margin-bottom: 22px;
        }

        h1 {
            font-size: 27px;
            margin-bottom: 12px;
        }

        .description {
            color: #aab6c8;
            font-size: 14px;
            line-height: 1.7;
            margin-bottom: 28px;
        }

        .form-group {
            margin-bottom: 16px;
            text-align: left;
        }

        .form-group label {
            display: block;
            color: #d1d5db;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .login-input {
            width: 100%;
            height: 50px;
            padding: 0 15px;
            color: #ffffff;
            background: #0a0f1a;
            border: 1px solid #374151;
            border-radius: 9px;
            outline: none;
            font-size: 15px;
            transition: border-color 0.25s ease;
        }

        .login-input:focus {
            border-color: #3b82f6;
        }

        .unlock-button {
            width: 100%;
            min-height: 50px;
            margin-top: 5px;
            color: #ffffff;
            background: #3b82f6;
            border: none;
            border-radius: 9px;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.25s ease,
                        transform 0.25s ease;
        }

        .unlock-button:hover {
            background: #2563eb;
            transform: translateY(-2px);
        }

        .error {
            color: #f87171;
            font-size: 13px;
            margin-bottom: 16px;
        }

        .footer {
            margin-top: 24px;
            color: #778397;
            font-size: 12px;
        }

        @media (max-width: 400px) {
            .login-container {
                padding: 30px 22px;
            }

            h1 {
                font-size: 24px;
            }
        }
    </style>
</head>

<body>

    <main class="login-container">

        <div class="logo">JEMAL SEID</div>

        <h1>Portfolio Login</h1>

        <p class="description">
            Please enter your username and password
            to access this portfolio.
        </p>

        ${errorMessage}

        <form action="${LOGIN_PATH}" method="POST">

            <div class="form-group">
                <label for="username">Username</label>

                <input
                    class="login-input"
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    autocomplete="username"
                    autocapitalize="none"
                    required
                    autofocus
                >
            </div>

            <div class="form-group">
                <label for="password">Password</label>

                <input
                    class="login-input"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    autocomplete="current-password"
                    required
                >
            </div>

            <button class="unlock-button" type="submit">
                Unlock Portfolio
            </button>

        </form>

        <p class="footer">
            Authorized access only
        </p>

    </main>

</body>
</html>`;

    return new Response(html, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "Content-Security-Policy":
                "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'"
        }
    });
}


/* =========================================
   SECURE SESSION TOKEN
========================================= */

async function createSessionToken(secret, expiresAt) {

    const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secret),
        {
            name: "HMAC",
            hash: "SHA-256"
        },
        false,
        ["sign"]
    );

    const payload = `${SESSION_MESSAGE}:${expiresAt}`;

    const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        new TextEncoder().encode(payload)
    );

    const signatureHex = Array.from(new Uint8Array(signature))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    return `${expiresAt}.${signatureHex}`;
}

/* =========================================
   CONSTANT-TIME STRING COMPARISON
========================================= */

function constantTimeEqual(a, b) {

    const encoder = new TextEncoder();

    const first = encoder.encode(a);
    const second = encoder.encode(b);

    let difference = first.length ^ second.length;

    const length = Math.max(first.length, second.length);

    for (let i = 0; i < length; i++) {
        difference |= (first[i] || 0) ^ (second[i] || 0);
    }

    return difference === 0;
}

/* =========================================
   CHECK AUTHENTICATION COOKIE
========================================= */

async function isAuthenticated(request, secret) {

    const cookies = request.headers.get("Cookie") || "";

    const sessionCookie = cookies
        .split(";")
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(COOKIE_NAME + "="));

    if (!sessionCookie) {
        return false;
    }

    const suppliedToken = sessionCookie.slice(
        COOKIE_NAME.length + 1
    );

    const [expiryText] = suppliedToken.split(".");
    const expiresAt = Number(expiryText);

    const now = Math.floor(Date.now() / 1000);

    if (
        !Number.isSafeInteger(expiresAt) ||
        expiresAt <= now ||
        expiresAt > now + SESSION_LIFETIME
    ) {
        return false;
    }

    const expectedToken = await createSessionToken(
        secret,
        expiresAt
    );

    return constantTimeEqual(suppliedToken, expectedToken);
}

/* =========================================
   REDIRECT RESPONSE
========================================= */

function redirectResponse(location, cookie = null) {

    const headers = new Headers({
        "Location": location,
        "Cache-Control": "no-store"
    });

    if (cookie) {
        headers.set("Set-Cookie", cookie);
    }

    return new Response(null, {
        status: 303,
        headers
    });
}

/* =========================================
   MAIN AUTHENTICATION MIDDLEWARE
========================================= */

export async function onRequest(context) {

    const { request, env } = context;

    const url = new URL(request.url);
    const path = url.pathname;

    /* Fail closed if secrets are missing */

    if (
    !env.PORTFOLIO_USERNAME ||
    !env.PORTFOLIO_PASSWORD ||
    !env.SESSION_SECRET
) {
        return new Response(
            "Portfolio access is not configured yet.",
            {
                status: 503,
                headers: {
                    "Content-Type": "text/plain; charset=UTF-8",
                    "Cache-Control": "no-store"
                }
            }
        );
    }

    /* =====================================
       LOGIN PAGE
    ===================================== */

    if (path === LOGIN_PATH) {

        if (request.method === "GET") {

            if (await isAuthenticated(request, env.SESSION_SECRET)) {
                return redirectResponse(url.origin + "/");
            }

            return loginPage();
        }

        /* Process password submission */

        if (request.method === "POST") {

            
const origin = request.headers.get("Origin");
const requestHost = request.headers.get("Host") || url.host;

let validOrigin = false;

try {
    const parsedOrigin = new URL(origin);

    validOrigin =
        parsedOrigin.protocol === "https:" &&
        parsedOrigin.origin === origin &&
        parsedOrigin.host.toLowerCase() ===
            requestHost.toLowerCase();

} catch {
    validOrigin = false;
}

if (!validOrigin) {
    return new Response("Forbidden", {
        status: 403
    });
}


            const contentType =
                request.headers.get("Content-Type") || "";

            if (!contentType.startsWith(
                "application/x-www-form-urlencoded"
            )) {
                return new Response("Unsupported content type", {
                    status: 415
                });
            }

            const contentLength = Number(
                request.headers.get("Content-Length") || 0
            );

            if (contentLength > 4096) {
                return new Response("Request too large", {
                    status: 413
                });
            }

            const body = await request.text();

            if (body.length > 4096) {
                return new Response("Request too large", {
                    status: 413
                });
            }

            const form = new URLSearchParams(body);

            const submittedUsername = form.get("username") || "";
const submittedPassword = form.get("password") || "";

const validUsername = constantTimeEqual(
    submittedUsername,
    env.PORTFOLIO_USERNAME
);

const validPassword = constantTimeEqual(
    submittedPassword,
    env.PORTFOLIO_PASSWORD
);

if (!validUsername || !validPassword) {
    return loginPage(true);
}

            const expiresAt =
    Math.floor(Date.now() / 1000) + SESSION_LIFETIME;

const token = await createSessionToken(
    env.SESSION_SECRET,
    expiresAt
);

            const cookie =
                `${COOKIE_NAME}=${token}; ` +
                `Path=/; Max-Age=${SESSION_LIFETIME}; ` +
                "HttpOnly; Secure; SameSite=Strict";

            return redirectResponse(url.origin + "/", cookie);
        }

        return new Response("Method not allowed", {
            status: 405,
            headers: {
                Allow: "GET, POST"
            }
        });
    }

    /* =====================================
       LOGOUT
    ===================================== */

    if (path === LOGOUT_PATH) {

        if (request.method !== "GET") {
            return new Response("Method not allowed", {
                status: 405
            });
        }

        const expiredCookie =
            `${COOKIE_NAME}=; Path=/; Max-Age=0; ` +
            "HttpOnly; Secure; SameSite=Strict";

        return redirectResponse(
            url.origin + LOGIN_PATH,
            expiredCookie
        );
    }

    /* =====================================
       PROTECT THE ENTIRE WEBSITE
    ===================================== */

    const authenticated = await isAuthenticated(
        request,
        env.SESSION_SECRET
    );

    if (!authenticated) {
        return loginPage();
    }

    /* Allow access to the original portfolio */

    const response = await context.next();

    const headers = new Headers(response.headers);

    headers.set("Cache-Control", "private, no-store");
    headers.set("X-Content-Type-Options", "nosniff");

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
}
