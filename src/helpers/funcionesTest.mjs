export function preguntasAleatorias(n, data, preguntaAleatoria) {
    if (preguntaAleatoria) {
    const shuffled = data.sort(() => 0.5 - Math.random())
      return shuffled.slice(0, n)
  } else {
       const sorted = data.sort((a, b) => a.id - b.id);
       return sorted.slice(0, n);

  }

}

