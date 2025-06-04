// Configuration for different SSO providers
export const authConfig = {
  // SAML Configuration (common in educational institutions)
  saml: {
    entryPoint: "https://your-college.edu/saml/login",
    issuer: "sceh-portal",
    callbackUrl: "https://your-domain.com/auth/saml/callback",
    cert: process.env.SAML_CERT, // College's public certificate
  },

  // OAuth 2.0 Configuration
  oauth: {
    clientId: process.env.COLLEGE_OAUTH_CLIENT_ID,
    clientSecret: process.env.COLLEGE_OAUTH_CLIENT_SECRET,
    authorizationURL: "https://your-college.edu/oauth/authorize",
    tokenURL: "https://your-college.edu/oauth/token",
    userInfoURL: "https://your-college.edu/oauth/userinfo",
    scope: ["profile", "email", "student_info"],
  },

  // LDAP Configuration (if college uses Active Directory)
  ldap: {
    url: "ldap://your-college.edu:389",
    baseDN: "dc=your-college,dc=edu",
    username: process.env.LDAP_BIND_DN,
    password: process.env.LDAP_BIND_PASSWORD,
  },
}
