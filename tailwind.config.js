/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'media', // 다크 모드 설정 추가
    theme: {
      extend: {
        // 여기에 테마 확장 설정을 추가할 수 있습니다
      },
    },
    plugins: [],
  }