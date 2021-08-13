import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private oauthService: OAuthService) {
	  
    this.Configure();
  }
  private Configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocument().then(() => {
    this.oauthService.tryLogin()
    .catch(err => {
      console.error(err);
     })
    .then(() => {
      if(!this.oauthService.hasValidAccessToken()) {
        this.oauthService.initImplicitFlow()
      }
    });
  });
}
}

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'https://api-staging.csgoroll.com/auth/steam?redirectUri=http://localhost:4200',

  // Login Url of the Identity Provider
  loginUrl: 'https://api-staging.csgoroll.com/auth/steam?redirectUri=http://localhost:4200',

  // Login Url of the Identity Provider
  logoutUrl: 'https://api-staging.csgoroll.com/auth/steam?redirectUri=http://localhost:4200',


  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'api',

  oidc : true,

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email api',

  showDebugInformation: true,
}


