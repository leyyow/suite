import { ref, onMounted, onUnmounted } from "vue";

export function useMediaQuery(query) {
  const matches = ref(false);

  let mediaQueryList = null;

  const updateMatches = () => {
    matches.value = mediaQueryList?.matches || false;
  };

  onMounted(() => {
    mediaQueryList = window.matchMedia(`(${query})`);
    updateMatches();

    mediaQueryList.addEventListener("change", updateMatches);
  });

  onUnmounted(() => {
    mediaQueryList.removeEventListener("change", updateMatches);
  });

  return matches;
}
