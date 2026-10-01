/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './zh-CN/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 品牌主色：偏靛的蓝，稳健且不同于默认 blue-500 的廉价感
        brand: {
          50: '#f2f7ff',
          100: '#e3edff',
          200: '#c7dbff',
          300: '#9dc1ff',
          400: '#6b9dfb',
          500: '#4578f5',
          600: '#2b5ae8',
          700: '#2447d3',
          800: '#203daa',
          900: '#1d3785',
        },
        // 辅助色：青绿，用于「压缩/提速/成功」意象，与主色形成冷暖平衡
        accent: {
          50: '#eefbfa',
          100: '#d0f5f1',
          200: '#a5ebe3',
          300: '#6fd9cd',
          400: '#3cc0b3',
          500: '#1fa596',
          600: '#158279',
          700: '#146861',
          800: '#13534e',
          900: '#124440',
        },
        // 中性色：略带冷调的石板灰，与品牌蓝同源，避免灰的脏
        ink: {
          50: '#f7f9fc',
          100: '#eef2f8',
          200: '#dae2ee',
          300: '#b9c6da',
          400: '#90a3bf',
          500: '#6b81a3',
          600: '#54678a',
          700: '#44536f',
          800: '#3a4659',
          900: '#333c4c',
          950: '#222935',
        },
        // 语义色
        ok: '#0d9f6e',
        err: '#dc2b45',
        warn: '#c58a09',
      },

      fontFamily: {
        // 不引外部字体（Google Fonts 在国内不通），用系统栈 + 中文最优回退
        sans: [
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },

      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1.4' }],
        // 展示级字号：收紧行高与字距，中文场景单独放宽行高
        display: ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'display-lg': ['2.75rem', { lineHeight: '1.18', letterSpacing: '-0.015em' }],
      },

      borderRadius: {
        xl2: '1.125rem',
        '4xl': '2rem',
      },

      boxShadow: {
        card: '0 1px 2px 0 rgb(34 41 53 / 0.04), 0 1px 3px 0 rgb(34 41 53 / 0.06)',
        soft: '0 2px 6px -1px rgb(34 41 53 / 0.07), 0 1px 3px -1px rgb(34 41 53 / 0.05)',
        lift: '0 10px 26px -8px rgb(34 41 53 / 0.14), 0 3px 10px -3px rgb(34 41 53 / 0.06)',
        ring: '0 0 0 3px rgba(69, 120, 245, 0.18)',
      },

      transitionTimingFunction: {
        swift: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.32s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};
