import api from '@/lib/utils';

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

export const loginApi = {
  login: async (loginData: LoginData): Promise<LoginResponse> => {
    try {
      const data = await api.post<LoginResponse>('/api/users/login', loginData);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.user || {}));
      }
      
      return data;
    } catch (error: any) {
      console.error('登录失败:', error);
      throw error;
    }
  },

  register: async (registerData: any): Promise<RegisterResponse> => {
    try {
      const data = await api.post<RegisterResponse>('/api/users/register', registerData);
      return data;
    } catch (error: any) {
      console.error('注册失败:', error);
      throw error;
    }
  },

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    try {
      const data = await api.post<ApiResponse>('/api/users/forgot-password', { email });
      return data;
    } catch (error: any) {
      console.error('发送重置密码邮件失败:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/api/users/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    }
  }
};

export const authUtils = {
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getLocalUserInfo: (): any => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  }
};

export default loginApi;
