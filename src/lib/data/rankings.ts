// Generate dummy data for rankings
export function generateDummyPlayers(count: number = 80) {
  const clubs = [
    'Club de Padel Cuernavaca',
    'Padel Center Morelos',
    'Club Elite CDMX',
    'Padel Pro Monterrey',
    'Guadalajara Padel Club',
    'Club Deportivo Puebla',
    'Academia Padel México',
    'Centro Deportivo Querétaro',
  ];

  const cities = [
    'CDMX',
    'Cuernavaca',
    'Monterrey',
    'Guadalajara',
    'Puebla',
    'Querétaro',
    'Mérida',
    'Cancún',
  ];

  const firstNames = [
    'Carlos', 'Ana', 'Miguel', 'Laura', 'José', 'María', 'Juan', 'Isabel',
    'Roberto', 'Patricia', 'Fernando', 'Sofía', 'Diego', 'Valentina', 'Andrés',
    'Daniela', 'Gabriel', 'Mariana', 'Ricardo', 'Camila',
  ];

  const lastNames = [
    'Ramírez', 'González', 'Torres', 'Hernández', 'López', 'Martínez', 'Rodríguez',
    'Sánchez', 'Pérez', 'García', 'Díaz', 'Morales', 'Ruiz', 'Jiménez', 'Álvarez',
    'Romero', 'Vargas', 'Mendoza', 'Flores', 'Castro',
  ];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const wins = Math.floor(Math.random() * 40) + 10;
    const losses = Math.floor(Math.random() * 20) + 5;
    const totalMatches = wins + losses;
    const winRate = ((wins / totalMatches) * 100).toFixed(1);
    const tournaments = Math.floor(Math.random() * 10) + 2;
    const titles = Math.floor(Math.random() * 5);

    // Generate recent matches
    const recentMatches = Array.from({ length: 5 }, (_, j) => {
      const opponent = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]
      }`;
      const isWin = Math.random() > 0.4;
      const score = isWin
        ? `${Math.floor(Math.random() * 2) + 5}-${Math.floor(Math.random() * 4)}`
        : `${Math.floor(Math.random() * 4)}-${Math.floor(Math.random() * 2) + 5}`;

      return {
        id: j + 1,
        tournament: `Torneo ${Math.random() > 0.5 ? 'Nacional' : 'Regional'} ${2024}`,
        result: score,
        opponent,
        date: `${Math.floor(Math.random() * 28) + 1} Abril 2024`,
        status: isWin ? 'victoria' : 'derrota',
      };
    });

    // Generate achievements
    const achievements = [];
    if (titles > 0) achievements.push(`${titles}x Campeón Nacional`);
    if (tournaments > 5) achievements.push('Finalista Copa México 2023');
    if (winRate > 70) achievements.push('MVP Temporada 2023');
    if (wins > 30) achievements.push('30+ Victorias en 2023');

    return {
      id: (i + 1).toString(),
      name: `${firstName} ${lastName}`,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
      location: cities[Math.floor(Math.random() * cities.length)],
      club: clubs[Math.floor(Math.random() * clubs.length)],
      rank: i + 1,
      points: Math.floor(2500 - (i * 15) + (Math.random() * 30 - 15)),
      stats: {
        wins,
        losses,
        tournaments,
        titles,
      },
      matches: totalMatches,
      winRate: `${winRate}%`,
      recentMatches,
      achievements,
    };
  });
}

export const dummyPlayers = generateDummyPlayers(80);