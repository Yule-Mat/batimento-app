export const theme = {
  colors: {
    brand: {
      primary: '#A52E35',
      primaryDark: '#7F2329',
      primaryLight: '#C75A60',
    },

    neutral: {
      white: '#FFFFFF',
      background: '#F7F2F0',
      surface: '#FFFFFF',
      text: '#292426',
      textSecondary: '#6C6464',
      border: '#D8C5C4',
    },

    status: {
      success: '#2E7D32',
      warning: '#A66A00',
      error: '#B3261E',
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  radius: {
    sm: 8,
    md: 16,
    lg: 24,
    pill: 999,
  },

  typography: {
    size: {
      caption: 12,
      body: 16,
      subtitle: 20,
      title: 32,
      display: 64,
    },

    weight: {
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
  },

  motion: {
    fast: 120,
    normal: 220,
    slow: 360,
  },
};