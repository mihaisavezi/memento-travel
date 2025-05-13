export function useUIColors() {
  const colorMode = useColorMode();

  const backgroundColorClasses = computed(() => {
    const isDark = colorMode.value === "dark";

    return {
      "bg-indigo-950/60": isDark,
      "bg-sky-200/50": !isDark,
    };
  });

  return { backgroundColorClasses };
}
