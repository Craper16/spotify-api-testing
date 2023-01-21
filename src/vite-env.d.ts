/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string;
  readonly VITE_REDIRECT_URL: string;
  readonly VITE_AUTH_ENDPOINT: string;
  readonly VITE_RESPONSE_TYPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
