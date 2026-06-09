export function preguntasAleatorias(n, data, preguntaAleatoria) {
  if (preguntaAleatoria) {
    // Fisher-Yates (Durstenfeld) shuffle — unbiased O(n)
    const shuffled = [...data]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, n)
  } else {
    const sorted = [...data].sort((a, b) => a.id - b.id);
    return sorted.slice(0, n);
  }
}

