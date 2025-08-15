import type { MotionToolbarProps } from "./motion-toolbar.types";

export const DEMO_PROPS: MotionToolbarProps = {
  items: [
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M5 5m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M9 9h6v6h-6z"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3 10h2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3 14h2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M10 3v2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M14 3v2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M21 10h-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M21 14h-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M14 21v-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M10 21v-2"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
        </svg>
      ),
      tooltip: "Choose a model",
    },
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3.6 9h16.8"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M3.6 15h16.8"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M11.5 3a17 17 0 0 0 0 18"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
          <path
            d="M12.5 3a17 17 0 0 1 0 18"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
        </svg>
      ),
      tooltip: "Set sources for search",
    },
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-paperclip"
        >
          <path
            d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5"
            stroke="var(--icon-color)"
            fill="none"
            strokeWidth="1.8px"
          />
        </svg>
      ),
      tooltip: "Attach files",
    },

    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          className="tabler-icon tabler-icon-microphone-filled"
        >
          <path
            d="M19 9a1 1 0 0 1 1 1a8 8 0 0 1 -6.999 7.938l-.001 2.062h3a1 1 0 0 1 0 2h-8a1 1 0 0 1 0 -2h3v-2.062a8 8 0 0 1 -7 -7.938a1 1 0 1 1 2 0a6 6 0 0 0 12 0a1 1 0 0 1 1 -1m-7 -8a4 4 0 0 1 4 4v5a4 4 0 1 1 -8 0v-5a4 4 0 0 1 4 -4"
            fill="var(--icon-color)"
          />
        </svg>
      ),
      tooltip: "Dictation",
    },
    {
      icon: (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          color="currentColor"
          fill="currentColor"
          fillRule="evenodd"
        >
          <path
            d="M0 12.6663C0 13.4018 0.59792 13.9997 1.33333 13.9997C2.06875 13.9997 2.66667 13.4018 2.66667 12.6663V11.333C2.66667 10.5975 2.06875 9.99967 1.33333 9.99967C0.59792 9.99967 0 10.5975 0 11.333V12.6663ZM6.66667 5.33301C7.40213 5.33301 8 5.93087 8 6.66634V17.333C8 18.0685 7.40213 18.6663 6.66667 18.6663C5.9312 18.6663 5.33333 18.0685 5.33333 17.333V6.66634C5.33333 5.93087 5.9312 5.33301 6.66667 5.33301ZM10.6667 21.333C10.6667 22.0685 11.2645 22.6663 12 22.6663C12.7355 22.6663 13.3333 22.0685 13.3333 21.333V2.66634C13.3333 1.93093 12.7355 1.33301 12 1.33301C11.2645 1.33301 10.6667 1.93093 10.6667 2.66634V21.333ZM17.3333 5.33301C18.0688 5.33301 18.6667 5.93087 18.6667 6.66634V17.333C18.6667 18.0685 18.0688 18.6663 17.3333 18.6663C16.5979 18.6663 16 18.0685 16 17.333V6.66634C16 5.93087 16.5979 5.33301 17.3333 5.33301ZM24 11.333C24 10.5975 23.4021 9.99967 22.6667 9.99967C21.9312 9.99967 21.3333 10.5975 21.3333 11.333V12.6663C21.3333 13.4018 21.9312 13.9997 22.6667 13.9997C23.4021 13.9997 24 13.4018 24 12.6663V11.333Z"
            fill="#31b8c6"
          />
        </svg>
      ),
      tooltip: "Voice mode",
    },
  ],
};
