declare module '@/api/login' {
  interface LoginData {
    email: string;
    password: string;
    rememberMe?: boolean;
  }

  interface LoginResponse {
    token: string;
    user?: {
      id: string;
      email: string;
      name: string;
    };
    message?: string;
  }

  interface RegisterResponse {
    message: string;
    user?: {
      id: string;
      email: string;
      name: string;
    };
  }

  interface ApiResponse {
    message?: string;
  }

  export const loginApi: {
    login: (loginData: LoginData) => Promise<LoginResponse>;
    register: (registerData: any) => Promise<RegisterResponse>;
    forgotPassword: (email: string) => Promise<ApiResponse>;
    logout: () => Promise<void>;
  };

  export const authUtils: {
    isLoggedIn: () => boolean;
    getLocalUserInfo: () => any;
    getToken: () => string | null;
  };

  const _default: typeof loginApi;
  export default _default;
}
