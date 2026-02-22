Here’s your complete Team Vulcans Dark + Light Mode Design System (.md format)
(Tailwind config included + Motion Animation Theme explained)

🔥 TEAM VULCANS – Design System
1️⃣ Brand Core

Identity: Aggressive · Metallic · Esports · Futuristic · Sharp
Primary Energy: Lava Red + Carbon Black
Secondary Feel: Clean Light Mode with subtle red authority accents

🌙 DARK MODE
🎨 Colors
Token	Hex	Usage
bg-primary	#0B0B0F	Main background
bg-secondary	#121218	Cards
border	#1F1F28	Subtle separators
text-primary	#F5F5F5	Main text
text-muted	#9A9AA3	Secondary text
red-primary	#E10600	Brand red
red-hover	#FF3B1F	Hover
red-dark	#9B0000	Active
🌑 Dark Gradients

Hero Glow:

radial-gradient(circle at center, rgba(225,6,0,0.18), #0B0B0F 70%)

Button Gradient:

linear-gradient(90deg, #9B0000 0%, #E10600 50%, #FF3B1F 100%)
☀️ LIGHT MODE

Light mode should feel premium — not childish.

🎨 Colors
Token	Hex	Usage
bg-primary	#F4F4F6	Main background
bg-secondary	#FFFFFF	Cards
border	#E2E2E8	Borders
text-primary	#111111	Main text
text-muted	#5C5C66	Secondary text
red-primary	#D90429	Brand red adjusted
red-hover	#FF3B1F	Hover
red-dark	#9B0000	Active
☀️ Light Mode Gradient
linear-gradient(90deg, #D90429 0%, #FF3B1F 100%)
⚙️ Tailwind Config (Extend Only)
// tailwind.config.js
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        vulcan: {
          red: {
            primary: "#E10600",
            hover: "#FF3B1F",
            dark: "#9B0000",
          },
          dark: {
            bg: "#0B0B0F",
            card: "#121218",
            border: "#1F1F28",
            text: "#F5F5F5",
            muted: "#9A9AA3",
          },
          light: {
            bg: "#F4F4F6",
            card: "#FFFFFF",
            border: "#E2E2E8",
            text: "#111111",
            muted: "#5C5C66",
          }
        }
      },
      boxShadow: {
        vulcan: "0 0 25px rgba(225,6,0,0.45)",
        vulcanSoft: "0 0 40px rgba(225,6,0,0.25)"
      },
      backgroundImage: {
        "vulcan-gradient":
          "linear-gradient(90deg, #9B0000 0%, #E10600 50%, #FF3B1F 100%)"
      }
    }
  }
}
🎬 MOTION ANIMATION THEME

Now the important part — this defines how your site feels.

🔥 Core Motion Personality

Fast. Sharp. Controlled. Powerful.
No soft bouncy animations. No playful easing.

⚡ Global Animation Rules
Property	Value
Easing	cubic-bezier(0.4, 0, 0.2, 1)
Duration	0.4s – 0.8s
Hover speed	0.25s
Stagger delay	0.08s
🎮 Hero Entrance Animation

Background red glow fades in (opacity 0 → 1)

Title slides up 40px + fades

Metallic underline streak animates left → right

CTA button scales 0.95 → 1 with glow pulse

Framer Motion Example Logic:

initial: { opacity: 0, y: 40 }

animate: { opacity: 1, y: 0 }

transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }

🔴 Button Hover Motion

Slight upward translate (y: -3px)

Red glow intensifies

Background gradient shifts position

🧱 Section Reveal Animation

Fade + slide upward

Stagger children

No scaling on text (keep it premium)

💥 Special Effects You Can Add

Light streak animation across headings

Subtle noise overlay

Red pulse glow behind important sections

Angular section dividers

Scroll-based parallax red smoke

🌗 Dark/Light Toggle Animation

When switching theme:

0.4s smooth background transition

Slight glow pulse on toggle icon

Optional icon rotation animation (180deg)

🧠 Design Rule

Red is power.
Use it intentionally — not everywhere.

80% dark/neutral
20% red highlights

That balance keeps it premium.