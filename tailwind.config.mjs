// import tailwindcssAnimate from 'tailwindcss-animate'
// import typography from '@tailwindcss/typography'

// /** @type {import('tailwindcss').Config} */
// const config = {
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
//   ],
//   darkMode: ['selector', '[data-theme="dark"]'],
//   plugins: [tailwindcssAnimate, typography],
//   prefix: '',
//   safelist: [
//     'lg:col-span-4',
//     'lg:col-span-6',
//     'lg:col-span-8',
//     'lg:col-span-12',
//     'border-border',
//     'bg-card',
//     'border-error',
//     'bg-error/30',
//     'border-success',
//     'bg-success/30',
//     'border-warning',
//     'bg-warning/30',
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: {
//         '2xl': '2rem',
//         DEFAULT: '1rem',
//         lg: '2rem',
//         md: '2rem',
//         sm: '1rem',
//         xl: '2rem',
//       },
//       screens: {
//         '2xl': '86rem',
//         lg: '64rem',
//         md: '48rem',
//         sm: '40rem',
//         xl: '80rem',
//       },
//     },
//     extend: {
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//       borderRadius: {
//         lg: 'var(--radius)',
//         md: 'calc(var(--radius) - 2px)',
//         sm: 'calc(var(--radius) - 4px)',
//       },
//       colors: {
//         accent: {
//           DEFAULT: 'hsl(var(--accent))',
//           foreground: 'hsl(var(--accent-foreground))',
//         },
//         background: 'hsl(var(--background))',
//         border: 'hsla(var(--border))',
//         card: {
//           DEFAULT: 'hsl(var(--card))',
//           foreground: 'hsl(var(--card-foreground))',
//         },
//         destructive: {
//           DEFAULT: 'hsl(var(--destructive))',
//           foreground: 'hsl(var(--destructive-foreground))',
//         },
//         foreground: 'hsl(var(--foreground))',
//         input: 'hsl(var(--input))',
//         muted: {
//           DEFAULT: 'hsl(var(--muted))',
//           foreground: 'hsl(var(--muted-foreground))',
//         },
//         popover: {
//           DEFAULT: 'hsl(var(--popover))',
//           foreground: 'hsl(var(--popover-foreground))',
//         },
//         primary: {
//           DEFAULT: 'hsl(var(--primary))',
//           foreground: 'hsl(var(--primary-foreground))',
//         },
//         ring: 'hsl(var(--ring))',
//         secondary: {
//           DEFAULT: 'hsl(var(--secondary))',
//           foreground: 'hsl(var(--secondary-foreground))',
//         },
//         success: 'hsl(var(--success))',
//         error: 'hsl(var(--error))',
//         warning: 'hsl(var(--warning))',
//       },
//       fontFamily: {
//         mono: ['var(--font-geist-mono)'],
//         sans: ['var(--font-geist-sans)'],
//       },
//       keyframes: {
//         'accordion-down': {
//           from: { height: '0' },
//           to: { height: 'var(--radix-accordion-content-height)' },
//         },
//         'accordion-up': {
//           from: { height: 'var(--radix-accordion-content-height)' },
//           to: { height: '0' },
//         },
//       },
//       typography: () => ({
//         DEFAULT: {
//           css: [
//             {
//               '--tw-prose-body': 'var(--text)',
//               '--tw-prose-headings': 'var(--text)',
//               h1: {
//                 fontWeight: 'normal',
//                 marginBottom: '0.25em',
//               },
//             },
//           ],
//         },
//         base: {
//           css: [
//             {
//               h1: {
//                 fontSize: '2.5rem',
//               },
//               h2: {
//                 fontSize: '1.25rem',
//                 fontWeight: 600,
//               },
//             },
//           ],
//         },
//         md: {
//           css: [
//             {
//               h1: {
//                 fontSize: '3.5rem',
//               },
//               h2: {
//                 fontSize: '1.5rem',
//               },
//             },
//           ],
//         },
//       }),
//     },
//   },
// }

// export default config

// /tailwind.config.mjs
import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './app/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],

  // Use class AND data-theme toggles for dark mode (covers both projects)
  darkMode: ['class', '[data-theme="dark"]'],

  plugins: [tailwindcssAnimate, typography],

  prefix: '',

  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
      screens: {
        // keep your sizes, adjust 2xl if you want; flipbook used 1400px
        sm: '40rem',
        md: '48rem',
        lg: '64rem',
        xl: '80rem',
        '2xl': '86rem',
      },
    },

    extend: {
      // add extra small breakpoints from the other project
      screens: {
        xxs: '350px',
        xs: '440px',
      },

      // fonts
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'var(--font-sans)'],
        mono: ['var(--font-geist-mono)'],
      },

      // radii
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // colors: keep yours and add the missing ones (background2, positive)
      colors: {
        background: 'hsl(var(--background))',
        background2: 'hsl(var(--background2))', // ⬅️ new
        foreground: 'hsl(var(--foreground))',

        border: 'hsla(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },

        // you already had these:
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',

        // from flipbook config:
        positive: {
          DEFAULT: 'hsl(var(--positive))',
          foreground: 'hsl(var(--positive-foreground))',
        },
      },

      // animations / keyframes (merge both)
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d( 2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d( 4px, 0, 0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        shake: 'shake 1s cubic-bezier(.36,.07,.19,.97) infinite both',
      },

      // your existing prose tweaks
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: { fontWeight: 'normal', marginBottom: '0.25em' },
            },
          ],
        },
        base: {
          css: [{ h1: { fontSize: '2.5rem' }, h2: { fontSize: '1.25rem', fontWeight: 600 } }],
        },
        md: {
          css: [{ h1: { fontSize: '3.5rem' }, h2: { fontSize: '1.5rem' } }],
        },
      }),
    },
  },
}

export default config
